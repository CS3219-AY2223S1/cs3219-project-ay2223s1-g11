import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useChatService } from "../hooks/useChatService";

import "../chat_style/main.scss";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";

const Chat = () => {
    let navigate = useNavigate();
    const { joinChat, sendMessageToSocket, chatState, messages } = useChatService();

    const [message, setMessage] = useState("");

    useEffect(() => {
        joinChat();
    }, []);

    const sendMessage = () => {
        if (message) {
            sendMessageToSocket(message);
            setMessage("");
        }
    };

    if (chatState.flag) {
        navigate("/select");
    }

    return (
        <MainContainer>
            <ChatContainer>
                <MessageList>
                    {messages.map((message, i) => (
                        <div key={i}>
                            <Message
                                model={{
                                    message: message.message,
                                    sentTime: "just now",
                                    sender: message.user,
                                    direction:
                                        message.user === chatState.name
                                            ? "outgoing"
                                            : message.user === "admin"
                                            ? "undefined"
                                            : "incoming",
                                }}
                            />
                            {message.user === "admin" ? (
                                <Message.Footer sender="Admin" />
                            ) : (
                                <>
                                    {message.user === chatState.name ? (
                                        <div style={{ display: 'flex', justifyContent:'flex-end' }}>
                                            <Message.Footer sender={message.user} />
                                        </div>
                                    ) : (
                                        <Message.Footer sender={message.user} />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </MessageList>
                <MessageInput
                    attachButton={false}
                    placeholder="Type message here"
                    value={message}
                    onChange={(val) => setMessage(val)}
                    onSend={sendMessage}
                />
            </ChatContainer>
        </MainContainer>
    );
};

export default Chat;
