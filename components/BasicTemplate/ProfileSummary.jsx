import { useRouter } from "next/router"
import CreateProfileSummary from "./ProfileSummary/CreateProfileSummary"
import ReadProfileSummary from "./ProfileSummary/ReadProfileSummary"
import UpdateProfileSummary from "./ProfileSummary/UpdateProfileSummary"

function ProfileSummary({ profileSummaryProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    return (
        <>
            {viewingResume
                ? <ReadProfileSummary profileSummaryProps={profileSummaryProps} />
                : <>
                    {router.query.id
                        ? <UpdateProfileSummary />
                        : <CreateProfileSummary />
                    }
                </>
            }
        </>
    )
}

export default ProfileSummary;
