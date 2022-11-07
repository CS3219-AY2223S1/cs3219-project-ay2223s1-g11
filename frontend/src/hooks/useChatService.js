import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";

let CHAT_SERVICE_ENDPOINT = ''

if (process.env.REACT_APP_NODE_ENV === "production") {
    CHAT_SERVICE_ENDPOINT = process.env.REACT_APP_CHAT_SERVICE_CLOUD_ENDPOINT;
} else {
    CHAT_SERVICE_ENDPOINT = process.env.REACT_APP_CHAT_SERVICE_LOCAL_ENDPOINT;
}

export const useChatService = () => {
    const socket = io(CHAT_SERVICE_ENDPOINT);
    const { user, setUser } = useContext(UserContext);

    const [chatState, setChatState] = useState({
        name: "",
        room: "",
        flag: 0,
    });
    const [messages, setMessages] = useState([]);

    const joinChat = () => {
        setChatState((prevState) => {
            return { ...prevState, room: user.room, name: user.username };
        });

        socket.emit(
            "join",
            {
                user: user.username,
                partnerUsername: user.partnerUsername,
                room: user.room,
            },
            (error) => {
                if (error) {
                    setChatState((prevState) => {
                        return { ...prevState, flag: 1 };
                    });
                    alert(error);
                }
            }
        );
    };

    const sendMessageToSocket = (message) => {
        socket.emit("message", {
            user: chatState.name,
            room: chatState.room,
            message: message,
        });
    };

    const exitChat = () => {
        socket.emit("quit", { user: user.username, room: user.room });
    };

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, [socket]);

    return { joinChat, sendMessageToSocket, exitChat, chatState, messages };
};
