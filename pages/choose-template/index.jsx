import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import AppNavigation from "../../components/AppNavigation"
import { auth } from "../../utils/firebase"

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
        <section className="w-screen bg-gradient-to-t from-neutral to-primary">
            <section className="flex flex-col pb-16">
                {/* <div className="border-4 border-accent bg-neutral-focus mx-10 pb-20 mb-20 drop-shadow-md rounded-xl
                sm:px-10 md:mx-12 "> */}
                <div className="h-32 flex items-center justify-center font-extrabold">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl text-gray-900">Gallery - Academic Journal</h2>
                </div>
                <div className="w-full flex flex-wrap justify-center gap-10 
                    lg:px-8">
                    {templates.map((template) => {
                        return (
                            <>
                                <Link href={`${template.route}`} >
                                    <div className="mx-auto drop-shadow-xl w-72 h-96"
                                        key={template.name}>
                                        {/* h-64 sm:w-68 sm:h-68 md:w-72 md:h-72 xl:w-80 xl:h-80 */}
                                        {/* <Image
                                            className="object-cover rounded-xl border-2 border-accent hover:border-accent-focus hover:scale-105 ease-in-out duration-150" 
                                            src={`/${template.image}.jpg`}
                                            alt={`${template.name} image`}
                                            height={100}
                                            width={75}
                                        /> */}
                                        <div className="w-full h-full bg-gradient-to-b from-primary-focus to-secondary-focus rounded-xl border-2 border-accent hover:border-accent-focus hover:scale-105 ease-in-out duration-150">
                                            <div className="card-body">
                                                <h2 className="card-title justify-center">{template.name}</h2>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            </>
                        )
                    })}
                </div>
                {/* </div> */}
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