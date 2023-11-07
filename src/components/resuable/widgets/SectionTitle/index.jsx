
const SectionTitle = ({ subHeading, subHeadingClass, heading, headingClass, sectionClass }) => {
  return (
    <>
      {
        heading && (
          <div className={`section-title ${ sectionClass ? sectionClass : '' }`}>
            { subHeading && <h5 className={ subHeadingClass && subHeadingClass }>{subHeading}</h5>}
            <h2 className={ headingClass && headingClass }>{heading}</h2>
          </div>
        )
      }
    </>
  )
}

export default SectionTitle
