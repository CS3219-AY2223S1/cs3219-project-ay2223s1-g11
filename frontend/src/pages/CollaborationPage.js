import { Box, Button, Grid, Typography, CircularProgress, Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { STATUS_CODE_CREATED } from "../constants";
import { UserContext } from "../contexts/UserContext";
import Chat from "../components/Chat";
import Editor from "../components/Editor";
import { useChatService } from "../hooks/useChatService";
import { getQuestion, getQuestionByTopic } from "../services/QuestionService";
import { addQuestionToHistory } from "../services/HistoryService";

let isLeaving = false;

function CollaborationPage() {
    const { user, setUser } = useContext(UserContext);
    const [question, setQuestion] = useState({});
    const [openToast, setOpenToast] = useState(true);
    const [openAddQnToast, setOpenAddQnToast] = useState(false);
    const [openReconnectToast, setOpenReconnectToast] = useState(false);
    const [finishStatus, setfinishStatus] = useState(false);
    const [hasLoadedQn, setHasLoadedQn] = useState(false);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!finishStatus) {
            if (window.confirm("Are you sure you want to exit the room?")) {
                setfinishStatus(true);
                handleLeave();
            } else {
                window.history.pushState(null, null, window.location.pathname);
                setfinishStatus(false);
            }
        }
    };

    useEffect(() => {
        if (!user) {
            // if user refreshes the page
            setUser(JSON.parse(localStorage.getItem("user")));
            setQuestion(JSON.parse(localStorage.getItem("question")));
            setOpenReconnectToast(true);
            setHasLoadedQn(true);
        }

        // get question from QuestionService
        fetchQuestion();

        // back-button
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener("popstate", onBackButtonEvent);

        return () => {
            window.removeEventListener("popstate", onBackButtonEvent);
        };
    }, []);

    async function fetchQuestion() {
        if (user.topic !== null) {
            await getQuestionByTopic(user.room, user.topic).then((qn) => setQuestion(qn));
        } else if (user.difficultyLevel !== null) {
            await getQuestion(user.room, user.difficultyLevel).then((qn) => setQuestion(qn));
        }
        setHasLoadedQn(true);
    }

    useEffect(() => {
        localStorage.setItem("question", JSON.stringify(question));
    }, [question]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        if (isLeaving) {
            navigate("/home");
        }
    }, [user]);

    const { exitChat } = useChatService();

    let navigate = useNavigate();
    const handleLeave = () => {
        exitChat();
        setUser((prevState) => {
            return {
                ...prevState,
                room: null,
                difficultyLevel: null,
                topic: null,
                partnerUsername: null,
            };
        });
        localStorage.removeItem("question");
        isLeaving = true;
    };

    const handleMarkQn = async () => {
        const res = await addQuestionToHistory(user.username, question);
        if (res && res.status === STATUS_CODE_CREATED) {
            setOpenAddQnToast(true);
        }
    };

    return (
        user && (
            <Box padding="1%">
                <Grid container justifyContent="end" alignItems="center">
                    <Button
                        style={{ marginRight: "5px" }}
                        variant="contained"
                        color="success"
                        onClick={handleMarkQn}
                    >
                        Mark Question as Done
                    </Button>

                    <Button variant="contained" color="error" onClick={handleLeave}>
                        Leave
                    </Button>
                </Grid>

                <Grid container direction="row" justifyContent="center" alignItems="stretch">
                    <Grid
                        sx={{ backgroundColor: "#2D2D2D", borderRadius: "8px", height: '80vh' }}
                        item={true}
                        xs={4}
                        padding="1%"
                    >
                        {!hasLoadedQn ? (
                            <Stack padding="5%">
                                <Typography variant="h4">Loading Question...</Typography>
                                <div
                                    style={{
                                        marginTop: "25%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CircularProgress size="100px" />
                                </div>
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="h4">{question.title}</Typography>
                                {question.difficulty === "easy" && (
                                    <Typography variant="h6" style={{ color: "green" }}>
                                        Difficulty: Easy
                                    </Typography>
                                )}
                                {question.difficulty === "medium" && (
                                    <Typography variant="h6" style={{ color: "orange" }}>
                                        Difficulty: Medium
                                    </Typography>
                                )}
                                {question.difficulty === "hard" && (
                                    <Typography variant="h6" style={{ color: "red" }}>
                                        Difficulty: Hard
                                    </Typography>
                                )}
                                <br></br>
                                <Typography variant="body1">{question.question}</Typography>
                            </>
                        )}
                    </Grid>

                    <Grid item={true} xs={5} padding="1%">
                        <Editor />
                    </Grid>

                    <Grid item={true} xs={3} padding="1%">
                        <div style={{ position: "relative", height: '78vh', width: "105%" }}>
                            <Chat></Chat>
                        </div>
                    </Grid>
                </Grid>

                <Snackbar
                    open={openToast}
                    autoHideDuration={3000}
                    message="Found a match!"
                    onClose={() => setOpenToast(false)}
                />

                <Snackbar
                    open={openAddQnToast}
                    autoHideDuration={3000}
                    message="Marked question as done"
                    onClose={() => setOpenAddQnToast(false)}
                />

                <Snackbar
                    open={openReconnectToast}
                    autoHideDuration={3000}
                    message="Reconnected"
                    onClose={() => setOpenReconnectToast(false)}
                />
            </Box>
        )
    );
}

export default CollaborationPage;
