import {
    resumePersonalInformationStore,
    resumeExperienceStore,
    resumeEducationStore,
    resumeSkillsStore,
    resumeProfileSummaryStore,
    resumeCertificationStore,
    resumePortfolioStore,
    resumeDataStore,
    completedSteps,
    addingDetails,
} from "../../utils/store"
import { useRouter } from "next/router"


function OutputResume({
    personalInformation: viewPersonalInformation,
    workExperiences: viewWorkExperiences,
    educationalBackground: viewEducationalBackground,
    skills: viewSkills,
    certifications: viewCertifications,
    portfolio: viewPortfolio,
    profileSummary: viewProfileSummary,
}) {
    // Router
    const router = useRouter()
    const routerID = router.query.resume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    const workExp = resumeExperienceStore(state => state.workExp)
    const workExperiences = resumeExperienceStore(state => state.workExperiences)
    const educationField = resumeEducationStore(state => state.educationField)
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const userSkills = resumeSkillsStore(state => state.skills)
    const userCertifications = resumeCertificationStore(state => state.certifications)
    const userPortfolio = resumePortfolioStore(state => state.portfolio)
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)
    const steps = completedSteps(state => state.steps)
    const addingDetailsValue = addingDetails(state => state.value)


    return (
        <>
            <div className="h-full p-8">
                <div className="h-full text-xs divide-y-2 divide-blue-900">

                    {/* PERSONAL INFORMATION SECTION */}
                    {routerID
                        ? (
                            <section className="w-full ">
                                <div className="text-center text-3xl font-semibold my-4 tracking-widest">
                                    {viewPersonalInformation.firstname || viewPersonalInformation.surname != "" ? `${viewPersonalInformation.firstname.toUpperCase()} ${viewPersonalInformation.surname.toUpperCase()}` : "FIRST NAME SURNAME"}
                                </div>
                                <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 mx-32 divide-x">
                                    {viewPersonalInformation.emailAddress != ""
                                        ? (
                                            <div className="px-2">
                                                {viewPersonalInformation.emailAddress}
                                            </div>
                                        )
                                        : null}
                                    {viewPersonalInformation.phoneNumber != ""
                                        ? <div className="px-2">
                                            {viewPersonalInformation.phoneNumber}
                                        </div>
                                        : ``
                                    }

                                    {viewPersonalInformation.city || viewPersonalInformation.country != ``
                                        ? <div className="px-2">
                                            {viewPersonalInformation.city != "" ? `${viewPersonalInformation.city}, ` : ``} {viewPersonalInformation.country} {viewPersonalInformation.postalCode}
                                        </div>
                                        : ``
                                    }
                                </div>
                            </section>
                        )
                        : (
                            <section className="w-full ">
                                <div className="text-center text-3xl font-semibold my-4 tracking-widest">
                                    {router.query.id
                                        ? <>
                                            {resumeData.personalInformation.firstname || resumeData.personalInformation.surname != "" ? `${resumeData.personalInformation.firstname?.toUpperCase()} ${resumeData.personalInformation.surname?.toUpperCase()}` : ""}
                                        </>
                                        : <>
                                            {personalInformation.firstname || personalInformation.surname != "" ? `${personalInformation.firstname.toUpperCase()} ${personalInformation.surname.toUpperCase()}` : "FIRST NAME SURNAME"}
                                        </>
                                    }
                                    
                                </div>
                                <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 mx-32 divide-x">
                                    {router.query.id
                                        ? <>
                                            {resumeData.personalInformation.emailAddress != ""
                                                ? (
                                                    <div className="px-2">
                                                        {resumeData.personalInformation.emailAddress}
                                                    </div>
                                                )
                                                : ``}

                                            {resumeData.personalInformation.phoneNumber != ""
                                                ? <div className="px-2">
                                                    {resumeData.personalInformation.phoneNumber}
                                                </div>
                                                : ``
                                            }

                                            {resumeData.personalInformation.city || resumeData.personalInformation.country != ``
                                                ? <div className="px-2">
                                                    {resumeData.personalInformation.city != "" ? `${resumeData.personalInformation.city}, ` : ``} {resumeData.personalInformation.country} {resumeData.personalInformation.postalCode}
                                                </div>
                                                : ``
                                            }
                                        </>
                                        : <>
                                            {personalInformation.emailAddress != ""
                                                ? (
                                                    <div className="px-2">
                                                        {personalInformation.emailAddress}
                                                    </div>
                                                )
                                                : ``}

                                            {personalInformation.phoneNumber != ""
                                                ? <div className="px-2">
                                                    {personalInformation.phoneNumber}
                                                </div>
                                                : ``
                                            }

                                            {personalInformation.city || personalInformation.country != ``
                                                ? <div className="px-2">
                                                    {personalInformation.city != "" ? `${personalInformation.city}, ` : ``} {personalInformation.country} {personalInformation.postalCode}
                                                </div>
                                                : ``
                                            }
                                        </>
                                    }
                                    
                                </div>
                            </section>
                        )
                    }


                    {/* PROFILE SUMMARY SECTION */}
                    {routerID
                        ? (
                            <>
                                {viewProfileSummary != ""
                                    ? (
                                        <section className="w-full ">
                                            <div className="text-center font-bold my-1">
                                                Profile Summary
                                            </div>
                                            <div className="w-auto break-words text-center mx-10 my-3 divide-x">
                                                {viewProfileSummary}
                                            </div>
                                        </section>
                                    ) : null
                                }
                            </>
                        )
                        : (
                            <>
                                {router.query.id
                                    ? <>
                                        {resumeData.profileSummary != ""
                                            ? (
                                                <section className="w-full ">
                                                    <div className="text-center font-bold my-1">
                                                        Profile Summary
                                                    </div>
                                                    <div className="w-auto break-words text-center mx-10 my-3 divide-x">
                                                        {resumeData.profileSummary}
                                                    </div>
                                                </section>
                                            ) : null
                                        }
                                    </>
                                    : <>
                                        {profileSummary != ""
                                            ? (
                                                <section className="w-full ">
                                                    <div className="text-center font-bold my-1">
                                                        Profile Summary
                                                    </div>
                                                    <div className="w-auto break-words text-center mx-10 my-3 divide-x">
                                                        {profileSummary}
                                                    </div>
                                                </section>
                                            ) : null
                                        }
                                    </>
                                }
                                
                            </>
                        )
                    }


                    {/* SKILLS SECTION */}
                    {routerID
                        ? (<>
                            {viewSkills != "" ? (
                                <section className="w-full px-10 pb-5">
                                    <div className="text-center font-bold my-1">
                                        Skills
                                    </div>
                                    <div className="grid grid-cols-2 justify-center items-center ">
                                        {viewSkills?.map((skill) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={skill}>
                                                    <li>{skill}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </section>
                            ) : null}
                        </>)
                        : (<>
                            {router.query.id
                                ? <>
                                    {resumeData.skills != "" ? (
                                        <section className="w-full px-10 pb-5">
                                            <div className="text-center font-bold my-1">
                                                Skills
                                            </div>
                                            <div className="grid grid-cols-2 justify-center items-center ">
                                                {resumeData.skills?.map((skill) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" key={skill}>
                                                            <li>{skill}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    ) : null}
                                </>
                                : <>
                                    {userSkills != "" ? (
                                        <section className="w-full px-10 pb-5">
                                            <div className="text-center font-bold my-1">
                                                Skills
                                            </div>
                                            <div className="grid grid-cols-2 justify-center items-center ">
                                                {userSkills?.map((skill) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" key={skill}>
                                                            <li>{skill}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    ) : null}
                                </>
                            }
                        </>)
                    }


                    {/* WORK EXPERIENCE SECTION */}
                    {(workExperiences.length == 0) && (workExp.title || workExp.employer) !== '' && !router.query.id ? (
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
                    ) :

                        <>
                            {routerID
                                ? (<>
                                    {
                                        viewWorkExperiences.length > 0
                                            ? (
                                                <section className="w-full relative">
                                                    <div className="text-center font-bold my-1">
                                                        {viewWorkExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
                                                    </div>
                                                    <div>
                                                        {viewWorkExperiences?.map((experience) => {
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
                                            : ``
                                    }
                                </>)
                                : (
                                    <>
                                        {router.query.id
                                            ? <>
                                                {(resumeData.workExperiences.length > 0 && !addingDetailsValue) && (resumeData.workExperiences[0].title != "" || resumeData.workExperiences[0].employer != "") ?
                                                    <section className="w-full relative">
                                                        <div className="text-center font-bold my-1">
                                                            {resumeData.workExperiences.length > 1 ? "Work Experiences" :  "Work Experience"}
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
                                                                <div className={`text-center ${addingDetailsValue && steps == 2 ? "text-accent" : null} font-bold my-1`}>
                                                                    {addingDetailsValue  && steps == 2 ? "Adding Work Experience" : resumeData.workExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
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
                        </>
                    }

                    {/* EDUCATION SECTION */}
                    {(educationalBackground.length == 0) && (educationField.institutionName || educationField.degreeType !== '') && !router.query.id ? (
                        <section className="w-full px-5">
                            <div className="text-center font-bold my-1">
                                Education
                            </div>
                            <div>
                                {[educationField].map((education) => {
                                    return (
                                        <div className="flex flex-col " key={education.institutionName}>
                                            <div className="flex items-center justify-center">
                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                    {education.institutionName != ""
                                                        ? (
                                                            <div className="px-2">
                                                                {education.institutionName}
                                                            </div>
                                                        ) : null
                                                    }
                                                    {education.institutionLocation || education.graduationYear || education.graduationMonth != ""
                                                        ? (
                                                            <>
                                                                {education.institutionLocation != "" ?
                                                                    <div className="px-2">
                                                                        {education.institutionLocation}
                                                                    </div>
                                                                    : null
                                                                }
                                                                {education.graduationYear || education.graduationMonth != "" ? (
                                                                    <div className="px-2">
                                                                        {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                    </div>
                                                                )
                                                                    : null
                                                                }
                                                            </>
                                                        )
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            {education.degreeType != ""
                                                ? (
                                                    <div className="text-center my-3">
                                                        <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                    </div>
                                                )
                                                : null
                                            }
                                            {education.description ? (
                                                <div className="px-5 mb-5">
                                                    {education.description?.map((detail) => {
                                                        return (
                                                            <ul className="flex list-disc list-inside" key={detail}>
                                                                <li>{detail}</li>
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
                    ) :
                        <>
                            {routerID 
                                ? (<>
                                    {
                                        viewEducationalBackground.length > 0
                                            ? <section className="w-full px-5">
                                                <div className="text-center font-bold my-1">
                                                    Educational Background
                                                </div>
                                                <div>
                                                    {viewEducationalBackground.map((education) => {
                                                        return (
                                                            <div className="flex flex-col " key={education.institutionName}>
                                                                <div className="flex items-center justify-center">
                                                                    <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                                        {education.institutionName != ""
                                                                            ? (
                                                                                <div className="px-2">
                                                                                    {education.institutionName}
                                                                                </div>
                                                                            ) : null
                                                                        }
                                                                        {education.institutionLocation || (education.graduationYear || education.graduationMonth) != ""
                                                                            ? (
                                                                                <>
                                                                                    {education.institutionLocation != "" ?
                                                                                        <div className="px-2">
                                                                                            {education.institutionLocation}
                                                                                        </div>
                                                                                        : null
                                                                                    }
                                                                                    {education.graduationYear || education.graduationMonth != "" ? (
                                                                                        <div className="px-2">
                                                                                            {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                                        </div>
                                                                                    )
                                                                                        : null
                                                                                    }
                                                                                </>
                                                                            )
                                                                            : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {education.degreeType != ""
                                                                    ? (
                                                                        <div className="text-center my-3">
                                                                            <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                        </div>
                                                                    )
                                                                    : null
                                                                }
                                                                {education.description ? (
                                                                    <div className="px-5 mb-5">
                                                                        {education.description?.map((detail) => {
                                                                            return (
                                                                                <ul className="flex list-disc list-inside" key={detail}>
                                                                                    <li>{detail}</li>
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
                                            : ``
                                    }
                                </>
                                )
                                : (
                                    <>
                                        {router.query.id
                                            ? <>
                                                {(resumeData.educationalBackground.length > 0 && !addingDetailsValue) && (resumeData.educationalBackground[0].institutionName != "" || resumeData.educationalBackground[0].degreeType != "") ?
                                                    <section className="w-full px-5">
                                                        <div className="text-center font-bold my-1">
                                                            Educational Background
                                                        </div>
                                                        <div>
                                                            {resumeData.educationalBackground.map((education) => {
                                                                return (
                                                                    <div className="flex flex-col " key={education.institutionName}>
                                                                        <div className="flex items-center justify-center">
                                                                            <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                                                {education.institutionName != ""
                                                                                    ? (
                                                                                        <div className="px-2">
                                                                                            {education.institutionName}
                                                                                        </div>
                                                                                    ) : null
                                                                                }
                                                                                {education.institutionLocation || (education.graduationYear || education.graduationMonth) != ""
                                                                                    ? (
                                                                                        <>
                                                                                            {education.institutionLocation != "" ?
                                                                                                <div className="px-2">
                                                                                                    {education.institutionLocation}
                                                                                                </div>
                                                                                                : null
                                                                                            }
                                                                                            {education.graduationYear || education.graduationMonth != "" ? (
                                                                                                <div className="px-2">
                                                                                                    {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                                                </div>
                                                                                            )
                                                                                                : null
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                                    : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {education.degreeType != ""
                                                                            ? (
                                                                                <div className="text-center my-3">
                                                                                    <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                                </div>
                                                                            )
                                                                            : null
                                                                        }
                                                                        {education.description ? (
                                                                            <div className="px-5 mb-5">
                                                                                {education.description?.map((detail) => {
                                                                                    return (
                                                                                        <ul className="flex list-disc list-inside" key={detail}>
                                                                                            <li>{detail}</li>
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
                                                        {addingDetailsValue && steps >= 3 ?
                                                            <section className="w-full px-5">
                                                                <div className={`text-center ${addingDetailsValue && steps == 3 ? "text-accent" : null} font-bold my-1`}>
                                                                    {addingDetailsValue && steps == 3 ? "Adding Educational Background" : "Educational Background" }
                                                                </div>

                                                                {resumeData.educationalBackground.map((education) => {
                                                                    return (
                                                                        <div className="flex flex-col " key={education.institutionName}>
                                                                            <div className="flex items-center justify-center">
                                                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                                                    {education.institutionName != ""
                                                                                        ? (
                                                                                            <div className="px-2">
                                                                                                {education.institutionName}
                                                                                            </div>
                                                                                        ) : null
                                                                                    }
                                                                                    {education.institutionLocation || (education.graduationYear || education.graduationMonth) != ""
                                                                                        ? (
                                                                                            <>
                                                                                                {education.institutionLocation != "" ?
                                                                                                    <div className="px-2">
                                                                                                        {education.institutionLocation}
                                                                                                    </div>
                                                                                                    : null
                                                                                                }
                                                                                                {education.graduationYear || education.graduationMonth != "" ? (
                                                                                                    <div className="px-2">
                                                                                                        {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                                                    </div>
                                                                                                )
                                                                                                    : null
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                        : null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            {education.degreeType != ""
                                                                                ? (
                                                                                    <div className="text-center my-3">
                                                                                        <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                                    </div>
                                                                                )
                                                                                : null
                                                                            }
                                                                            {education.description ? (
                                                                                <div className="px-5 mb-5">
                                                                                    {education.description?.map((detail) => {
                                                                                        return (
                                                                                            <ul className="flex list-disc list-inside" key={detail}>
                                                                                                <li>{detail}</li>
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
                                                    </>}
                                            </>
                                            : <>
                                                {!addingDetailsValue && educationalBackground.length != 0 ?
                                                    <section className="w-full px-5">
                                                        <div className="text-center font-bold my-1">
                                                            Educational Background
                                                        </div>
                                                        <div>
                                                            {educationalBackground.map((education) => {
                                                                return (
                                                                    <div className="flex flex-col " key={education.institutionName}>
                                                                        <div className="flex items-center justify-center">
                                                                            <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                                                {education.institutionName != ""
                                                                                    ? (
                                                                                        <div className="px-2">
                                                                                            {education.institutionName}
                                                                                        </div>
                                                                                    ) : null
                                                                                }
                                                                                {education.institutionLocation || (education.graduationYear || education.graduationMonth) != ""
                                                                                    ? (
                                                                                        <>
                                                                                            {education.institutionLocation != "" ?
                                                                                                <div className="px-2">
                                                                                                    {education.institutionLocation}
                                                                                                </div>
                                                                                                : null
                                                                                            }
                                                                                            {education.graduationYear || education.graduationMonth != "" ? (
                                                                                                <div className="px-2">
                                                                                                    {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                                                </div>
                                                                                            )
                                                                                                : null
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                                    : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {education.degreeType != ""
                                                                            ? (
                                                                                <div className="text-center my-3">
                                                                                    <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                                </div>
                                                                            )
                                                                            : null
                                                                        }
                                                                        {education.description ? (
                                                                            <div className="px-5 mb-5">
                                                                                {education.description?.map((detail) => {
                                                                                    return (
                                                                                        <ul className="flex list-disc list-inside" key={detail}>
                                                                                            <li>{detail}</li>
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
                                                        {addingDetailsValue && steps >= 3 ?
                                                            <section className="w-full px-5">
                                                                <div className={`text-center ${steps == 3 ? "text-accent" : null} font-bold my-1`}>
                                                                    {steps > 3 ? "Educational Background" : "Adding Educational Background"}
                                                                </div>
                                                                {steps == 3 && [educationField]?.map((education) => {
                                                                    return (
                                                                        <div className="flex flex-col " key={education.institutionName}>
                                                                            <div className="flex items-center justify-center">
                                                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                                                    {education.institutionName != ""
                                                                                        ? (
                                                                                            <div className="px-2">
                                                                                                {education.institutionName}
                                                                                            </div>
                                                                                        ) : null
                                                                                    }
                                                                                    {education.institutionLocation || education.graduationYear || education.graduationMonth != ""
                                                                                        ? (
                                                                                            <>
                                                                                                {education.institutionLocation != "" ?
                                                                                                    <div className="px-2">
                                                                                                        {education.institutionLocation}
                                                                                                    </div>
                                                                                                    : null
                                                                                                }
                                                                                                {education.graduationYear || education.graduationMonth != "" ? (
                                                                                                    <div className="px-2">
                                                                                                        {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                                                    </div>
                                                                                                )
                                                                                                    : null
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                        : null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            {education.degreeType != ""
                                                                                ? (
                                                                                    <div className="text-center my-3">
                                                                                        <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                                    </div>
                                                                                )
                                                                                : null
                                                                            }
                                                                            {education.description ? (
                                                                                <div className="px-5 mb-5">
                                                                                    {education.description?.map((detail) => {
                                                                                        return (
                                                                                            <ul className="flex list-disc list-inside" key={detail}>
                                                                                                <li>{detail}</li>
                                                                                            </ul>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            ) : null
                                                                            }
                                                                        </div>
                                                                    )
                                                                })}

                                                                {educationalBackground.map((education) => {
                                                                    return (
                                                                        <div className="flex flex-col " key={education.institutionName}>
                                                                            <div className="flex items-center justify-center">
                                                                                <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
                                                                                    {education.institutionName != ""
                                                                                        ? (
                                                                                            <div className="px-2">
                                                                                                {education.institutionName}
                                                                                            </div>
                                                                                        ) : null
                                                                                    }
                                                                                    {education.institutionLocation && (education.graduationYear || education.graduationMonth) != ""
                                                                                        ? (
                                                                                            <>
                                                                                                {education.institutionLocation != "" ?
                                                                                                    <div className="px-2">
                                                                                                        {education.institutionLocation}
                                                                                                    </div>
                                                                                                    : null
                                                                                                }
                                                                                                {education.graduationYear || education.graduationMonth != "" ? (
                                                                                                    <div className="px-2">
                                                                                                        {education.graduationYear > new Date().getFullYear() ? "Expected Graduation Date - " : null}{education.graduationMonth} {education.graduationYear}
                                                                                                    </div>
                                                                                                )
                                                                                                    : null
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                        : null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            {education.degreeType != ""
                                                                                ? (
                                                                                    <div className="text-center my-3">
                                                                                        <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                                    </div>
                                                                                )
                                                                                : null
                                                                            }
                                                                            {education.description ? (
                                                                                <div className="px-5 mb-5">
                                                                                    {education.description?.map((detail) => {
                                                                                        return (
                                                                                            <ul className="flex list-disc list-inside" key={detail}>
                                                                                                <li>{detail}</li>
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
                                                    </>}
                                            </>
                                        }
                                    
                                </>
                                )
                            }

                        </>}

                    {/* CERTIFICATION SECTION */}
                    {routerID
                        ? <>
                            {viewCertifications != "" ? (
                                <section className="w-full px-10 pb-5">
                                    <div className="text-center font-bold my-1">
                                        Certifications
                                    </div>
                                    <div className="mb-5 ">
                                        {viewCertifications?.map((cert) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={cert}>
                                                    <li>{cert}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </section>
                            ) : null}
                        </>
                        : <>
                            {router.query.id
                                ? <>
                                    {resumeData.certifications != "" ? (
                                        <section className="w-full px-10 pb-5">
                                            <div className="text-center font-bold my-1">
                                                Certifications
                                            </div>
                                            <div className="mb-5 ">
                                                {resumeData.certifications?.map((cert) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" key={cert}>
                                                            <li>{cert}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    ) : null}
                                </> 
                                : <>
                                    {userCertifications != "" ? (
                                        <section className="w-full px-10 pb-5">
                                            <div className="text-center font-bold my-1">
                                                Certifications
                                            </div>
                                            <div className="mb-5 ">
                                                {userCertifications?.map((cert) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" key={cert}>
                                                            <li>{cert}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    ) : null}
                                </>
                            }
                            
                        </>
                    }


                    {/* PORTFOLIO SECTION */}
                    {routerID
                        ?
                        <>
                            {viewPortfolio != "" ? (
                                <section className="w-full px-10 pb-5">
                                    <div className="text-center font-bold my-1">
                                        Portfolio
                                    </div>
                                    <div className="mb-5 ">
                                        {viewPortfolio?.map((portfolio) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={portfolio}>
                                                    <li>{portfolio}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </section>
                            ) : null}
                        </>
                        :
                        <>
                            {router.query.id 
                                ? <>
                                    {resumeData.portfolio != "" ? (
                                        <section className="w-full px-10 pb-5">
                                            <div className="text-center font-bold my-1">
                                                Portfolio
                                            </div>
                                            <div className="mb-5 ">
                                                {resumeData.portfolio?.map((portfolio) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" key={portfolio}>
                                                            <li>{portfolio}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    ) : null}
                                </>
                                : <>
                                    {userPortfolio != "" ? (
                                        <section className="w-full px-10 pb-5">
                                            <div className="text-center font-bold my-1">
                                                Portfolio
                                            </div>
                                            <div className="mb-5 ">
                                                {userPortfolio?.map((portfolio) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" key={portfolio}>
                                                            <li>{portfolio}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    ) : null}
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default OutputResume;
