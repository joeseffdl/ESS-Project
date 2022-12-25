import { useRouter } from "next/router"
import { addingDetails, completedSteps, resumeDataStore, resumeEducationStore } from "../../../utils/store"

function Education({ educationProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const educationField = resumeEducationStore(state => state.educationField)
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const steps = completedSteps(state => state.steps)
    const addingDetailsValue = addingDetails(state => state.value)

    // Props
    const { 
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
    } = educationProps
    
    return (
        <>
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
                    {viewingResume
                        ? (<>
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
                                                                'margin-top': educationHeadMarginT + 'rem',
                                                                'margin-bottom': educationHeadMarginB + 'rem',
                                                            }}>
                                                                {education.institutionName != ""
                                                                    ? (
                                                                        <div style={{
                                                                            'padding-left': educationHeadPaddingX + 'rem',
                                                                            'padding-right': educationHeadPaddingX + 'rem',
                                                                        }}>
                                                                            {education.institutionName}
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                {education.institutionLocation || (education.graduationYear || education.graduationMonth) != ""
                                                                    ? (
                                                                        <>
                                                                            {education.institutionLocation != "" ?
                                                                                <div style={{
                                                                                    'padding-left': educationHeadPaddingX + 'rem',
                                                                                    'padding-right': educationHeadPaddingX + 'rem',
                                                                                }}>
                                                                                    {education.institutionLocation}
                                                                                </div>
                                                                                : null
                                                                            }
                                                                            {education.graduationYear || education.graduationMonth != "" ? (
                                                                                <div style={{
                                                                                    'padding-left': educationHeadPaddingX + 'rem',
                                                                                    'padding-right': educationHeadPaddingX + 'rem',
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
                                                        {education.degreeType != ""
                                                            ? (
                                                                <div className="text-center " style={{
                                                                    'margin-top': educationSubHeadMarginT + 'rem',
                                                                    'margin-bottom': educationSubHeadMarginB + 'rem',
                                                                }}>
                                                                    <span className="font-bold">{education.degreeType}{(education.degreeType == "High School Diploma" || education.degreeType == "GED" || education.degreeType == "No Degree") ? "" : ":"}</span> {education.fieldOfStudy}
                                                                </div>
                                                            )
                                                            : null
                                                        }
                                                        {education.description ? (
                                                            <div style={{
                                                                'padding-left': educationDescriptionPaddingL + 'rem',
                                                                'margin-bottom': educationMarginB + 'rem',
                                                            }}>
                                                                {education.description?.map((detail) => {
                                                                    return (
                                                                        <ul className="flex list-disc list-inside" style={{
                                                                            'padding-top': educationDescriptionPaddingY + 'rem',
                                                                            'padding-bottom': educationDescriptionPaddingY + 'rem',
                                                                        }} key={detail}>
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
                                                            {addingDetailsValue && steps == 3 ? "Adding Educational Background" : "Educational Background"}
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
        </>
    )
}

export default Education;
