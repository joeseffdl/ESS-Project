import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeProfileSummary() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State 
    const [profileSummary, setProfileSummary] = useState("")
    let { step } = completedSteps

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setProfileSummary((prev) => {
            return { ...prev, [name]: value }
        })

        setResumeValues((prev) => {
            return { ...prev, profileSummary: profileSummary }
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
        if (validator.isEmpty(profileSummary.value)) {
            toast.error("Please enter your profile summary😞")
            return
        }

        setCompletedSteps({ step: ++step })
    }

    return (
        <FormWindow onSubmit={toSubmit} formTitle="Resume Profile Summary">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Write down your skills"
                value={profileSummary.value}
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
