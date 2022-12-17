import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from "react-toastify"
import AppNavigation from "../../../components/AppNavigation"
import ResumeCertifications from "../../../components/Resume/ResumeCertifications"
import ResumeEducation from "../../../components/Resume/ResumeEducation"
import ResumeExperience from "../../../components/Resume/ResumeExperience"
import ResumePortfolios from "../../../components/Resume/ResumePortfolios"
import ResumeProfile from "../../../components/Resume/ResumeProfile"
import ResumeProfileSummary from "../../../components/Resume/ResumeProfileSummary"
import ResumeSkills from "../../../components/Resume/ResumeSkills"
import TemplateContainer from "../../../components/TemplateContainer"
import { auth, db } from "../../../utils/firebase"
import { completedSteps, resumeDataStore } from "../../../utils/store"

function Resume() {
    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    let step = completedSteps(state => state.steps)
    
    // State functions
    const setResumeData = resumeDataStore(state => state.setResumeData)
    const setInitialResumeData = resumeDataStore(state => state.setInitialResumeData)
    const setCompletedSteps = completedSteps(state => state.setCompletedSteps)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Router
    const router = useRouter()
    const routeID = router.query.id
    const resumeType = router.route.slice(17)

    // Handle user
    const [user, loading] = useAuthState(auth)

    // Submit Resume
    const submitResume = async (e) => {
        e.preventDefault()
        try {
            if (routeID) {
                router.push(`/${routeID}`)
            }
            else {
                const collectionRef = collection(db, "resumes")
                await addDoc(collectionRef, {
                    createdOn: serverTimestamp(),
                    user: user.uid,
                    username: user.displayName,
                    avatar: user.photoURL,
                    type: resumeType,
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

    // Get user resume data
    const getResumeData = async (id) => {
        try {
            const docRef = doc(db, 'resumes', id)
            const docSnap = await getDoc(docRef)
            const unsubscribe = setResumeData(docSnap.data().resumeData)
            const setInitial = setInitialResumeData(docSnap.data().resumeData)
            return (unsubscribe,setInitial)
        } catch (err) {
            console.log(err)
        }
    }
    
    // Logged in?
    const getData = () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Editing document?
    const editingDocument = () => {
        setCompletedSteps(1)
        getResumeData(routeID)
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
                <ResumeProfile />
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
                        <button type="submit" className="btn btn-sm sm:btn-md btn-outline" onClick={submitResume}>{routeID ? "View Resume" : "Save Resume"}</button>
                    </div>
                </>
            )
        }
    }

    // Get users data
    useEffect(() => {
        getData()
        if (routeID) {
            editingDocument()
        } else {
            setCompletedSteps(1)
        }
        
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