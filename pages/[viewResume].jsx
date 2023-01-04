import { doc, getDoc } from "firebase/firestore"
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import AppNavigation from "../components/AppNavigation"
import CustomView from "../components/CustomView"
import OutputTemplate from "../components/Resume/OutputTemplate"
import OutputResume from "../components/BasicTemplate/OutputResume"
import { auth, db } from "../utils/firebase"
import { GrDocumentPdf } from 'react-icons/gr'
import { useReactToPrint } from 'react-to-print'

function View() {
    // Router
    const router = useRouter()
    const routeDataID = router.query.viewResume

    // Handle user
    const [user, loading] = useAuthState(auth)
    const [resumeDocument, setResumeDocument] = useState([])
    const [resumeProperties, setResumeProperties] = useState([])

    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Get user resume data
    const getResumeData = async (id) => {
        try {
            const docRef = await doc(db, "resumes", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const unsubscribe = setResumeDocument(docSnap.data())
                return unsubscribe
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Get Data from CustomView
    const getDataFromCustomView = (data) => {
        setResumeProperties(data)
    }

    // Display according to template
    const displayTemplate = (data) => {
        // Check the type/template of the resume document
        if (resumeDocument.type == "Resume") return (
            <OutputResume resumeDataProps={resumeDocument.resumeData} resumeProperties={resumeProperties} />
        )
    }

    // Print as PDF
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'untitled',
        onAfterPrint: () => toast.success("File downloaded 🎉")
    })

    useEffect(() => {
        getData()
        getResumeData(routeDataID)
    }, [user, loading])

    return (
        <div className="w-full flex flex-col xl:flex-row" >
            <div className={`bg-primary border-t-2 border-secondary-focus w-full p-5 ${routeDataID ? 'flex' : 'hidden'} lg:flex justify-center`}>
                <div className="w-[8.5in] h-[11in]  bg-white  text-black" ref={componentRef}>
                    {displayTemplate()}
                </div>
            </div>
            <button disabled={_.isEmpty(resumeDocument)} className="p-2.5 bg-secondary border-t-2 border-x-2 border-secondary-focus text-2xl font-bold" onClick={handlePrint}><GrDocumentPdf /></button>
            {!loading && (user.uid == resumeDocument.user)
                ? <CustomView dataFromCustomView={getDataFromCustomView} />
                : ''
            }
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