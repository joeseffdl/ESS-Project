import Certifications from "./Certifications"
import Education from "./Education"
import PersonalInformation from "./PersonalInformation"
import Portfolio from "./Portfolio"
import ProfileSummary from "./ProfileSummary"
import Skills from "./Skills"
import WorkExperiences from "./WorkExperiences"

function OutputResume({ resumeDataProps, resumeProperties }) {

    return (
        <>
            <div className="h-full p-8">
                <div className="h-full text-xs divide-y-2 divide-blue-900"
                    style={{
                        'font-family': resumeProperties?.fontFamily,
                        'font-size': resumeProperties?.fontSize + 'rem',
                        'color': resumeProperties?.textColor,
                    }}>

                    {/* PERSONAL INFORMATION SECTION */}
                    <PersonalInformation personalInfoProps={{
                        viewPersonalInformation: resumeDataProps?.personalInformation ?? {},
                        headerFontSize: resumeProperties?.headerFontSize ?? '',
                        headerLineHeight: resumeProperties?.headerLineHeight ?? ''
                    }} />

                    {/* PROFILE SUMMARY SECTION */}
                    <ProfileSummary profileSummaryProps={{
                        viewProfileSummary: resumeDataProps?.profileSummary ?? {},
                        summaryMarginX: resumeProperties?.summaryMarginX ?? '',
                        summaryMarginY: resumeProperties?.summaryMarginY ?? '',
                        summaryLineHeight: resumeProperties?.summaryLineHeight ?? '',
                    }} />

                    {/* SKILLS SECTION */}
                    <Skills skillsProps={{
                        viewSkills: resumeDataProps?.skills ?? {},
                        skillsPaddingL: resumeProperties?.skillsPaddingL ?? '',
                        skillsPaddingR: resumeProperties?.skillsPaddingR ?? '',
                        skillsPaddingT: resumeProperties?.skillsPaddingT ?? '',
                        skillsPaddingB: resumeProperties?.skillsPaddingB ?? '',
                    }} />

                    {/* WORK EXPERIENCE SECTION */}
                    <WorkExperiences workExperiencesProps={{
                        viewWorkExperiences: resumeDataProps?.workExperiences ?? {},
                        experiencesHeadMarginT: resumeProperties?.experiencesHeadMarginT ?? '',
                        experiencesHeadMarginB: resumeProperties?.educationHeadMarginB ?? '',
                        experiencesHeadPaddingX: resumeProperties?.experiencesHeadPaddingX ?? '',
                        experiencesDescriptionPaddingL: resumeProperties?.educationDescriptionPaddingL ?? '',
                        experiencesDescriptionPaddingR: resumeProperties?.educationDescriptionPaddingR ?? '',
                        experiencesDescriptionPaddingY: resumeProperties?.educationDescriptionPaddingY ?? '',
                        experiencesMarginB: resumeProperties?.experiencesMarginB ?? '',
                    }} />

                    {/* EDUCATION SECTION */}
                    <Education educationProps={{
                        viewEducationalBackground: resumeDataProps?.educationalBackground ?? {},
                        educationHeadMarginT: resumeProperties?.educationHeadMarginT ?? '',
                        educationHeadMarginB: resumeProperties?.educationHeadMarginB ?? '',
                        educationSubHeadMarginT: resumeProperties?.educationSubHeadMarginT ?? '',
                        educationSubHeadMarginB: resumeProperties?.educationSubHeadMarginB ?? '',
                        educationHeadPaddingX: resumeProperties?.educationHeadPaddingX ?? '',
                        educationDescriptionPaddingL: resumeProperties?.educationDescriptionPaddingL ?? '',
                        educationDescriptionPaddingR: resumeProperties?.educationDescriptionPaddingR ?? '',
                        educationDescriptionPaddingY: resumeProperties?.educationDescriptionPaddingY ?? '',
                        educationMarginB: resumeProperties?.educationHeadMarginB ?? '',
                    }} />

                    {/* CERTIFICATION SECTION */}
                    <Certifications certificationsProps={{
                        viewCertifications: resumeDataProps?.certifications ?? {},
                        certificationsPaddingL: resumeProperties?.certificationsPaddingL ?? '',
                        certificationsPaddingR: resumeProperties?.certificationsPaddingR ?? '',
                        certificationsPaddingT: resumeProperties?.certificationsPaddingT ?? '',
                        certificationsPaddingB: resumeProperties?.certificationsPaddingB ?? '',
                    }} />

                    {/* PORTFOLIO SECTION */}
                    <Portfolio portfolioProps={{
                        viewPortfolio: resumeDataProps?.portfolio ?? {},
                        portfolioPaddingL: resumeProperties?.portfolioPaddingL ?? '',
                        portfolioPaddingR: resumeProperties?.portfolioPaddingR ?? '',
                        portfolioPaddingT: resumeProperties?.portfolioPaddingT ?? '',
                        portfolioPaddingB: resumeProperties?.portfolioPaddingB ?? '',
                    }} />
                </div>
            </div>
        </>
    )
}

export default OutputResume;
