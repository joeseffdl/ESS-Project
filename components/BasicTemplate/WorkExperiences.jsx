import { useRouter } from "next/router"
import { resumeExperienceStore } from "../../utils/store"
import CreateWorkExperiences from "./WorkExperience/CreateWorkExperiences"
import ReadWorkExperiences from "./WorkExperience/ReadWorkExperiences"
import UpdateWorkExperiences from "./WorkExperience/UpdateWorkExperiences"

function WorkExperiences({ workExperiencesProps }) {
    const { query } = useRouter();
    const { workExp, workExperiences } = resumeExperienceStore(state => ({
        workExp: state.workExp,
        workExperiences: state.workExperiences,
    }));

    const hasNoWorkExperiences = workExperiences.length === 0;
    const isEmptyWorkExp = (workExp.title || workExp.employer) === '';
    const isCreating = hasNoWorkExperiences && isEmptyWorkExp && !query.id;
    const isViewingResume = query.viewResume;

    return (
        <>
            {isCreating ? (
                <CreateWorkExperiences />
            ) : isViewingResume ? (
                <ReadWorkExperiences workExperiencesProps={workExperiencesProps} />
            ) : (
                <UpdateWorkExperiences />
            )}
        </>
    );
}

export default WorkExperiences;
