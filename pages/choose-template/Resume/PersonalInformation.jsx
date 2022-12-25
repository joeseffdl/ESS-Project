import { useRouter } from "next/router"
import { resumeDataStore, resumePersonalInformationStore } from "../../../utils/store"

function PersonalInformation({ personalInfoProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const personalInformation = resumePersonalInformationStore(state => state.personalInformation)
    
    // Props
    const { viewPersonalInformation, headerFontSize, headerLineHeight } = personalInfoProps
    
    return (
        <>
            {viewingResume
                ? (
                    <section className="w-full ">
                        <div className="text-center font-semibold my-4 tracking-widest" style={{
                            'font-size': headerFontSize + 'rem',
                            'line-height': headerLineHeight + 'rem',
                        }}>
                            {viewPersonalInformation?.firstname || viewPersonalInformation?.surname != "" ? `${viewPersonalInformation?.firstname.toUpperCase()} ${viewPersonalInformation?.surname.toUpperCase()}` : "FIRST NAME SURNAME"}
                        </div>
                        <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 divide-x">
                            {viewPersonalInformation?.emailAddress != ""
                                ? (
                                    <div className="px-2">
                                        {viewPersonalInformation?.emailAddress}
                                    </div>
                                )
                                : null}
                            {viewPersonalInformation?.phoneNumber != ""
                                ? <div className="px-2">
                                    {viewPersonalInformation?.phoneNumber}
                                </div>
                                : ``
                            }

                            {viewPersonalInformation?.city || viewPersonalInformation?.country != ``
                                ? <div className="px-2">
                                    {viewPersonalInformation?.city != "" ? `${viewPersonalInformation?.city}, ` : ``} {viewPersonalInformation?.country} {viewPersonalInformation?.postalCode}
                                </div>
                                : ``
                            }
                        </div>
                    </section>
                )
                : (
                    <section className="w-full ">
                        <div className="text-center text-3xl font-semibold my-4 tracking-widest">
                            {router.query.id
                                ? <>
                                    {resumeData.personalInformation.firstname || resumeData.personalInformation.surname != "" ? `${resumeData.personalInformation.firstname?.toUpperCase()} ${resumeData.personalInformation.surname?.toUpperCase()}` : ""}
                                </>
                                : <>
                                    {personalInformation.firstname || personalInformation.surname != "" ? `${personalInformation.firstname.toUpperCase()} ${personalInformation.surname.toUpperCase()}` : "FIRST NAME SURNAME"}
                                </>
                            }

                        </div>
                        <div className="grid grid-flow-col auto-cols-max justify-center text-center mb-6 mx-32 divide-x">
                            {router.query.id
                                ? <>
                                    {resumeData.personalInformation.emailAddress != ""
                                        ? (
                                            <div className="px-2">
                                                {resumeData.personalInformation.emailAddress}
                                            </div>
                                        )
                                        : ``}

                                    {resumeData.personalInformation.phoneNumber != ""
                                        ? <div className="px-2">
                                            {resumeData.personalInformation.phoneNumber}
                                        </div>
                                        : ``
                                    }

                                    {resumeData.personalInformation.city || resumeData.personalInformation.country != ``
                                        ? <div className="px-2">
                                            {resumeData.personalInformation.city != "" ? `${resumeData.personalInformation.city}, ` : ``} {resumeData.personalInformation.country} {resumeData.personalInformation.postalCode}
                                        </div>
                                        : ``
                                    }
                                </>
                                : <>
                                    {personalInformation.emailAddress != ""
                                        ? (
                                            <div className="px-2">
                                                {personalInformation.emailAddress}
                                            </div>
                                        )
                                        : ``}

                                    {personalInformation.phoneNumber != ""
                                        ? <div className="px-2">
                                            {personalInformation.phoneNumber}
                                        </div>
                                        : ``
                                    }

                                    {personalInformation.city || personalInformation.country != ``
                                        ? <div className="px-2">
                                            {personalInformation.city != "" ? `${personalInformation.city}, ` : ``} {personalInformation.country} {personalInformation.postalCode}
                                        </div>
                                        : ``
                                    }
                                </>
                            }

                        </div>
                    </section>
                )
            }
        </>
    )
}

export default PersonalInformation;
