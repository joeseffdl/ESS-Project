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
import ResumeProfileSummary from "../../../components/Resume/ResumeProfileSummary"
import ResumeProfile from "../../../components/Resume/ResumeProfile"

function Resume() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    const [resumeData, setResumeData] = useState({
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

    // Get data from Resume Profile Component
    const getProfileData = (data) => {
        // console.log("Data from Resume Profile", data)
    }
    
    // Get data from Resume Experience Component
    const getExperienceData = (data) => {
        // console.log("Data from Resume Experience", data)
    }

    // Get data from Resume Education Component
    const getEducationData = (data) => {
        // console.log("Data from Resume Education", data)
    }

    // Get data from Resume Skills Component
    const getSkillsData = (data) => {
        // console.log("Data from Resume Skills", data)
    }

    // Submit Resume
    const submitResume = async (e) => {
        e.preventDefault()

        try {
            if (resumeData?.hasOwnProperty("id")) {
                const docRef = doc(db, "resumes", resumeData.id)
                const updatedJournal = {
                    ...resumeData,
                    timestamp: serverTimestamp()
                }
                await updateDoc(docRef, updatedJournal)
                setCompletedSteps({ step: ++step })
            }
            else {
                const collectionRef = collection(db, "resumes")
                await addDoc(collectionRef, {
                    ...resumeData,
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
            setResumeData((prev) => {
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
        // setResumeValues({ ...profile })
    }, [user, loading])
    
    console.log(resumeValues)
    return (
        <div className="w-full flex flex-col xl:flex-row">
            <InputTemplate>
                <InputResume>
                    {
                        (() => {
                            if (step == 1) {
                                return (
                                    <ResumeProfile onSubmit={getProfileData} formTitle={resumeData} />
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
                                    <ResumeProfileSummary />
                                )
                            }
                            else if (step > 5) {
                                return (
                                    <>
                                        <div>No more content</div>
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

export default Resume

Resume.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}