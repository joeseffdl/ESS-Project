import { useRouter } from "next/router"
import { addingDetails, completedSteps, resumeDataStore, resumeExperienceStore } from "../../../utils/store"

function WorkExperiencesUpdate() {
    // Router
    const router = useRouter()

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const workExp = resumeExperienceStore(state => state.workExp)
    const workExperiences = resumeExperienceStore(state => state.workExperiences)
    const steps = completedSteps(state => state.steps)
    const addingDetailsValue = addingDetails(state => state.value)

    return (
        <>
        {router.query.id
            ? <>
                {(resumeData.workExperiences.length > 0 && !addingDetailsValue) && (resumeData.workExperiences[0].title != "" || resumeData.workExperiences[0].employer != "") ?
                    <section className="w-full relative">
                        <div className="text-center font-bold my-1">
                            {resumeData.workExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
                        </div>
                        <div>
                            {resumeData.workExperiences?.map((experience) => {
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
                                                {experience.employer != undefined || experience.employer != ""
                                                    ? (
                                                        <div className="px-2">
                                                            {experience.employer} {
                                                                experience.city != "" && experience.country != ""
                                                                    ? `${`- ${experience.city}${experience.country ? `,` : ``} `} ${experience.country ?? ""}`
                                                                    : `${experience.country != "" ? `- ${experience.country}` : ``} `
                                                            }
                                                        </div>
                                                    )
                                                    : null
                                                }
                                                {(experience.startDate != "") || (experience.currentlyWorking != "" || experience.endDate != "")
                                                    ? (
                                                        <div className="px-2">
                                                            {experience.startDate} {
                                                                (experience.startDate && experience.currentlyWorking) != "" || (experience.startDate && experience.endDate) != ""
                                                                    ? `- ${!experience.currentlyWorking ? experience.endDate ?? "" : experience.currentlyWorking}`
                                                                    : `${!experience.currentlyWorking ? `${`${experience.endDate ?? ""}` != "" ? `End Date: ${experience.endDate ?? ""}` : ``}` : experience.currentlyWorking}`
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
                    : <>
                        {addingDetailsValue && steps >= 2 ?
                            <section className="w-full relative">
                                <div className={`text-center ${addingDetailsValue && steps == 2 ? "text-accent" : null} font-bold my-1`}>
                                    {addingDetailsValue && steps == 2 ? "Adding Work Experience" : resumeData.workExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
                                </div>

                                {resumeData.workExperiences?.map((experience) => {
                                    return (
                                        <div className="flex flex-col " key={experience.title}>
                                            <div className="flex items-center justify-center">
                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                                                    {experience.title != ""
                                                        ? (
                                                            <div className="font-bold px-2">
                                                                {experience.title}
                                                            </div>
                                                        )
                                                        : null}

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
                            </section>
                            : ''
                        }
                    </>
                }
            </>
            : <>
                {!addingDetailsValue && workExperiences.length != 0 ?
                    <section className="w-full relative">
                        <div className="text-center font-bold my-1">
                            {workExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
                        </div>
                        <div>
                            {workExperiences?.map((experience) => {
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
                    : <>
                        {addingDetailsValue && steps >= 2 ?
                            <section className="w-full relative">
                                <div className={`text-center ${steps == 2 ? "text-accent" : null} font-bold my-1`}>
                                    {steps > 2 ? "Work Experiences" : "Adding Work Experience"}
                                </div>
                                {steps == 2 && [workExp]?.map((experience) => {
                                    return (
                                        <div className="flex flex-col " key={experience.title}>
                                            <div className="flex items-center justify-center">
                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                                                    {experience.title != ""
                                                        ? (
                                                            <div className="font-bold px-2">
                                                                {experience.title}
                                                            </div>
                                                        )
                                                        : null}

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
                                            <div className="px-10 mb-5">
                                                {experience.description
                                                    ? (
                                                        <>
                                                            {experience.description?.map((desc) => {
                                                                return (
                                                                    <ul className="flex list-disc list-inside" key={desc}>
                                                                        <li>{desc}</li>
                                                                    </ul>
                                                                )
                                                            })}
                                                        </>
                                                    )
                                                    : null}
                                            </div>
                                        </div>
                                    )
                                })}
                                {workExperiences?.map((experience) => {
                                    return (
                                        <div className="flex flex-col " key={experience.title}>
                                            <div className="flex items-center justify-center">
                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                                                    {experience.title != ""
                                                        ? (
                                                            <div className="font-bold px-2">
                                                                {experience.title}
                                                            </div>
                                                        )
                                                        : null}

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
                            </section>
                            : ''
                        }
                    </>
                }
            </>
        }
    </>
    )
}

export default WorkExperiencesUpdate;
