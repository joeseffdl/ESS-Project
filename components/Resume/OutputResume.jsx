import { useContext } from "react"
import DataContext from '../../context/DataContext'

function OutputResume() {
    // Data Context
    const { completedSteps, setCompletedSteps, resumeValues, setResumeValues } = useContext(DataContext)

    // Use State
    let { step } = completedSteps

    // Initialize Current Year

    return (
    <>
        <div className="h-full p-5">
            <div className="h-full text-xs divide-y-2 divide-blue-900">
                <section className="w-full ">
                    <div className="text-center text-3xl font-semibold my-4 tracking-widest">
                        {resumeValues.firstname || resumeValues.surname != "" ? `${resumeValues.firstname.toUpperCase()} ${resumeValues.surname.toUpperCase()}` : "FIRST NAME SURNAME"}
                    </div>
                    <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 mx-32 divide-x">
                        {resumeValues.emailAddress != ""
                            ? (
                                <div className="px-2">
                                    {resumeValues.emailAddress}
                                </div>
                                )
                            : null}
                            <div className="px-2">
                            {resumeValues.phoneNumber}
                        </div>
                            <div className="px-2">
                                {resumeValues.city != "" ? `${resumeValues.city}, ` : null} {resumeValues.country} {resumeValues.postalCode}
                        </div>
                    </div>
                </section>
                {resumeValues.profileSummary != ""
                    ? (
                    <section className="w-full ">
                        <div className="text-center font-bold my-1">
                            Profile Summary
                        </div>        
                        <div className="w-auto break-words text-center mx-10 my-3 divide-x">
                            {resumeValues.profileSummary.value}
                        </div>
                    </section>
                    ): null
                }
                
                {resumeValues.skills != "" ? (
                    <section className="w-full px-10 pb-5">
                        <div className="text-center font-bold my-1">
                            Skills
                        </div>
                        <div className="grid grid-cols-2 justify-center items-center ">
                            {resumeValues.skills[0]?.map((skill) => {
                                return (
                                    <ul className="flex list-disc list-inside" key={skill}>
                                        <li>{skill}</li>
                                    </ul>
                                )
                            })}
                        </div>
                    </section>
                ) : null}
                {resumeValues.workExperiences != "" && resumeValues.workExperiences[0].details ? (
                    <section className="w-full relative">
                        <div className="text-center font-bold my-1">
                            Experience
                        </div>
                        <div>
                            {resumeValues.workExperiences?.map((experience) => {
                                return (
                                    <div className="flex flex-col " key={experience.title}>
                                        <div className="flex items-center justify-center">
                                            <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                                                <div className="font-bold px-2">
                                                    {experience.title}
                                                </div>
                                                {experience.employer && experience.city && experience.country != ""
                                                    ? (
                                                    <div className="px-2">
                                                        {experience.employer} - { experience.city}, {experience.country}
                                                    </div>
                                                    )
                                                    : null
                                                }
                                                {experience.startDate && (experience.currentlyWorking || experience.endDate) != ""
                                                    ? (
                                                    <div className="px-2">
                                                        {experience.startDate} - { !experience.currentlyWorking ? experience.endDate : experience.currentlyWorking}
                                                    </div>
                                                    )
                                                    : null 
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="px-10 mb-5">
                                            {experience.details[0]?.map((detail) => {
                                                return (
                                                    <ul className="flex list-disc list-inside" key={detail}>
                                                        <li>{detail}</li>
                                                    </ul>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    ) : null}
                    {resumeValues.educationalBackground != "" && resumeValues.educationalBackground[0].details ? (
                    <section className="w-full px-5">
                        <div className="text-center font-bold my-1">
                            Education
                        </div>
                        {resumeValues.educationalBackground.map((education) => {
                            return (
                                <div className="flex flex-col " key={education.institutionName}>
                                    <div className="flex items-center justify-center">
                                        <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                            <div className="px-2">
                                                {education.institutionName}
                                            </div>
                                            {education.institutionLocation && (education.graduationYear || education.graduationMonth) != ""
                                                ? (
                                                    <>
                                                    <div className="px-2">
                                                        {education.institutionLocation}
                                                    </div>
                                                    <div className="px-2">
                                                        {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                    </div>
                                                    </>
                                                )
                                                : null
                                            }
                                        </div>
                                    </div>
                                    {education.degreeType != ""
                                        ? (
                                        <div className="text-center my-3">
                                            <span className="font-bold">{education.degreeType}{education.degreeType != "High School Diploma" || education.degreeType === ("GED") ? ":" : null}</span> {education.fieldOfStudy}
                                        </div>
                                        )
                                        : null
                                    }
                                    
                                    <div className="px-5 mb-5">
                                        {education.details[0]?.map((detail) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={detail}>
                                                    <li>{detail}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                ) : null}
            </div>
        </div>
    </>
    )
}

export default OutputResume;
