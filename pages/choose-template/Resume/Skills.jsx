import { useRouter } from "next/router"
import { resumeDataStore, resumeSkillsStore } from "../../../utils/store"

function Skills({ skillsProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const userSkills = resumeSkillsStore(state => state.skills)
    
    // Props
    const { viewSkills, skillsPaddingL, skillsPaddingR, skillsPaddingT, skillsPaddingB, } = skillsProps
    
    return (
        <>
            {viewingResume
                ? (<>
                    {viewSkills != "" || viewSkills != undefined ? (
                        <section className="w-full pb-5">
                            <div className="text-center font-bold my-1">
                                Skills
                            </div>
                            <div className="grid grid-cols-2 justify-center items-center ">
                                {viewSkills?.map((skill) => {
                                    return (
                                        <ul className="flex list-disc list-inside"
                                            style={{
                                                'padding-left': skillsPaddingL + 'rem',
                                                'padding-right': skillsPaddingR + 'rem',
                                                'padding-top': skillsPaddingT + 'rem',
                                                'padding-bottom': skillsPaddingB + 'rem',
                                            }} key={skill}>
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
                                <section className="w-full pb-5">
                                    <div className="text-center font-bold my-1">
                                        Skills
                                    </div>
                                    <div className="grid grid-cols-2 justify-center items-center ">
                                        {resumeData.skills?.map((skill) => {
                                            return (
                                                <ul className="flex list-disc list-inside px-10" key={skill}>
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
                                <section className="w-full pb-5">
                                    <div className="text-center font-bold my-1">
                                        Skills
                                    </div>
                                    <div className="grid grid-cols-2 justify-center items-center ">
                                        {userSkills?.map((skill) => {
                                            return (
                                                <ul className="flex list-disc list-inside px-10" key={skill}>
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
        </>
    )
}

export default Skills;
