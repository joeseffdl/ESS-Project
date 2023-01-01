import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import {
    completedSteps,
    resumeCertificationStore,
    resumeDataStore,
    resumeEducationStore,
    resumeExperienceStore,
    resumePersonalInformationStore,
    resumePortfolioStore,
    resumeProfileSummaryStore,
    resumeSkillsStore,
} from '../../utils/store';
import FormWindow from "../FormWindow";

function ResumePortfolios() {
    // Router
    const router = useRouter()

    // Edit States
    const resumeData = resumeDataStore(state => state.resumeData)
    const initialResumeData = resumeDataStore(state => state.initialResumeData)

    // Edit States Functions
    const updateResumePortfolio = resumeDataStore(state => state.updateResumePortfolio)
    const setInitialResumeData = resumeDataStore(state => state.setInitialResumeData)
    
    // States
    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    const workExperiences = resumeExperienceStore(state => state.workExperiences)
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const skills = resumeSkillsStore(state => state.skills)
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    const certifications = resumeCertificationStore(state => state.certifications)
    const portfolio = resumePortfolioStore(state => state.portfolio)
    
    // States Functions
    const setResumeData = resumeDataStore(state => state.setResumeData)
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
    const toNextSection = async (e) => {
        e.preventDefault()
        if (!router.query.id && _.isEmpty(portfolio)) {
            toast.error("Please enter a portfolio 😞")
            return
        } else if (!router.query.id) {
            setResumeData({
                personalInformation,
                workExperiences,
                educationalBackground,
                skills,
                profileSummary,
                certifications,
                portfolio,
            })
        } else if (!_.isEqual(initialResumeData.portfolio, resumeData.portfolio)) {
            try {
                const docRef = doc(db, "resumes", router.query.id)
                const docSnap = await getDoc(docRef)
                const updatedResume = {
                    ...docSnap.data(),
                    resumeData: {
                        ...docSnap.data().resumeData,
                        portfolio: resumeData.portfolio
                    },
                    lastUpdatedOn: serverTimestamp()
                }
                await updateDoc(docRef, updatedResume)
                setInitialResumeData(resumeData)
                toast.success("Resume updated successfully 😄")
            } catch (err) {
                console.log(err)
            }
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
                <button className="btn btn-sm sm:btn-md btn-outline btn-accent" onClick={toPreviousPage}>Back</button>
                <button type="submit" className="btn btn-sm sm:btn-md btn-outline btn-accent">{router.query.id && (!_.isEqual(initialResumeData.portfolio, resumeData.portfolio)) ? "Update" : "Continue"}</button>
                <button className=" btn btn-sm sm:btn-md btn-outline btn-accent" onClick={skipSection}>Skip this Section</button>
            </div>
        </FormWindow>
    )
}


export default ResumePortfolios;
