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
        <div
            className="min-h-screen flex flex-col items-center justify-center text-black overflow-y-scroll"
            style={{
                backgroundColor: "#001afc",
                backgroundBlendMode: "overlay",
                backgroundRepeat: "repeat",
            }}
        >
            <div className="min-h-screen max-w-screen-sm w-[35%]">
                <div className="bg-[#000] pb-5">
                    <div className="flex flex-col justify-center items-center h-screen w-full">
                        <UrlInput />
                    </div>
                    <div className="w-[95%]">
                        <div className="flex justify-end gap-3">
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
                    </div>
                </div>
                <div className="flex justify-center py-4">
                {isLoading ? <Spinner /> : <DynamicWidget />}
                </div>
            </div>
        </div>
    );
}
