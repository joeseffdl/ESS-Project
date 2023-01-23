function ReadPersonalInformation({ personalInfoProps }) {
    // Props
    const { viewPersonalInformation, headerFontSize, headerLineHeight } = personalInfoProps

    return (
        <section className="w-full ">
            <div className="text-center font-semibold my-4 tracking-widest" style={{
                'fontSize': headerFontSize + 'rem',
                'lineHeight': headerLineHeight + 'rem',
            }}>
                {viewPersonalInformation.firstname || viewPersonalInformation.surname != "" ? `${viewPersonalInformation.firstname.toUpperCase()} ${viewPersonalInformation.surname.toUpperCase()}` : "FIRST NAME SURNAME"}
            </div>
            <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 divide-x">
                {viewPersonalInformation.emailAddress != ""
                    ? (
                        <div className="px-2">
                            {viewPersonalInformation.emailAddress}
                        </div>
                    )
                    : null}
                {viewPersonalInformation.phoneNumber != ""
                    ? <div className="px-2">
                        {viewPersonalInformation.phoneNumber}
                    </div>
                    : ``
                }

                {viewPersonalInformation.city || viewPersonalInformation.country != ``
                    ? <div className="px-2">
                        {viewPersonalInformation.city != "" ? `${viewPersonalInformation.city}, ` : ``} {viewPersonalInformation.country} {viewPersonalInformation.postalCode}
                    </div>
                    : ``
                }
            </div>
        </section>
    )
}

export default ReadPersonalInformation;
