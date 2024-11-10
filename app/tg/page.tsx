"use client"
import React, { useEffect, useState } from 'react'
import { DynamicWidget, useAuthenticateConnectedUser, useDynamicContext } from "../../lib/dynamic";
import Spinner from '@/components/Spinner';

const Page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const { sdkHasLoaded, user, } = useDynamicContext()
    const { isAuthenticating } = useAuthenticateConnectedUser()

    // useEffect(() => {
    //     if (!sdkHasLoaded) return
    //     if (user) setIsLoading(false)
    //     setIsLoading(true)

    // }, [user, sdkHasLoaded])
    return (
        <>
            {isAuthenticating ? <Spinner /> : <DynamicWidget />}
        </>
    )
}

export default Page