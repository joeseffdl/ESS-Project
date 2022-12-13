import FormWindow from "../FormWindow";
import validator from "validator";
import { toast } from "react-toastify";
import { completedSteps, resumeDataStore, resumePersonalInformationStore } from '../../utils/store'
import { useRouter } from "next/router";

function ResumeProfile() {
    // Router
    const router = useRouter()

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const updateResumePersonalInformation = resumeDataStore(state => state.updateResumePersonalInformation)

    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    const updatePersonalInformation = resumePersonalInformationStore(state => state.updatePersonalInformation)
    const incrementStep = completedSteps(state => state.incrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        if (!router.query.id) {
            updatePersonalInformation({ [name]: value } )
        } else {
            updateResumePersonalInformation({ [name]: value } )
        }
        
    }

    // Go back to the Resume templates page
    const toResumeTemplates = (e) => {
        e.preventDefault()
        router.push("/choose-template")
    }

    // Continue to Experience section
    const toResumeExperience = (e) => {
        e.preventDefault()
        if (!router.query.id && validator.isEmpty(personalInformation.emailAddress)) {
            toast.error("Please enter an Email Address😞")
            return
        }
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toResumeExperience} formTitle={router.query.id ? "Editing Resume Header" : "Profile Header"}>
            <div className="w-full flex flex-col gap-2 mb-5
                ">
                <input
                    className="input w-full"
                    type="text"
                    placeholder="First Name"
                    value={router.query.id ? resumeData.personalInformation.firstname : personalInformation.firstname}
                    name="firstname"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Surname"
                    value={router.query.id ? resumeData.personalInformation.surname : personalInformation.surname}
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
                    value={router.query.id ? resumeData.personalInformation.city : personalInformation.city}
                    name="city"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Country"
                    value={router.query.id ? resumeData.personalInformation.country : personalInformation.country}
                    name="country"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="text"
                    placeholder="Postal Code"
                    value={router.query.id ? resumeData.personalInformation.postalCode : personalInformation.postalCode}
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
                    value={router.query.id ? resumeData.personalInformation.phoneNumber : personalInformation.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                />
                <input
                    className="input w-full"
                    type="email"
                    placeholder="Email Address"
                    value={router.query.id ? resumeData.personalInformation.emailAddress : personalInformation.emailAddress}
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
