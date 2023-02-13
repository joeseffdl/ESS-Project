function ReadPersonalInformation({ personalInfoProps }) {
    const { viewPersonalInformation, headerFontSize, headerLineHeight } = personalInfoProps;
    const { firstname, surname, emailAddress, phoneNumber, city, country, postalCode } = viewPersonalInformation;

    return (
        <section className="w-full ">
            <div className="text-center font-semibold my-4 tracking-widest" style={{
                'fontSize': `${headerFontSize}rem`,
                'lineHeight': `${headerLineHeight}rem`,
            }}>
                {firstname || surname ? `${firstname.toUpperCase()} ${surname.toUpperCase()}` : "FIRST NAME SURNAME"}
            </div>
            <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 divide-x">
                {emailAddress && (
                    <div className="px-2">
                        {emailAddress}
                    </div>
                )}
                {phoneNumber && (
                    <div className="px-2">
                        {phoneNumber}
                    </div>
                )}
                {(city || country) && (
                    <div className="px-2">
                        {`${city}, ${country} ${postalCode}`}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ReadPersonalInformation;
