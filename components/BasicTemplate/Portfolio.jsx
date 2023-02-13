import { useRouter } from "next/router"
import CreatePortfolio from "./Portfolio/CreatePortfolio"
import ReadPortfolio from "./Portfolio/ReadPortfolio"
import UpdatePortfolio from "./Portfolio/UpdatePortfolio"

function Portfolio({ portfolioProps }) {
    const { query } = useRouter();
    const isViewingResume = query.viewResume;
    const isUpdating = query.id;

    return (
        <>
            {isViewingResume ? (
                <ReadPortfolio portfolioProps={portfolioProps} />
            ) : isUpdating ? (
                <UpdatePortfolio />
            ) : (
                <CreatePortfolio />
            )}
        </>
    );
}

export default Portfolio;
