import { useRouter } from "next/router";
import CreateSkills from "./Skills/CreateSkills";
import ReadSkills from "./Skills/ReadSkills";
import UpdateSkills from "./Skills/UpdateSkills";

function Skills({ skillsProps }) {
  const {
    query: { viewResume, id },
  } = useRouter();

  return (
    <>
      {viewResume ? (
        <ReadSkills {...skillsProps} />
      ) : id ? (
        <UpdateSkills />
      ) : (
        <CreateSkills />
      )}
    </>
  );
}

export default Skills;
