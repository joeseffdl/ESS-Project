import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeEducation(props) {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    const [education, setEducation] = useState({
        institutionName: "",
        institutionLocation: "",
        degreeType: "",
        otherDegree: false,
        fieldOfStudy: "",
        graduationMonth: "",
        graduationYear: "",
        currentlyStudying: false,
    })
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

    // Continue to Skills section
    const toResumeSkills = (e) => {
        e.preventDefault()
        if (validator.isEmpty(education.institutionName)) {
            toast.error("Please enter an Institution 😞")
            return
        }
        props.onSubmit(education)
        setCompletedSteps({ step: ++step })
    }

    return (
        <FormWindow onSubmit={toResumeSkills} formTitle="Education">
            <input
                className="input "
                placeholder="Institution Name"
                value={education.institutionName}
                name="institutionName"
                onChange={handleChange}
            />
            <input
                className="input "
                placeholder="Institution Location"
                value={education.institutionLocation}
                name="institutionLocation"
                onChange={handleChange}
            />
            <select className="select ">
                <option disabled selected>Degree</option>
                <option>High school Diploma</option>
                <option>GED</option>
                <option>Associate of Arts</option>
                <option>Associate of Science</option>
                <option>Associate of Applied Science</option>
                <option>Bachelor of Arts</option>
                <option>Bachelor of Science</option>
                <option>BBA</option>
                <option>Master of Arts</option>
                <option>Master of Science</option>
                <option>MBA</option>
                <option>J.D.</option>
                <option>M.D.</option>
                <option>Ph.D.</option>
                <option>Some College (No Degree)</option>
                <option>Enter a different degree</option>
            </select>
            <input
                className="input "
                placeholder="Field of Study"
                value={education.fieldOfStudy}
                name="fieldOfStudy"
                onChange={handleChange}
            />
            <select className="select " name="graduationMonth">
                <option disabled selected>Graduation Month</option>
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Sep</option>
                <option>Oct</option>
                <option>Nov</option>
                <option>Dec</option>
            </select>
            <input
                className="input "
                placeholder="Graduation Year"
                value={education.graduationYear}
                name="graduationYear"
                onChange={handleChange}
            />
            <div className="btn-group justify-between">
                <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm btn-outline">Continue</button>
            </div>
        </FormWindow>
    )
}

export default ResumeEducation;
