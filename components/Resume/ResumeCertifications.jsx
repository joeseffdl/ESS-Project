import FormWindow from "../FormWindow";
import { toast } from "react-toastify";
import { completedSteps, resumeDataStore, resumeCertificationStore } from '../../utils/store'
import { useRouter } from "next/router";

function ResumeCertifications() {
    // Router
    const router = useRouter()

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const updateResumeCertifications = resumeDataStore(state => state.updateResumeCertifications)

    const userCertifications = resumeCertificationStore(state => state.certifications)
    const addCertifications = resumeCertificationStore(state => state.addCertifications)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        if (!router.query.id) {
            addCertifications(value.split("\n"))
        } else {
            updateResumeCertifications(value.split("\n"))
        }
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to next section
    const toNextSection = (e) => {
        e.preventDefault()
        if (!router.query.id && userCertifications.length == 0) {
            toast.error("Please enter a certificate 😞")
            return
        }
        incrementStep()
    }

    // Skip Section
    const skipSection = (e) => {
        e.preventDefault()
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toNextSection} formTitle="Certifications">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Write down your certificates"
                value={router.query.id ? resumeData.certifications.join("\n") : userCertifications}
                onChange={handleChange}
            />
            <div className="w-full flex flex-col sm:justify-between gap-5">
                <button className="btn btn-sm sm:btn-md btn-outline" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline">Continue</button>
                <button className=" btn btn-sm sm:btn-md btn-outline" onClick={skipSection}>Skip this Section</button>
            </div>
        </FormWindow>
    )
}

export default ResumeCertifications;
