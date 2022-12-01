import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeExperience(props) {
  // Data Context
  const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)
  
  // Use State
  const [workExperience, setWorkExperience] = useState({
    title: "",
    employer: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  })
  const [fillingForm, setFillingForm] = useState(true)
  const [addExperienceSection, setAddExperienceSection] = useState(false)
  const [workExperienceArray, setWorkExperienceArray] = useState([])
  let { step } = completedSteps

  // Handle change 
  const handleChange = (e) => {
    const { name, value } = e.target
      setWorkExperience((prev) => {
        return { ...prev, [name]: value, details: { val: "" } }
      })
  }

  // Handle Text Area changes
  const handleTextAreaChange = (e) => {
    const { name, value } = e.target
    setWorkExperience((prev) => {
      return { ...prev, [name]: value, details:[value.split("\n")] }
    })
  }

  // Go back to the previous page 
  const toPreviousPage = (e) => {
    e.preventDefault()
    setCompletedSteps({ step: --step })
  }

  // Go back to the previous form
  const toExperienceForm = (e) => {
    e.preventDefault()
    setFillingForm(!fillingForm)
  }
  
  // Change state of fillingForm to false
  const fillingFormState = (e) => {
    e.preventDefault()
    if (validator.isEmpty(workExperience.title && workExperience.employer)) {
      toast.error(`Please enter all required fields 😞`)
      return
    }
    props.onSubmit(workExperience)
    setFillingForm(!fillingForm)
  }

  // Continue to Add Experience section
  const toAddExperienceSection = (e) => {
    e.preventDefault()
    if (validator.isEmpty(workExperience.description)) {
      toast.error("Please enter a Work Description 😞")
      return
    }
    setWorkExperienceArray(prevArray => [workExperience,...prevArray])
    setAddExperienceSection(!addExperienceSection)
    props.onSubmit(workExperienceArray)
  }

  // Add More Experience
  const addMoreExperience = (e) => {
    e.preventDefault()
    setWorkExperience({
      title: "",
      employer: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    })
    setFillingForm(!fillingForm)
    setAddExperienceSection(!addExperienceSection)
  }

  // Continue to Education section
  const toResumeEducation = (e) => {
    e.preventDefault()
    setResumeValues((prev) => {
      return { ...prev, workExperiences: [...workExperienceArray, ...prev.workExperiences,] }
    })
    
    setCompletedSteps({ step: ++step })
  }

  // To Education Section
  const toEducationSection = (e) => {
    e.preventDefault()
    setCompletedSteps({ step: ++step })
  }

  if (fillingForm && !addExperienceSection) {
    return (
      <FormWindow onSubmit={fillingFormState} formTitle="Work Experience" >
        <div className="w-full flex flex-col gap-2 mb-5
          ">
          <input
            className={`input ${workExperience.title == "" ? "input-error" : "input-success"}`}
            type="text"
            placeholder="Work Title"
            value={workExperience.title}
            name="title"
            onChange={handleChange}
          />
          <input
            className={`input ${workExperience.employer == "" ? "input-error" : "input-success"}`}
            type="text"
            placeholder="Employer"
            value={workExperience.employer}
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
            value={workExperience.city}
            name="city"
            onChange={handleChange}
          />
          <input
            className="input "
            type="text"
            placeholder="Country"
            value={workExperience.country}
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
            value={workExperience.startDate}
            name="startDate"
            onChange={handleChange}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <div className="w-full flex flex-col ">
            <input
              disabled={workExperience.currentlyWorking}
              className="input w-full"
              type="text"
              placeholder="End Date"
              value={workExperience.endDate}
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
                checked={workExperience.currentlyWorking}
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
          <button className=" btn btn-sm sm:btn-md btn-outline" onClick={toEducationSection}>Skip to Education Section</button>
        </div>
      </FormWindow>
    )
  }
  else if (!fillingForm && !addExperienceSection) {
    return (
      <FormWindow onSubmit={toAddExperienceSection} formTitle="Work Experience Description" >
        <textarea
          className="textarea h-1/3 mb-5"
          type="text"
          placeholder="Write down your work's description."
          value={workExperience.description}
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
  else if (!fillingForm && addExperienceSection) {
    return (
      <FormWindow onSubmit={toResumeEducation} formTitle="Preview Work Experience" >
        <div className="flex justify-center">
          {resumeValues.workExperiences != "" ?
            `${
              resumeValues.workExperiences?.map((experience) => {
                <div className="w-full bg-red-200">
                  awdawd{experience.title}
                </div>
              })
            }`: null}
        </div>
        <div className="w-full flex justify-between gap-5">
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
