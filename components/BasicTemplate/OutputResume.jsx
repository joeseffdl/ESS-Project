import Certifications from "./Certifications";
import Education from "./Education";
import PersonalInformation from "./PersonalInformation";
import Portfolio from "./Portfolio";
import ProfileSummary from "./ProfileSummary";
import Skills from "./Skills";
import WorkExperiences from "./WorkExperiences";

function OutputResume({ resumeDataProps, resumeProperties }) {
  const {
    fontFamily,
    fontSize,
    textColor,
    headerFontSize = "",
    headerLineHeight = "",
    summaryMarginX = "",
    summaryMarginY = "",
    summaryLineHeight = "",
    skillsPaddingL = "",
    skillsPaddingR = "",
    skillsPaddingT = "",
    skillsPaddingB = "",
    experiencesHeadMarginT = "",
    experiencesHeadMarginB = "",
    experiencesHeadPaddingX = "",
    experiencesDescriptionPaddingL = "",
    experiencesDescriptionPaddingR = "",
    experiencesDescriptionPaddingY = "",
    experiencesMarginB = "",
    educationHeadMarginT = "",
    educationHeadMarginB = "",
    educationSubHeadMarginT = "",
    educationSubHeadMarginB = "",
    educationHeadPaddingX = "",
    educationDescriptionPaddingL = "",
    educationDescriptionPaddingR = "",
    educationDescriptionPaddingY = "",
    educationMarginB = "",
    certificationsPaddingL = "",
    certificationsPaddingR = "",
    certificationsPaddingT = "",
    certificationsPaddingB = "",
    portfolioPaddingL = "",
    portfolioPaddingR = "",
    portfolioPaddingT = "",
    portfolioPaddingB = "",
  } = resumeProperties || {};

  const {
    personalInformation: viewPersonalInformation = "viewPersonalInformation",
    profileSummary: viewProfileSummary = "viewProfileSummary",
    skills: viewSkills = { viewSkills: "" },
    workExperiences: viewWorkExperiences = "viewWorkExperiences",
    educationalBackground:
      viewEducationalBackground = "viewEducationalBackground",
    certifications: viewCertifications = "viewCertifications",
    portfolio: viewPortfolio = "viewPortfolio",
  } = resumeDataProps || {};

  return (
    <>
      <div className="h-full p-8">
        <div
          className="h-full text-xs divide-y-2 divide-blue-900"
          style={{
            fontFamily,
            fontSize: `${fontSize}rem`,
            color: textColor,
          }}
        >
          {/* PERSONAL INFORMATION SECTION */}
          <PersonalInformation
            personalInfoProps={{
              viewPersonalInformation,
              headerFontSize,
              headerLineHeight,
            }}
          />

          {/* PROFILE SUMMARY SECTION */}
          <ProfileSummary
            profileSummaryProps={{
              viewProfileSummary,
              summaryMarginX,
              summaryMarginY,
              summaryLineHeight,
            }}
          />

          {/* SKILLS SECTION */}
          <Skills
            skillsProps={{
              viewSkills,
              skillsPaddingL,
              skillsPaddingR,
              skillsPaddingT,
              skillsPaddingB,
            }}
          />

          {/* WORK EXPERIENCE SECTION */}
          <WorkExperiences
            workExperiencesProps={{
              viewWorkExperiences,
              experiencesHeadMarginT,
              experiencesHeadMarginB,
              experiencesHeadPaddingX,
              experiencesDescriptionPaddingL,
              experiencesDescriptionPaddingR,
              experiencesDescriptionPaddingY,
              experiencesMarginB,
            }}
          />

          {/* EDUCATION SECTION */}
          <Education
            educationProps={{
              viewEducationalBackground,
              educationHeadMarginT,
              educationHeadMarginB,
              educationSubHeadMarginT,
              educationSubHeadMarginB,
              educationHeadPaddingX,
              educationDescriptionPaddingL,
              educationDescriptionPaddingR,
              educationDescriptionPaddingY,
              educationMarginB,
            }}
          />

          {/* CERTIFICATION SECTION */}
          <Certifications
            certificationsProps={{
              viewCertifications,
              certificationsPaddingL,
              certificationsPaddingR,
              certificationsPaddingT,
              certificationsPaddingB,
            }}
          />

          {/* PORTFOLIO SECTION */}
          <Portfolio
            portfolioProps={{
              viewPortfolio,
              portfolioPaddingL,
              portfolioPaddingR,
              portfolioPaddingT,
              portfolioPaddingB,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OutputResume;
