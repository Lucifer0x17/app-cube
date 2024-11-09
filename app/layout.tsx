import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import {
    DynamicContextProvider,
    EthereumWalletConnectors,
    SolanaWalletConnectors,
} from "../lib/dynamic";

import { GlobalWalletExtension } from "@dynamic-labs/global-wallet";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "App Cube",
    description: "Generated by create next app",
};
const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (!dynamicEnvId) {
        const errMsg =
            "Please add your Dynamic Environment to this project's .env file";
        console.error(errMsg);
        throw new Error(errMsg);
    }
    return (
        <html lang="en">
            <DynamicContextProvider
                settings={{
                    environmentId: dynamicEnvId,
                    walletConnectors: [
                        EthereumWalletConnectors,
                        SolanaWalletConnectors,
                    ],
                    walletConnectorExtensions: [GlobalWalletExtension],
                }}
            >
                <body className={dm_sans.className}>{children}</body>
            </DynamicContextProvider>
        </html>
    );
}
