import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import AppNavigation from "../components/AppNavigation"
import OutputTemplate from "../components/OutputTemplate"
import OutputResume from "../components/Resume/OutputResume"
import { auth, db } from "../utils/firebase"
import CustomView from "../components/CustomView"

function View() {
    // Router
    const router = useRouter()
    const routeDataID = router.query.viewResume

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
        const docRef = await doc(db, "resumes", id)
        try { 
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const unsubscribe = setResumeDocument(docSnap.data())
                return unsubscribe
            }
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
        getResumeData(routeDataID)
    }, [user, loading])

    return (
        <div className="w-full flex flex-col xl:flex-row">
            <OutputTemplate>
                {displayTemplate()}
            </OutputTemplate>
            <CustomView />
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