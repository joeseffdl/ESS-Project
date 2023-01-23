import { resumeDataStore } from "../../../utils/store";

function UpdatePortfolio() {
  // State Management
  const resumeData = resumeDataStore(state => state.resumeData)

  return (
    <>
      {resumeData.portfolio != ""
        ? (
          <section className="w-full px-10 pb-5">
            <div className="text-center font-bold my-1">
              Portfolio
            </div>
            <div className="mb-5 ">
              {resumeData.portfolio?.map((portfolio) => {
                return (
                  <ul className="flex list-disc list-inside" key={portfolio}>
                    <li>{portfolio}</li>
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

export default UpdatePortfolio;
