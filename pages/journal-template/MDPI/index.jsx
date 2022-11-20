import AppNavigation from "../../../components/AppNavigation"
import InputTemplate from "../../../components/InputTemplate"
import OutputTemplate from "../../../components/OutputTemplate"
import InputMDPI from "../../../components/MDPI/InputMDPI"
import OutputMDPI from "../../../components/MDPI/OutputMDPI"
import { useRouter } from "next/router"
import { auth, db } from "../../../utils/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect, useContext } from "react"
import DataContext from '../../../context/DataContext'
import { toast } from "react-toastify"
import validator from "validator"
import Latex from "react-latex"


function MDPI() {
    // Data Context
    const { completedSteps, setCompletedSteps, journalValues, setJournalValues } = useContext(DataContext)

    // Use State
    const [journal, setJournal] = useState({
        title: journalValues.title,
        description: journalValues.description
    })
    let { step } = completedSteps

    // Router
    const router = useRouter()

    // Handle user
    const [user, loading] = useAuthState(auth)

    // Handle change 
    const handleChange = (e) => {
        const {name, value} = e.target
        setJournal((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Submit Journal
    const submitJournal = async (e) => {
        e.preventDefault()

        if (validator.isEmpty(journal.title)) {
            toast.error("Please enter a journal title 😞")
            return
        } 

        try {
            const collectionRef = collection(db, "journals")
            await addDoc(collectionRef, {
                ...journal,
                createdOn: serverTimestamp(),
                user: user.uid,
                username: user.displayName,
                avatar: user.photoURL,
            })
            setCompletedSteps({ step: ++step })
        }
        catch (err) {
            console.log(err)
        }
    }

    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Get users data
    useEffect(() => {
        getData()
        setJournalValues({ ...journal })
    }, [user, loading, journal])

    return (
        <div className="w-full flex">
            <InputTemplate>
                <InputMDPI>
                    <form onSubmit={submitJournal} className="form-control gap-2 w-full ">
                        <input
                            className="input "
                            placeholder="Title"
                            value={journal.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <textarea
                            className="textarea "
                            placeholder="Description"
                            value={journal.description}
                            name="description"
                            onChange={handleChange}
                        />
                        <button type="submit" className="btn btn-sm btn-outline">Submit</button>
                    </form>
                </InputMDPI>
            </InputTemplate>
            <OutputTemplate>
                <OutputMDPI />
            </OutputTemplate>
        </div>
    )
}

export default MDPI

MDPI.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}