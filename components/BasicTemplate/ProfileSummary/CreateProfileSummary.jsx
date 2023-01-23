import { resumeProfileSummaryStore } from "../../../utils/store"

function CreateProfileSummary() {
  // State Management
  const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)

  return (
    <>
      {profileSummary != ""
        ? (
          <section className="w-full ">
            <div className="text-center font-bold my-1">
              Profile Summary
            </div>
            <div className="w-auto break-words text-center mx-10 my-3 divide-x">
              {profileSummary}
            </div>
          </section>
        ) : null
      }
    </>
  )
}

export default CreateProfileSummary;
