import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

let MATCHING_SERVICE_ENDPOINT = ''

if (process.env.REACT_APP_NODE_ENV === "production") {
    MATCHING_SERVICE_ENDPOINT = process.env.REACT_APP_MATCHING_SERVICE_CLOUD_ENDPOINT;
} else {
    MATCHING_SERVICE_ENDPOINT = process.env.REACT_APP_MATCHING_SERVICE_LOCAL_ENDPOINT;
}

export const useMatchingService = ({
    enabled,
    onConnected,
    onDisconnected,
}) => {
    const socketRef = useRef();

    // State can be simplified
    const [matchState, setMatchState] = useState({
        hasConnected: false,
        isPending: false,
        hasFailed: false,
        isSuccess: false,
        roomId: null,
        error: null,
        partnerUsername: null,
    });

    const findMatch = ({ username, filterKey }) => {
        socketRef.current.emit("findMatch", { username, filterKey });
    };

    const failMatch = () => {
        setMatchState((prevState) => {
            return { ...prevState, hasFailed: true };
        });
    };

    const disconnect = () => {
        socketRef.current.disconnect();
    };

    const updateOnConnected = () => {
        setMatchState((prevState) => {
            return { ...prevState, hasConnected: true };
        });
    };

    const updateOnDisconnected = () => {
        setMatchState((prevState) => {
            return { ...prevState, hasConnected: false };
        });
    };

    const updateOnMatchSuccess = (roomId, partnerUsername) => {
        setMatchState((prevState) => {
            return {
                ...prevState,
                isPending: false,
                isSuccess: true,
                hasFailed: false,
                roomId,
                partnerUsername,
            };
        });
    };

    const updateOnMatchFail = (error) => {
        setMatchState((prevState) => {
            return {
                ...prevState,
                isPending: false,
                isSuccess: false,
                hasFailed: true,
                error,
            };
        });
    };

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const socket = io(MATCHING_SERVICE_ENDPOINT);

        socket.on("connected", () => {
            updateOnConnected();
            if (onConnected) {
                onConnected();
            }
        });

        socket.on("disconnect", () => {
            updateOnDisconnected();
            if (onDisconnected) {
                onDisconnected();
            }
        });

        socket.on("matchSuccess", ({ roomId, partnerUsername }) => {
            updateOnMatchSuccess(roomId, partnerUsername);
        });

        socket.on("matchFail", ({ error }) => {
            updateOnMatchFail(error);
        });

        socketRef.current = socket;

        return () => socket.disconnect();
    }, [enabled, onConnected, onDisconnected]);

    return {
        findMatch,
        failMatch,
        disconnect,
        matchState,
    };
};
