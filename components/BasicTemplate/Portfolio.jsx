import { useRouter } from "next/router";
import CreatePortfolio from "./Portfolio/CreatePortfolio";
import ReadPortfolio from "./Portfolio/ReadPortfolio";
import UpdatePortfolio from "./Portfolio/UpdatePortfolio";

function Portfolio({ portfolioProps }) {
  const {
    query: { viewResume, id },
  } = useRouter();

  return (
    <>
      {viewResume ? (
        <ReadPortfolio {...portfolioProps} />
      ) : id ? (
        <UpdatePortfolio />
      ) : (
        <CreatePortfolio />
      )}
    </>
  );
}

export default Portfolio;
