import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import TopicIcon from '@mui/icons-material/Topic';
import HistoryIcon from '@mui/icons-material/History';
import LineAxisIcon from '@mui/icons-material/LineAxis';

function HomePage() {
    const { user, setUser } = useContext(UserContext);
    let navigate = useNavigate();

    const goToDifficultyPage = () => {
        setUser((prevState) => {
            return {
                ...prevState,
                room: null,
                difficultyLevel: null,
                topic: null,
                partnerUsername: null,
            };
        });
        navigate("/selectDifficulty");
    };

    const goToTopicPage = () => {
        setUser((prevState) => {
            return {
                ...prevState,
                room: null,
                difficultyLevel: null,
                topic: null,
                partnerUsername: null,
            };
        });
        navigate("/selectTopic");
    };

    const goToHistoryPage = () => {
        navigate("/history");
    };

    return (
        <Stack padding="10%">
            <Typography variant="h2" align="center">
                Welcome to PeerPrep
            </Typography>

            <Button style={{margin:"2%", fontWeight:"bold"}} variant={"contained"} size="large" onClick={goToDifficultyPage}>
                Find a match via Difficulty!
               <LineAxisIcon style={{marginLeft:"2%"}} fontSize="large"></LineAxisIcon>
            </Button>
            <Button style={{margin:"2%", fontWeight:"bold"}} variant={"contained"} size="large" onClick={goToTopicPage}>
                Find a match via Topic!
                <TopicIcon style={{marginLeft:"2%"}} fontSize="large"></TopicIcon>
            </Button>
            <Button style={{margin:"2%", fontWeight:"bold"}} color="success" variant={"contained"} size="large" onClick={goToHistoryPage}>
                History of completed questions
                <HistoryIcon style={{marginLeft:"2%"}} fontSize="large"></HistoryIcon>
            </Button>
        </Stack>
    );
}

export default HomePage;
