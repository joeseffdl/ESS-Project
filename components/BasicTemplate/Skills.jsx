import { useRouter } from "next/router"
import CreateSkills from "./Skills/CreateSkills"
import ReadSkills from "./Skills/ReadSkills"
import UpdateSkills from "./Skills/UpdateSkills"

function Skills({ skillsProps }) {
    // Router
    const router = useRouter()
    const viewingResume = router.query.viewResume 
    
    return (
        <>
            {viewingResume
                ? <ReadSkills skillsProps={skillsProps} />
                : <>
                    {router.query.id
                        ? <UpdateSkills />
                        : <CreateSkills />
                    }
                </>
            }
        </>
    )
}

export default Skills;
