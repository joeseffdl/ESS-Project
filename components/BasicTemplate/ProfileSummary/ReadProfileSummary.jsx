function ReadProfileSummary({
  viewProfileSummary,
  summaryMarginX,
  summaryMarginY,
  summaryLineHeight,
}) {
  return viewProfileSummary ? (
    <section className="w-full">
      <div className="text-center font-bold my-1">Profile Summary</div>
      <div
        className="w-auto break-words text-center divide-x"
        style={{
          marginLeft: `${summaryMarginX}rem`,
          marginRight: `${summaryMarginX}rem`,
          marginTop: `${summaryMarginY}rem`,
          marginBottom: `${summaryMarginY}rem`,
          lineHeight: `${summaryLineHeight}rem`,
        }}
      >
        {viewProfileSummary}
      </div>
    </section>
  ) : null;
}

export default ReadProfileSummary;
