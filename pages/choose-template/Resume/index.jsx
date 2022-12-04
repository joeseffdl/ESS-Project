import AppNavigation from "../../../components/AppNavigation"
import { useRouter } from "next/router"
import { completedSteps } from "../../../utils/store"
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

function Resume() {
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

    // State Management
    let step = completedSteps(state => state.steps)

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
        else if (step > 5) {
            return (
                <>
                    <div>No more content</div>
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