import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeSkills(props) {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State 
    const [skills, setSkills] = useState({
        skills: []
    })
    let { step } = completedSteps

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setSkills((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        setCompletedSteps({ step: --step })
    }

    // Continue to More sections section
    const toMoreSections = (e) => {
        e.preventDefault()
        if (validator.isEmpty(skills.skills)) {
            toast.error("Please enter a skill 😞")
            return
        }
        props.onSubmit(skills.skills)
        setCompletedSteps({ step: ++step })
    }

    return (
        <FormWindow onSubmit={toMoreSections} formTitle="Skills">

            <textarea
                className="textarea "
                placeholder="Write down your skills"
                value={skills.skills}
                name="skills"
                onChange={handleChange}
            />
            <div className="btn-group justify-between">
                <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm btn-outline">Continue</button>
            </div>
        </FormWindow>
    )
}

export default ResumeSkills;
