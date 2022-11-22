import { useContext } from "react"
import DataContext from '../../context/DataContext'

function OutputMDPI() {
    // Data Context
    const { completedSteps, setCompletedSteps, journalValues, setJournalValues } = useContext(DataContext)

    // Use State
    let { step } = completedSteps

    if (step == 1) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div>
                    {journalValues.title}
                </div>
                <div>
                    {journalValues.description}
                </div>
            </div>
        )
    }
    else if (step == 2) {
        return (
            <div className="flex flex-col justify-center items-center">
                This is page 2
            </div>
        )
    }
    else if (step == 3) {
        return (
            <div className="flex flex-col justify-center items-center">
                This is page 3
            </div>
        )
    }
}

export default OutputMDPI;
