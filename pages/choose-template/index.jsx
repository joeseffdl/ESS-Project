import AppNavigation from "../../components/AppNavigation"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { auth } from "../../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"

function Templates() {
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

    const templates = [
        { name: "RESUME", image: "Sample", route:"/choose-template/Resume" },
        { name: "Template 2", image: "Sample", route:"/choose-template" },
        { name: "Template 3", image: "Sample", route: "/choose-template" },
        { name: "Template 4", image: "Sample", route: "/choose-template" },
        { name: "Template 5", image: "Sample", route: "/choose-template" },
        { name: "Template 6", image: "Sample", route: "/choose-template" },
        { name: "Template 7", image: "Sample", route: "/choose-template" },
        { name: "Template 8", image: "Sample", route: "/choose-template" },
        { name: "Template 9", image: "Sample", route: "/choose-template" },
    ]

    return (
        <section className="w-screen">
            <section className="flex flex-col">
                <div className="h-32 flex items-center justify-center font-bold">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl text-secondary">Gallery - Academic Journal</h2>
                </div>
                <div className="border-4 border-primary bg-neutral mx-10 mb-20 py-10 drop-shadow-md rounded-xl
                sm:px-10 md:mx-12 lg:py-20">
                    <div className="
                        w-full
                        grid justify-items-center 
                        gap-10 md:gap-16   
                        sm:grid-cols-2 lg:grid-cols-3
                        ">
                        {templates.map((template) => {
                            return (
                                <>
                                    <Link href={`${template.route}`} >
                                        <div className="card image-full hover:border-secondary hover:border hover:scale-105 ease-in-out duration-150
                                            mx-10 rounded-xl drop-shadow-xl
                                            w-60 h-60 sm:w-68 sm:h-68 md:w-72 md:h-72 xl:w-80 xl:h-80"
                                        key={template.name}>
                                            <Image
                                                className="object-cover rounded-xl border-2 border-secondary " 
                                                src={`/${template.image}.jpg`}
                                                alt={`${template.name} image`}
                                                fill
                                            />
                                            <div className="card-body">
                                                <h2 className="card-title justify-center">{template.name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        })}
                    </div>
                    {/* <div className="mt-10 mx-auto ">
                        <button className="btn btn-outline btn-accent">Create first project</button>
                    </div> */}
                </div>
            </section>
        </section>
    )
}

export default Templates;

Templates.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}