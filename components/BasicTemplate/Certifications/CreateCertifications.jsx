import { resumeCertificationStore } from "../../../utils/store"

function CreateCertifications() {
  // State Management
  const userCertifications = resumeCertificationStore(state => state.certifications)

  return (
    <>
      {userCertifications != ""
        ? (
          <section className="w-full px-10 pb-5">
            <div className="text-center font-bold my-1">
              Certifications
            </div>
            <div className="mb-5 ">
              {userCertifications?.map((cert) => {
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

export default CreateCertifications;
