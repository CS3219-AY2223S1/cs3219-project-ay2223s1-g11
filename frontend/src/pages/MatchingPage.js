import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import { UserContext } from "../contexts/UserContext";
import { useMatchingService } from "../hooks/useMatchingService";

// The countdown timer interval in seconds
const TIMER_INTERVAL = 30;

const MatchingPage = () => {
    const navigate = useNavigate();
    const { findMatch, failMatch, disconnect, matchState } = useMatchingService({
        enabled: true,
    });
    const { user, setUser } = useContext(UserContext);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");

    const closeDialog = () => setIsDialogOpen(false);
    const closeFailDialog = () => {
        setIsDialogOpen(false);
        navigate("/home");
    };
    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Failure");
        setDialogMsg(msg);
    };

    // Runs when the component unmounts
    useEffect(() => {
        return () => disconnect();
    }, []);

    useEffect(() => {
        if (user && !matchState.isPending && !matchState.isSuccess) {
            if (user.difficultyLevel !== null) {
                findMatch({
                    username: user.username,
                    filterKey: user.difficultyLevel,
                });
            } else if (user.topic !== null) {
                findMatch({
                    username: user.username,
                    filterKey: user.topic,
                });
            } else {
                alert("Invalid Matching Request");
                navigate("/home");
            }
        } 
    }, [user]);

    useEffect(() => {
        if (matchState.isSuccess && matchState.roomId && matchState.partnerUsername) {
            setUser((prevState) => {
                return {
                    ...prevState,
                    room: matchState.roomId,
                    partnerUsername: matchState.partnerUsername,
                };
            });
        }

        if (matchState.hasFailed) {
            setErrorDialog("Unable to find a match, please try again :(");
        }
    }, [matchState]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.room) {
            navigate(`/room/${matchState.roomId}`);
        }
    }, [user]);

    const handleTimeout = () => {
        disconnect();
        failMatch();
    };

    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Stack justifyContent="center" alignItems="center" padding="1rem">
                    <br></br>
                    <CountdownTimer
                        interval={TIMER_INTERVAL}
                        timerFinishedCallback={handleTimeout}
                    />
                    <br></br>
                    <Typography variant="h5" padding="1rem">
                        Please wait till we find you a match...
                    </Typography>

                    <br></br>
                    <Button variant="contained" color="error" onClick={() => navigate("/home")}>
                        Cancel Match
                    </Button>
                </Stack>
            </Box>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {matchState.hasFailed && (
                        <Button onClick={closeFailDialog}>Return to Home</Button>
                    )}
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MatchingPage;
