import { useRouter } from "next/router"
import { resumeEducationStore } from "../../utils/store"
import CreateEducation from "./Education/CreateEducation"
import ReadEducation from "./Education/ReadEducation"
import UpdateEducation from "./Education/UpdateEducation"

function Education({ educationProps }) {
    const { query } = useRouter();
    const isViewingResume = query.viewResume;
    const educationField = resumeEducationStore(state => state.educationField);

    return (
        <>
            {isViewingResume ? (
                <ReadEducation educationProps={educationProps} />
            ) : (
                <>
                    {educationField.institutionName &&
                        educationField.degreeType ? (
                        <CreateEducation />
                    ) : (
                        <UpdateEducation />
                    )}
                </>
            )}
        </>
    );
}

export default Education;
