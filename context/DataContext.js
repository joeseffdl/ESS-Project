import { createContext, useState } from 'react'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [resumeValues, setResumeValues] = useState({
        // User Data 
        firstname: "",
        surname: "",
        city: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
        emailAddress: "",
        workExperiences: [],
        educationalBackground: [],
        skills:[],
    })

    const [completedSteps, setCompletedSteps] = useState({
        step: 1
    })


    return (
        <DataContext.Provider value={{
            resumeValues, setResumeValues,
            completedSteps, setCompletedSteps,
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContext