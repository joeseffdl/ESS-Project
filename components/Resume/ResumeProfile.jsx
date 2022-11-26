import { useState, useContext } from "react";
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeProfile(props) {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    const [profile, setProfile] = useState({
        firstname: resumeValues.firstname,
        surname: resumeValues.surname,
        city: resumeValues.city,
        country: resumeValues.country,
        postalCode: resumeValues.postalCode,
        phoneNumber: resumeValues.phoneNumber,
        emailAddress: resumeValues.emailAddress,
    })
    let { step } = completedSteps

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile((prev) => {
            return { ...prev, [name]: value }
        })
        setResumeValues((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Go back to the previous page 
    const toPreviousPage = () => {
        setCompletedSteps({ step: --step })
    }

    // Continue to Experience section
    const toResumeExperience = (e) => {
        e.preventDefault()
        if (validator.isEmpty(profile.emailAddress)) {
            toast.error("Please enter an Email Address😞")
            return
        }
        setCompletedSteps({ step: ++step })
        console.log(profile)
    }

    return (
        <FormWindow onSubmit={toResumeExperience} formTitle={profile.hasOwnProperty("id") ? "Editing Resume Header" : "Profile Header"}>
            <input
                className="input "
                type="text"
                placeholder="First Name"
                value={profile.firstname}
                name="firstname"
                onChange={handleChange}
            />
            <input
                className="input "
                type="text"
                placeholder="Surname"
                value={profile.surname}
                name="surname"
                onChange={handleChange}
            />
            <input
                className="input "
                type="text"
                placeholder="City/Municipality"
                value={profile.city}
                name="city"
                onChange={handleChange}
            />
            <input
                className="input "
                type="text"
                placeholder="Country"
                value={profile.country}
                name="country"
                onChange={handleChange}
            />
            <input
                className="input "
                type="text"
                placeholder="Postal Code"
                value={profile.postalCode}
                name="postalCode"
                onChange={handleChange}
            />
            <input
                className="input "
                type="number"
                placeholder="Phone Number"
                value={profile.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
            />
            <input
                className="input "
                type="email"
                placeholder="Email Address"
                value={profile.emailAddress}
                name="emailAddress"
                onChange={handleChange}
            />
            <div className="btn-group justify-between">
                <button disabled className="btn btn-sm btn-outline">Back</button>
                <button type="submit" className="btn btn-sm btn-outline">Continue</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfile;
