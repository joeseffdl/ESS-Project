import { resumeDataStore } from "../../../utils/store";

function UpdateCertifications() {
  const resumeData = resumeDataStore((state) => state.resumeData);

  return (
    <>
      {Array.isArray(resumeData.certifications) &&
      resumeData.certifications.length > 0 ? (
        <section className="w-full px-10 pb-5">
          <div className="text-center font-bold my-1">Certifications</div>
          <div className="mb-5">
            {resumeData.certifications.map((cert) => (
              <ul className="flex list-disc list-inside" key={cert}>
                <li>{cert}</li>
              </ul>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default UpdateCertifications;
