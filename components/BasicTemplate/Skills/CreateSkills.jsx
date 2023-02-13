import { resumeSkillsStore } from "../../../utils/store"

function CreateSkills() {
    const userSkills = resumeSkillsStore(state => state.skills)

    return (
        <>
            {Array.isArray(userSkills) && userSkills.length > 0
                ? (
                    <section className="w-full pb-5">
                        <div className="text-center font-bold my-1">
                            Skills
                        </div>
                        <div className="grid grid-cols-2 justify-center items-center ">
                            {userSkills.map((skill) => {
                                return (
                                    <ul className="flex list-disc list-inside px-10" key={skill}>
                                        <li>{skill}</li>
                                    </ul>
                                )
                            })}
                        </div>
                    </section>
                ) : null
            }
        </>
    )
}

export default CreateSkills;
