import { resumeExperienceStore } from "../../../utils/store"

function CreateWorkExperiences() {
    // State Management
    const workExp = resumeExperienceStore(state => state.workExp)

    return (
        <section className="w-full relative">
            <div className="text-center font-bold my-1">
                Work Experience
            </div>
            <div>
                {[workExp]?.map((experience) => {
                    return (
                        <div className="flex flex-col " key={experience.title}>
                            <div className="flex items-center justify-center">
                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                                    {experience.title != ""
                                        ? (
                                            <div className="font-bold px-2">
                                                {experience.title}
                                            </div>
                                        ) : null
                                    }
                                    {experience.employer != ""
                                        ? (
                                            <div className="px-2">
                                                {experience.employer} {
                                                    experience.city && experience.country != ""
                                                        ? `${`- ${experience.city}, `} ${experience.country}`
                                                        : `${experience.country != "" ? `- ${experience.country}` : ``} `
                                                }
                                            </div>
                                        )
                                        : null
                                    }
                                    {experience.startDate || (experience.currentlyWorking || experience.endDate) != ""
                                        ? (
                                            <div className="px-2">
                                                {experience.startDate} {
                                                    (experience.startDate && experience.currentlyWorking) || (experience.startDate && experience.endDate) != ""
                                                        ? `- ${!experience.currentlyWorking ? experience.endDate : experience.currentlyWorking}`
                                                        : `${!experience.currentlyWorking ? `${`${experience.endDate}` != "" ? `End Date: ${experience.endDate}` : ``}` : experience.currentlyWorking}`
                                                }
                                            </div>
                                        )
                                        : null
                                    }
                                </div>
                            </div>
                            {experience.description ? (
                                <div className="px-10 mb-5">
                                    {experience.description?.map((desc) => {
                                        return (
                                            <ul className="flex list-disc list-inside" key={desc}>
                                                <li>{desc}</li>
                                            </ul>
                                        )
                                    })}
                                </div>
                            ) : null
                            }
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default CreateWorkExperiences;
