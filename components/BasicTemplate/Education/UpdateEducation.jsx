import { useRouter } from "next/router"
import { addingDetails, completedSteps, resumeDataStore, resumeEducationStore } from "../../../utils/store"

function UpdateEducation() {
    // Router
    const router = useRouter()

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const educationField = resumeEducationStore(state => state.educationField)
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)
    const steps = completedSteps(state => state.steps)
    const addingDetailsValue = addingDetails(state => state.value)

    return (
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

export default UpdateEducation;
