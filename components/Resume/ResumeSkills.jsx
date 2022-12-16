import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { completedSteps, resumeDataStore, resumeSkillsStore } from '../../utils/store';
import FormWindow from "../FormWindow";

function ResumeSkills() {
    // Router
    const router = useRouter()

    // Edit States
    const resumeData = resumeDataStore(state => state.resumeData)
    const initialResumeData = resumeDataStore(state => state.initialResumeData)
    
    // Edit States Functions
    const updateResumeSkills = resumeDataStore(state => state.updateResumeSkills)
    
    // States
    const userSkills = resumeSkillsStore(state => state.skills)
    
    // States Functions
    const addSkills = resumeSkillsStore(state => state.addSkills)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        if (!router.query.id) {
            addSkills(value.split("\n"))
        } else {
            updateResumeSkills(value.split("\n"))
        }
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to Profile Summary section
    const toProfileSummarySection = (e) => {
        e.preventDefault()
        if (!router.query.id && _.isEmpty(userSkills)) {
            toast.error("Please enter a skill 😞")
            return
        } else if (!_.isEqual(initialResumeData.skills, resumeData.skills)) {
            try {
                toast.success("Resume updated successfully 😄")
            } catch (err) {
                console.log(err)
            }
        }
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toProfileSummarySection} formTitle={router.query.id ? "Editing Resume Skills and Expertise" : "Skills and Expertise"}>
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                value={router.query.id ? resumeData.skills.join("\n") : userSkills}
                onChange={handleChange}
            />
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">{router.query.id && (!_.isEqual(initialResumeData.skills, resumeData.skills)) ? "Update" : "Continue"}</button>
            </div>
        </FormWindow>
    )
}

export default ResumeSkills;
