
function ReadEducation({
    viewEducationalBackground,
    educationHeadMarginT,
    educationHeadMarginB,
    educationSubHeadMarginT,
    educationSubHeadMarginB,
    educationHeadPaddingX,
    educationDescriptionPaddingL,
    educationDescriptionPaddingR,
    educationDescriptionPaddingY,
    educationMarginB,
}) {
    
    return (
        <>
            {
                viewEducationalBackground.length > 0
                    ? <section className="w-full px-5">
                        <div className="text-center font-bold my-1">
                            Educational Background
                        </div>
                        <div>
                            {viewEducationalBackground?.map((education) => {
                                return (
                                    <div className="flex flex-col " key={education.institutionName}>
                                        <div className="flex items-center justify-center">
                                            <div className="grid grid-flow-col auto-cols-max text-center divide-x" style={{
                                                'marginTop': `${educationHeadMarginT}rem`,
                                                'marginBottom': `${educationHeadMarginB}rem`,
                                            }}>
                                                {education.institutionName && (
                                                        <div style={{
                                                            'paddingLeft': `${educationHeadPaddingX}rem`,
                                                            'paddingRight': `${educationHeadPaddingX}rem`,
                                                        }}>
                                                            {education.institutionName}
                                                        </div>
                                                    )
                                                }
                                                {education.institutionLocation || (education.graduationYear || education.graduationMonth) != ""
                                                    ? (
                                                        <>
                                                            {education.institutionLocation && (
                                                                <div style={{
                                                                    'paddingLeft': `${educationHeadPaddingX}rem`,
                                                                    'paddingRight': `${educationHeadPaddingX}rem`,
                                                                }}>
                                                                    {education.institutionLocation}
                                                                </div>
                                                                )
                                                            }
                                                            {education.graduationYear.length > 0 || education.graduationMonth.length > 0 ? (
                                                                <div style={{
                                                                    'paddingLeft': `${educationHeadPaddingX}rem`,
                                                                    'paddingRight': `${educationHeadPaddingX}rem`,
                                                                }}>
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
                                        {education.degreeType && (
                                            <div className="text-center " style={{
                                                'marginTop': `${educationSubHeadMarginT}rem`,
                                                'marginBottom': `${educationSubHeadMarginB}rem`,
                                                }}>
                                                    <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                </div>
                                            )
                                        }
                                        {Array.isArray(education.description) && education.description.length > 0 && (
                                            <div style={{
                                                'paddingLeft': `${educationDescriptionPaddingL}rem`,
                                                'marginBottom': `${educationMarginB}rem`,
                                            }}>
                                                {education.description?.map((detail) => {
                                                    return (
                                                        <ul className="flex list-disc list-inside" style={{
                                                            'paddingTop': `${educationDescriptionPaddingY}rem`,
                                                            'paddingBottom': `${educationDescriptionPaddingY}rem`,
                                                        }} key={detail}>
                                                            <li>{detail}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                            )
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
}

export default ReadEducation;
