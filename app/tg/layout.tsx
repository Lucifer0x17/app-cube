"use client"
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicContextProvider } from "../../lib/dynamic";;
import React from 'react'

const dynEnv = "563e0d9c-0c48-4afe-bafd-11ab2a1309aa";

const layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <DynamicContextProvider settings={{
            environmentId: dynEnv,
            walletConnectors: [EthereumWalletConnectors]
        }}>
            {children}
        </DynamicContextProvider>
    )
}

export default layout