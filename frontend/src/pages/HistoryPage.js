import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    CircularProgress,
    Stack
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUserQuestionHistory } from "../services/HistoryService";
import { UserContext } from "../contexts/UserContext";

function HistoryPage() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const closeDialog = () => setIsDialogOpen(false);

    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [user]);

    async function fetchQuestions() {
        await getUserQuestionHistory(user.username).then((qns) => setQuestions(qns));
        setHasLoaded(true);
    }

    const viewQuestion = (qn) => {
        setDialogTitle(qn.title);
        setDialogMsg(qn.question);
        setIsDialogOpen(true);
    };

    if (!hasLoaded) {
        return (
            <Box padding="10%">
                <Typography variant="h2" component="div" align="center">
                    History
                </Typography>
                <div style={{ margin:"10%", display: "flex", justifyContent: "center" }}>
                    <CircularProgress size="150px" />
                </div>
            </Box>
        );
    }

    if (questions.length > 0) {
        return (
            <Box padding="10%">
                <Typography variant="h2" component="div" align="center">
                    History
                </Typography>
                <br></br>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Topic</TableCell>
                                <TableCell align="center">Difficulty</TableCell>
                                <TableCell align="center">Last Attempt</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map((qn) => (
                                <TableRow
                                    key={qn.title}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="center">{qn.title}</TableCell>
                                    <TableCell align="center">{qn.topic}</TableCell>
                                    {qn.difficulty === "easy" && (
                                        <TableCell style={{ color: "green" }} align="center">
                                            Easy
                                        </TableCell>
                                    )}
                                    {qn.difficulty === "medium" && (
                                        <TableCell style={{ color: "orange" }} align="center">
                                            Medium
                                        </TableCell>
                                    )}
                                    {qn.difficulty === "hard" && (
                                        <TableCell style={{ color: "red" }} align="center">
                                            Hard
                                        </TableCell>
                                    )}
                                    <TableCell align="center">
                                        {new Date(qn.lastAttempt).toLocaleString("en-GB", {
                                            timeZone: "Asia/Singapore",
                                        })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            style={{ fontWeight: "bold" }}
                                            variant="contained"
                                            onClick={() => viewQuestion(qn)}
                                        >
                                            View Question
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
    }

    return (
        <Stack justifyContent="center" alignItems="center" padding="10%">
            <Typography variant="h2" component="div" align="center">
                History
            </Typography>
            <br></br>
            <br></br>
            <Typography variant="h5" component="div" align="center">
                History is empty :(
            </Typography>
            <Typography variant="h5" component="div" align="center">
                Start completing some questions!
            </Typography>
            <Button
                style={{ marginTop: "2%", fontWeight: "bold" }}
                variant="contained"
                color="success"
                size="large"
                onClick={() => navigate("/home")}
            >
                Return back to Home
            </Button>
        </Stack>
    );
}

export default HistoryPage;
