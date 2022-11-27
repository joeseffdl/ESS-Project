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
        description: "",
    })
    const [fillingForm, setFillingForm] = useState(true)
    const [addEducationSection, setAddEducationSection] = useState(false)
    const [educationArray, setEducationArray] = useState([])
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

    // Go back to the previous form
    const toEducationForm = (e) => {
        e.preventDefault()
        setFillingForm(!fillingForm)
    }

    // Change state of fillingForm to false
    const fillingFormState = (e) => {
        e.preventDefault()
        if (validator.isEmpty(education.institutionName)) {
            toast.error("Please enter an Institution Name 😞")
            return
        }
        props.onSubmit(education)
        setFillingForm(!fillingForm)
    }

    // Continue to Add Education section 
    const toAddEducationSection = (e) => {
        e.preventDefault()
        setEducationArray(prevArray => [education, ...prevArray])
        setAddEducationSection(!addEducationSection)
        props.onSubmit(education)
    }

    // Add More Education 
    const addMoreEducation = (e) => {
        e.preventDefault()
        setEducation({
            institutionName: "",
            institutionLocation: "",
            degreeType: "",
            otherDegree: false,
            fieldOfStudy: "",
            graduationMonth: "",
            graduationYear: "",
            description: "",
        })
        setFillingForm(!fillingForm)
        setAddEducationSection(!addEducationSection)
    }

    // Continue to Skills section
    const toResumeSkills = (e) => {
        e.preventDefault()

        setResumeValues((prev) => {
            return { ...prev, educationalBackground: educationArray }
        })
        setCompletedSteps({ step: ++step })
    }

    if (fillingForm && !addEducationSection) {
        return (
            <FormWindow onSubmit={fillingFormState} formTitle="Education">
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
                <select
                    className="select "
                    name="degreeType"
                    onChange={handleChange}
                >
                    <option disabled selected>Degree</option>
                    <option>High School Diploma</option>
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
                    disabled={education.degreeType === ("Degree") || education.degreeType === ("High School Diploma") || education.degreeType === ("GED")}
                    className="input "
                    placeholder="Field of Study"
                    value={education.fieldOfStudy}
                    name="fieldOfStudy"
                    onChange={handleChange}
                />
                <select
                    className="select "
                    name="graduationMonth"
                    onChange={handleChange}
                >
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
    else if (!fillingForm && !addEducationSection) {
        return (
            <FormWindow onSubmit={toAddEducationSection} formTitle="Education Description">
                <textarea
                    className="textarea "
                    placeholder="Education Description"
                    value={education.description}
                    name="description"
                    onChange={handleChange}
                />

                <div className="btn-group justify-between">
                    <button className="btn btn-sm btn-outline" onClick={toEducationForm}>Back</button>
                    <button type="submit" className="btn btn-sm btn-outline">Continue</button>
                </div>
            </FormWindow>
        )
    }
    else if (!fillingForm && addEducationSection) {
        return (
            <FormWindow onSubmit={toResumeSkills} formTitle="Add More Educational Attainment" >

                <div className="btn-group justify-between">
                    <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
                    <button className="btn btn-sm btn-outline" onClick={addMoreEducation}>Add Education</button>
                    <button type="submit" className="btn btn-sm btn-outline">Continue</button>
                </div>
            </FormWindow>
        )
    } else {
        null
    }
}

export default ResumeEducation;
