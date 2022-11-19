import { useContext } from "react"
import DataContext from '../context/DataContext'

function BaseTemplate({ children }) {
    // Data Context
    const { completedSteps, setCompletedSteps, journalValues, setJournalValues } = useContext(DataContext)


    return (
        <div className="flex w-full">
            <div className="bg-neutral-focus w-full h-screen hidden p-5
                md:block">
                <div className="w-full h-full bg-neutral shadow-2xl rounded-xl border-2 border-neutral-focus/75">
                    { children }
                </div>
            </div>
            <div className="bg-neutral w-full h-screen p-5">
                <div className="bg-white w-full h-full flex items-center justify-center text-black rounded-xl">
                    {journalValues.description}
                </div>
            </div>
        </div>
  )
}

export default BaseTemplate;
