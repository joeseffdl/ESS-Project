import { resumeDataStore } from "../../../utils/store"

function UpdateSkills() {
  const resumeData = resumeDataStore(state => state.resumeData)

  return (
    <>
      {Array.isArray(resumeData.skills) && resumeData.skills.length > 0
        ? (
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
  )
}

export default UpdateSkills;
