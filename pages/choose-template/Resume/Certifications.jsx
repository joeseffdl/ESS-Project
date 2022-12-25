import { useRouter } from "next/router"
import { resumeCertificationStore, resumeDataStore } from "../../../utils/store"

function Certifications({ certificationsProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const userCertifications = resumeCertificationStore(state => state.certifications)
    
    // Props
    const { viewCertifications, certificationsPaddingL, certificationsPaddingR, certificationsPaddingT, certificationsPaddingB } = certificationsProps
    
    return (
        <>
            {viewingResume
                ? <>
                    {viewCertifications != "" || viewCertifications != undefined ? (
                        <section className="w-full pb-5">
                            <div className="text-center font-bold my-1">
                                Certifications
                            </div>
                            <div className="mb-5 ">
                                {viewCertifications?.map((cert) => {
                                    return (
                                        <ul className="flex list-disc list-inside" style={{
                                            'padding-left': certificationsPaddingL + 'rem',
                                            'padding-right': certificationsPaddingR + 'rem',
                                            'padding-top': certificationsPaddingT + 'rem',
                                            'padding-bottom': certificationsPaddingB + 'rem',
                                        }} key={cert}>
                                            <li>{cert}</li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </section>
                    ) : null}
                </>
                : <>
                    {router.query.id
                        ? <>
                            {resumeData.certifications != "" ? (
                                <section className="w-full px-10 pb-5">
                                    <div className="text-center font-bold my-1">
                                        Certifications
                                    </div>
                                    <div className="mb-5 ">
                                        {resumeData.certifications?.map((cert) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={cert}>
                                                    <li>{cert}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </section>
                            ) : null}
                        </>
                        : <>
                            {userCertifications != "" ? (
                                <section className="w-full px-10 pb-5">
                                    <div className="text-center font-bold my-1">
                                        Certifications
                                    </div>
                                    <div className="mb-5 ">
                                        {userCertifications?.map((cert) => {
                                            return (
                                                <ul className="flex list-disc list-inside" key={cert}>
                                                    <li>{cert}</li>
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

export default Certifications;
