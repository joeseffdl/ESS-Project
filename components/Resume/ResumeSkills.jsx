import FormWindow from "../FormWindow";
import validator from "validator"
import { toast } from "react-toastify";
import { completedSteps, resumeSkillsStore } from '../../utils/store'

function ResumeSkills(props) {
    // State Management
    const userSkills = resumeSkillsStore(state => state.skills)
    const addSkills = resumeSkillsStore(state => state.addSkills)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        addSkills(value.split("\n"))
    }
    
    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to Profile Summary section
    const toProfileSummarySection = (e) => {
        e.preventDefault()
        if (userSkills.length == 0) {
            toast.error("Please enter a skill 😞")
            return
        }
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toProfileSummarySection} formTitle="Skills and Expertise">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                // value={skills.value}
                // name="value"
                onChange={handleChange}
            />
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
            </div>
        </FormWindow>
    )
}

export default ResumeSkills;
