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
    const toPreviousPage = (e) => {
        e.preventDefault()
        setCompletedSteps({ step: --step })
    }

    // Continue to Submit section
    const toSubmit = (e) => {
        e.preventDefault()
        if (validator.isEmpty(section)) {
            toast.error("Please enter an Institution 😞")
            return
        }
        props.onSubmit(education)
        setCompletedSteps({ step: ++step })
    }

    return (
        <FormWindow onSubmit={toSubmit} formTitle="More Section">

            
            <div className="btn-group justify-between">
                <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm btn-outline">Continue</button>
            </div>
        </FormWindow>
    )
}

export default MoreSection;
