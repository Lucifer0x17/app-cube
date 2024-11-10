"use client"
import React, { useEffect, useState } from 'react'
import { DynamicWidget, useAuthenticateConnectedUser, useDynamicContext } from "../../lib/dynamic";
import Spinner from '@/components/Spinner';
import { createTransaction } from '@/utils/brian';

const Page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const { sdkHasLoaded, user, } = useDynamicContext()
    const { isAuthenticating } = useAuthenticateConnectedUser()

    const handleBrain = async () => {
        const data = await createTransaction("Can you please transfer 100 USDC to megabyte0x.eth on Bnb", "0xa35CA8C065841dee7853C18bD9036B5A74f5988A")

        console.log(data)
    }

    // useEffect(() => {
    //     if (!sdkHasLoaded) return
    //     if (user) setIsLoading(false)
    //     setIsLoading(true)

    // }, [user, sdkHasLoaded])
    return (
        <>
            {isAuthenticating ? <Spinner /> : <DynamicWidget />}
            <button onClick={handleBrain}>Test Brian</button>
        </>
    )
}

export default Page