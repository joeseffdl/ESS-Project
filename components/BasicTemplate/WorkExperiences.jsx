import { useRouter } from "next/router"
import CreateWorkExperiences from "./WorkExperience/CreateWorkExperiences"
import ReadWorkExperiences from "./WorkExperience/ReadWorkExperiences"
import UpdateWorkExperiences from "./WorkExperience/UpdateWorkExperiences"

function WorkExperiences({ workExperiencesProps }) {
    const { query: { viewResume, id } } = useRouter();
    
    return (
        <>
            {viewResume
                ? <ReadWorkExperiences workExperiencesProps={workExperiencesProps} />
                : id
                    ? <UpdateWorkExperiences />
                    : <CreateWorkExperiences />
            }
        </>
    );
}

export default WorkExperiences;
