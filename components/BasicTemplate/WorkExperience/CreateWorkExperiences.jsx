import { resumeExperienceStore } from "../../../utils/store";

function CreateWorkExperiences() {
  const workExp = resumeExperienceStore((state) => state.workExp);

  return (
    <>
      {workExp.title && (
        <section section className="w-full relative">
          <div className="text-center font-bold my-1">Work Experience</div>

          <div>
            {[workExp]?.map((experience) => {
              return (
                <div className="flex flex-col " key={experience.title}>
                  <div className="flex items-center justify-center">
                    <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3 mb-1">
                      {experience.title && (
                        <div className="font-bold px-2">{experience.title}</div>
                      )}
                      {experience.employer && (
                        <div className="px-2">
                          {experience.employer}{" "}
                          {experience.city && experience.country
                            ? `- ${experience.city}, ${experience.country}`
                            : experience.country
                            ? `- ${experience.country}`
                            : ""}
                        </div>
                      )}
                      {experience.startDate ||
                      experience.currentlyWorking ||
                      experience.endDate ? (
                        <div className="px-2">
                          {experience.startDate}
                          {(experience.startDate.length > 0) &
                          (experience.currentlyWorking.length > 0)
                            ? `- ${experience.currentlyWorking}`
                            : experience.currentlyWorking}
                          {(experience.startDate.length > 0) &
                          (experience.endDate.length > 0) &
                          (experience.currentlyWorking != "Present")
                            ? `- ${experience.endDate}`
                            : (experience.currentlyWorking != "Present") &
                              (experience.endDate.length > 0)
                            ? `End Date: ${experience.endDate}`
                            : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {Array.isArray(experience.description) && (
                    <div className="px-10 mb-5">
                      {experience.description.map((desc, index) => (
                        <ul className="flex list-disc list-inside" key={index}>
                          <li>{desc}</li>
                        </ul>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default CreateWorkExperiences;
