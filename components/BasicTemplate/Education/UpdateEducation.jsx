import { useRouter } from "next/router";
import {
  addingDetails,
  completedSteps,
  resumeDataStore,
  resumeEducationStore,
} from "../../../utils/store";

function UpdateEducation() {
  const { query } = useRouter();
  const isUpdating = query.id;

  const resumeData = resumeDataStore((state) => state.resumeData);
  const educationField = resumeEducationStore((state) => state.educationField);
  const educationalBackground = resumeEducationStore(
    (state) => state.educationalBackground
  );
  const steps = completedSteps((state) => state.steps);
  const addingDetailsValue = addingDetails((state) => state.value);

  const DisplayMappedEducation = (education) => (
    <div className="flex flex-col " key={education.institutionName}>
      <div className="flex items-center justify-center">
        <div className="grid grid-flow-col auto-cols-max text-center divide-x mt-3">
          {education.institutionName && (
            <div className="px-2">{education.institutionName}</div>
          )}
          {education.institutionLocation.length > 0 ||
          education.graduationYear.length > 0 ||
          education.graduationMonth.length > 0 ? (
            <>
              {education.institutionLocation && (
                <div className="px-2">{education.institutionLocation}</div>
              )}
              {education.graduationYear.length > 0 ||
              education.graduationMonth.length > 0 ? (
                <div className="px-2">
                  {education.graduationYear > new Date().getFullYear()
                    ? "Expected Graduation Date - "
                    : null}
                  {education.graduationMonth} {education.graduationYear}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      {education.degreeType && (
        <div className="text-center my-3">
          <span className="font-bold">
            {education.degreeType}
            {education.degreeType == "High School Diploma" ||
            education.degreeType == "GED" ||
            education.degreeType == "No Degree"
              ? ""
              : ":"}
          </span>{" "}
          {education.fieldOfStudy}
        </div>
      )}
      {Array.isArray(education.description) &&
        education.description.length > 0 && (
          <div className="px-5 mb-5">
            {education.description?.map((detail) => {
              return (
                <ul className="flex list-disc list-inside" key={detail}>
                  <li>{detail}</li>
                </ul>
              );
            })}
          </div>
        )}
    </div>
  );

  return (
    <>
      {isUpdating ? (
        <>
          {resumeData.educationalBackground.length > 0 &&
          !addingDetailsValue &&
          (resumeData.educationalBackground[0].institutionName.length > 0 ||
            resumeData.educationalBackground[0].degreeType.length > 0) ? (
            <section className="w-full px-5">
              <div className="text-center font-bold my-1">
                Educational Background
              </div>
              <div>
                {resumeData.educationalBackground.map((education) => {
                  return DisplayMappedEducation(education);
                })}
              </div>
            </section>
          ) : (
            <>
              {addingDetailsValue && steps >= 3 ? (
                <section className="w-full px-5">
                  <div
                    className={`text-center ${
                      addingDetailsValue && steps == 3 ? "text-accent" : null
                    } font-bold my-1`}
                  >
                    {addingDetailsValue && steps == 3
                      ? "Adding Educational Background"
                      : "Educational Background"}
                  </div>

                  {resumeData.educationalBackground.map((education) => {
                    return DisplayMappedEducation(education);
                  })}
                </section>
              ) : null}
            </>
          )}
        </>
      ) : (
        <>
          {!addingDetailsValue && educationalBackground.length != 0 ? (
            <section className="w-full px-5">
              <div className="text-center font-bold my-1">
                Educational Background
              </div>
              <div>
                {educationalBackground.map((education) => {
                  return DisplayMappedEducation(education);
                })}
              </div>
            </section>
          ) : (
            <>
              {addingDetailsValue && steps >= 3 ? (
                <section className="w-full px-5">
                  <div
                    className={`text-center ${
                      steps == 3 ? "text-accent" : null
                    } font-bold my-1`}
                  >
                    {steps > 3
                      ? "Educational Background"
                      : "Adding Educational Background"}
                  </div>
                  {steps == 3 &&
                    [educationField]?.map((education) => {
                      return DisplayMappedEducation(education);
                    })}

                  {educationalBackground.map((education) => {
                    return DisplayMappedEducation(education);
                  })}
                </section>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
}

export default UpdateEducation;
