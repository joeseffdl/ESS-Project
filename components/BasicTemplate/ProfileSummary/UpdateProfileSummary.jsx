import { resumeDataStore } from "../../../utils/store";

function UpdateProfileSummary() {
  const resumeData = resumeDataStore(state => state.resumeData)

  return (
    resumeData.profileSummary ? (
      <section className="w-full">
        <div className="text-center font-bold my-1">Profile Summary</div>
        <div className="w-auto break-words text-center mx-10 my-3 divide-x">
          {resumeData.profileSummary}
        </div>
      </section>
    ) : null
  );
}

export default UpdateProfileSummary;
