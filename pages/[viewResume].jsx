import { useRouter } from "next/router"
import { auth, db } from "../utils/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from "react"
import AppNavigation from "../components/AppNavigation";
import OutputTemplate from "../components/OutputTemplate";
import OutputResume from "../components/Resume/OutputResume";

function View() {
    // Router
    const router = useRouter()
    const routeDataID = router.query.resume

    // Handle user
    const [user, loading] = useAuthState(auth)
    const [resumeDocument, setResumeDocument] = useState([])

    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Get user resume data
    const getResumeData = async (id) => {
        
        try { 
            const docRef = doc(db, 'resumes', id)
            const docSnap = await getDoc(docRef)
            const unsubscribe = setResumeDocument(docSnap.data())
            return unsubscribe
        } catch(err) {
            console.log(err)
        }
    }

    // Display according to template
    const displayTemplate = () => {
        // Check the type/template of the resume document
        if (resumeDocument.type == "Resume") return (
            <OutputResume {...resumeDocument.resumeData} />
        )
    }
    
    useEffect(() => {
        getData()
        if (routeDataID) {
            getResumeData(routeDataID)
        }
    }, [user, loading])

    return (
        <div className="w-full flex flex-col xl:flex-row">
            <OutputTemplate>
                {displayTemplate()}
            </OutputTemplate>
        </div>
    )
}

export default View;

View.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}