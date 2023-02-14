import { useRouter } from "next/router"
import CreateProfileSummary from "./ProfileSummary/CreateProfileSummary"
import ReadProfileSummary from "./ProfileSummary/ReadProfileSummary"
import UpdateProfileSummary from "./ProfileSummary/UpdateProfileSummary"

function ProfileSummary({ profileSummaryProps }) {
    const { query: { viewResume, id } } = useRouter();

    return (
        <>
            {viewResume
                ? <ReadProfileSummary {...profileSummaryProps} />
                : id
                    ? <UpdateProfileSummary />
                    : <CreateProfileSummary />
            }
        </>
    );
}

export default ProfileSummary;
