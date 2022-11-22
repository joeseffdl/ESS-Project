import AppNavigation from "../../../components/AppNavigation"
import InputTemplate from "../../../components/InputTemplate"
import OutputTemplate from "../../../components/OutputTemplate"
import InputMDPI from "../../../components/MDPI/InputMDPI"
import OutputMDPI from "../../../components/MDPI/OutputMDPI"
import FormWindow from "../../../components/FormWindow"
import { useRouter } from "next/router"
import { auth, db } from "../../../utils/firebase"
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore"
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
        title: "",
        description: ""
    })
    let { step } = completedSteps

    // Router
    const router = useRouter()
    const routeData = router.query

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
            if (journal?.hasOwnProperty("id")) {
                const docRef = doc(db, "journals", journal.id)
                const updatedJournal = {
                    ...journal,
                    timestamp: serverTimestamp()
                }
                await updateDoc(docRef, updatedJournal)
                setCompletedSteps({ step: ++step })
            }
            else {
                const collectionRef = collection(db, "journals")
                await addDoc(collectionRef, {
                    ...journal,
                    createdOn: serverTimestamp(),
                    user: user.uid,
                    username: user.displayName,
                    avatar: user.photoURL,
                    template: "MDPI",
                })
                setCompletedSteps({ step: ++step })
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
        if (routeData.id) {
            setCompletedSteps({step: 1})
            setJournal({
                id: routeData.id,
                title: routeData.title,
                description: routeData.description,
            })
        }
    }


    // Get users data
    useEffect(() => {
        getData()
        setJournalValues({ ...journal })
    }, [user, loading])

    return (
        <div className="w-full flex">
            <InputTemplate>
                <InputMDPI>
                    {
                        (() => {
                            if (step == 1) {
                                return (
                                    <FormWindow onSubmit={submitJournal} formTitle={journal.hasOwnProperty("id") ? "Edit Journal" : "Generate Journal"}>
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
                                    </FormWindow>
                                )
                            }
                            else if (step == 2) {
                                return (
                                    <FormWindow onSubmit={submitJournal} formTitle="Page 2">
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
                                    </FormWindow>
                                )
                            }
                            else if (step == 3) {
                                return (
                                    <FormWindow onSubmit={submitJournal} formTitle="Page 3">
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
                                    </FormWindow>
                                )
                            }
                            else {
                                return (
                                    <>
                                        <div>Failed</div>
                                    </>
                                )
                            }
                        })()
                    }
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