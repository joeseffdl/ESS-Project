import { useState } from "react";
import FormWindow from "./FormWindow";

function CustomView(props) {
    // State
    const [resumeFormat, setResumeFormat] = useState({
        template: "",
        fontFamily: "Helvetica",
        fontSize: "1rem",
        textColor: "black",

        headerFontSize: 1.875,
        headerLineHeight: 1.25,
        
        summaryMarginX: 2.5,
        summaryMarginY: 0.75,
        summaryLineHeight: 1,
        
        skillsPaddingL: 2.5,
        skillsPaddingR: 2.5,
        skillsPaddingT: 0,
        skillsPaddingB: 0,

        experiencesHeadMarginT: 0.75,
        experiencesHeadMarginB: 0.25,
        experiencesHeadPaddingX: 0.5,
        
        experiencesDescriptionPaddingL: 2.5,
        experiencesDescriptionPaddingR: 2.5,
        experiencesDescriptionPaddingY: 0,
        
        educationPaddingX: 2.5,
        educationPaddingY: 2.5,
        educationMarginX: 1.25,
        educationMarginY: 1.25,
        
        certificationsPaddingX: 2.5,
        certificationsPaddingY: 2.5,
        
        portfolioPaddingX: 2.5,
        portfolioPaddingY: 2.5,
    })
    let [propertiesPage, setPropertiesPage] = useState(1)

    // Resume Properties
    const resumeTemplatesArray = [
        "Resume",
        "Template 2",
        "Template 3",
    ]

    const fontFamilyArray = [
        "Helvetica",
        "Arial",
        "Times New Roman",
    ]

    const textColorArray = [
        "Red",
        "Green",
        "Blue",
    ]

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target
        setResumeFormat({ ...resumeFormat, [name]: value })
    }
    props.dataFromCustomView(resumeFormat)

    const renderPropertiesPage = () => {
        if (propertiesPage == 1) {
            return (
                <div className="w-full flex flex-col gap-2 px-5 mb-5">
                    <label className="label justify-center text-sm font-semibold" >Document Formatting</label>
                    <select
                        className="select text-xs bg-white"
                        name="template"
                        onChange={handleChange}
                    >
                        <option value="template" disabled selected>Resume Template</option>
                        {
                            resumeTemplatesArray.map((template) =>
                                <option
                                    value={template}
                                    key={template}
                                >
                                    {template}
                                </option>)
                        }
                    </select>

                    <select
                        className="select text-xs bg-white"
                        name="textColor"
                        onChange={handleChange}
                    >
                        <option value="textColor" disabled selected>Text Color</option>
                        {
                            textColorArray.map((textColor) =>
                                <option
                                    value={textColor}
                                    key={textColor}
                                >
                                    {textColor}
                                </option>)
                        }
                    </select>
                    <select
                        className="select text-xs bg-white"
                        name="fontFamily"
                        onChange={handleChange}
                    >
                        <option value="fontFamily" disabled selected>Font Family</option>
                        {
                            fontFamilyArray.map((fontFamily) =>
                                <option
                                    value={fontFamily}
                                    key={fontFamily}
                                >
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
                                max="8"
                                step="0.125"
                                onChange={handleChange}
                            />
                            {resumeFormat.fontSize}
                        </label>
                    </div>
                    
                    {/* HEADER PROPERTIES */}
                    <label className="label justify-center text-sm font-semibold" >Header Properties</label>
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

                    {/* PROFILE SUMMARY PROPERTIES */}
                    <label className="label justify-center text-sm font-semibold" >Profile Summary Properties</label>
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

                    {/* SKILLS PROPERTIES */}
                    <label className="label justify-center text-sm font-semibold" >Skills Properties</label>
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
                    
                    {/* EXPERIENCES PROPERTIES */}
                    <label className="label justify-center text-sm font-semibold" >Experiences Properties</label>
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
        <div className="xl:w-1/3 p-5 bg-neutral-focus drop-shadow-xl">
            <div className="w-full h-full flex flex-col justify-center bg-neutral-content rounded text-black">
                <FormWindow formTitle={"Resume Properties"}>
                    {renderPropertiesPage()}
                </FormWindow>
                <div className="h-full flex items-end justify-around drop-shadow-2xl pb-6">
                    <button disabled={propertiesPage == 1} className="btn border-2 border-primary text-primary font-bold hover:text-accent hover:border-accent" onClick={previousPage}>&#60;</button>
                    <button disabled={propertiesPage == 2} className="btn border-2 border-primary text-primary font-bold hover:text-accent hover:border-accent" onClick={nextPage}>&#62;</button>
                </div>
            </div>
        </div>
    )
}

export default CustomView;
