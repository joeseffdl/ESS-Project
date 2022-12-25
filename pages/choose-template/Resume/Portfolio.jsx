import { useRouter } from "next/router"
import { resumeDataStore, resumePortfolioStore } from "../../../utils/store"

function Portfolio({ portfolioProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const userPortfolio = resumePortfolioStore(state => state.portfolio)
    
    // Props
    const { portfolioPaddingL, portfolioPaddingR, portfolioPaddingT, portfolioPaddingB } = portfolioProps
    
    return (
        <>
            {viewingResume
                ?
                <>
                    {portfolioProps?.viewPortfolio != "" ? (
                        <section className="w-full pb-5">
                            <div className="text-center font-bold my-1">
                                Portfolio
                            </div>
                            <div className="mb-5 ">
                                {portfolioProps?.viewPortfolio?.map((portfolio) => {
                                    return (
                                        <ul className="flex list-disc list-inside" style={{
                                            'padding-left': portfolioProps?.portfolioPaddingL + 'rem',
                                            'padding-right': portfolioProps?.portfolioPaddingR + 'rem',
                                            'padding-top': portfolioProps?.portfolioPaddingT + 'rem',
                                            'padding-bottom': portfolioProps?.portfolioPaddingB + 'rem',
                                        }} key={portfolio}>
                                            <li>{portfolio}</li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </section>
                    ) : null}
                </>
                :
                <>
                    {router.query.id
                        ? <>
                            {resumeData.portfolio != "" ? (
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
                            ) : null}
                        </>
                        : <>
                            {userPortfolio != "" ? (
                                <section className="w-full px-10 pb-5">
                                    <div className="text-center font-bold my-1">
                                        Portfolio
                                    </div>
                                    <div className="mb-5 ">
                                        {userPortfolio?.map((portfolio) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={portfolio}>
                                                    <li>{portfolio}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </section>
                            ) : null}
                        </>
                    }
                </>
            }
        </>
    )
}

export default Portfolio;
