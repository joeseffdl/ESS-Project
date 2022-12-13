import FormWindow from "../FormWindow";
import validator from "validator"
import { toast } from "react-toastify";
import { completedSteps, resumeDataStore, resumeProfileSummaryStore } from "../../utils/store"
import { useRouter } from "next/router";

function ResumeProfileSummary() {
    // Router
    const router = useRouter()

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const updateResumeProfileSummary = resumeDataStore(state => state.updateResumeProfileSummary)

    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    const setProfileSummary = resumeProfileSummaryStore(state => state.setProfileSummary)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        if (!router.query.id) {
            setProfileSummary(value)
        } else {
            updateResumeProfileSummary(value)
        }
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to Submit section
    const toSubmit = (e) => {
        e.preventDefault()
        if (!router.query.id && validator.isEmpty(profileSummary)) {
            toast.error("Please enter your profile summary😞")
            return
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
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                value={router.query.id ? resumeData.profileSummary : profileSummary}
                name="value"
                onChange={handleChange}
            />
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
                <button className=" btn btn-sm sm:btn-md btn-outline" onClick={skipSection}>Skip this Section</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfileSummary;
