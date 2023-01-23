function ReadPortfolio({ portfolioProps }) {
    // Props
    const { viewPortfolio, portfolioPaddingL, portfolioPaddingR, portfolioPaddingT, portfolioPaddingB } = portfolioProps

    return (
        <>
            {viewPortfolio != ""
                ? (
                    <section className="w-full pb-5">
                        <div className="text-center font-bold my-1">
                            Portfolio
                        </div>
                        <div className="mb-5 ">
                            {viewPortfolio?.map((portfolio) => {
                                return (
                                    <ul className="flex list-disc list-inside" style={{
                                        'paddingLeft': portfolioPaddingL + 'rem',
                                        'paddingRight': portfolioPaddingR + 'rem',
                                        'paddingTop': portfolioPaddingT + 'rem',
                                        'paddingBottom': portfolioPaddingB + 'rem',
                                    }} key={portfolio}>
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

export default ReadPortfolio;
