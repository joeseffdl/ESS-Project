import AppNavigation from "../../../components/AppNavigation"
import { useRouter } from "next/router"
import { resumeDataStore, completedSteps } from "../../../utils/store"
import { auth, db } from "../../../utils/firebase"
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"
import ResumeExperience from "../../../components/Resume/ResumeExperience"
import ResumeEducation from "../../../components/Resume/ResumeEducation"
import ResumeSkills from "../../../components/Resume/ResumeSkills"
import ResumeProfileSummary from "../../../components/Resume/ResumeProfileSummary"
import ResumeProfile from "../../../components/Resume/ResumeProfile"
import { toast } from "react-toastify"
import TemplateContainer from "../../../components/TemplateContainer"
import ResumeCertifications from "../../../components/Resume/ResumeCertifications"
import ResumePortfolios from "../../../components/Resume/ResumePortfolios"

function Resume() {
    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const decrementStep = completedSteps(state => state.decrementStep)
    let step = completedSteps(state => state.steps)

    // // Use State
    // const [resumeData, setResumeData] = useState({
        
    //     // firstname: "",
    //     // surname: "",
    //     // city: "",
    //     // country: "",
    //     // postalCode: "",
    //     // phoneNumber: "",
    //     // emailAddress: "",
    // })


    // Router
    const router = useRouter()
    const routeData = router.query

    // Handle user
    const [user, loading] = useAuthState(auth)

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
                    createdOn: serverTimestamp(),
                    user: user.uid,
                    username: user.displayName,
                    avatar: user.photoURL,
                    type: "Resume",
                    resumeData: {
                        personalInformation:resumeData.personalInformation,
                        workExperiences:resumeData.workExperiences,
                        educationalBackground: resumeData.educationalBackground,
                        skills: resumeData.skills,
                        certifications: resumeData.certifications,
                        portfolio: resumeData.portfolio,
                        profileSummary: resumeData.profileSummary,
                    }
                })
                toast.success("Successfully saved to database 🚀")
                router.push("/resumes")
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

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Display page according to page count
    const PageDisplay = () => {
        if (step == 1) {
            return (
                <ResumeProfile formTitle={resumeData} />
            )
        }
        else if (step == 2) {
            return (
                <ResumeExperience />
            )
        }
        else if (step == 3) {
            return (
                <ResumeEducation />
            )
        }
        else if (step == 4) {
            return (
                <ResumeSkills />
            )
        }
        else if (step == 5) {
            return (
                <ResumeProfileSummary />
            )
        }
        else if (step == 6) {
            return (
                <ResumeCertifications />
            )
        }
        else if (step == 7) {
            return (
                <ResumePortfolios />
            )
        }
        else {
            return (
                <>
                    <div className="w-full flex flex-col gap-5">
                        <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                        <button type="submit" className="btn btn-sm sm:btn-md btn-outline" onClick={submitResume}>Save Resume</button>
                    </div>
                </>
            )
        }
    }

    // Get users data
    useEffect(() => {
        getData()
        // setResumeValues({ ...profile })
    }, [user, loading])
    
    return (
        <>
            <TemplateContainer>
                {PageDisplay()}
            </TemplateContainer>
        </>            
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