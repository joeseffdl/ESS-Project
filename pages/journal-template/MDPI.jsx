import AppNavigation from "../../components/AppNavigation"
import BaseTemplate from "../../components/BaseTemplate"
import InputMDPI from "../../components/InputMDPI"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { auth, db } from "../../utils/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect, useContext } from "react"
import DataContext from '../../context/DataContext'


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

    // Submit Journal
    const submitJournal = async (e) => { 
        e.preventDefault()

        try {
            const collectionRef = collection(db, "journals")
            await addDoc(collectionRef, {
                ...journal,
                createdOn: serverTimestamp(),
                user: user.uid,
                username: user.displayName,
                avatar: user.photoURL,
            })
            setJournalValues({ ...journal })
            setCompletedSteps({step: ++step})
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
    }, [user,loading])

    return (
        <>
            <BaseTemplate>
                <InputMDPI>
                    <form onSubmit={submitJournal} className="form-control gap-2 w-full max-w-lg">
                        <textarea
                            className="textarea "
                            placeholder="Input here"
                            value={journal.description}
                            onChange={(e) => setJournal( {...journal, description: e.target.value} )}
                        />
                        <button type="submit" className="btn btn-outline">Submit</button>
                    </form>
                </InputMDPI>
            </BaseTemplate>
        </>
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