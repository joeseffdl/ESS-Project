import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import {
  addingDetails,
  completedSteps,
  fillingForm,
  modalSection,
  resumeDataExperienceIndexStore,
  resumeDataStore,
  resumeExperienceStore,
} from "../../utils/store";
import FormWindow from "../FormWindow";

function ResumeExperience() {
  // Router
  const router = useRouter();

  // Edit States
  const resumeData = resumeDataStore((state) => state.resumeData);
  const initialResumeData = resumeDataStore((state) => state.initialResumeData);
  const indexValue = resumeDataExperienceIndexStore(
    (state) => state.indexValue
  );

  // Edit State Functions
  const updateResumeWorkExp = resumeDataStore(
    (state) => state.updateResumeWorkExp
  );
  const updateResumeWorkDetailsArray = resumeDataStore(
    (state) => state.updateResumeWorkDetailsArray
  );
  const deleteResumeWorkExp = resumeDataStore(
    (state) => state.deleteResumeWorkExp
  );
  const clearResumeWorkExpField = resumeDataStore(
    (state) => state.clearResumeWorkExpField
  );
  const incrementIndexValue = resumeDataExperienceIndexStore(
    (state) => state.incrementIndexValue
  );
  const decrementIndexValue = resumeDataExperienceIndexStore(
    (state) => state.decrementIndexValue
  );
  const setInitialResumeData = resumeDataStore(
    (state) => state.setInitialResumeData
  );

  // States
  const workExperiences = resumeExperienceStore(
    (state) => state.workExperiences
  );
  const workExp = resumeExperienceStore((state) => state.workExp);
  const description = resumeExperienceStore((state) => state.description);
  const fillingFormValue = fillingForm((state) => state.value);
  const modalSectionValue = modalSection((state) => state.value);

  // States Functions
  const addWorkExp = resumeExperienceStore((state) => state.addWorkExp);
  const addWorkDetailsArray = resumeExperienceStore(
    (state) => state.addWorkDetailsArray
  );
  const updateWorkExpField = resumeExperienceStore(
    (state) => state.updateWorkExpField
  );
  const addWorkExperiencesArray = resumeExperienceStore(
    (state) => state.addWorkExperiencesArray
  );
  const clearWorkExpField = resumeExperienceStore(
    (state) => state.clearWorkExpField
  );
  const incrementStep = completedSteps((state) => state.incrementStep);
  const decrementStep = completedSteps((state) => state.decrementStep);
  const setFillingForm = fillingForm((state) => state.setFillingForm);
  const setModalSection = modalSection((state) => state.setModalSection);
  const setAddingDetails = addingDetails((state) => state.setAddingDetails);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (_.isUndefined(router.query.id)) {
      addWorkExp({ [name]: value });
    } else if (router.query.id) {
      updateResumeWorkExp(indexValue, { [name]: value });
    }
  };

  // Handle checkbox
  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;
    if (_.isUndefined(router.query.id)) {
      if (checked) {
        addWorkExp({ [name]: value });
      } else {
        addWorkExp({ [name]: "" });
      }
    } else if (router.query.id) {
      if (checked) {
        updateResumeWorkExp(indexValue, { [name]: value });
      } else {
        updateResumeWorkExp(indexValue, { [name]: "" });
      }
    }
  };

  // Handle Text Area changes
  const handleTextAreaChange = (e) => {
    const { value } = e.target;
    if (_.isUndefined(router.query.id)) {
      addWorkDetailsArray(value.split("\n"));
      updateWorkExpField();
    } else if (router.query.id) {
      updateResumeWorkDetailsArray(indexValue, value.split("\n"));
    }
  };

  // Go back to the previous page
  const toPreviousPage = (e) => {
    e.preventDefault();
    setFillingForm(true);
    setModalSection(false);
    decrementStep();
  };

  // Go back to the previous form
  const toExperienceForm = (e) => {
    e.preventDefault();
    setFillingForm();
  };

  // Change state of fillingForm to false
  const fillingFormState = async (e) => {
    e.preventDefault();
    if (
      _.isUndefined(router.query.id) &&
      _.isEmpty(workExp.title && workExp.employer)
    ) {
      toast.error(`Please enter all required fields 😞`);
      return;
    } else if (
      router.query.id &&
      _.isEmpty(
        resumeData.workExperiences[indexValue]?.title &&
          resumeData.workExperiences[indexValue]?.employer
      )
    ) {
      toast.error(`Please enter all required fields 😞`);
      return;
    } else if (
      router.query.id &&
      !_.isEqual(initialResumeData.workExperiences, resumeData.workExperiences)
    ) {
      try {
        const docRef = doc(db, "resumes", router.query.id);
        const docSnap = await getDoc(docRef);
        const updatedResume = {
          ...docSnap.data(),
          resumeData: {
            ...docSnap.data().resumeData,
            workExperiences: resumeData.workExperiences,
          },
          lastUpdatedOn: serverTimestamp(),
        };
        await updateDoc(docRef, updatedResume);
        setInitialResumeData({
          resumeData: {
            certifications: resumeData.certifications,
            educationalBackground: resumeData.educationalBackground,
            personalInformation: resumeData.personalInformation,
            profileSummary: resumeData.profileSummary,
            portfolio: resumeData.portfolio,
            skills: resumeData.skills,
            workExperiences: resumeData.workExperiences,
          },
        });
        toast.success("Resume updated successfully 😄");
      } catch (err) {
        console.log(err);
      }
    }
    setFillingForm();
  };

  // Continue to Add Experience section
  const toAddExperienceSection = async (e) => {
    e.preventDefault();
    if (
      router.query.id &&
      !_.isEqual(initialResumeData.workExperiences, resumeData.workExperiences)
    ) {
      try {
        const docRef = doc(db, "resumes", router.query.id);
        const docSnap = await getDoc(docRef);
        const updatedResume = {
          ...docSnap.data(),
          resumeData: {
            ...docSnap.data().resumeData,
            workExperiences: resumeData.workExperiences,
          },
          lastUpdatedOn: serverTimestamp(),
        };
        await updateDoc(docRef, updatedResume);
        setInitialResumeData({
          resumeData: {
            certifications: resumeData.certifications,
            educationalBackground: resumeData.educationalBackground,
            personalInformation: resumeData.personalInformation,
            profileSummary: resumeData.profileSummary,
            portfolio: resumeData.portfolio,
            skills: resumeData.skills,
            workExperiences: resumeData.workExperiences,
          },
        });
        toast.success("Resume updated successfully 😄");
      } catch (err) {
        console.log(err);
      }
    }
    addWorkExperiencesArray();
    setModalSection();
    setAddingDetails(false);
  };

  // Add More Experience
  const addMoreExperience = (e) => {
    e.preventDefault();
    if (_.isUndefined(router.query.id)) {
      clearWorkExpField();
    } else {
      clearResumeWorkExpField();
    }
    setFillingForm();
    setModalSection();
    setAddingDetails(true);
  };

  // Continue to Education section
  const toResumeEducation = (e) => {
    e.preventDefault();
    incrementStep();
    setFillingForm();
    setModalSection();
    setAddingDetails(false);
  };

  // Skip Section
  const skipSection = (e) => {
    e.preventDefault();
    incrementStep();
    setAddingDetails(false);
  };

  // Increment Index value
  const incrementIndex = (e) => {
    e.preventDefault();
    incrementIndexValue();
  };

  // Decrement Index value
  const decrementIndex = (e) => {
    e.preventDefault();
    decrementIndexValue();
  };

  // Delete Index Item
  const deleteIndex = (e) => {
    e.preventDefault();
    if (router.query.id) {
      deleteResumeWorkExp(indexValue);
      if (indexValue > 0) {
        decrementIndexValue();
      }
      // if (resumeData.workExperiences.length === 0) {
      //   clearResumeWorkExpField()
      // }
    } else if (_.isUndefined(router.query.id)) {
      console.log(workExperiences);
    }
  };

  if (fillingFormValue && !modalSectionValue) {
    return (
      <FormWindow onSubmit={fillingFormState} formTitle="Work Experience">
        <div
          className="w-full flex flex-col gap-2 mb-5
          "
        >
          <input
            className={`input rounded-lg focus:outline-none w-full border-2 ${
              router.query.id
                ? resumeData.workExperiences[indexValue]?.title == ""
                  ? "input-warning"
                  : "input-success"
                : workExp.title == ""
                ? "input-warning"
                : "input-success"
            }`}
            type="text"
            placeholder="Work Title"
            value={
              router.query.id
                ? resumeData.workExperiences[indexValue]?.title ?? ""
                : workExp.title
            }
            name="title"
            onChange={handleChange}
          />
          <input
            className={`input rounded-lg focus:outline-none w-full border-2 ${
              router.query.id
                ? resumeData.workExperiences[indexValue]?.employer == ""
                  ? "input-warning"
                  : "input-success"
                : workExp.employer == ""
                ? "input-warning"
                : "input-success"
            }`}
            type="text"
            placeholder="Employer"
            value={
              router.query.id
                ? resumeData.workExperiences[indexValue]?.employer ?? ""
                : workExp.employer
            }
            name="employer"
            onChange={handleChange}
          />
        </div>
        <div
          className="w-full flex flex-col gap-2 mb-5
          "
        >
          <input
            className="input rounded-lg focus:outline-none w-full border-2 "
            type="text"
            placeholder="City/Municipality"
            value={
              router.query.id
                ? resumeData.workExperiences[indexValue]?.city ?? ""
                : workExp.city
            }
            name="city"
            onChange={handleChange}
          />
          <input
            className="input rounded-lg focus:outline-none w-full border-2 "
            type="text"
            placeholder="Country"
            value={
              router.query.id
                ? resumeData.workExperiences[indexValue]?.country ?? ""
                : workExp.country
            }
            name="country"
            onChange={handleChange}
          />
        </div>
        <div
          className="w-full flex flex-col sm:flex-row lg:flex-col gap-2 mb-5
          "
        >
          <input
            className="input rounded-lg focus:outline-none w-full border-2"
            type="text"
            placeholder="Start Date"
            value={
              router.query.id
                ? resumeData.workExperiences[indexValue]?.startDate ?? ""
                : workExp.startDate
            }
            name="startDate"
            onChange={handleChange}
            onFocus={(e) => (e.target.type = "month")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <div className="w-full flex flex-col ">
            <input
              disabled={
                router.query.id
                  ? resumeData.workExperiences[indexValue]?.currentlyWorking ??
                    "" == "Present"
                  : workExp.currentlyWorking == "Present"
              }
              className="input rounded-lg focus:outline-none w-full border-2"
              type="text"
              placeholder="End Date"
              value={
                router.query.id
                  ? resumeData.workExperiences[indexValue]?.currentlyWorking ??
                    "" == "Present"
                    ? ""
                    : resumeData.workExperiences[indexValue]?.endDate ?? ""
                  : workExp.currentlyWorking == "Present"
                  ? ""
                  : workExp.endDate
              }
              name="endDate"
              onChange={handleChange}
              onFocus={(e) => (e.target.type = "month")}
              onBlur={(e) => (e.target.type = "text")}
            />
            <div className="w-full flex flex-between">
              <label className="w-full flex gap-5 mt-3 px-2 cursor-pointer">
                <span className="font-semibold">Currently Working</span>
                <input
                  className="checkbox "
                  checked={
                    router.query.id
                      ? resumeData.workExperiences[indexValue]
                          ?.currentlyWorking ?? "" == "Present"
                      : workExp.currentlyWorking == "Present"
                  }
                  type="checkbox"
                  value="Present"
                  name="currentlyWorking"
                  onChange={handleCheckbox}
                />
              </label>
              {router.query.id ? (
                <div className="w-full flex justify-end gap-5 mt-3 px-2">
                  <button
                    className=" btn btn-xs btn-error btn-outline"
                    disabled={resumeData.workExperiences.length < 1}
                    onClick={deleteIndex}
                  >
                    ☠️
                  </button>
                  <button
                    className=" btn btn-xs btn-outline btn-accent"
                    disabled={indexValue == 0}
                    onClick={decrementIndex}
                  >
                    &#60;
                  </button>
                  <button
                    className=" btn btn-xs btn-outline btn-accent"
                    disabled={
                      indexValue >= resumeData.workExperiences.length - 1
                    }
                    onClick={incrementIndex}
                  >
                    &#62;
                  </button>
                </div>
              ) : (
                <>
                  {/* <div className="w-full flex justify-end gap-5 mt-3 px-2">
                      <button className=" btn btn-xs btn-error btn-outline" disabled={workExperiences.length <= 1 && workExperiences[0]?.title == "" && workExperiences[0]?.employer == ""} onClick={deleteIndex}>☠️</button>
                      <button className=" btn btn-xs btn-outline" disabled={indexValue == 0} onClick={decrementIndex}>&#60;</button>
                      <button className=" btn btn-xs btn-outline" disabled={indexValue == workExperiences.length - 1} onClick={incrementIndex}>&#62;</button>
                    </div> */}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col sm:justify-between gap-5">
          <button
            className=" btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
            onClick={toPreviousPage}
          >
            Back
          </button>
          <button
            type="submit"
            className=" btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
          >
            {router.query.id &&
            !_.isEqual(
              initialResumeData.workExperiences,
              resumeData.workExperiences
            )
              ? "Update"
              : "Continue"}
          </button>
          <button
            className=" btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
            onClick={skipSection}
          >
            Skip to Education Section
          </button>
        </div>
      </FormWindow>
    );
  } else if (!fillingFormValue && !modalSectionValue) {
    return (
      <FormWindow
        onSubmit={toAddExperienceSection}
        formTitle="Work Experience Description"
      >
        <textarea
          className="textarea h-1/3 mb-5 rounded-lg focus:outline-none w-full border-2"
          type="text"
          placeholder="Write down your work's description."
          name="description"
          onChange={handleTextAreaChange}
        >
          {router.query.id
            ? resumeData.workExperiences[indexValue].description?.join("\n")
            : description.value}
        </textarea>
        <div className="w-full flex flex-col sm:justify-between gap-5">
          <button
            className="btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
            onClick={toExperienceForm}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
          >
            {router.query.id &&
            !_.isEqual(
              initialResumeData.workExperiences,
              resumeData.workExperiences
            )
              ? "Update"
              : "Continue"}
          </button>
        </div>
      </FormWindow>
    );
  } else if (!fillingFormValue && modalSection) {
    return (
      <FormWindow
        onSubmit={toResumeEducation}
        formTitle="Want to add more work experience?"
      >
        <div className="w-full flex flex-col sm:justify-between gap-5">
          <button
            className="btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
            onClick={toPreviousPage}
          >
            Back
          </button>
          <button
            className="btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
            onClick={addMoreExperience}
          >
            Add Experience
          </button>
          <button
            type="submit"
            className="btn btn-sm sm:btn-md btn-outline btn-accent rounded-lg"
          >
            Continue
          </button>
        </div>
      </FormWindow>
    );
  } else {
    null;
  }
}

export default ResumeExperience;
