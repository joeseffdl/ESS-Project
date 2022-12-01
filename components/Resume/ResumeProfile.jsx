import { useState, useContext } from "react";
import { useRouter } from "next/router"
import FormWindow from "../FormWindow";
import validator from "validator"
import DataContext from "../../context/DataContext";
import { toast } from "react-toastify";

function ResumeProfile(props) {
    // Router
    const router = useRouter()

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

    // Go back to the Resume templates page
    const toResumeTemplates = (e) => {
        e.preventDefault()
        router.push("/choose-template")
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
            <div className="w-full flex flex-col gap-2 mb-5
                ">
                {/* sm:flex-row sm:justify-between */}
                <input
                className="input w-full"
                type="text"
                placeholder="First Name"
                value={profile.firstname}
                name="firstname"
                onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Surname"
                    value={profile.surname}
                    name="surname"
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex flex-col gap-2 mb-5
                ">
                <input
                    className="input w-full"
                    type="text"
                    placeholder="City/Municipality"
                    value={profile.city}
                    name="city"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Country"
                    value={profile.country}
                    name="country"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Postal Code"
                    value={profile.postalCode}
                    name="postalCode"
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex flex-col gap-2 mb-5
                ">
                <input
                className="input w-full"
                type="number"
                placeholder="Phone Number"
                value={profile.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="email"
                    placeholder="Email Address"
                    value={profile.emailAddress}
                    name="emailAddress"
                    onChange={handleChange}
                />
            </div>
            
            <div className="w-full flex flex-col sm:flex-row justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toResumeTemplates}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfile;
