import React, { useEffect, useState } from "react";
import CursorSVG from "./CursorSVG";
import { Button } from "react-bootstrap";

const ChatContainer = ({chatHistory, setChats, activeTab, chats }) => {
    const [displayResponse, setDisplayResponse] = useState("");
    const [completedTyping, setCompletedTyping] = useState(false);
    const [fontSize, setFontSize] = useState(1);
    const [fontMargin, setMargin] = useState(5);
    const [error, setError] = useState();

    useEffect(() => {
        if (!chatHistory?.length) {
            return;
        }

        setCompletedTyping(false);

        let i = 0;
        const stringResponse = chatHistory[chatHistory.length - 1]?.content;

        const intervalId = setInterval(() => {
            setDisplayResponse(stringResponse.slice(0, i));
            i++;

            if (i > stringResponse.length) {
                clearInterval(intervalId);
                setCompletedTyping(true);
            }
        }, 2);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatHistory.length]);

    const resetButton = () => {
        let x = [...chats];
        x[activeTab] = [];
        setChats(x);
        setError(""); // reset error messages
    };

    return (
        <div className="container-chat">
            <div className="toolbar">
                <div
                    style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                >
                    <p className="toolbar-title">Font size</p>
                    <div className="button-symbol" onClick={() => setFontSize(fontSize * 1.1)}>+</div>
                    <div className="button-symbol" onClick={() => setFontSize(fontSize * .9)}>-</div>
                </div>
                <div
                    style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                >
                    <p className="toolbar-title">Margin</p>
                    <div className="button-symbol" onClick={() => setMargin(fontMargin * 1.2)}>+</div>
                    <div className="button-symbol" onClick={() => setMargin(fontMargin * .8)}>-</div>
                </div>
                <Button className='reset-button' variant="outline-danger" onClick={() => resetButton()}>Reset text</Button>
            </div>

            <div className="force-overflow"></div>
            {chatHistory?.map((message, messageIndex) => (
                <div key={messageIndex}>
                    {message?.role === "user" && (
                        <div className="chat-end">
                            <p style={{
                                whiteSpace: "pre-line",
                                padding: ".1rem",
                                fontSize: fontSize + "rem",
                                marginLeft: fontMargin + "rem",
                                marginRight: fontMargin + "rem"
                            }}>
                                {message?.content}
                            </p>
                        </div>
                    )}
                    {messageIndex === chatHistory.length - 1 && message?.role === "assistant" && (
                        <div className="chat-start">
                            <p style={{
                                whiteSpace: "pre-line",
                                padding: ".1rem",
                                fontSize: fontSize + "rem",
                                marginLeft: fontMargin + "rem",
                                marginRight: fontMargin + "rem"
                            }}>
                                {displayResponse}
                                {!completedTyping && <CursorSVG />}
                            </p>
                        </div>
                    )}
                    {message?.role === "assistant" &&
                        messageIndex !== chatHistory.length - 1 && (
                            <div className="chat-start">
                                <p style={{
                                    whiteSpace: "pre-line",
                                    padding: ".1rem",
                                    fontSize: fontSize + "rem",
                                    marginLeft: fontMargin + "rem",
                                    marginRight: fontMargin + "rem"
                                }}>
                                    {message?.content}
                                </p>
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
};

export default ChatContainer;