import React from "react";

const MessageList = ({ messages }: any) => (
    <div className="messages-container">
        {messages.map((message: any, index: any) => (
            <div
                key={index}
                className={`message ${message.isBot ? "bot" : "user"}`}
            >
                {message.text}
            </div>
        ))}
    </div>
);

export default MessageList;
