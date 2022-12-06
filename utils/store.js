import create from "zustand";
import { devtools, persist } from "zustand/middleware";

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
        description: [expDetails]
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
        description: [educationDetails]
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
        skills: [skill]
    })),
}))

export let resumeCertificationStore = create((set) => ({
    certifications: [],
    addCertifications: (cert) => set((state) => ({
        certifications: [cert]
    })),
}))

export let resumePortfolioStore = create((set) => ({
    portfolio: "",
    addPortfolio: (portfolio) => set((state) => ({
        portfolio: [portfolio]
    })),
}))

export let resumeProfileSummaryStore = create((set) => ({
    profileSummary: "",
    setProfileSummary: (value) => set((state) => ({
        profileSummary: value
    })),
}))

export let completedSteps = create((set) => ({
    steps: 1,
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