"use client";

import React, { useState } from "react";
import "./PopupChat.css";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import useStore from "../../store/useStore";

const PopupChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const messages = useStore((state: any) => state.messages);
    const inputMessage = useStore((state: any) => state.inputMessage);
    const setInputMessage = useStore((state: any) => state.setInputMessage);
    const handleSendMessage = useStore((state: any) => state.handleSendMessage);

    return (
        <div className="popup-chat">
            {!isOpen ? (
                <button className="chat-toggle" onClick={() => setIsOpen(true)}>
                    <span role="img" aria-label="chat" className="chat-icon">
                        💬
                    </span>
                </button>
            ) : (
                <div className="chat-window">
                    <ChatHeader onClose={() => setIsOpen(false)} />
                    <MessageList messages={messages} />
                    <ChatInput
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            )}
        </div>
    );
};

export default PopupChat;
