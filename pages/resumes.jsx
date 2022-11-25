import AppNavigation from "../components/AppNavigation"
import ResumesCollection from "../components/ResumesCollection"
import Link from 'next/link'
import { useRouter } from "next/router"
import { auth, db } from "../utils/firebase"
import { collection, query, orderBy, onSnapshot, where, doc, deleteDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"
import { AiFillEdit, AiFillDelete, AiFillEye } from 'react-icons/ai'
import { toast } from "react-toastify"

function Resumes() {
    // Router
    const router = useRouter()

    // Handle user
    const [user, loading] = useAuthState(auth)
    
    // Links
    const Links = [
        {
            template: "/choose-template",
            resumes: "/resumes",
            yourResumes: "/your-resumes",
        }
    ]

    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Resumes States
    const [allResumes, setAllResumes] = useState([])
    const [userResumes, setUserResumes] = useState([])

    // Get All Resumes
    const getResumes = async () => {
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, orderBy('createdOn', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllResumes(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

    // Get Logged In User Resumes
    const getUserResumes = async () => {
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, where("user", "==", user.uid), orderBy('createdOn', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUserResumes(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

    // Delete Resumes
    const deleteResume = async (id) => {
        const docRef = doc(db, 'resumes', id)
        await deleteDoc(docRef)
        toast.success("Journal deleted successfully")
    }

    useEffect(() => {
        getData()
        if (!loading) {
            getResumes()
            getUserResumes()
        }
    }, [user, loading])

    return (
        <section className="w-full flex justify-center items-center">
            <section className="w-1/3 h-screen hidden mx-5 my-10 p-5 bg-neutral-focus rounded-xl
                sm:flex sm:flex-col items-center sm:mr-0
                md:w-1/4 md:ml-10
                lg:w-1/5"
            >
                <div className="btn btn-secondary btn-outline my-3 w-full">
                    <Link href={`${Links[0].template}`}>
                        New Resume
                    </Link>
                </div>
                <div className="btn btn-secondary my-1 w-full">
                    <Link href={`${Links[0].resumes}`}>
                        All Resumes
                    </Link>
                </div>
                <div
                    disabled={userResumes.length == 0}
                    className="btn btn-secondary btn-outline my-1 w-full">
                    <Link href={`${Links[0].yourResumes}`}>
                        Your Resumes {userResumes.length >= 1 ? (`(${userResumes.length})`) : null}
                    </Link>
                </div>
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
                    Resumes Overview
                </h2>
                <div className="bg-white p-5 rounded-2xl divide-y-2">
                    <div className="flex justify-between md:grid md:grid-cols-3 items-center font-bold text-sm text-neutral-focus
                        sm:text-base md:text-lg lg:text-xl">
                        <div className="pl-2 ">Resume Title</div>
                        <div className="col-span-2 w-1/2 md:w-full">
                            <div className="flex justify-center items-center md:grid md:grid-cols-3 md:justify-items-center ">
                                <div className="hidden md:block">Owner</div>
                                <div className="hidden md:block">Created</div>
                                <div className="pr-2">Actions</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {allResumes.map((resume) => (
                            <>
                                <ResumesCollection {...resume} key={resume.id}>
                                    {user.uid == resume.user
                                        ? (
                                            <div className="flex gap-1">
                                                <Link href={{pathname:`/${resume.id}`, query:{...resume}}}>
                                                    <button className="hover:scale-110 hover:text-sky-600" onClick={() => console.log("View")}><AiFillEye /></button>
                                                </Link>
                                                <Link href={{ pathname: `/journal-template/${resume.template}`, query: resume }}>
                                                    <button className="hover:scale-110 hover:text-amber-600" onClick={() => console.log("Edit")}><AiFillEdit /></button>
                                                </Link>
                                                <Link href={`/journals`}>
                                                    <button className="hover:scale-110 hover:text-red-600" onClick={() => deleteResume(resume.id)}><AiFillDelete /></button>
                                                </Link>
                                            </div>
                                        )
                                        : (
                                            <div className="flex gap-1">
                                                <button className="hover:scale-110 hover:text-sky-600" onClick={() => console.log("View")}><AiFillEye /></button>
                                            </div>
                                        )
                                    }
                                </ResumesCollection>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Resumes;

Resumes.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}