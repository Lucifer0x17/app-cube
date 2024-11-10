"use client";

import React, { useCallback } from "react";
import useStore from "../../store/useStore";
import "./ChatbotScreen.css";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import { createTransaction } from "@/utils/brian";
import { exectueTransaction } from "@/utils/txn";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

// Split into smaller components
const ChatHistoryItem = ({ conversation, isActive, onClick }: any) => (
    <div
        className={`chat-history-item ${isActive ? "active" : ""}`}
        onClick={onClick}
    >
        <div className="chat-title">{conversation.title}</div>
        <div className="chat-preview">{conversation.preview}</div>
    </div>
);

const ChatMessages = ({ messages, steps, executeClickHandler }: any) => (
    <div className="messages-container" >
        {
            messages.map((message: any, index: any) => (
                <div
                    key={index}
                    className={`message ${message.isBot ? "bot" : "user"}`}
                >
                    <h3>{message.text}</h3>

                    {(messages.length == index + 1) && (steps?.length) ? <button onClick={() => { executeClickHandler(steps) }} className="bg-[#f0b90b] px-[12px] py-[6px] rounded-md">Execute</button> : ""}
                </div>
            ))
        }
    </div >
);

function ChatbotScreen() {
    const conversations = useStore((state: any) => state.conversations);
    const activeConversationId = useStore(
        (state) => state.activeConversationId
    );
    const { primaryWallet } = useDynamicContext()
    const setActiveConversation = useStore(
        (state) => state.setActiveConversation
    );
    const addNewConversation = useStore((state) => state.addNewConversation);
    const inputMessage = useStore((state) => state.inputMessage);
    const setInputMessage = useStore((state) => state.setInputMessage);
    const handleSendMessage = useStore((state) => state.handleSendMessage);
    const isLoading = useStore((state) => state.isLoading);
    const steps = useStore((state) => state.steps)
    // const resetSteps = useStore((state) => state.setStepReset)
    // console.log("steps" + steps);

    const activeConversation = conversations.find(
        (c: any) => c.id === activeConversationId
    );

    const handleConversationClick = useCallback(
        (id: any) => {
            setActiveConversation(id);
        },
        [setActiveConversation]
    );

    const executeClickHandler = async (steps: any) => {
        if (!primaryWallet) return
        console.log("clicked", primaryWallet)
        const hash = await exectueTransaction(steps, primaryWallet)
        console.log(hash)
        // resetSteps();
        // console.log(steps)
    }

    return (
        <div className="chatbot-screen">
            {/* <div className="chat-history">
                <button
                    className="new-chat-button"
                    onClick={addNewConversation}
                >
                    New Chat
                </button>
                {conversations.map((conversation: any) => (
                    <ChatHistoryItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={conversation.id === activeConversationId}
                        onClick={() => handleConversationClick(conversation.id)}
                    />
                ))}
            </div> */}
            <div className="chat-main">
                <div className="chat-messages">
                    <ChatMessages
                        messages={activeConversation?.messages || []}
                        steps={steps}
                        executeClickHandler={executeClickHandler}
                    />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !isLoading &&
                            handleSendMessage()
                        }
                        disabled={isLoading}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading}>
                        <div
                            className={`button-content ${isLoading ? "loading" : ""
                                }`}
                        >
                            {isLoading ? (
                                <LoadingSpinner size="small" />
                            ) : (
                                "Send"
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatbotScreen;
