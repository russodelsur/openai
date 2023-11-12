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

let i = 0;
const stringResponse = chatHistory[chatHistory.length - 1]?.content;

const intervalId = setInterval(() => {
setDisplayResponse(stringResponse.slice(0, i));
i++;

if (i > stringResponse.length) {
clearInterval(intervalId);
setCompletedTyping(true);
}
}, 5);

return () => clearInterval(intervalId);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [chatHistory.length]);

return (
<Container className="container-chat">
    <div className="force-overflow"></div>
    {chatHistory?.map((message, messageIndex) => (
    <div key={messageIndex}>
        {message?.role === "user" && (
        <div className="chat-end">
        <p style={{whiteSpace:"pre-line", padding:".1rem"}}>
        {message?.content}
        </p>
        </div>
        )}
        {messageIndex === chatHistory.length - 1 && message?.role === "assistant" && (
        <div className="chat-start">
        <p style={{whiteSpace:"pre-line", padding:"2rem"}}>
        {displayResponse}
        {!completedTyping && <CursorSVG />}
        </p>
        </div>
        )}
            {message?.role === "assistant" &&
            messageIndex !== chatHistory.length - 1 && (
            <div className="chat-start">
                    <p style={{whiteSpace:"pre-line", padding:"2rem"}}>
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