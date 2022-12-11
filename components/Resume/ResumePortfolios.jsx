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

function ResumePortfolios() {
    // State Management
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
    const setResumeData = resumeDataStore(state => state.setResumeData)

    // Handle change 
    const handleChange = (e) => {
        const { value } = e.target
        addPortfolio(value.split("\n"))
    }

    // Go back to the previous page 
    const toPreviousPage = (e) => {
        e.preventDefault()
        decrementStep()
    }

    // Continue to next section
    const toNextSection = (e) => {
        e.preventDefault()
        if (portfolio.length == 0) {
            toast.error("Please enter a portfolio 😞")
            return
        }
        setResumeData({
            personalInformation,
            workExperiences,
            educationalBackground,
            skills,
            profileSummary,
            certifications,
            portfolio,
        })
        incrementStep()
    }

    // Skip Section
    const skipSection = (e) => {
        e.preventDefault()
        setResumeData({
            personalInformation,
            workExperiences,
            educationalBackground,
            skills,
            profileSummary,
            certifications,
            portfolio,
        })
        incrementStep()
    }

    return (
        <FormWindow onSubmit={toNextSection} formTitle="Website Portfolio">
            <textarea
                className="textarea h-1/3 mb-5"
                placeholder="Provide the link to your website portfolio"
                // value={skills.value}
                // name="value"
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
