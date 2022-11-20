import { useContext } from "react"
import DataContext from '../../context/DataContext'

function OutputMDPI() {
    // Data Context
    const { completedSteps, setCompletedSteps, journalValues, setJournalValues } = useContext(DataContext)

    // Use State
    let { step } = completedSteps

    return (
        <>
            {
                step == 1
                ? (
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            {journalValues.title}
                        </div>
                        <div>
                            {journalValues.description}
                        </div>
                    </div>
                )
                : (
                    <div className="flex flex-col justify-center items-center">
                        This is page 2
                    </div>
                )
            }   
        </>
    )
}

export default OutputMDPI;
