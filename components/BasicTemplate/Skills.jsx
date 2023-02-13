import { useRouter } from "next/router"
import CreateSkills from "./Skills/CreateSkills"
import ReadSkills from "./Skills/ReadSkills"
import UpdateSkills from "./Skills/UpdateSkills"

function Skills({ skillsProps }) {
    const { query } = useRouter();
    const isViewingResume = query.viewResume;
    const isUpdating = query.id;

    return (
        <>
            {isViewingResume ? (
                <ReadSkills skillsProps={skillsProps} />
            ) : isUpdating ? (
                <UpdateSkills />
            ) : (
                <CreateSkills />
            )}
        </>
    );
}

export default Skills;
