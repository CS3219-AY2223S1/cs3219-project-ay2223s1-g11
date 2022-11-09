import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { JwtContext } from "../contexts/JwtContext";
import { changePassword, deleteUser } from "../services/UserService";
import { STATUS_CODE_SUCCESS } from "../constants";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PasswordIcon from '@mui/icons-material/Password';

function ProfilePage() {
    let navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const { jwt, setJwt } = useContext(JwtContext);

    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");

    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const closeDialog = () => setIsDialogOpen(false);
    const closePasswordDialog = () => setIsPasswordDialogOpen(false);

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Success");
        setDialogMsg(msg);
    };

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Error");
        setDialogMsg(msg);
    };

    const handleDelete = async () => {
        try {
            const res = await deleteUser({ username: user.username }, jwt);
            if (res && res.status === STATUS_CODE_SUCCESS) {
                cleanDataAndRedirect();
            }
        } catch (err) {
            setErrorDialog(err.response.data.message);
        }
    };

    const cleanDataAndRedirect = () => {
        setUser(null);
        setJwt(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const openPasswordDialog = () => {
        setIsPasswordDialogOpen(true);
    };

    const handlePassword = async () => {
        try {
            const res = await changePassword({
                username: user.username,
                currentPassword: password,
                newPassword: newPassword,
            });
            if (res && res.status === STATUS_CODE_SUCCESS) {
                setSuccessDialog("Successfully changed password!");
                setPassword("");
                setNewPassword("");
            }
        } catch (err) {
            setErrorDialog(err.response.data.message);
        }
        closePasswordDialog();
    };

    return (
        user && (
            <Stack padding="10%">
                <Typography variant="h2" component="div" align="center">
                    Profile of {user.username}
                </Typography>

                <Button
                    style={{ margin: "2%", fontWeight: "bold" }}
                    variant={"contained"}
                    size="large"
                    onClick={openPasswordDialog}
                >
                    Change Password
                    <PasswordIcon style={{marginLeft:"2%"}} fontSize="large"></PasswordIcon>
                </Button>

                <Button
                    variant={"contained"}
                    color="error"
                    size="large"
                    style={{ margin: "2%", fontWeight: "bold" }}
                    onClick={handleDelete}
                >
                    Delete Account
                    <DeleteForeverIcon style={{marginLeft:"2%"}} fontSize="large"></DeleteForeverIcon>
                </Button>

                <Dialog open={isPasswordDialogOpen} onClose={closeDialog} fullWidth maxWidth="xs">
                    <DialogTitle>Change Password</DialogTitle>
                    <Stack padding="5%">
                        <TextField
                            label="Current password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ width: "80%", marginBottom: "1rem" }}
                            autoFocus
                            style={{}}
                        />
                        <TextField
                            label="New password"
                            variant="standard"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ width: "80%", marginBottom: "1rem" }}
                            style={{}}
                        />
                    </Stack>
                    <DialogActions>
                        <Button onClick={closePasswordDialog}>Cancel</Button>
                        <Button onClick={handlePassword}>Done</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={isDialogOpen} onClose={closeDialog}>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialogMsg}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>Done</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        )
    );
}

export default ProfilePage;
