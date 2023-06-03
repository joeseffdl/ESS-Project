import { resumePortfolioStore } from "../../../utils/store";

function CreatePortfolio() {
  const userPortfolio = resumePortfolioStore((state) => state.portfolio);

  return (
    <>
      {Array.isArray(userPortfolio) && userPortfolio.length > 0 && (
        <section className="w-full px-10 pb-5">
          <div className="text-center font-bold my-1">Portfolio</div>
          <div className="mb-5">
            {userPortfolio.map((portfolio) => (
              <ul className="flex list-disc list-inside" key={portfolio}>
                <li>{portfolio}</li>
              </ul>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default CreatePortfolio;
