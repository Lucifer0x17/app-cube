"use client";

import { Nanum_Pen_Script } from "next/font/google";

import { useEffect, useState } from "react";
import {
    DynamicWidget,
    useTelegramLogin,
    useDynamicContext,
} from "../lib/dynamic";

import Spinner from "./Spinner";
import UrlInput from "@/components/UrlInput";
import Image from "next/image";

const nanum_pen_script = Nanum_Pen_Script({
    weight: "400",
    subsets: ["latin"],
});

export default function Main() {
    const { sdkHasLoaded, user } = useDynamicContext();
    const { telegramSignIn } = useTelegramLogin();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!sdkHasLoaded) return;

        const signIn = async () => {
            if (!user) {
                await telegramSignIn({ forceCreateUser: true });
            }
            setIsLoading(false);
        };

        signIn();
    }, [sdkHasLoaded]);

    return (
        <div className="size-full flex flex-col justify-center items-center min-h-screen relative overflow-y-scroll">
            <div className="w-full">
                <UrlInput />
            </div>
            <div className="flex justify-end gap-3 w-[90%] mx-auto items-end absolute bottom-0 right-0">
                <p
                    className={`text-[#808080] text-2xl ${nanum_pen_script.className}`}
                >
                    Here is your AI Friend
                </p>
                <Image
                    src="./HandArrowRight.svg"
                    alt="right-arrow"
                    width={50}
                    height={50}
                />
                <div className="bg-[#F0B90B] rounded-full p-3">
                    <Image
                        src="./chat-bot.svg"
                        alt="chat-icon"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            {/* <div className="flex justify-center py-4">
                    {isLoading ? <Spinner /> : <DynamicWidget />}
                </div> */}
        </div>
    );
}
