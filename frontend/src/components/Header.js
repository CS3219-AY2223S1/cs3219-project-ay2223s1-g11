import {
    Avatar,
    AppBar,
    Box,
    Toolbar,
    Button,
    Typography,
    Menu,
    Divider,
    ListItemIcon,
    MenuItem,
    Tooltip,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { JwtContext } from "../contexts/JwtContext";
import { logoutUser } from "../services/UserService";
import { STATUS_CODE_SUCCESS } from "../constants";

const Header = () => {
    const { jwt, setJwt } = useContext(JwtContext);

    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    const { user, setUser } = useContext(UserContext);

    let navigate = useNavigate();
    const location = useLocation();

    const handleProfile = () => {
        if (location.pathname.match("/room") !== null) {
            window.alert("If you want to access Profile, please click on the Leave button.");
        } else if (location.pathname.match("/matching") !== null) {
            window.alert("If you want to access Profile, please cancel match.");
        } else {
            navigate("/profile");
        }
    };

    const handleHome = () => {
        if (location.pathname.match("/room") !== null) {
            window.alert("If you want to access Home, please click on the Leave button.");
        } else if (location.pathname.match("/matching") !== null) {
            window.alert("If you want to access Home, please cancel match.");
        } else {
            navigate("/home");
        }
    };

    const handleLogout = async () => {
        if (location.pathname.match("/room") !== null) {
            window.alert("If you want to Logout, please click on the Leave button.");
        } else if (location.pathname.match("/matching") !== null) {
            window.alert("If you want to Logout, please cancel match.");
        } else {
            try {
                const res = await logoutUser({ username: user.username }, jwt);
                if (res && res.status === STATUS_CODE_SUCCESS) {
                    cleanDataAndRedirect();
                }
            } catch (err) {
                setErrorDialog(err.response.data.message);
            }
        }
    };

    const cleanDataAndRedirect = () => {
        setUser(null);
        setJwt(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Error");
        setDialogMsg(msg);
    };
    const closeDialog = () => setIsDialogOpen(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {user && (
                        <Button
                            color="inherit"
                            component="div"
                            sx={{ textTransform: "none" }}
                            onClick={handleHome}
                        >
                            <Typography variant="h6">PeerPrep</Typography>
                        </Button>
                    )}

                    {user && (
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="medium"
                                sx={{ ml: 2, marginLeft:"auto", marginRight:0 }}
                                aria-controls={open ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    )}

                    {user && (
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem onClick={handleProfile}>
                                <Avatar /> {user.username}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    )}
                </Toolbar>
            </AppBar>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Done</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Header;
