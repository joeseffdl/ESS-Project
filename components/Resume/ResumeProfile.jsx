import { useRouter } from "next/router";
import FormWindow from "../FormWindow";
import validator from "validator";
import { toast } from "react-toastify";
import { completedSteps, resumePersonalInformationStore } from '../../utils/store'

function ResumeProfile(props) {
    // Router
    const router = useRouter()

    // State Management
    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    const updatePersonalInformation = resumePersonalInformationStore(state => state.updatePersonalInformation)
    const incrementStep = completedSteps(state => state.incrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        updatePersonalInformation({ [name]: value } )
    }

    // Go back to the Resume templates page
    const toResumeTemplates = (e) => {
        e.preventDefault()
        router.push("/choose-template")
    }

    // Continue to Experience section
    const toResumeExperience = (e) => {
        e.preventDefault()
        if (validator.isEmpty(personalInformation.emailAddress)) {
            toast.error("Please enter an Email Address😞")
            return
        }
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toResumeExperience} formTitle={personalInformation.hasOwnProperty("id") ? "Editing Resume Header" : "Profile Header"}>
            <div className="w-full flex flex-col gap-2 mb-5
                ">
                {/* sm:flex-row sm:justify-between */}
                <input
                    className="input w-full"
                    type="text"
                    placeholder="First Name"
                    value={personalInformation.firstname}
                    name="firstname"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Surname"
                    value={personalInformation.surname}
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
                    value={personalInformation.city}
                    name="city"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Country"
                    value={personalInformation.country}
                    name="country"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Postal Code"
                    value={personalInformation.postalCode}
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
                    value={personalInformation.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="email"
                    placeholder="Email Address"
                    value={personalInformation.emailAddress}
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
