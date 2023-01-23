import { resumeCertificationStore, resumeDataStore } from "../../../utils/store"

function UpdateCertifications() {
  // State Management
  const resumeData = resumeDataStore(state => state.resumeData)
  const userCertifications = resumeCertificationStore(state => state.certifications)

    return (
      <>
        {resumeData.certifications != ""
          ? (
            <section className="w-full px-10 pb-5">
              <div className="text-center font-bold my-1">
                Certifications
              </div>
              <div className="mb-5 ">
                {resumeData.certifications?.map((cert) => {
                  return (
                    <ul className="flex list-disc list-inside" key={cert}>
                      <li>{cert}</li>
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

export default UpdateCertifications;
