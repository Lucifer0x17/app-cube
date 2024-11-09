import Image from "next/image";
import { useState } from "react";

export default function UrlInput() {
    const [url, setUrl] = useState("");
    const [iframeUrl, setIframeUrl] = useState("");

    const loadWebsite = () => {
        setIframeUrl(url.startsWith("http") ? url : `https://${url}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            loadWebsite();
        }
    };

    return (
        <>
            {iframeUrl ? (
                <div className="flex flex-col gap-4 bg-gradient-to-b from-[#3A3A3A5C] to-[#7373735C] w-[90%] px-3 pb-3 pt-5 text-center rounded-xl border border-[#343434]">
                    <div
                        className="flex justify-end w-full cursor-pointer"
                        onClick={() => window.location.reload()}
                    >
                        <Image
                            src="./close.svg"
                            alt="close"
                            width={20}
                            height={20}
                        />
                    </div>
                    <iframe
                        src={iframeUrl}
                        title="Website Viewer"
                        style={{
                            width: "100%",
                            height: "600px",
                            marginTop: "20px",
                        }}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-4 bg-[#1C1C1CAD] w-[90%] px-10 py-8 text-center rounded-xl border border-[#343434]">
                    <h2 className="text-[#F0B90B] font-semibold text-base">
                        Type or Paste the URL
                    </h2>
                    <input
                        type="url"
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="https://app.uniswap.org/swap"
                        className="bg-[#3B3B3B] placeholder:text-[#747474] text-[#747474] rounded-[5px] px-3 py-2 text-xs focus:outline-none"
                    />
                </div>
            )}
        </>
    );
}
