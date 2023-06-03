function ReadCertifications({
  viewCertifications,
  certificationsPaddingL,
  certificationsPaddingR,
  certificationsPaddingT,
  certificationsPaddingB,
}) {
  return (
    <>
      {Array.isArray(viewCertifications) && viewCertifications.length > 0 ? (
        <section className="w-full pb-5">
          <div className="text-center font-bold my-1">Certifications</div>
          <div className="mb-5 ">
            {viewCertifications.map((cert) => (
              <ul
                className="flex list-disc list-inside"
                style={{
                  paddingLeft: `${certificationsPaddingL}rem`,
                  paddingRight: `${certificationsPaddingR}rem`,
                  paddingTop: `${certificationsPaddingT}rem`,
                  paddingBottom: `${certificationsPaddingB}rem`,
                }}
                key={cert}
              >
                <li>{cert}</li>
              </ul>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default ReadCertifications;
