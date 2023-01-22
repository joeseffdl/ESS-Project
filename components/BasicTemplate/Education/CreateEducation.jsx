import { resumeEducationStore } from "../../../utils/store"

function CreateEducation() {
    // State Management
    const educationField = resumeEducationStore(state => state.educationField)

    return (
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
    )
}

export default CreateEducation;
