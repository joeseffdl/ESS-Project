import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import { completedSteps, resumeDataStore, resumeProfileSummaryStore } from "../../utils/store";
import FormWindow from "../FormWindow";

function ResumeProfileSummary() {
    // Router
    const router = useRouter()

    // Edit States
    const resumeData = resumeDataStore(state => state.resumeData)
    const initialResumeData = resumeDataStore(state => state.initialResumeData)

    // Edit States Functions
    const updateResumeProfileSummary = resumeDataStore(state => state.updateResumeProfileSummary)
    const setInitialResumeData = resumeDataStore(state => state.setInitialResumeData)

    // States
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    
    // States Functions
    const setProfileSummary = resumeProfileSummaryStore(state => state.setProfileSummary)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        if (_.isUndefined(router.query.id)) {
            setProfileSummary(value)
        } else if (router.query.id) {
            updateResumeProfileSummary(value)
        }
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to Submit section
    const toSubmit = async (e) => {
        e.preventDefault()
        if (_.isUndefined(router.query.id) && _.isEmpty(profileSummary)) {
            toast.error("Please enter your profile summary😞")
            return
        } else if (router.query.id && !_.isEqual(initialResumeData.profileSummary, resumeData.profileSummary)) {
            try {
                const docRef = doc(db, "resumes", router.query.id)
                const docSnap = await getDoc(docRef)
                const updatedResume = {
                    ...docSnap.data(),
                    resumeData: {
                        ...docSnap.data().resumeData,
                        profileSummary: resumeData.profileSummary
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

    // Skip section
    const skipSection = (e) => {
        e.preventDefault()
        incrementStep()
    }
    
    return (
        <FormWindow onSubmit={toSubmit} formTitle="Resume Profile Summary">
            <textarea
                className="textarea h-1/3 mb-5 rounded-lg focus:outline-none w-full border-2"
                placeholder="Write down your skills"
                name="value"
                onChange={handleChange}
            >
                {router.query.id ? resumeData.profileSummary : profileSummary}
            </textarea>
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline btn-accent">{router.query.id && (!_.isEqual(initialResumeData.profileSummary, resumeData.profileSummary)) ? "Update" : "Continue"}</button>
                <button className=" btn btn-sm sm:btn-md btn-outline btn-accent" onClick={skipSection}>Skip this Section</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfileSummary;
