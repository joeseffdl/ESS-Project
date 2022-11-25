import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function MoreSection() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State 
    const [section, setSection] = useState([])
    let { step } = completedSteps

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setEducation((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Go back to the previous page 
    const toPreviousPage = () => {
        setCompletedSteps({ step: --step })
    }

    // Continue to Summary section
    const toResumeSkills = (e) => {
        e.preventDefault()
        if (validator.isEmpty(education.institutionName)) {
            toast.error("Please enter an Institution 😞")
            return
        }
        props.onSubmit(education)
        setCompletedSteps({ step: ++step })
    }

    return <div>ResumeSkills</div>;
}

export default MoreSection;
