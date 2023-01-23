import { useRouter } from "next/router"
import CreateCertifications from "./Certifications/CreateCertifications"
import ReadCertifications from "./Certifications/ReadCertifications"
import UpdateCertifications from "./Certifications/UpdateCertifications"

function Certifications({ certificationsProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume
    return (
        <>
            {viewingResume
                ? <ReadCertifications certificationsProps={certificationsProps} />
                : <>
                    {router.query.id
                        ? <UpdateCertifications />
                        : <CreateCertifications />
                    }

                </>
            }
        </>
    )
}

export default Certifications;
