import { useRouter } from "next/router"
import { resumeExperienceStore } from "../../utils/store"
import CreateWorkExperiences from "./WorkExperience/CreateWorkExperiences"
import ReadWorkExperiences from "./WorkExperience/ReadWorkExperiences"
import UpdateWorkExperiences from "./WorkExperience/UpdateWorkExperiences"

function WorkExperiences({ workExperiencesProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume

    // State Management
    const workExp = resumeExperienceStore(state => state.workExp)
    const workExperiences = resumeExperienceStore(state => state.workExperiences)

    return (
        <>
            {(workExperiences.length == 0) &&
                (workExp.title || workExp.employer) !== '' && !router.query.id
                ? <CreateWorkExperiences />
                : <>
                    {viewingResume
                        ? <ReadWorkExperiences workExperiencesProps={workExperiencesProps} />
                        : <UpdateWorkExperiences />
                    }
                </>
            }
        </>
    )
}

export default WorkExperiences;
