import { useState } from "react";
import FormWindow from "./FormWindow";

function CustomView({resumeFormat, setResumeFormat}) {
    let [propertiesPage, setPropertiesPage] = useState(1) 

    // Resume Properties
    const resumeTemplatesArray = [
        "Resume",
    ]

    const fontFamilyArray = [
        "Segoe UI",
        "Helvetica",
        "Arial",
        "Verdana",
        "Tahoma",
        "Trebuchet MS",
        "Impact",
        "Gil Sans",
        "Times New Roman",
        "Georgia",
        "Palatino",
        "Baskerville",
        "Andalé Mono",
        "Courier",
        "Lucida",
        "Monaco",
        "Bradley Hand",
        "Brush Script MT",
        "Luminari",
        "Comic Sans MS",
    ]

    const textColorArray = [
        "Black",
        "Gray",
        "Navy",
        "Indigo",
        "Plum",
        "Teal",
        "Turquoise",
        "Peru",
        "Brown",
        "Crimson",
        "Maroon",
        "Salmon",
        "Pink",
    ]

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target
        setResumeFormat({ ...resumeFormat, [name]: value })
    }
    // props.dataFromCustomView(resumeFormat)

    const renderPropertiesPage = () => {
        if (propertiesPage == 1) {
            return (
                <div className="w-full flex flex-col gap-2 px-5 mb-5">
                    <label className="label justify-center text-sm font-semibold" >Document Formatting</label>
                    <select
                        className="select rounded-lg text-xs bg-white"
                        name="template"
                        onChange={handleChange}
                        defaultValue="Resume Template"
                    >
                        <option disabled >Resume Template</option>
                        {
                            resumeTemplatesArray.map((template) =>
                                <option value={template} key={template}>
                                    {template}
                                </option>)
                        }
                    </select>

                    <select
                        className="select rounded-lg text-xs bg-white"
                        name="textColor"
                        onChange={handleChange}
                        defaultValue="Text Color"
                    >
                        <option disabled>Text Color</option>
                        {
                            textColorArray.map((textColor) =>
                                <option value={textColor} key={textColor}>
                                    {textColor}
                                </option>)
                        }
                    </select>
                    <select
                        className="select rounded-lg text-xs bg-white"
                        name="fontFamily"
                        onChange={handleChange}
                        defaultValue="Font Family"
                    >
                        <option disabled >Font Family</option>
                        {
                            fontFamilyArray.map((fontFamily) =>
                                <option value={fontFamily} key={fontFamily}>
                                    {fontFamily}
                                </option>)
                        }
                    </select>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Font Size:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="fontSize"
                                type="range"
                                min="0.75"
                                max="1.5"
                                step="0.125"
                                onChange={handleChange}
                            />
                            {resumeFormat.fontSize}rem
                        </label>
                    </div>
                    
                    {/* HEADER SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Header Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Font Size:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="headerFontSize"
                                type="range"
                                min="0.75"
                                max="3"
                                step={
                                    resumeFormat.headerFontSize >= 1.25 && resumeFormat.headerFontSize < 1.5
                                        ? 0.25
                                        : resumeFormat.headerFontSize >= 1.5 && resumeFormat.headerFontSize < 2.25
                                            ? 0.375
                                            : resumeFormat.headerFontSize >= 2.25
                                                ? 0.75
                                                : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.headerFontSize}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Line Height:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="headerLineHeight"
                                type="range"
                                min="0.75"
                                max="3"
                                step={
                                    resumeFormat.headerLineHeight >= 1.25 && resumeFormat.headerLineHeight < 1.5
                                        ? 0.25
                                        : resumeFormat.headerLineHeight >= 1.5 && resumeFormat.headerLineHeight < 2.25
                                            ? 0.375
                                            : resumeFormat.headerLineHeight >= 2.2
                                                ? 0.75
                                                : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.headerLineHeight}rem
                        </label>
                    </div>

                    {/* PROFILE SUMMARY SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Profile Summary Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Margin X:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="summaryMarginX"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.summaryMarginX >= 1 && resumeFormat.summaryMarginX < 3
                                        ? 0.25
                                        : resumeFormat.summaryMarginX >= 3 && resumeFormat.summaryMarginX < 4
                                            ? 0.5
                                            : resumeFormat.summaryMarginX >= 4 && resumeFormat.summaryMarginX < 16
                                                ? 1
                                                : resumeFormat.summaryMarginX >= 16 && resumeFormat.summaryMarginX < 20
                                                    ? 2
                                                    : resumeFormat.summaryMarginX >= 20 && resumeFormat.summaryMarginX <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.summaryMarginX}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Margin Y:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="summaryMarginY"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.summaryMarginY}rem
                        </label>
                    </div>
                    
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Line Height:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="summaryLineHeight"
                                type="range"
                                min="0.75"
                                max="2.5"
                                step={0.25}
                                onChange={handleChange}
                            />
                            {resumeFormat.summaryLineHeight}rem
                        </label>
                    </div>

                    {/* SKILLS SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Skills Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Left Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="skillsPaddingL"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.skillsPaddingL >= 1 && resumeFormat.skillsPaddingL < 3
                                        ? 0.25
                                        : resumeFormat.skillsPaddingL >= 3 && resumeFormat.skillsPaddingL < 4
                                            ? 0.5
                                            : resumeFormat.skillsPaddingL >= 4 && resumeFormat.skillsPaddingL < 16
                                                ? 1
                                                : resumeFormat.skillsPaddingL >= 16 && resumeFormat.skillsPaddingL < 20
                                                    ? 2
                                                    : resumeFormat.skillsPaddingL >= 20 && resumeFormat.skillsPaddingL <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.skillsPaddingL}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Right Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="skillsPaddingR"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.skillsPaddingR >= 1 && resumeFormat.skillsPaddingR < 3
                                        ? 0.25
                                        : resumeFormat.skillsPaddingR >= 3 && resumeFormat.skillsPaddingR < 4
                                            ? 0.5
                                            : resumeFormat.skillsPaddingR >= 4 && resumeFormat.skillsPaddingR < 16
                                                ? 1
                                                : resumeFormat.skillsPaddingR >= 16 && resumeFormat.skillsPaddingR < 20
                                                    ? 2
                                                    : resumeFormat.skillsPaddingR >= 20 && resumeFormat.skillsPaddingR <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.skillsPaddingR}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Top Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="skillsPaddingT"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.skillsPaddingT}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Bot Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="skillsPaddingB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.skillsPaddingB}rem
                        </label>
                    </div>
                </div>
            )
        } else if (propertiesPage == 2) {
            return (
                <div className="w-full flex flex-col gap-2 px-5 mb-5">
                    
                    {/* EXPERIENCES SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Experiences Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Header Top:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="experiencesHeadMarginT"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.experiencesHeadMarginT}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Header Bot:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="experiencesHeadMarginB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.experiencesHeadMarginB}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Header Gap:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="experiencesHeadPaddingX"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.experiencesHeadPaddingX}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Description X:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="experiencesDescriptionPaddingL"
                                type="range"
                                min="0"
                                max="40"
                                step={
                                    resumeFormat.experiencesDescriptionPaddingL >= 1 && resumeFormat.experiencesDescriptionPaddingL < 3
                                        ? 0.25
                                        : resumeFormat.experiencesDescriptionPaddingL >= 3 && resumeFormat.experiencesDescriptionPaddingL < 4
                                            ? 0.5
                                            : resumeFormat.experiencesDescriptionPaddingL >= 4 && resumeFormat.experiencesDescriptionPaddingL < 16
                                                ? 1
                                                : resumeFormat.experiencesDescriptionPaddingL >= 16 && resumeFormat.experiencesDescriptionPaddingL < 20
                                                    ? 2
                                                    : resumeFormat.experiencesDescriptionPaddingL >= 20 && resumeFormat.experiencesDescriptionPaddingL >= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.experiencesDescriptionPaddingL}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Description Y:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="experiencesDescriptionPaddingY"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.experiencesDescriptionPaddingY}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Section Gap:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="experiencesMarginB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.experiencesMarginB}rem
                        </label>
                    </div>

                    {/* EDUCATION SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Education Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Header Top:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationHeadMarginT"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationHeadMarginT}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Header Bot:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationHeadMarginB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationHeadMarginB}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Sub Head Top:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationSubHeadMarginT"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationSubHeadMarginT}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Sub Head Bot:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationSubHeadMarginB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationSubHeadMarginB}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Header Gap:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationHeadPaddingX"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationHeadPaddingX}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Description X:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationDescriptionPaddingL"
                                type="range"
                                min="0"
                                max="40"
                                step={
                                    resumeFormat.educationDescriptionPaddingL >= 1 && resumeFormat.educationDescriptionPaddingL < 3
                                        ? 0.25
                                        : resumeFormat.educationDescriptionPaddingL >= 3 && resumeFormat.educationDescriptionPaddingL < 4
                                            ? 0.5
                                            : resumeFormat.educationDescriptionPaddingL >= 4 && resumeFormat.educationDescriptionPaddingL < 16
                                                ? 1
                                                : resumeFormat.educationDescriptionPaddingL >= 16 && resumeFormat.educationDescriptionPaddingL < 20
                                                    ? 2
                                                    : resumeFormat.educationDescriptionPaddingL >= 20 && resumeFormat.educationDescriptionPaddingL >= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.educationDescriptionPaddingL}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Description Y:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationDescriptionPaddingY"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationDescriptionPaddingY}rem
                        </label>
                    </div>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Section Gap:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="educationMarginB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.educationMarginB}rem
                        </label>
                    </div>
                </div>
            )
        } else if (propertiesPage == 3) {
            return (
                <div className="w-full flex flex-col gap-2 px-5 mb-5">

                    {/* CERTIFICATIONS SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Certifications Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Left Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="certificationsPaddingL"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.certificationsPaddingL >= 1 && resumeFormat.certificationsPaddingL < 3
                                        ? 0.25
                                        : resumeFormat.certificationsPaddingL >= 3 && resumeFormat.certificationsPaddingL < 4
                                            ? 0.5
                                            : resumeFormat.certificationsPaddingL >= 4 && resumeFormat.certificationsPaddingL < 16
                                                ? 1
                                                : resumeFormat.certificationsPaddingL >= 16 && resumeFormat.certificationsPaddingL < 20
                                                    ? 2
                                                    : resumeFormat.certificationsPaddingL >= 20 && resumeFormat.certificationsPaddingL <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.certificationsPaddingL}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Right Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="certificationsPaddingR"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.certificationsPaddingR >= 1 && resumeFormat.certificationsPaddingR < 3
                                        ? 0.25
                                        : resumeFormat.certificationsPaddingR >= 3 && resumeFormat.certificationsPaddingR < 4
                                            ? 0.5
                                            : resumeFormat.certificationsPaddingR >= 4 && resumeFormat.certificationsPaddingR < 16
                                                ? 1
                                                : resumeFormat.certificationsPaddingR >= 16 && resumeFormat.certificationsPaddingR < 20
                                                    ? 2
                                                    : resumeFormat.certificationsPaddingR >= 20 && resumeFormat.certificationsPaddingR <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.certificationsPaddingR}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Top Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="certificationsPaddingT"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.certificationsPaddingT}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Bot Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="certificationsPaddingB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.certificationsPaddingB}rem
                        </label>
                    </div>

                    {/* PORTFOLIO SECTION */}
                    <label className="label justify-center text-sm font-semibold" >Portfolio Section</label>
                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Left Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="portfolioPaddingL"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.portfolioPaddingL >= 1 && resumeFormat.portfolioPaddingL < 3
                                        ? 0.25
                                        : resumeFormat.portfolioPaddingL >= 3 && resumeFormat.portfolioPaddingL < 4
                                            ? 0.5
                                            : resumeFormat.portfolioPaddingL >= 4 && resumeFormat.portfolioPaddingL < 16
                                                ? 1
                                                : resumeFormat.portfolioPaddingL >= 16 && resumeFormat.portfolioPaddingL < 20
                                                    ? 2
                                                    : resumeFormat.portfolioPaddingL >= 20 && resumeFormat.portfolioPaddingL <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.portfolioPaddingL}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Right Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="portfolioPaddingR"
                                type="range"
                                min="0"
                                max="24"
                                step={
                                    resumeFormat.portfolioPaddingR >= 1 && resumeFormat.portfolioPaddingR < 3
                                        ? 0.25
                                        : resumeFormat.portfolioPaddingR >= 3 && resumeFormat.portfolioPaddingR < 4
                                            ? 0.5
                                            : resumeFormat.portfolioPaddingR >= 4 && resumeFormat.portfolioPaddingR < 16
                                                ? 1
                                                : resumeFormat.portfolioPaddingR >= 16 && resumeFormat.portfolioPaddingR < 20
                                                    ? 2
                                                    : resumeFormat.portfolioPaddingR >= 20 && resumeFormat.portfolioPaddingR <= 24
                                                        ? 4
                                                        : 0.125
                                }
                                onChange={handleChange}
                            />
                            {resumeFormat.portfolioPaddingR}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Top Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="portfolioPaddingT"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.portfolioPaddingT}rem
                        </label>
                    </div>

                    <div className="w-full flex items-center p-4 bg-white rounded-lg">
                        <label className="w-full relative flex items-center justify-between text-xs font-semibold">Bot Padding:
                            <input
                                className="absolute w-1/2 left-20 top-0.5"
                                name="portfolioPaddingB"
                                type="range"
                                min="0"
                                max="1.5"
                                step={0.125}
                                onChange={handleChange}
                            />
                            {resumeFormat.portfolioPaddingB}rem
                        </label>
                    </div>
                </div>
            )
        }
    }

    // Properties Page
    const nextPage = (e) => {
        e.preventDefault()
        setPropertiesPage(propertiesPage += 1)
    }

    const previousPage = (e) => {
        e.preventDefault()
        setPropertiesPage(propertiesPage -= 1)
    }

    return (
        <div className="xl:w-1/3 p-5 bg-primary border-t-2 border-secondary-focus drop-shadow-xl">
            <div className="w-full h-full flex flex-col justify-center bg-primary-focus/50 rounded text-black">
                <FormWindow formTitle={"Resume Properties"}>
                    {renderPropertiesPage()}
                </FormWindow>
                <div className="h-full flex items-end justify-around drop-shadow-2xl pb-6">
                    <button disabled={propertiesPage == 1} className="btn btn-secondary border-2 border-white text-white font-bold hover:text-accent hover:border-accent" onClick={previousPage}>&#60;</button>
                    <button disabled={propertiesPage == 3} className="btn btn-secondary border-2 border-white text-white font-bold hover:text-accent hover:border-accent" onClick={nextPage}>&#62;</button>
                </div>
            </div>
        </div>
    )
}

export default CustomView;
