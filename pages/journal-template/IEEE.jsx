import AppNavigation from "../../components/AppNavigation"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { auth } from "../../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"

function IEEE() {
    // Router
    const router = useRouter()

    // Handle user
    const [user, loading] = useAuthState(auth)
    
    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Get users data
    useEffect(() => {
        getData()
    }, [user,loading])

    return (
        <>
            IEEE Template
        </>
    )
}

export default IEEE

IEEE.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}