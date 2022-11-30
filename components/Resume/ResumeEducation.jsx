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
    
    // Year Option
    const currentYear = new Date().getFullYear()
    const yearsOptionArray = []
    for (let i = currentYear  - 50; i <= currentYear + 50; i++ ) {
        yearsOptionArray.push(i.toString())
    }
    
    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        setEducation((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Handle Text Area changes
    const handleTextAreaChange = (e) => {
        const { name, value } = e.target
        setEducation((prev) => {
            return { ...prev, [name]: value, details: [value.split("\n")] }
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
        // if (validator.isEmpty(education.institutionName)) {
        //     toast.error("Please enter an Institution Name 😞")
        //     return
        // }
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
            return { ...prev, educationalBackground: [...educationArray,...prev.educationalBackground,] }
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
                    <option value="degree" disabled selected>Degree</option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="GED">GED</option>
                    <option value="Associate of Arts">Associate of Arts</option>
                    <option value="Associate of Science">Associate of Science</option>
                    <option value="Associate of Applied Science">Associate of Applied Science</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="BBA">BBA</option>
                    <option value="Master of Arts">Master of Arts</option>
                    <option value="Master of Science">Master of Science</option>
                    <option value="MBA">MBA</option>
                    <option value="J.D.">J.D.</option>
                    <option value="M.D.">M.D.</option>
                    <option value="Ph.D.">Ph.D.</option>
                    <option value="Some College (No Degree)">Some College (No Degree)</option>
                    <option value="Enter a different degree">Enter a different degree</option>
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
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                </select>
                <select
                    className="select "
                    name="graduationYear"
                    onChange={handleChange}
                >
                    <option value="graduationYear" disabled selected>Graduation Year</option>
                    <option >{yearsOptionArray[1]}</option>
                    {
                        yearsOptionArray.map((year) => <option value={year} key={year}>{year}</option>)
                    }
                </select>
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
                    onChange={handleTextAreaChange}
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
