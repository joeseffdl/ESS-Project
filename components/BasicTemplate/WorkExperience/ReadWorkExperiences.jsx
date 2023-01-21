function ReadWorkExperiences({ workExperiencesProps }) {
    // Props
    const {
        viewWorkExperiences,
        experiencesHeadMarginT,
        experiencesHeadMarginB,
        experiencesHeadPaddingX,
        experiencesDescriptionPaddingL,
        experiencesDescriptionPaddingR,
        experiencesDescriptionPaddingY,
        experiencesMarginB, } = workExperiencesProps
    return (
        <>
        {
            viewWorkExperiences?.length > 0
                ? (
                    <section className="w-full relative">
                        <div className="text-center font-bold my-1">
                            {viewWorkExperiences?.length > 1 ? "Work Experiences" : "Work Experience"}
                        </div>
                        <div>
                            {viewWorkExperiences?.map((experience) => {
                                return (
                                    <div className="flex flex-col " key={experience.title}>
                                        <div className="flex items-center justify-center">
                                            <div className="grid grid-flow-col auto-cols-max text-center divide-x"
                                                style={{
                                                    'marginTop': experiencesHeadMarginT + 'rem',
                                                    'marginBottom': experiencesHeadMarginB + 'rem',
                                                }}
                                            >
                                                {experience.title != ""
                                                    ? (
                                                        <div className="font-bold"
                                                            style={{
                                                                'paddingLeft': experiencesHeadPaddingX + 'rem',
                                                                'paddingRight': experiencesHeadPaddingX + 'rem',
                                                            }}>
                                                            {experience.title}
                                                        </div>
                                                    ) : null
                                                }
                                                {experience.employer != ""
                                                    ? (
                                                        <div style={{
                                                            'paddingLeft': experiencesHeadPaddingX + 'rem',
                                                            'paddingRight': experiencesHeadPaddingX + 'rem',
                                                        }}>
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
                                                        <div style={{
                                                            'paddingLeft': experiencesHeadPaddingX + 'rem',
                                                            'paddingRight': experiencesHeadPaddingX + 'rem',
                                                        }}>
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
                                            <div className="mb-5"
                                                style={{
                                                    'paddingLeft': experiencesDescriptionPaddingL + 'rem',
                                                    'marginBottom': experiencesMarginB + 'rem',
                                                }}>
                                                {experience.description?.map((desc) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" style={{
                                                            'paddingTop': experiencesDescriptionPaddingY + 'rem',
                                                            'paddingBottom': experiencesDescriptionPaddingY + 'rem',
                                                        }} key={desc}>
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
        </>
    )
}

export default ReadWorkExperiences;
