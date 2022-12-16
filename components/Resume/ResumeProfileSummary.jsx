import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
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

    // States
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    
    // States Functions
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
        if (!router.query.id && _.isEmpty(profileSummary)) {
            toast.error("Please enter your profile summary😞")
            return
        } else if (!_.isEqual(initialResumeData.profileSummary, resumeData.profileSummary)) {
            try {
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
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                value={router.query.id ? resumeData.profileSummary : profileSummary}
                name="value"
                onChange={handleChange}
            />
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">{router.query.id && (!_.isEqual(initialResumeData.profileSummary, resumeData.profileSummary)) ? "Update" : "Continue"}</button>
                <button className=" btn btn-sm sm:btn-md btn-outline" onClick={skipSection}>Skip this Section</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfileSummary;
