import FormWindow from "../FormWindow";
import { toast } from "react-toastify";
import {
    resumePersonalInformationStore,
    resumeExperienceStore,
    resumeEducationStore,
    resumeSkillsStore,
    resumeProfileSummaryStore,
    resumeCertificationStore,
    resumePortfolioStore,
    resumeDataStore,
    completedSteps,
} from '../../utils/store'
import { useRouter } from "next/router";

function ResumePortfolios() {
    // Router
    const router = useRouter()

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const updateResumePortfolio = resumeDataStore(state => state.updateResumePortfolio)
    const setResumeData = resumeDataStore(state => state.setResumeData)

    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    const workExperiences = resumeExperienceStore(state => state.workExperiences)
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const skills = resumeSkillsStore(state => state.skills)
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    const certifications = resumeCertificationStore(state => state.certifications)

    const portfolio = resumePortfolioStore(state => state.portfolio)
    const addPortfolio = resumePortfolioStore(state => state.addPortfolio)
    
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        if (!router.query.id) {
            addPortfolio(value.split("\n"))
        } else {
            updateResumePortfolio(value.split("\n"))
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
        if (!router.query.id && portfolio.length == 0) {
            toast.error("Please enter a portfolio 😞")
            return
        }
        if (!router.query.id) {
            setResumeData({
                personalInformation,
                workExperiences,
                educationalBackground,
                skills,
                profileSummary,
                certifications,
                portfolio,
            })
        }

        incrementStep()
    }

    // Skip Section
    const skipSection = (e) => {
        e.preventDefault()
        if (!router.query.id) {
            setResumeData({
                personalInformation,
                workExperiences,
                educationalBackground,
                skills,
                profileSummary,
                certifications,
                portfolio,
            })
        }
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toNextSection} formTitle="Website Portfolio">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Provide the link to your website portfolio"
                value={router.query.id ? resumeData.portfolio.join("\n") : portfolio}
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


export default ResumePortfolios;
