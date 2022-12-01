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
        value: ""
    })
    let { step } = completedSteps

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setSkills((prev) => {
            return { ...prev, [name]: value }
        })

        setResumeValues((prev) => {
            return { ...prev, skills: [skills.value.split("\n")] }
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
        if (validator.isEmpty(skills.value)) {
            toast.error("Please enter a skill 😞")
            return
        }
        props.onSubmit(skills.value)
        setCompletedSteps({ step: ++step })
    }

    return (
        <FormWindow onSubmit={toMoreSections} formTitle="Skills and Expertise">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                value={skills.value}
                name="value"
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
