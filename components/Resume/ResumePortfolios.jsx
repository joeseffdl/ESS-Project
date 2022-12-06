import FormWindow from "../FormWindow";
import { toast } from "react-toastify";
import { completedSteps, resumePortfolioStore } from '../../utils/store'

function ResumePortfolios() {
    // State Management
    const userPortfolio = resumePortfolioStore(state => state.portfolio)
    const addPortfolio = resumePortfolioStore(state => state.addPortfolio)
    const incrementStep = completedSteps(state => state.incrementStep)
    const decrementStep = completedSteps(state => state.decrementStep)

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
        if (userPortfolio.length == 0) {
            toast.error("Please enter a portfolio 😞")
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
