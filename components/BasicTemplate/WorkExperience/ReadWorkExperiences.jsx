function ReadWorkExperiences({
    viewWorkExperiences,
    experiencesHeadMarginT,
    experiencesHeadMarginB,
    experiencesHeadPaddingX,
    experiencesDescriptionPaddingL,
    experiencesDescriptionPaddingR,
    experiencesDescriptionPaddingY,
    experiencesMarginB,
}) {
    return (
        <>
            {viewWorkExperiences?.length > 0 && (
                <section className="w-full relative">
                    <div className="text-center font-bold my-1">
                        {viewWorkExperiences.length > 1 ? "Work Experiences" : "Work Experience"}
                    </div>
                    <div>
                        {viewWorkExperiences.map((experience) => (
                            <div className="flex flex-col" key={experience.title}>
                                <div className="flex items-center justify-center">
                                    <div className="grid grid-flow-col auto-cols-max text-center divide-x"
                                        style={{
                                            marginTop: `${experiencesHeadMarginT}rem`,
                                            marginBottom: `${experiencesHeadMarginB}rem`,
                                        }}>
                                        {experience.title && (
                                            <div className="font-bold"
                                                style={{
                                                    paddingLeft: `${experiencesHeadPaddingX}rem`,
                                                    paddingRight: `${experiencesHeadPaddingX}rem`,
                                                }}>
                                                {experience.title}
                                            </div>
                                        )}
                                        {experience.employer && (
                                            <div style={{
                                                paddingLeft: `${experiencesHeadPaddingX}rem`,
                                                paddingRight: `${experiencesHeadPaddingX}rem`,
                                            }}>
                                                {`${experience.employer}${experience.city && experience.country ? ` - ${experience.city}, ${experience.country}` : `${experience.country ? ` - ${experience.country}` : ``}`}`}
                                            </div>
                                        )}
                                        {experience.startDate || (experience.currentlyWorking || experience.endDate) && (
                                            <div className="px-2">
                                                {experience.startDate} {experience.currentlyWorking ? `- ${experience.currentlyWorking}` : experience.endDate ? `- ${experience.endDate}` : ""}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {Array.isArray(experience.description) && (
                                    <div className="mb-5"
                                        style={{
                                            paddingLeft: `${experiencesDescriptionPaddingL}rem`,
                                            marginBottom: `${experiencesMarginB}rem`,
                                        }}>
                                        {experience.description.map((desc) => (
                                            <ul className="flex list-disc list-inside"
                                                style={{
                                                    paddingTop: `${experiencesDescriptionPaddingY}rem`,
                                                    paddingBottom: `${experiencesDescriptionPaddingY}rem`,
                                                }}
                                                key={desc}>
                                                <li>{desc}</li>
                                            </ul>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}

export default ReadWorkExperiences;
