import { useContext } from "react"
import DataContext from '../../context/DataContext'

function OutputResume() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    let { step } = completedSteps

    return (
        <>
        {
            step >= 1 ?
                (
                    <div className="h-full flex flex-col justify-center items-center">
                        <section className="w-full border-2 border-red-900">
                            <div>
                                Profile Section
                            </div>
                            {resumeValues.firstname} {resumeValues.surname} <br />
                            {resumeValues.city} {resumeValues.country} <br />
                            {resumeValues.postalCode} {resumeValues.phoneNumber} <br />
                            {resumeValues.emailAddress} <br />
                        </section>
                        <section className="w-full border-2 border-green-900">
                            <div>
                                Experience Section
                            </div>
                            {resumeValues.workExpTitle} {resumeValues.workExpEmployer} <br />
                            {resumeValues.workExpCity} {resumeValues.workExpCountry} <br />
                            {resumeValues.workExpStart} {resumeValues.workExpEnd} <br />
                            {resumeValues.workExpCurrently}    
                        </section>
                            <section className="w-full border-2 border-blue-900">
                            <div>
                                Education Section
                            </div>
                            {resumeValues.institutionName} {resumeValues.institutionLocation} <br />
                            {resumeValues.degreeType} {resumeValues.fieldOfStudy} <br />
                            {resumeValues.graduationMonth} {resumeValues.graduationYear} <br />
                            {resumeValues.currentlyStudying} 
                        </section>
                            <section className="w-full border-2 border-yellow-900">
                            <div>
                                Skills Section
                            </div>
                            {resumeValues.skills}
                        </section>
                    </div>
                )
            : null
        }
    </>
    )
}

export default OutputResume;
