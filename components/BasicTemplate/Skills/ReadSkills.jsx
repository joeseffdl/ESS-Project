
function ReadSkills({ skillsProps }) {
    // Props
    const { viewSkills, skillsPaddingL, skillsPaddingR, skillsPaddingT, skillsPaddingB, } = skillsProps

    return (
        <>
            {viewSkills != ""
                ? (
                    <section className="w-full pb-5">
                        <div className="text-center font-bold my-1">
                            Skills
                        </div>
                        <div className="grid grid-cols-2 justify-center items-center ">
                            {viewSkills?.map((skill) => {
                                return (
                                    <ul className="flex list-disc list-inside"
                                        style={{
                                            'paddingLeft': skillsPaddingL + 'rem',
                                            'paddingRight': skillsPaddingR + 'rem',
                                            'paddingTop': skillsPaddingT + 'rem',
                                            'paddingBottom': skillsPaddingB + 'rem',
                                        }} key={skill}>
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

export default ReadSkills;
