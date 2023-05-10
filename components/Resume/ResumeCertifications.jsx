import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import { completedSteps, resumeCertificationStore, resumeDataStore } from '../../utils/store';
import FormWindow from "../FormWindow";

function ResumeCertifications() {
    // Router
    const router = useRouter()

    // Edit States 
    const resumeData = resumeDataStore(state => state.resumeData)
    const initialResumeData = resumeDataStore(state => state.initialResumeData)

    // Edit States Functions
    const updateResumeCertifications = resumeDataStore(state => state.updateResumeCertifications)
    const setInitialResumeData = resumeDataStore(state => state.setInitialResumeData)

    // States
    const userCertifications = resumeCertificationStore(state => state.certifications)
    
    // States Functions
    const addCertifications = resumeCertificationStore(state => state.addCertifications)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        if (_.isUndefined(router.query.id)) {
            addCertifications(value.split("\n"))
        } else if (router.query.id) {
            updateResumeCertifications(value.split("\n"))
        }
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }
    
    // Continue to next section
    const toNextSection = async (e) => {
        e.preventDefault()
        if (_.isUndefined(router.query.id) && _.isEmpty(userCertifications)) {
            toast.error("Please enter a certificate 😞")
            return
        } else if (!_.isEqual(initialResumeData.certifications, resumeData.certifications)) {
            try {
                const docRef = doc(db, "resumes", router.query.id)
                const docSnap = await getDoc(docRef)
                const updatedResume = {
                    ...docSnap.data(),
                    resumeData: {
                        ...docSnap.data().resumeData,
                        certifications: resumeData.certifications
                    },
                    lastUpdatedOn: serverTimestamp()
                }
                await updateDoc(docRef, updatedResume)
                setInitialResumeData(resumeData)
                toast.success("Resume updated successfully 😄")
            } catch (err) {
                console.log(err)
            }
        }
        incrementStep()
    }

    // Skip Section
    const skipSection = (e) => {
        e.preventDefault()
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toNextSection} formTitle="Certifications">
            <textarea
                className="textarea h-1/3 mb-5 rounded-lg focus:outline-none w-full border-2"
                placeholder="Write down your certificates"
                onChange={handleChange}
            >
                {router.query.id ? resumeData.certifications.join("\n") : userCertifications}
            </textarea>
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline btn-accent" disabled={_.isEqual(initialResumeData.certifications, resumeData.certifications)}>{router.query.id && (!_.isEqual(initialResumeData.certifications, resumeData.certifications)) ? "Update" : "Continue"}</button>
                <button className=" btn btn-sm sm:btn-md btn-outline btn-accent" onClick={skipSection}>Skip this Section</button>
            </div>
        </FormWindow>
    )
}

export default ResumeCertifications;
