import React, { useEffect, useState } from "react";
import CursorSVG from "./CursorSVG";

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
}, [chatHistory.length]);

return (
<div className="max-h-0">
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
    </div>
);
}

export default ChatContainer;