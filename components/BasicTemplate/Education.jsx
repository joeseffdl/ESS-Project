import { useRouter } from "next/router"
import { resumeEducationStore } from "../../utils/store"
import CreateEducation from "./Education/CreateEducation"
import ReadEducation from "./Education/ReadEducation"
import UpdateEducation from "./Education/UpdateEducation"

function Education({ educationProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const educationField = resumeEducationStore(state => state.educationField)
    const educationalBackground = resumeEducationStore(state => state.educationalBackground)

    return (
        <>
            {(educationalBackground.length == 0) &&
                (educationField.institutionName || educationField.degreeType !== '') && !router.query.id
                ? <CreateEducation />
                : <>
                    {viewingResume
                        ? <ReadEducation educationProps={educationProps} />
                        : <UpdateEducation />
                    }
                </>
            }
        </>
    )
}

export default Education;
