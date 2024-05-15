import React, { useEffect, useState } from "react";
import CursorSVG from "./CursorSVG";
import { Container } from "react-bootstrap";

function ChatContainer({ chatHistory }) {
    const [displayResponse, setDisplayResponse] = useState("");
    const [completedTyping, setCompletedTyping] = useState(false);

    useEffect(() => {
        if (!chatHistory?.length) {
            return;
        }

        setCompletedTyping(false);
        const stringResponse = chatHistory[chatHistory.length - 1]?.content;
        setDisplayResponse(stringResponse);
        setCompletedTyping(true);
    }, [chatHistory.length]);

    return (
        <Container className="container-chat">
            <div className="force-overflow"></div>
            {chatHistory?.map((message, messageIndex) => (
                <div key={messageIndex}>
                    {message?.role === "user" && (
                        <div className="chat-end">
                            <p className="text" style={{ whiteSpace: "pre-line", padding: ".5rem" }}>
                                {message?.content}
                            </p>
                        </div>
                    )}
                    {messageIndex === chatHistory.length - 1 && message?.role === "assistant" && (
                        <div className="chat-start">
                            <p className="text" style={{ whiteSpace: "pre-line", padding: ".5rem" }}>
                                {displayResponse}
                                {!completedTyping && <CursorSVG />}
                            </p>
                        </div>
                    )}
                    {message?.role === "assistant" && messageIndex !== chatHistory.length - 1 && (
                        <div className="chat-start">
                            <p className="text" style={{ whiteSpace: "pre-line", padding: ".5rem" }}>
                                {message?.content}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </Container>
    );
}

export default ChatContainer;
