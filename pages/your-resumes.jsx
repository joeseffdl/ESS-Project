import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import { toast } from "react-toastify"
import AppNavigation from "../components/AppNavigation"
import UserResumes from "../components/UserResumes"
import { auth, db } from "../utils/firebase"

function YourResumes() {
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

    // User Resumes
    const [userResumes, setUserResumes] = useState([])

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

    // Delete Resume
    const deleteResume = async (id) => {
        const docRef = doc(db, 'resumes', id)
        await deleteDoc(docRef)
        toast.success("Resume deleted successfully")
    }

    useEffect(() => {
        getData()
        if (!loading) {
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
                <div className="btn btn-secondary btn-outline my-1 w-full">
                    <Link href={`${Links[0].resumes}`}>
                        All Resumes
                    </Link>
                </div>
                <div
                    disabled={userResumes.length == 0}
                    className="btn btn-secondary  my-1 w-full">
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
                    Your Resumes
                </h2>
                <div className="bg-white p-5 rounded-2xl divide-y-2">
                    <div className="flex justify-between md:grid md:grid-cols-3 items-center font-bold text-sm text-neutral-focus
                        sm:text-base md:text-lg lg:text-xl">
                        <div className="pl-2 ">Resume Template</div>
                        <div className="col-span-2 w-1/2 md:w-full">
                            <div className="flex justify-center items-center md:grid md:grid-cols-3 md:justify-items-center ">
                                <div className="hidden md:block">Owner</div>
                                <div className="hidden md:block">Created</div>
                                <div className="pr-2">Actions</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {userResumes.map((resume) => (
                            <>
                                <UserResumes {...resume} key={resume.id}>
                                    <div className="flex gap-1">
                                        <Link href={{
                                            pathname: `/${resume.id}`}}>
                                            <button className="hover:scale-110 hover:text-sky-600"><AiFillEye /></button>
                                        </Link>
                                        <Link href={{ pathname: `${Links[0].template}/${resume.type}/${[query.id]}`, query: { id: resume.id } }}>
                                            <button className="hover:scale-110 hover:text-amber-600"><AiFillEdit /></button>
                                        </Link>
                                        <Link href={`${Links[0].resumes}`}>
                                            <button className="hover:scale-110 hover:text-red-600" onClick={() => deleteResume(resume.id)}><AiFillDelete /></button>
                                        </Link>
                                        </div>
                                </UserResumes>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default YourResumes;

YourResumes.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}