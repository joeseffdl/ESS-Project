import AppNavigation from "../../../components/AppNavigation"
import InputTemplate from "../../../components/InputTemplate"
import OutputTemplate from "../../../components/OutputTemplate"
import InputResume from "../../../components/Resume/InputResume"
import OutputResume from "../../../components/Resume/OutputResume"
import FormWindow from "../../../components/FormWindow"
import { useRouter } from "next/router"
import { auth, db } from "../../../utils/firebase"
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect, useContext } from "react"
import DataContext from '../../../context/DataContext'
import { toast } from "react-toastify"
import validator from "validator"
import ResumeExperience from "../../../components/Resume/ResumeExperience"
import ResumeEducation from "../../../components/Resume/ResumeEducation"
import ResumeSkills from "../../../components/Resume/ResumeSkills"

function MDPI() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    const [resume, setResume] = useState({
        firstname: "",
        surname: "",
        city: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
        emailAddress: "",
    })
    let { step } = completedSteps

    // Router
    const router = useRouter()
    const routeData = router.query

    // Handle user
    const [user, loading] = useAuthState(auth)

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setResume((prev) => {
            return { ...prev, [name]: value }
        })
        setResumeValues((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Get data from Resume Experience Component
    const getExperienceData = (data) => {
        console.log("Data from Resume Experience", data)
    }

    // Get data from Resume Education Component
    const getEducationData = (data) => {
        console.log("Data from Resume Education", data)
    }

    // Get data from Resume Skills Component
    const getSkillsData = (data) => {
        console.log("Data from Resume Skills", data)
    }

    // Continue to Experience section
    const toResumeExperience = () => {
        if (validator.isEmpty(resume.emailAddress)) {
            toast.error("Please enter an Email Address😞")
            return
        }
        setCompletedSteps({ step: ++step })
    }


    // Submit Journal
    const submitResume = async (e) => {
        e.preventDefault()

        try {
            if (resume?.hasOwnProperty("id")) {
                const docRef = doc(db, "resumes", resume.id)
                const updatedJournal = {
                    ...resume,
                    timestamp: serverTimestamp()
                }
                await updateDoc(docRef, updatedJournal)
                setCompletedSteps({ step: ++step })
            }

            else if (step == 1) {
                toResumeExperience()
            }
            else {
                const collectionRef = collection(db, "resumes")
                await addDoc(collectionRef, {
                    ...resume,
                    createdOn: serverTimestamp(),
                    user: user.uid,
                    username: user.displayName,
                    avatar: user.photoURL,
                    type: "Resume",
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
            setCompletedSteps({ step: 1 })
            setResume((prev) => {
                return {
                    ...prev,
                    id: routeData.id,
                    firstname: routeData.firstname,
                    surname: routeData.surname,
                    city: routeData.city,
                    country: routeData.country,
                    postalCode: routeData.postalCode,
                    phoneNumber: routeData.phoneNumber,
                    emailAddress: routeData.emailAddress,
                }
            })
        }
    }

    // Get users data
    useEffect(() => {
        getData()
        setResumeValues({ ...resume })
    }, [user, loading])

    return (
        <div className="w-full flex">
            <InputTemplate>
                <InputResume>
                    {
                        (() => {
                            if (step == 1) {
                                return (
                                    <FormWindow onSubmit={submitResume} formTitle={resume.hasOwnProperty("id") ? "Editing Resume Header" : "Header"}>
                                        <input
                                            className="input "
                                            type="text"
                                            placeholder="First Name"
                                            value={resume.firstname}
                                            name="firstname"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="input "
                                            type="text"
                                            placeholder="Surname"
                                            value={resume.surname}
                                            name="surname"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="input "
                                            type="text"
                                            placeholder="City/Municipality"
                                            value={resume.city}
                                            name="city"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="input "
                                            type="text"
                                            placeholder="Country"
                                            value={resume.country}
                                            name="country"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="input "
                                            type="text"
                                            placeholder="Postal Code"
                                            value={resume.postalCode}
                                            name="postalCode"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="input "
                                            type="number"
                                            placeholder="Phone Number"
                                            value={resume.phoneNumber}
                                            name="phoneNumber"
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="input "
                                            type="email"
                                            placeholder="Email Address"
                                            value={resume.emailAddress}
                                            name="emailAddress"
                                            onChange={handleChange}
                                        />
                                        <div className="btn-group justify-between">
                                            <button disabled className="btn btn-sm btn-outline">Back</button>
                                            <button type="submit" className="btn btn-sm btn-outline">Continue</button>
                                        </div>
                                    </FormWindow>
                                )
                            }
                            else if (step == 2) {
                                return (
                                    <ResumeExperience onSubmit={getExperienceData} />
                                )
                            }
                            else if (step == 3) {
                                return (
                                    <ResumeEducation onSubmit={getEducationData} />
                                )
                            }
                            else if (step == 4) {
                                return (
                                    <ResumeSkills onSubmit={getSkillsData} />
                                )
                            }
                            else if (step == 5) {
                                return (
                                    <>
                                        More Section
                                    </>
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
                </InputResume>
            </InputTemplate>
            <OutputTemplate>
                <OutputResume />
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