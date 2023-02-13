import { useRouter } from "next/router"
import CreateProfileSummary from "./ProfileSummary/CreateProfileSummary"
import ReadProfileSummary from "./ProfileSummary/ReadProfileSummary"
import UpdateProfileSummary from "./ProfileSummary/UpdateProfileSummary"

function ProfileSummary({ profileSummaryProps }) {
    const { query } = useRouter();
    const isViewingResume = query.viewResume;
    const isUpdating = query.id;

    return (
        <>
            {isViewingResume ? (
                <ReadProfileSummary profileSummaryProps={profileSummaryProps} />
            ) : isUpdating ? (
                <UpdateProfileSummary />
            ) : (
                <CreateProfileSummary />
            )}
        </>
    );
}

export default ProfileSummary;
