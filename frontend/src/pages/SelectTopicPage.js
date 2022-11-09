import { Button, Stack, Typography, Grid, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getAllTopics } from "../services/QuestionService";

const SelectTopicPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [topics, setTopics] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const navigate = useNavigate();

    const clickTopic = (e) => {
        setUser((prevState) => {
            return {
                ...prevState,
                topic: e.currentTarget.textContent,
            };
        });
        navigate("/matching");
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
        fetchTopics();
    }, []);

    async function fetchTopics() {
        await getAllTopics().then((topics) => setTopics(topics));
        setHasLoaded(true);
    }

    if (!hasLoaded) {
        return (
            <Stack padding="10%">
                <Typography variant="h2">Select Topic</Typography>
                <div style={{ margin:"10%", display: "flex", justifyContent: "center" }}>
                    <CircularProgress size="150px" />
                </div>
            </Stack>
        );
    }

    return (
        <Stack padding="10%">
            <Typography variant="h2">Select Topic</Typography>
            <br></br>
            <Grid container columnSpacing={2}>
                {topics.map((topic, i) => (
                    <Grid key={i} item>
                        <br></br>
                        <Button variant={"contained"} onClick={clickTopic}>
                            {topic}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default SelectTopicPage;
