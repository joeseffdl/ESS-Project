import { doc, getDoc } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GrDocumentPdf } from 'react-icons/gr';
import { useReactToPrint } from 'react-to-print';
import { toast } from "react-toastify";
import AppNavigation from "../components/AppNavigation";
import OutputResume from "../components/BasicTemplate/OutputResume";
import CustomView from "../components/CustomView";
import { auth, db } from "../utils/firebase";

function View() {
    // Router
    const router = useRouter()
    const routeDataID = router.query.viewResume

    // Handle user
    const [user, loading] = useAuthState(auth)
    const [resumeDocument, setResumeDocument] = useState([])

    // Resume Format
    const [resumeFormat, setResumeFormat] = useState({
        template: "",
        fontFamily: "Segoe UI",
        fontSize: 0.75,
        textColor: "black",

        headerFontSize: 1.875,
        headerLineHeight: 1.25,

        summaryMarginX: 2.5,
        summaryMarginY: 0.75,
        summaryLineHeight: 1,

        skillsPaddingL: 2.5,
        skillsPaddingR: 2.5,
        skillsPaddingT: 0,
        skillsPaddingB: 0,

        experiencesHeadMarginT: 0.75,
        experiencesHeadMarginB: 0.25,
        experiencesHeadPaddingX: 0.5,
        experiencesDescriptionPaddingL: 2.5,
        experiencesDescriptionPaddingR: 2.5,
        experiencesDescriptionPaddingY: 0,
        experiencesMarginB: 1.25,

        educationHeadMarginT: 0.75,
        educationHeadMarginB: 0,
        educationSubHeadMarginT: 0.25,
        educationSubHeadMarginB: 0.25,
        educationHeadPaddingX: 0.5,
        educationDescriptionPaddingL: 1.25,
        educationDescriptionPaddingR: 1.25,
        educationDescriptionPaddingY: 0,
        educationMarginB: 1.25,

        certificationsPaddingL: 2.5,
        certificationsPaddingR: 2.5,
        certificationsPaddingT: 0,
        certificationsPaddingB: 0,

        portfolioPaddingL: 2.5,
        portfolioPaddingR: 2.5,
        portfolioPaddingT: 0,
        portfolioPaddingB: 0,
    })

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

    // Display according to template
    const displayTemplate = () => {
        // Check the type/template of the resume document
        if (resumeDocument.type == "Resume") return (
            <OutputResume resumeDataProps={resumeDocument.resumeData} resumeProperties={resumeFormat} />
        )
    }

    // Print as PDF
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${user?.displayName} Resume`,
        // onAfterPrint: () => toast.success("File downloaded 🎉") 
    })

    useEffect(() => {
        getData()
        getResumeData(routeDataID)
    }, [user, loading,])

    return (
        <div className="w-full flex flex-col xl:flex-row" >
            <div className={`bg-primary border-t-2 border-secondary-focus w-full p-5 ${routeDataID ? 'flex' : 'hidden'} lg:flex justify-center`}>
                <div className="w-[8.5in] min-h-[11in]  bg-white  text-black" ref={componentRef}>
                    {displayTemplate()}
                </div>
            </div>
            <button disabled={_.isEmpty(resumeDocument)} className="p-2.5 bg-secondary border-t-2 border-x-2 border-secondary-focus text-2xl font-bold" onClick={handlePrint}><GrDocumentPdf /></button>
            {!loading && (user.uid == resumeDocument.user)
                ? <CustomView resumeFormat={resumeFormat} setResumeFormat={setResumeFormat} />
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