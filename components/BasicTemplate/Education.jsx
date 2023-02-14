import { useRouter } from "next/router"
import CreateEducation from "./Education/CreateEducation"
import ReadEducation from "./Education/ReadEducation"
import UpdateEducation from "./Education/UpdateEducation"

function Education({ educationProps }) {
    const { query: { viewResume, id } } = useRouter();

    return (
        <>
            {viewResume
                ? <ReadEducation {...educationProps} />
                : id
                    ? <UpdateEducation />
                    : <CreateEducation />
            }
        </>
    );
}

export default Education;
