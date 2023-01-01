import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import { addingDetails, completedSteps, fillingForm, modalSection, resumeDataEducationalBackgroundIndexStore, resumeDataStore, resumeEducationStore, } from '../../utils/store';
import FormWindow from "../FormWindow";

function ResumeEducation() {
    // Router
    const router = useRouter()

    // Edit States
    const resumeData = resumeDataStore(state => state.resumeData)
    const initialResumeData = resumeDataStore(state => state.initialResumeData)
    const indexValue = resumeDataEducationalBackgroundIndexStore(state => state.indexValue)
    
    // Edit States Functions
    const updateResumeEducation = resumeDataStore(state => state.updateResumeEducation)
    const updateResumeEducationDetailsArray = resumeDataStore(state => state.updateResumeEducationDetailsArray)
    const clearResumeEducationField = resumeDataStore(state => state.clearResumeEducationField)
    const incrementIndexValue = resumeDataEducationalBackgroundIndexStore(state => state.incrementIndexValue)
    const decrementIndexValue = resumeDataEducationalBackgroundIndexStore(state => state.decrementIndexValue)
    const setInitialResumeData = resumeDataStore(state => state.setInitialResumeData)

    // States
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const educationField = resumeEducationStore(state => state.educationField)
    const description = resumeEducationStore(state => state.description)
    const fillingFormValue = fillingForm(state => state.value)
    const modalSectionValue = modalSection(state => state.value)

    // States Functions
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
        if (!router.query.id) {
            addEducation({[name]: value})
        } else {
            updateResumeEducation(indexValue, {[name]: value})
        }
    }

    // Handle Text Area changes
    const handleTextAreaChange = (e) => {
        const { value } = e.target
        if (!router.query.id) {
            addEducationDetailsArray(value.split("\n"))
            updateEducationField()
        } else {
            updateResumeEducationDetailsArray(indexValue, value.split("\n"))
        }
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        setFillingForm(true)
        setModalSection(false)
        decrementStep()
    }

    // Go back to the previous form
    const toEducationForm = (e) => {
        e.preventDefault()
        setFillingForm()
    }

    // Change state of fillingForm to false
    const fillingFormState = async (e) => {
        e.preventDefault()
        if (!router.query.id && _.isEmpty(educationField.institutionName && educationField.degreeType)) {
            toast.error("Please enter all required fields 😞")
            return
        } else if (router.query.id && _.isEmpty(resumeData.educationalBackground[indexValue].institutionName && resumeData.educationalBackground[indexValue].degreeType)) {
            toast.error("Please enter all required fields 😞")
            return
        } else if (router.query.id && !_.isEqual(initialResumeData.educationalBackground, resumeData.educationalBackground)) {
            try {
                const docRef = doc(db, "resumes", router.query.id)
                const docSnap = await getDoc(docRef)
                const updatedResume = {
                    ...docSnap.data(),
                    resumeData: {
                        ...docSnap.data().resumeData,
                        educationalBackground: resumeData.educationalBackground
                    },
                    lastUpdatedOn: serverTimestamp()
                }
                await updateDoc(docRef, updatedResume)
                setInitialResumeData({
                    resumeData: {
                        certifications: resumeData.certifications,
                        educationalBackground: resumeData.educationalBackground,
                        personalInformation: resumeData.personalInformation,
                        profileSummary: resumeData.profileSummary,
                        portfolio: resumeData.portfolio,
                        skills: resumeData.skills,
                        workExperiences: resumeData.workExperiences
                    }
                })
                toast.success("Resume updated successfully 😄")
            }
            catch (err) {
                console.log(err)    
            }
        }
        setFillingForm()
    }

    // Continue to Add Education section 
    const toAddEducationSection = async (e) => {
        e.preventDefault()
        if (router.query.id && !_.isEqual(initialResumeData.educationalBackground, resumeData.educationalBackground)) {
            try {
                const docRef = doc(db, "resumes", router.query.id)
                const docSnap = await getDoc(docRef)
                const updatedResume = {
                    ...docSnap.data(),
                    resumeData: {
                        ...docSnap.data().resumeData,
                        educationalBackground: resumeData.educationalBackground
                    },
                    lastUpdatedOn: serverTimestamp()
                }
                await updateDoc(docRef, updatedResume)
                setInitialResumeData({
                    resumeData: {
                        certifications: resumeData.certifications,
                        educationalBackground: resumeData.educationalBackground,
                        personalInformation: resumeData.personalInformation,
                        profileSummary: resumeData.profileSummary,
                        portfolio: resumeData.portfolio,
                        skills: resumeData.skills,
                        workExperiences: resumeData.workExperiences
                    }
                })
                toast.success("Resume updated successfully 😄")
            } catch (err) {
                console.log(err)
            }
        }
        addEducationalBackgroundArray()
        setModalSection()
        setAddingDetails(false)
    }

    // Add More Education 
    const addMoreEducation = (e) => {
        e.preventDefault()
        if (!router.query.id) {
            clearEducationField()
        } else {
            clearResumeEducationField()
        }
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

    // Increment Index value
    const incrementIndex = (e) => {
        e.preventDefault()
        incrementIndexValue()
    }

    // Decrement Index value
    const decrementIndex = (e) => {
        e.preventDefault()
        decrementIndexValue()
    }

    // Delete Index Item
    const deleteIndex = (e) => {
        e.preventDefault()
        resumeData.educationalBackground.splice(indexValue, 1)
        decrementStep()
        setAddingDetails(false)
        if (resumeData.educationalBackground.length === 0) {
            clearResumeEducationField()
        }
    }

    if (fillingFormValue && !modalSectionValue) {
        return (
            <FormWindow onSubmit={fillingFormState} formTitle="Education">
                <div className="w-full flex flex-col gap-2 mb-5
                    ">
                    <input
                        className={`input ${router.query.id ? resumeData.educationalBackground[indexValue].institutionName == "" ? "input-warning" : "input-success" : educationField.institutionName == "" ? "input-warning" : "input-success"}`}
                        placeholder="Institution Name"
                        value={router.query.id ? resumeData.educationalBackground[indexValue].institutionName : educationField.institutionName}
                        name="institutionName"
                        onChange={handleChange}
                    />
                    <input
                        className="input "
                        placeholder="Institution Location"
                        value={router.query.id ? resumeData.educationalBackground[indexValue].institutionLocation : educationField.institutionLocation}
                        name="institutionLocation"
                        onChange={handleChange}
                    />
                </div>

                <div className="w-full flex flex-col gap-2 mb-5
                    ">
                    <select
                        className={`select ${router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "" ? "select-warning" : "select-success" : educationField.degreeType == "" ? "select-warning" : "select-success"}`}
                        name="degreeType"
                        onChange={handleChange}
                    >
                        <option value="" disabled selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "" : educationField.degreeType == ""}>Degree Type</option>
                        <option
                            value="High School Diploma"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "High School Diploma" : ``}
                        >
                            High School Diploma
                        </option>
                        <option
                            value="GED"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "GED" : ``}
                        >
                            GED
                        </option>
                        <option
                            value="Associate of Arts"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Associate of Arts" : ``}
                        >
                            Associate of Arts
                        </option>
                        <option
                            value="Associate of Science"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Associate of Science" : ``}
                        >
                            Associate of Science
                        </option>
                        <option
                            value="Associate of Applied Science"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Associate of Science" : ``}
                        >
                            Associate of Applied Science
                        </option>
                        <option
                            value="Bachelor of Arts"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Bachelor of Arts" : ``}
                        >
                            Bachelor of Arts
                        </option>
                        <option
                            value="Bachelor of Science"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Bachelor of Science" : ``}
                        >
                            Bachelor of Science
                        </option>
                        <option
                            value="BBA"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "BBA" : ``}
                        >
                            BBA
                        </option>
                        <option
                            value="Master of Arts"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Master of Arts" : ``}
                        >
                            Master of Arts
                        </option>
                        <option
                            value="Master of Science"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Master of Science" : ``}
                        >
                            Master of Science
                        </option>
                        <option
                            value="MBA"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "MBA" : ``}
                        >
                            MBA
                        </option>
                        <option
                            value="J.D."
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "J.D." : ``}
                        >
                            J.D.
                        </option>
                        <option
                            value="M.D."
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "M.D." : ``}
                        >
                            M.D.
                        </option>
                        <option
                            value="Ph.D."
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Ph.D." : ``}
                        >
                            Ph.D.
                        </option>
                        <option
                            value="No Degree"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "No Degree" : ``}
                        >
                            Some College (No Degree)
                        </option>
                        <option
                            value="Degree"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].degreeType == "Degree" : ``}
                        >
                            Enter a different degree
                        </option>
                    </select>
                    <input
                        disabled={router.query.id
                            ? resumeData.educationalBackground[indexValue].degreeType === ("") || resumeData.educationalBackground[indexValue].degreeType === ("High School Diploma") || resumeData.educationalBackground[indexValue].degreeType === ("GED") || resumeData.educationalBackground[indexValue].degreeType === ("No Degree")
                            : educationField.degreeType === ("") || educationField.degreeType === ("High School Diploma") || educationField.degreeType === ("GED") || educationField.degreeType === ("No Degree")}
                        className="input "
                        placeholder="Field of Study"
                        value={router.query.id ? resumeData.educationalBackground[indexValue].fieldOfStudy : educationField.fieldOfStudy}
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
                        <option value="" disabled selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "" : educationField.graduationMonth == ""}>Graduation Month</option>
                        <option
                            value=""
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "" : ``}
                        >
                            I don&apos;t know the month
                        </option>
                        <option
                            value="Jan"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Jan" : ``}
                        >
                            Jan
                        </option>
                        <option
                            value="Feb"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Feb" : ``}
                        >
                            Feb
                        </option>
                        <option
                            value="Mar"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Mar" : ``}
                        >
                            Mar
                        </option>
                        <option
                            value="Apr"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Apr" : ``}
                        >
                            Apr
                        </option>
                        <option
                            value="May"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "May" : ``}
                        >
                            May
                        </option>
                        <option
                            value="Jun"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Jun" : ``}
                        >
                            Jun
                        </option>
                        <option
                            value="Jul"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Jul" : ``}
                        >
                            Jul
                        </option>
                        <option
                            value="Aug"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Aug" : ``}
                        >
                            Aug
                        </option>
                        <option
                            value="Sep"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Sep" : ``}
                        >
                            Sep
                        </option>
                        <option
                            value="Oct"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Oct" : ``}
                        >
                            Oct
                        </option>
                        <option
                            value="Nov"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Nov" : ``}
                        >
                            Nov
                        </option>
                        <option
                            value="Dec"
                            selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationMonth == "Dec" : ``}
                        >
                            Dec
                        </option>
                    </select>
                    <select
                        className="select "
                        name="graduationYear"
                        onChange={handleChange}
                    >
                        <option value="graduationYear" disabled selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationYear == "" : educationField.graduationYear == ""}>Graduation Year</option>
                        <option >{yearsOptionArray[1]}</option>
                        {
                            yearsOptionArray.map((year) =>
                                <option
                                    value={year}
                                    key={year}
                                    selected={router.query.id ? resumeData.educationalBackground[indexValue].graduationYear == year : ``}
                                >
                                    {year}
                                </option>)
                        }
                    </select>
                    {router.query.id
                        ? <div className="w-full flex justify-end gap-5 mt-3 px-2">
                            <button className=" btn btn-xs btn-error btn-outline" disabled={resumeData.workExperiences.length <= 1 && resumeData.workExperiences[0].title == "" && resumeData.workExperiences[0].employer == ""} onClick={deleteIndex}>☠️</button>
                            <button className=" btn btn-xs btn-outline" disabled={indexValue == 0} onClick={decrementIndex}>&#60;</button>
                            <button className=" btn btn-xs btn-outline" disabled={indexValue == resumeData.workExperiences.length - 1} onClick={incrementIndex}>&#62;</button>
                        </div>
                        : ``
                    }
                </div>
                <div className="w-full flex flex-col sm:justify-between gap-5">
                    <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toPreviousPage}>Back</button>
                    <button type="submit" className="btn btn-sm sm:btn-md btn-outline btn-accent">{router.query.id && (!_.isEqual(initialResumeData.educationalBackground, resumeData.educationalBackground)) ? "Update" : "Continue"}</button>
                    <button className=" btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toSkillsSection}>Skip to Skills Section</button>
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
                    value={router.query.id ? resumeData.educationalBackground[indexValue].description.join("\n") : description.value}
                    name="description"
                    onChange={handleTextAreaChange}
                />

                <div className="w-full flex flex-col sm:justify-between gap-5">
                    <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toEducationForm}>Back</button>
                    <button type="submit" className="btn btn-sm sm:btn-md btn-outline btn-accent">{router.query.id && (!_.isEqual(initialResumeData.educationalBackground, resumeData.educationalBackground)) ? "Update" : "Continue"}</button>
                </div>
            </FormWindow>
        )
    }
    else if (!fillingFormValue && modalSection) {
        return (
            <FormWindow onSubmit={toResumeSkills} formTitle="Preview Educational Attainment" >

                <div className="w-full flex flex-col sm:justify-between gap-5">
                    <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toPreviousPage}>Back</button>
                    <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={addMoreEducation}>Add Education</button>
                    <button type="submit" className="btn btn-sm sm:btn-md btn-outline btn-accent">Continue</button>
                </div>
            </FormWindow>
        )
    } else {
        null
    }
}

export default ResumeEducation;
