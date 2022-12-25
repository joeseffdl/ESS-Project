import { useRouter } from "next/router"
import { resumeDataStore, resumeProfileSummaryStore } from "../../../utils/store"

function ProfileSummary({ profileSummaryProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const resumeData = resumeDataStore(state => state.resumeData)
    const profileSummary = resumeProfileSummaryStore(state => state.profileSummary)

    // Props
    const { summaryMarginX, summaryMarginY, summaryLineHeight } = profileSummaryProps
    
    return (
        <>
            {viewingResume
                ? (
                    <>
                        {profileSummaryProps?.viewProfileSummary != ""
                            ? (
                                <section className="w-full ">
                                    <div className="text-center font-bold my-1">
                                        Profile Summary
                                    </div>
                                    <div className="w-auto break-words text-center divide-x"
                                        style={{
                                            'margin-left': profileSummaryProps?.summaryMarginX + 'rem',
                                            'margin-right': profileSummaryProps?.summaryMarginX + 'rem',
                                            'margin-top': profileSummaryProps?.summaryMarginY + 'rem',
                                            'margin-bottom': profileSummaryProps?.summaryMarginY + 'rem',
                                            'line-height': profileSummaryProps?.summaryLineHeight + 'rem',
                                        }}
                                    >
                                        {profileSummaryProps?.viewProfileSummary}
                                    </div>
                                </section>
                            ) : null
                        }
                    </>
                )
                : (
                    <>
                        {router.query.id
                            ? <>
                                {resumeData.profileSummary != ""
                                    ? (
                                        <section className="w-full ">
                                            <div className="text-center font-bold my-1">
                                                Profile Summary
                                            </div>
                                            <div className="w-auto break-words text-center mx-10 my-3 divide-x">
                                                {resumeData.profileSummary}
                                            </div>
                                        </section>
                                    ) : null
                                }
                            </>
                            : <>
                                {profileSummary != ""
                                    ? (
                                        <section className="w-full ">
                                            <div className="text-center font-bold my-1">
                                                Profile Summary
                                            </div>
                                            <div className="w-auto break-words text-center mx-10 my-3 divide-x">
                                                {profileSummary}
                                            </div>
                                        </section>
                                    ) : null
                                }
                            </>
                        }

                    </>
                )
            }
        </>
    )
}

export default ProfileSummary;
