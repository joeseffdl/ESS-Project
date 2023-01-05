import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import { completedSteps, resumeDataStore, resumePersonalInformationStore } from '../../utils/store';
import FormWindow from "../FormWindow";


function ResumeProfile() {
    // Router
    const router = useRouter()

    // Edit State
    const resumeData = resumeDataStore(state => state.resumeData)
    const initialResumeData = resumeDataStore(state => state.initialResumeData)
    
    // Edit State Functions
    const updateResumePersonalInformation = resumeDataStore(state => state.updateResumePersonalInformation)
    const setInitialResumeData = resumeDataStore(state => state.setInitialResumeData)

    // States
    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    
    // State Functions
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
    const toResumeExperience = async (e) => {
        e.preventDefault()
        if (!router.query.id && _.isEmpty(personalInformation.emailAddress)) {
            toast.error("Please enter an Email Address😞")
            return
        } else if (!_.isEqual(initialResumeData.personalInformation, resumeData.personalInformation)) {
            try {
                const docRef = doc(db, "resumes", router.query.id)
                const docSnap = await getDoc(docRef)
                const updatedResume = {
                    ...docSnap.data(),
                    resumeData: {
                        ...docSnap.data().resumeData,
                        personalInformation: resumeData.personalInformation
                    },
                    lastUpdatedOn: serverTimestamp()
                }
                await updateDoc(docRef, updatedResume)
                setInitialResumeData(resumeData)
                toast.success("Resume updated successfully 😄")
            } catch(err) {
                console.log(err)
            }
        }
        incrementStep()
    }
    
    return (
        <FormWindow onSubmit={toResumeExperience} formTitle={router.query.id ? "Editing Resume Header" : "Profile Header"}>
            <div className="w-full flex flex-col gap-2 mb-5
                ">
                <input
                    className="input rounded-lg focus:outline-none w-full"
                    type="text"
                    placeholder="First Name"
                    value={router.query.id ? resumeData.personalInformation.firstname : personalInformation.firstname}
                    name="firstname"
                    onChange={handleChange}
                />
                <input
                    className="input rounded-lg focus:outline-none w-full"
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
                    className="input rounded-lg focus:outline-none w-full"
                    type="text"
                    placeholder="City/Municipality"
                    value={router.query.id ? resumeData.personalInformation.city : personalInformation.city}
                    name="city"
                    onChange={handleChange}
                />
                <input
                    className="input rounded-lg focus:outline-none w-full"
                    type="text"
                    placeholder="Country"
                    value={router.query.id ? resumeData.personalInformation.country : personalInformation.country}
                    name="country"
                    onChange={handleChange}
                />
                <input
                    className="input rounded-lg focus:outline-none w-full"
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
                    className="input rounded-lg border-0 focus:outline-none w-full"
                    type="number"
                    placeholder="Phone Number"
                    value={router.query.id ? resumeData.personalInformation.phoneNumber : personalInformation.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                />
                <input
                    className={`input rounded-lg focus:outline-none w-full border-2 ${_.isEmpty(personalInformation.emailAddress) ? "input-warning" : "input-success"}`}
                    type="email"
                    placeholder="Email Address"
                    value={router.query.id ? resumeData.personalInformation.emailAddress : personalInformation.emailAddress}
                    name="emailAddress"
                    onChange={handleChange}
                />
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toResumeTemplates}>Back</button>
                <button type="submit" disabled={router.query.id && _.isEmpty(resumeData.personalInformation)} className="btn btn-sm sm:btn-md btn-outline btn-accent">{ router.query.id && (!_.isEqual(initialResumeData.personalInformation, resumeData.personalInformation)) ? "Update" : "Continue" }</button>
            </div>
        </FormWindow>
    )
}

export default ResumeProfile;
