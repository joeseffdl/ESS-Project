import AppNavigation from "../components/AppNavigation"
import UserJournals from "../components/UserJournals"
import Link from 'next/link'
import { useRouter } from "next/router"
import { auth, db } from "../utils/firebase"
import { collection, query, orderBy, onSnapshot, where, doc, deleteDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"
import { AiFillEdit, AiFillDelete, AiFillEye } from 'react-icons/ai'
import { toast } from "react-toastify"

function YourJournals() {
    // Router
    const router = useRouter()

    // Handle user
    const [user, loading] = useAuthState(auth)

    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // User Projects
    const [userJournals, setUserJournals] = useState([])

    const getUserJournals = async () => {
        const collectionRef = collection(db, 'journals')
        const q = query(collectionRef, where("user", "==", user.uid), orderBy('createdOn', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUserJournals(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

    // Delete Journal
    const deleteJournal = async (id) => {
        const docRef = doc(db, 'journals', id)
        await deleteDoc(docRef)
        toast.success("Journal deleted successfully")
    }

    useEffect(() => {
        getData()
        if (!loading) {
            getUserJournals()
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
                    <Link href="/journal-template">
                        New Journal
                    </Link>
                </div>
                <div className="btn btn-secondary btn-outline my-1 w-full">
                    <Link href="/journals">
                        All Journals
                    </Link>
                </div>
                <div
                    disabled={userJournals.length == 0}
                    className="btn btn-secondary my-1 w-full">
                    <Link href="/your-journals">
                        Your Journals {userJournals.length >= 1 ? (`(${userJournals.length})`) : null}
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
                    Your Projects
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
                        {userJournals.map((journal) => (
                            <>
                                <UserJournals {...journal} key={journal.id}>
                                    <div className="flex gap-1">
                                        <Link href={{ pathname: `/${journal.id}`, query: { ...journal } }}>
                                            <button className="hover:scale-110 hover:text-sky-600" onClick={() => console.log("View")}><AiFillEye /></button>
                                        </Link>
                                        <Link href={{ pathname: `/journal-template/${journal.template}`, query: journal }}>
                                            <button className="hover:scale-110 hover:text-amber-600" onClick={() => console.log("Edit")}><AiFillEdit /></button>
                                        </Link>
                                        <Link href={`/your-journals`}>
                                            <button className="hover:scale-110 hover:text-red-600" onClick={() => deleteJournal(journal.id)}><AiFillDelete /></button>
                                        </Link>
                                        </div>
                                </UserJournals>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default YourJournals;

YourJournals.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}