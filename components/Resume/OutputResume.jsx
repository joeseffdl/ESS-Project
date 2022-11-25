import { useContext } from "react"
import DataContext from '../../context/DataContext'

function OutputResume() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    let { step } = completedSteps

    if (step == 1) {
        return (
            <div className="border-4 h-full">
                <div>
                    {resumeValues.firstname}
                </div>
                <div>
                    {resumeValues.surname}
                </div>
            </div>
        )
    }
    else if (step == 2) {
        return (
            <div className="h-full flex justify-center items-center">
                Experience Page
            </div>
        )
    }
    else if (step == 3) {
        return (
            <div className="h-full flex justify-center items-center">
                Education Page
            </div>
        )
    }
    else if (step == 4) {
        return (
            <div className="h-full flex justify-center items-center">
                Skills Page
            </div>
        )
    }
    else if (step == 5) {
        return (
            <div className="h-full flex justify-center items-center">
                More Sections Page
            </div>
        )
    }
    else {
        return (
            null
        )
    }
}

export default OutputResume;
