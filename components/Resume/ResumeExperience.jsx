import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeExperience(props) {
  // Data Context
  const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)
  
  // Use State
  const [experience, setExperience] = useState({
    workExpTitle: "",
    workExpEmployer: "",
    workExpCity: "",
    workExpCountry: "",
    workExpStart: "",
    workExpEnd: "",
    workExpCurrently: false,
  })
  let { step } = completedSteps

  // Handle change 
  const handleChange = (e) => {
    const { name, value } = e.target
    setExperience((prev) => {
      return { ...prev, [name]: value }
    })
  }

  // Go back to the previous page 
  const toPreviousPage = () => {
    setCompletedSteps({ step: --step })
  }
  
  // Continue to Education section
  const toResumeEducation = (e) => {
    e.preventDefault()
    if (validator.isEmpty(experience.workExpTitle)) {
      toast.error("Please enter a Work Title 😞")
      return
    }
    props.onSubmit(experience)
    setCompletedSteps({ step: ++step })
  }

  return (
    <FormWindow onSubmit={toResumeEducation} formTitle="Experience">
      <input
        className="input "
        type="text"
        placeholder="Work Title"
        value={experience.workExpTitle}
        name="workExpTitle"
        onChange={handleChange}
      />
      <input
        className="input "
        type="text"
        placeholder="Employer"
        value={experience.workExpEmployer}
        name="workExpEmployer"
        onChange={handleChange}
      />
      <input
        className="input "
        type="text"
        placeholder="City/Municipality"
        value={experience.workExpCity}
        name="workExpCity"
        onChange={handleChange}
      />
      <input
        className="input "
        type="text"
        placeholder="Country"
        value={experience.workExpCountry}
        name="workExpCountry"
        onChange={handleChange}
      />
      <input
        className="input "
        type="date"
        placeholder="Start Date"
        value={experience.workExpStart}
        name="workExpStart"
        onChange={handleChange}
      />
      <input
        disabled={experience.workExpCurrently}
        className="input "
        type="date"
        placeholder="End Date"
        value={experience.workExpEnd}
        name="workExpEnd"
        onChange={handleChange}
      />
      <div className="btn-group justify-between">
        <button className="btn btn-sm btn-outline" onClick={toPreviousPage}>Back</button>
        <button type="submit" className="btn btn-sm btn-outline">Continue</button>
      </div>
    </FormWindow>
  )
}

export default ResumeExperience;
