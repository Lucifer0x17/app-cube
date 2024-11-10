"use client"
import ChatbotScreen from "@/components/ChatbotScreen/ChatbotScreen";
import Spinner from "@/components/Spinner";
import { DynamicWidget, useAuthenticateConnectedUser } from "@dynamic-labs/sdk-react-core";

export default function Page() {
    const { isAuthenticating } = useAuthenticateConnectedUser();

    return (
        <div className="h-screen">
            <div>{isAuthenticating ? <Spinner /> : <DynamicWidget />}</div>
            <ChatbotScreen />
        </div>
    );
}
