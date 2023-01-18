import create from "zustand";

export let resumePersonalInformationStore = create((set) => ({
    personalInformation: {
        firstname: "",
        surname: "",
        city: "",
        country: "",
        postalCode: "",
        phoneNumber: "",
        emailAddress: "",
    },
    updatePersonalInformation: (personalInformation) => set((state) => ({
        personalInformation: {
            ...state.personalInformation,
            ...personalInformation
        }
    })),
}))

export let resumeExperienceStore = create((set) => ({
    workExp: {
        title: "",
        employer: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
    },
    description: [],
    workExperiences: [],
    addWorkExp: (exp) => set((state) => ({
        workExp: {
            ...state.workExp,
            ...exp
        }
    })),
    addWorkDetailsArray: (expDetails) => set((state) => ({
        description: [...expDetails]
    })),
    updateWorkExpField: () => set((state) => ({
        workExp: {...state.workExp, description: state.description}
    })),
    addWorkExperiencesArray: () => set((state) => ({
        workExperiences: [state.workExp,...state.workExperiences]
    })),
    clearWorkExpField: () => set((state) => ({ 
        workExp: {
            title: "",
            employer: "",
            city: "",
            country: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
        }
    }))
}))

export let resumeEducationStore = create((set) => ({
    educationField: {
        institutionName: "",
        institutionLocation: "",
        degreeType: "",
        fieldOfStudy: "",
        graduationMonth: "",
        graduationYear: "",
    },
    description: [],
    educationalBackground: [],
    addEducation: (education) => set((state) => ({
        educationField: {
            ...state.educationField,
            ...education
        }
    })),
    addEducationDetailsArray: (educationDetails) => set((state) => ({
        description: [...educationDetails]
    })),
    updateEducationField: () => set((state) => ({
        educationField: {...state.educationField, description: state.description}
    })),
    addEducationalBackgroundArray: () => set((state) => ({
        educationalBackground: [state.educationField,...state.educationalBackground]
    })),
    clearEducationField: () => set((state) => ({ 
        educationField: {
            institutionName: "",
            institutionLocation: "",
            degreeType: "",
            fieldOfStudy: "",
            graduationMonth: "",
            graduationYear: "",
        },
    }))
}))

export let resumeSkillsStore = create((set) => ({
    skills: [],
    addSkills: (skill) => set((state) => ({
        skills: [...skill]
    })),
}))

export let resumeCertificationStore = create((set) => ({
    certifications: [],
    addCertifications: (cert) => set((state) => ({
        certifications: [...cert]
    })),
}))

export let resumePortfolioStore = create((set) => ({
    portfolio: "",
    addPortfolio: (portfolio) => set((state) => ({
        portfolio: [...portfolio]
    })),
}))

export let resumeProfileSummaryStore = create((set) => ({
    profileSummary: "",
    setProfileSummary: (value) => set((state) => ({
        profileSummary: value
    })),
}))

export let resumeDataStore = create((set) => ({
    initialResumeData: {},
    setInitialResumeData: (value) => set((state) => ({
        initialResumeData: value
    })),
    resumeData: {
        personalInformation: {},
        workExperiences: [],
        educationalBackground: [],
        skills: [],
        certifications: [],
        portfolio: "",
        profileSummary: "",
    },
    setResumeData: (value) => set((state) => ({
        resumeData: value
    })),
    updateResumePersonalInformation: (personalInformation) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            personalInformation: {
                ...state.resumeData.personalInformation,
                ...personalInformation
            }
        }
    })),
    updateResumeSkills: (skill) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            skills:[
                ...skill
            ]
            
        }
    })),
    updateResumeProfileSummary: (value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            profileSummary: value
        }
    })),
    updateResumeCertifications: (cert) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            certifications:[
                ...cert
            ]
            
        }
    })),
    updateResumePortfolio: (portfolio) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            portfolio:[
                ...portfolio
            ]
        }
    })),
    updateResumeWorkExp: (indexValue, exp) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            ...state.resumeData.workExperiences[indexValue] = {
                ...state.resumeData.workExperiences[indexValue],
                ...exp
            }
        }
    })),
    updateResumeWorkDetailsArray: (indexValue, expDetails, ) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            ...state.resumeData.workExperiences[indexValue].description = [...expDetails]
        }
    })),
    deleteResumeWorkExp: (indexValue) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            workExperiences: state.resumeData.workExperiences.filter((_, i) => i !== indexValue)
        }
    })),
    clearResumeWorkExpField: () => set((state) => ({ 
        resumeData: {
            ...state.resumeData,
            workExperiences: [
                {
                    title: "",
                    employer: "",
                    city: "",
                    country: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    description: []
                },
                ...state.resumeData.workExperiences
            ]
        }
    })),
    updateResumeEducation: (indexValue, education) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            ...state.resumeData.educationalBackground[indexValue] = {
                ...state.resumeData.educationalBackground[indexValue],
                ...education
            }
        }
    })),
    updateResumeEducationDetailsArray: (indexValue, educationDetails, ) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            ...state.resumeData.educationalBackground[indexValue].description = [...educationDetails]
        }
    })),
    clearResumeEducationField: () => set((state) => ({ 
        resumeData: {
            ...state.resumeData,
            educationalBackground: [
                {
                    institutionName: "",
                    institutionLocation: "",
                    degreeType: "",
                    fieldOfStudy: "",
                    graduationMonth: "",
                    graduationYear: "",
                    description: []
                },
                ...state.resumeData.educationalBackground
            ]
        }
    })),
}))

export let resumeDataExperienceIndexStore = create((set) => ({
    indexValue: 0,
    resetIndexValue: (value) => set((state) => ({
        indexValue: 0
    })),
    incrementIndexValue: () => set((state) => ({ indexValue: state.indexValue + 1 })),
    decrementIndexValue: () => set((state) => ({ indexValue: state.indexValue - 1 })),
}))

export let resumeDataEducationalBackgroundIndexStore = create((set) => ({
    indexValue: 0,
    resetIndexValue: (value) => set((state) => ({
        indexValue: 0
    })),
    incrementIndexValue: () => set((state) => ({ indexValue: state.indexValue + 1 })),
    decrementIndexValue: () => set((state) => ({ indexValue: state.indexValue - 1 })),
}))

export let completedSteps = create((set) => ({
    steps: 1,
    setCompletedSteps: (value) => set((state) => ({
        steps: value
    })),
    incrementStep: () => set((state) => ({ steps: state.steps + 1 })),
    decrementStep: () => set((state) => ({ steps: state.steps - 1 })),
}))

export let fillingForm = create((set) => ({
    value: true,
    setFillingForm: () => set((state) => ({value: !state.value}))
}))

export let modalSection = create((set) => ({
    value: false,
    setModalSection: () => set((state) => ({value: !state.value}))
}))

export let addingDetails = create((set) => ({
    value: false,
    setAddingDetails: (status) => set((state) => ({value: status}))
}))