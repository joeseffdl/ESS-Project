import FormWindow from "../FormWindow";
import validator from "validator"
import { toast } from "react-toastify";
import { resumeExperienceStore, fillingForm, modalSection, addingDetails, completedSteps,  } from '../../utils/store'

function ResumeExperience(props) {
  // State Management
  const workExperiences = resumeExperienceStore(state => state.workExperiences)
  const workExp = resumeExperienceStore(state => state.workExp)
  const description = resumeExperienceStore(state => state.description)
  const fillingFormValue = fillingForm(state => state.value)
  const modalSectionValue = modalSection(state => state.value)


  // State Functions
  const addWorkExp = resumeExperienceStore(state => state.addWorkExp)
  const addWorkDetailsArray = resumeExperienceStore(state => state.addWorkDetailsArray)
  const updateWorkExpField = resumeExperienceStore(state => state.updateWorkExpField)
  const addWorkExperiencesArray = resumeExperienceStore(state => state.addWorkExperiencesArray)
  const clearWorkExpField = resumeExperienceStore(state => state.clearWorkExpField)
  const incrementStep = completedSteps(state => state.incrementStep)
  const decrementStep = completedSteps(state => state.decrementStep)
  const setFillingForm = fillingForm(state => state.setFillingForm)
  const setModalSection = modalSection(state => state.setModalSection)
  const setAddingDetails = addingDetails(state => state.setAddingDetails)


  // Handle change 
  const handleChange = (e) => {
    const { name, value } = e.target
    addWorkExp({[name]: value})
  }

  // Handle Text Area changes
  const handleTextAreaChange = (e) => {
    const { value } = e.target
    addWorkDetailsArray(value.split("\n"))
    updateWorkExpField()
  }

  // Go back to the previous page 
  const toPreviousPage = (e) => {
    e.preventDefault()
    decrementStep()
  }

  // Go back to the previous form
  const toExperienceForm = (e) => {
    e.preventDefault()
    setFillingForm()
  }
  
  // Change state of fillingForm to false
  const fillingFormState = (e) => {
    e.preventDefault()
    if (validator.isEmpty(workExp.title && workExp.employer)) {
      toast.error(`Please enter all required fields 😞`)
      return
    }
    setFillingForm()
  }

  // Continue to Add Experience section
  const toAddExperienceSection = (e) => {
    e.preventDefault()
    // if (validator.isEmpty(workExperience.description)) {
    //   toast.error("Please enter a Work Description 😞")
    //   return
    // }
    // setWorkExperienceArray(prevArray => [workExperience,...prevArray])
    addWorkExperiencesArray()
    setModalSection()
    setAddingDetails(false)
  }

  // Add More Experience
  const addMoreExperience = (e) => {
    e.preventDefault()
    clearWorkExpField()
    setFillingForm()
    setModalSection()
    setAddingDetails(true)
  }

  // Continue to Education section
  const toResumeEducation = (e) => {
    e.preventDefault()
    incrementStep()
    setFillingForm()
    setModalSection()
    setAddingDetails(false)
  }

  // Skip Section
  const skipSection = (e) => {
    e.preventDefault()
    incrementStep()
    setAddingDetails(false)
  }

  if (fillingFormValue && !modalSectionValue) {
    return (
      <FormWindow onSubmit={fillingFormState} formTitle="Work Experience" >
        <div className="w-full flex flex-col gap-2 mb-5
          ">
          <input
            className={`input ${workExp.title == "" ? "input-warning" : "input-success"}`}
            type="text"
            placeholder="Work Title"
            value={workExp.title}
            name="title"
            onChange={handleChange}
          />
          <input
            className={`input ${workExp.employer == "" ? "input-warning" : "input-success"}`}
            type="text"
            placeholder="Employer"
            value={workExp.employer}
            name="employer"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 mb-5
          ">
          <input
            className="input "
            type="text"
            placeholder="City/Municipality"
            value={workExp.city}
            name="city"
            onChange={handleChange}
          />
          <input
            className="input "
            type="text"
            placeholder="Country"
            value={workExp.country}
            name="country"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2 mb-5
          ">
          <input
            className="input w-full"
            type="text"
            placeholder="Start Date"
            value={workExp.startDate}
            name="startDate"
            onChange={handleChange}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <div className="w-full flex flex-col ">
            <input
              disabled={workExp.currentlyWorking}
              className="input w-full"
              type="text"
              placeholder="End Date"
              value={workExp.endDate}
              name="endDate"
              onChange={handleChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
            <label className="w-full flex gap-5 mt-3 px-2 cursor-pointer">
              <span className="font-semibold">Currently Working</span>
              <input
                className="checkbox "
                type="checkbox"
                checked={workExp.currentlyWorking}
                value="Present"
                name="currentlyWorking"
                onChange={handleChange}
              />
            </label>
          </div>
          
        </div>
        
        <div className="w-full flex flex-col sm:justify-between gap-5">
          <button className=" btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
          <button type="submit" className=" btn btn-sm sm:btn-md btn-outline">Continue</button>
          <button className=" btn btn-sm sm:btn-md btn-outline" onClick={skipSection}>Skip to Education Section</button>
        </div>
      </FormWindow>
    )
  }
  else if (!fillingFormValue && !modalSectionValue) {
    return (
      <FormWindow onSubmit={toAddExperienceSection} formTitle="Work Experience Description" >
        <textarea
          className="textarea h-1/3 mb-5"
          type="text"
          placeholder="Write down your work's description."
          value={description.value}
          name="description"
          onChange={handleTextAreaChange}
        />
        <div className="w-full flex flex-col sm:justify-between gap-5">
          <button className="btn btn-sm sm:btn-md btn-outline" onClick={toExperienceForm}>Back</button>
          <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
        </div>
      </FormWindow>
    )
  }
  else if (!fillingFormValue && modalSection) {
    return (
      <FormWindow onSubmit={toResumeEducation} formTitle="Want to add more work experience?" >
        
        <div className="w-full flex flex-col sm:justify-between gap-5">
          <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
          <button className="btn btn-sm sm:btn-md btn-outline" onClick={addMoreExperience}>Add Experience</button>
          <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
        </div>
      </FormWindow>
    )
  } else {
    null
  }
}

export default ResumeExperience;
