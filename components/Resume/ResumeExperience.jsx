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
  const [workExperienceArray,setWorkExperienceArray] = useState([])
  let { step } = completedSteps

  // Handle change 
  const handleChange = (e) => {
    const { name, value } = e.target
    setWorkExperience((prev) => {
      return { ...prev, [name]: value }
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
    if (validator.isEmpty(workExperience.title)) {
      toast.error("Please enter a Work Title 😞")
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
      return { ...prev, workExperiences:workExperienceArray }
    })
    setAddExperienceSection(!addExperienceSection)
    setCompletedSteps({ step: ++step })
  }

  if (fillingForm && !addExperienceSection) {
    return (
      <FormWindow onSubmit={fillingFormState} formTitle="Work Experience" >
        <input
          className="input "
          type="text"
          placeholder="Work Title"
          value={workExperience.title}
          name="title"
          onChange={handleChange}
        />
        <input
          className="input "
          type="text"
          placeholder="Employer"
          value={workExperience.employer}
          name="employer"
          onChange={handleChange}
        />
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
        <input
          className="input "
          type="date"
          placeholder="Start Date"
          value={workExperience.startDate}
          name="startDate"
          onChange={handleChange}
        />
        <input
          disabled={workExperience.currentlyWorking}
          className="input "
          type="date"
          placeholder="End Date"
          value={workExperience.endDate}
          name="endDate"
          onChange={handleChange}
        />
        <label className="label cursor-pointer">
          <span className="label-text">Currently Working</span>
          <input
            className="checkbox "
            type="checkbox"
            checked={workExperience.currentlyWorking}
            value="Present"
            name="currentlyWorking"
            onChange={handleChange}
          />
        </label>
        <div className="btn-group justify-between">
          <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
          <button type="submit" className="btn btn-sm btn-outline">Continue</button>
        </div>
      </FormWindow>
    )
  }
  else if (!fillingForm && !addExperienceSection) {
    return (
      <FormWindow onSubmit={toAddExperienceSection} formTitle="Work Experience" >
        <textarea
          className="textarea"
          type="text"
          placeholder="Work Description"
          value={workExperience.description}
          name="description"
          onChange={handleChange}
        />
        <div className="btn-group justify-between">
          <button className="btn btn-sm btn-outline" onClick={toExperienceForm}>Back</button>
          <button type="submit" className="btn btn-sm btn-outline">Continue</button>
        </div>
      </FormWindow>
    )
  }
  else if (!fillingForm && addExperienceSection) {
    return (
      <FormWindow onSubmit={toResumeEducation} formTitle="Add More Work Experience" >

        <div className="btn-group justify-between">
          <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
          <button className="btn btn-sm btn-outline" onClick={addMoreExperience}>Add Experience</button>
          <button type="submit" className="btn btn-sm btn-outline">Continue</button>
        </div>
      </FormWindow>
    )
  } else {
    null
  }
}

export default ResumeExperience;
