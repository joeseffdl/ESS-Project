import AppNavigation from "../components/AppNavigation"
import ProjectsCollection from "../components/ProjectsCollection"
import Link from 'next/link'
import { useRouter } from "next/router"
import { auth, db } from "../utils/firebase"
import { collection, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"

function Projects() {
    // Router
    const router = useRouter()

    // All Projects
    const [allProjects, setAllProjects] = useState([])

    const getProjects = async () => {
        const collectionRef = collection(db, 'journals')
        const q = query(collectionRef, orderBy('createdOn', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllProjects(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

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
        getProjects()
    }, [user, loading])

    return (
        <section className="w-full flex justify-center items-center">
            <section className="w-1/3 h-screen hidden mx-5 my-10 p-5 bg-neutral-focus rounded-xl
                sm:flex sm:flex-col items-center sm:mr-0
                md:w-1/4 md:ml-10
                lg:w-1/5"
            >
                <div className="btn btn-secondary btn-outline my-3 w-full">
                    <Link href="/journal-template">
                        New Project
                    </Link>
                </div>
                <div className="btn btn-secondary my-1 w-full">
                    <Link href="/projects">
                        All Projects
                    </Link>
                </div>
                <div disabled className="btn btn-secondary my-1 w-full">Your Projects</div>
            </section>
            <section className="w-full h-screen mx-5 my-10 p-5 bg-neutral-focus rounded-xl
                sm:w-2/3 
                md:3/4 md:mr-10 md:p-10
                lg:w-4/5"
            >
                <h2 className="text-white text-xl font-bold p-2
                    sm:text-2xl sm:mt-5
                    md:text-3xl md:mb-5
                    lg:text-4xl"
                >
                    Projects Overview
                </h2>
                <div className="bg-white p-5 rounded-2xl divide-y-2">
                    <div className="grid grid-cols-3 items-center font-bold text-sm text-neutral-focus
                        sm:text-base md:text-lg lg:text-xl">
                        <div className="pl-2 truncate">Project Title</div>
                        <div className="col-span-2">
                            <ul className="grid grid-cols-3 justify-items-center items-center">
                                <li className="">Owner</li>
                                <li className="">Created</li>
                                <li className="pr-2">Actions</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {allProjects.map((project) => (
                            <>
                                <ProjectsCollection {...project} />
                            </>

                            
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Projects;

Projects.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}