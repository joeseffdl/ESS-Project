import { createContext, useState } from 'react'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [journalValues, setJournalValues] = useState({
        // User Data 
        title: "",
        description: "",

    })

    const [completedSteps, setCompletedSteps] = useState({
        step: 1
    })


    return (
        <DataContext.Provider value={{
            journalValues, setJournalValues,
            completedSteps, setCompletedSteps,
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContext