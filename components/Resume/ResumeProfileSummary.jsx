import FormWindow from "../FormWindow";
import validator from "validator"
import { toast } from "react-toastify";
import { completedSteps, resumeProfileSummaryStore } from "../../utils/store"

function ResumeProfileSummary() {
    // State Management
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    const setProfileSummary = resumeProfileSummaryStore(state => state.setProfileSummary)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        setProfileSummary(value)
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to Submit section
    const toSubmit = (e) => {
        e.preventDefault()
        if (validator.isEmpty(profileSummary)) {
            toast.error("Please enter your profile summary😞")
            return
        }
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toSubmit} formTitle="Resume Profile Summary">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                value={profileSummary}
                name="value"
                onChange={handleChange}
            />
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Submit</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfileSummary;
