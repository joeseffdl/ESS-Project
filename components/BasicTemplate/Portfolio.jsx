import { useRouter } from "next/router"
import CreatePortfolio from "./Portfolio/CreatePortfolio"
import ReadPortfolio from "./Portfolio/ReadPortfolio"
import UpdatePortfolio from "./Portfolio/UpdatePortfolio"

function Portfolio({ portfolioProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    return (
        <>
            {viewingResume
                ? <ReadPortfolio portfolioProps={portfolioProps} />
                : <>
                    {router.query.id
                        ? <UpdatePortfolio />
                        : <CreatePortfolio />
                    }
                </>
            }
        </>
    )
}

export default Portfolio;
