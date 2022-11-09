import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { UserContext } from "./contexts/UserContext";
import { JwtContext } from "./contexts/JwtContext";

import Header from "./components/Header";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MatchingPage from "./pages/MatchingPage";
import SelectDifficultyPage from "./pages/SelectDifficultyPage";
import SelectTopicPage from "./pages/SelectTopicPage";
import CollaborationPage from "./pages/CollaborationPage";
import HistoryPage from "./pages/HistoryPage";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        allVariants: {
            color: "white",
        },
    },
});

function App() {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    const jwtValue = useMemo(() => ({ jwt, setJwt }), [jwt, setJwt]);

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <div style={{
                    backgroundImage: "url(/blue_background.jpeg)",
                    backgroundSize: "cover",
                    width: '100vw',
                    height: '100vh',
                }}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Router>
                            <UserContext.Provider value={userValue}>
                                <JwtContext.Provider value={jwtValue}>
                                    <Header></Header>
                                    <Routes>
                                        <Route
                                            exact
                                            path="/"
                                            element={<Navigate replace to="/login" />}
                                        ></Route>
                                        <Route path="/signup" element={<SignupPage />} />
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route
                                            path="/home"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    <HomePage />
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                        <Route
                                            path="/profile"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    <ProfilePage />
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                        <Route
                                            path="/selectDifficulty"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    <SelectDifficultyPage />
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                        <Route
                                            path="/selectTopic"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    <SelectTopicPage />
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                        <Route
                                            path="/matching"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    <MatchingPage />
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                        <Route
                                            path="/room/*"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    (user !== null && user.room !== null) ||
                                                    JSON.parse(localStorage.getItem("user"))
                                                        .room !== null ? (
                                                        <CollaborationPage />
                                                    ) : (
                                                        <Navigate to="/home" />
                                                    )
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                        <Route
                                            path="/history"
                                            element={
                                                localStorage.getItem("user") !== null ? (
                                                    <HistoryPage />
                                                ) : (
                                                    <Navigate to="/login" />
                                                )
                                            }
                                        />
                                    </Routes>
                                </JwtContext.Provider>
                            </UserContext.Provider>
                        </Router>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
