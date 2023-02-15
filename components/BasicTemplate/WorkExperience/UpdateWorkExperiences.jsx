import { useRouter } from "next/router"
import { addingDetails, completedSteps, resumeDataStore, resumeExperienceStore } from "../../../utils/store"

function UpdateWorkExperiences() {
    const { query } = useRouter()
    const isUpdating = query.id

    const resumeData = resumeDataStore(state => state.resumeData)
    const resumeDataWorkExps = resumeData.workExperiences
    const workExp = resumeExperienceStore(state => state.workExp)
    const workExperiences = resumeExperienceStore(state => state.workExperiences)
    const steps = completedSteps(state => state.steps)
    const addingDetailsValue = addingDetails(state => state.value)

    const DisplayMappedExperiences = (experience) => (
        <div className="flex flex-col " key={experience.title}>
            <div className="flex items-center justify-center">
                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                    {experience.title && (
                        <div className="font-bold px-2">
                            {experience.title}
                        </div>
                    )}
                    {experience.employer && (
                        <div className="px-2">
                            {`${experience.employer}${experience.city ? ` - ${experience.city}` : ""}${experience.city && experience.country ? `, ${experience.country}` : `${experience.country}`}`}
                        </div>
                    )}
                    {experience.startDate || (experience.currentlyWorking || experience.endDate) ? (
                        <div className="px-2">
                            {experience.startDate}
                            {experience.startDate.length > 0 & experience.currentlyWorking.length > 0 ? `- ${experience.currentlyWorking}` : experience.currentlyWorking}
                            {experience.startDate.length > 0 & experience.endDate.length > 0 & experience.currentlyWorking != "Present"
                                ? `- ${experience.endDate}`
                                : experience.currentlyWorking != "Present" & experience.endDate.length > 0
                                    ? `End Date: ${experience.endDate}`
                                    : null
                            }
                        </div>
                    ) : null}
                </div>
            </div>
            {Array.isArray(experience.description) && (
                <div className="px-10 mb-5">
                    {experience.description.map((desc, index) => (
                        <ul className="flex list-disc list-inside" key={index}>
                            <li>{desc}</li>
                        </ul>
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <>
        {
            isUpdating &&
            resumeDataWorkExps.length > 0 &&
            !addingDetailsValue &&
            (resumeDataWorkExps[0].title.length > 0 || resumeDataWorkExps[0].employer.length > 0)
            
            ? (
                <section className="w-full relative">
                    <div className="text-center font-bold my-1">
                        {resumeDataWorkExps.length > 1 ? "Work Experiences" : "Work Experience"}
                    </div>
                        {resumeDataWorkExps?.map((experience) => {
                            return DisplayMappedExperiences(experience)
                        }
                    )}
                </section>
            )
            :   isUpdating && addingDetailsValue && steps >= 2
                
                ? (
                    <section className="w-full relative">
                        <div className={`text-center ${addingDetailsValue && steps == 2 ? "text-accent" : null} font-bold my-1`}>
                            {addingDetailsValue && steps == 2 ? "Adding Work Experience" : resumeDataWorkExps.length > 1 ? "Work Experiences" : "Work Experience"}
                        </div>
                        {resumeDataWorkExps?.map((experience) => {
                            return DisplayMappedExperiences(experience)
                        })}
                    </section>
                )
                : isUpdating && !addingDetailsValue && workExperiences.length > 0
                            
                    ? (
                        <section className="w-full relative">
                            <div className="text-center font-bold my-1">
                                {workExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
                            </div>
                            <div>
                                {workExperiences?.map((experience) => {
                                    return DisplayMappedExperiences(experience)
                                })}
                            </div>
                        </section>
                    )
                    :   isUpdating && addingDetailsValue && steps >= 2
                        ? (
                            <section className="w-full relative">
                                <div className={`text-center ${steps == 2 ? "text-accent" : null} font-bold my-1`}>
                                    {steps > 2 ? "Work Experiences" : "Adding Work Experience"}
                                </div>
                                {steps == 2 && [workExp]?.map((experience) => {
                                    return DisplayMappedExperiences(experience)
                                })}
                                {workExperiences?.map((experience) => {
                                    return DisplayMappedExperiences(experience)
                                })}
                            </section>
                        )
                        : ''
        }
    </>
    )
}

export default UpdateWorkExperiences;
