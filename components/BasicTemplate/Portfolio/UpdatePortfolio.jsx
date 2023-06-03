import { resumeDataStore } from "../../../utils/store";

function UpdatePortfolio() {
  const resumeData = resumeDataStore((state) => state.resumeData);

  return (
    <>
      {Array.isArray(resumeData.portfolio) &&
      resumeData.portfolio.length > 0 ? (
        <section className="w-full px-10 pb-5">
          <div className="text-center font-bold my-1">Portfolio</div>
          <div className="mb-5 ">
            {resumeData.portfolio.map((portfolio) => {
              return (
                <ul className="flex list-disc list-inside" key={portfolio}>
                  <li>{portfolio}</li>
                </ul>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default UpdatePortfolio;
