import { useRouter } from "next/router";
import CreateCertifications from "./Certifications/CreateCertifications";
import ReadCertifications from "./Certifications/ReadCertifications";
import UpdateCertifications from "./Certifications/UpdateCertifications";

function Certifications({ certificationsProps }) {
  const {
    query: { viewResume, id },
  } = useRouter();

  return (
    <>
      {viewResume ? (
        <ReadCertifications {...certificationsProps} />
      ) : id ? (
        <UpdateCertifications />
      ) : (
        <CreateCertifications />
      )}
    </>
  );
}

export default Certifications;
