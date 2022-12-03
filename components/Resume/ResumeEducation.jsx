import FormWindow from "../FormWindow";
import validator from "validator"
import { toast } from "react-toastify";
import { resumeEducationStore, fillingForm, modalSection, addingDetails, completedSteps, } from '../../utils/store'


function ResumeEducation(props) {
    // State Management
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const educationField = resumeEducationStore(state => state.educationField)
    const description = resumeEducationStore(state => state.description)
    const fillingFormValue = fillingForm(state => state.value)
    const modalSectionValue = modalSection(state => state.value)

    // State Functions
    const addEducation = resumeEducationStore(state => state.addEducation)
    const addEducationDetailsArray = resumeEducationStore(state => state.addEducationDetailsArray)
    const updateEducationField = resumeEducationStore(state => state.updateEducationField)
    const addEducationalBackgroundArray = resumeEducationStore(state => state.addEducationalBackgroundArray)
    const clearEducationField = resumeEducationStore(state => state.clearEducationField)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)
    const setFillingForm = fillingForm(state => state.setFillingForm)
    const setModalSection = modalSection(state => state.setModalSection)
    const setAddingDetails = addingDetails(state => state.setAddingDetails)

    // Year Option
    const currentYear = new Date().getFullYear()
    const yearsOptionArray = []
    for (let i = currentYear  - 50; i <= currentYear + 50; i++ ) {
        yearsOptionArray.push(i.toString())
    }
    
    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        addEducation({[name]: value})
    }

    // Handle Text Area changes
    const handleTextAreaChange = (e) => {
        const { value } = e.target
        addEducationDetailsArray(value.split("\n"))
        updateEducationField()
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Go back to the previous form
    const toEducationForm = (e) => {
        e.preventDefault()
        setFillingForm()
    }

    // Change state of fillingForm to false
    const fillingFormState = (e) => {
        e.preventDefault()
        if (validator.isEmpty(educationField.institutionName && educationField.degreeType)) {
            toast.error("Please enter all required fields 😞")
            return
        }
        setFillingForm()
    }

    // Continue to Add Education section 
    const toAddEducationSection = (e) => {
        e.preventDefault()
        addEducationalBackgroundArray()
        setModalSection()
        setAddingDetails(false)
    }

    // Add More Education 
    const addMoreEducation = (e) => {
        e.preventDefault()
        clearEducationField()
        setFillingForm()
        setModalSection()
        setAddingDetails(true)
    }

    // Continue to Skills section
    const toResumeSkills = (e) => {
        e.preventDefault()
        incrementStep()
        setFillingForm()
        setModalSection()
        setAddingDetails(false)
    }

    // To Skills Section
    const toSkillsSection = (e) => {
        e.preventDefault()
        incrementStep()
        setAddingDetails(false)
    }

    if (fillingFormValue && !modalSectionValue) {
        return (
            <FormWindow onSubmit={fillingFormState} formTitle="Education">
                <div className="w-full flex flex-col gap-2 mb-5
                    ">
                    <input
                        className={`input ${educationField.institutionName == "" ? "input-warning" : "input-success"}`}
                        placeholder="Institution Name"
                        value={educationField.institutionName}
                        name="institutionName"
                        onChange={handleChange}
                    />
                    <input
                        className="input "
                        placeholder="Institution Location"
                        value={educationField.institutionLocation}
                        name="institutionLocation"
                        onChange={handleChange}
                    />
                </div>

                <div className="w-full flex flex-col gap-2 mb-5
                    ">
                    <select
                        className={`select ${educationField.degreeType == "" ? "select-warning" : "select-success"}`}
                        name="degreeType"
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>Degree Type</option>
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
                        <option value="No Degree">Some College (No Degree)</option>
                        <option value="Degree">Enter a different degree</option>
                    </select>
                    <input
                        disabled={educationField.degreeType === ("") || educationField.degreeType === ("High School Diploma") || educationField.degreeType === ("GED")}
                        className="input "
                        placeholder="Field of Study"
                        value={educationField.fieldOfStudy}
                        name="fieldOfStudy"
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex flex-col gap-2 mb-5
                    ">
                    <select
                        className="select "
                        name="graduationMonth"
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>Graduation Month</option>
                        <option value="">I don&apos;t know the month</option>
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
                </div>
                <div className="w-full flex flex-col sm:justify-between gap-5">
                    <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                    <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
                    <button className=" btn btn-sm sm:btn-md btn-outline" onClick={toSkillsSection}>Skip to Skills Section</button>
                </div>
            </FormWindow>
        )
    } 
    else if (!fillingFormValue && !modalSectionValue) {
        return (
            <FormWindow onSubmit={toAddEducationSection} formTitle="Education Description">
                <textarea
                    className="textarea h-1/3 mb-5 "
                    placeholder="Education Description"
                    value={description.value}
                    name="description"
                    onChange={handleTextAreaChange}
                />

                <div className="w-full flex flex-col sm:justify-between gap-5">
                    <button className="btn btn-sm sm:btn-md btn-outline" onClick={toEducationForm}>Back</button>
                    <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
                </div>
            </FormWindow>
        )
    }
    else if (!fillingFormValue && modalSection) {
        return (
            <FormWindow onSubmit={toResumeSkills} formTitle="Preview Educational Attainment" >

                <div className="w-full flex flex-col sm:justify-between gap-5">
                    <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                    <button className="btn btn-sm sm:btn-md btn-outline" onClick={addMoreEducation}>Add Education</button>
                    <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
                </div>
            </FormWindow>
        )
    } else {
        null
    }
}

export default ResumeEducation;
