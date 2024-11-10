"use client";

import React, { useEffect, useState } from "react";
import { Nanum_Pen_Script } from "next/font/google";

import {
    DynamicWidget,
    useAuthenticateConnectedUser,
    useDynamicContext,
} from "@/lib/dynamic";
import Spinner from "@/components/Spinner";
import UrlInput from "@/components/UrlInput";
import Image from "next/image";
import { useRouter } from "next/navigation";

const nanum_pen_script = Nanum_Pen_Script({
    weight: "400",
    subsets: ["latin"],
});

const Home = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const { sdkHasLoaded, user, } = useDynamicContext()
    const { isAuthenticating } = useAuthenticateConnectedUser();

    // useEffect(() => {
    //     if (!sdkHasLoaded) return
    //     if (user) setIsLoading(false)
    //     setIsLoading(true)

    // }, [user, sdkHasLoaded])
    return (
        <div className="size-full flex flex-col justify-between items-center min-h-screen overflow-y-scroll">
            <div>{isAuthenticating ? <Spinner /> : <DynamicWidget />}</div>
            <div className="w-full">
                <UrlInput />
            </div>
            <div className="flex justify-end gap-3 w-[90%] mx-auto items-end">
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
                <div
                    className="bg-[#F0B90B] rounded-full p-3"
                    onClick={() => router.push("/chat")}
                >
                    <Image
                        src="./chat-bot.svg"
                        alt="chat-icon"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
