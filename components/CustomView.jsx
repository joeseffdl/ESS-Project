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
        
        skillsPaddingX: 2.5,
        skillsPaddingY: 0,
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
                        <select
                            className="select bg-white"
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
                            className="select bg-white"
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
                            <label className="w-full relative flex items-center justify-between text-sm font-semibold">Font Size:
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
                        <select
                            className="select bg-white"
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

                        <div className="w-full flex items-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex items-center justify-between text-sm font-semibold">Font Size:
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
                            <label className="w-full relative flex items-center justify-between text-sm font-semibold">Line Height:
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
                            <label className="w-full relative flex items-center justify-between text-sm font-semibold">Margin X:
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

                        {/* SKILLS PROPERTIES */}
                        <label className="label justify-center text-sm font-semibold" >Skills Properties</label>
                        <div className="w-full flex items-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex items-center justify-between text-sm font-semibold">Padding X:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="skillsPaddingX"
                                    type="range"
                                    min="0"
                                    max="24"
                                    step={
                                        resumeFormat.skillsPaddingX >= 1 && resumeFormat.skillsPaddingX < 3
                                            ? 0.25
                                            : resumeFormat.skillsPaddingX >= 3 && resumeFormat.skillsPaddingX < 4
                                                ? 0.5
                                                : resumeFormat.skillsPaddingX >= 4 && resumeFormat.skillsPaddingX < 16
                                                    ? 1
                                                    : resumeFormat.skillsPaddingX >= 16 && resumeFormat.skillsPaddingX < 20
                                                        ? 2
                                                        : resumeFormat.skillsPaddingX >= 20 && resumeFormat.skillsPaddingX <= 24
                                                            ? 4
                                                            : 0.125
                                    }
                                    onChange={handleChange}
                                />
                                {resumeFormat.skillsPaddingX}rem
                            </label>
                        </div>

                        <div className="w-full flex items-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex items-center justify-between text-sm font-semibold">Padding Y:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="skillsPaddingY"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step={0.125}
                                    onChange={handleChange}
                                />
                                {resumeFormat.skillsPaddingY}rem
                            </label>
                        </div>
                    </div>
            )
        } else if (propertiesPage == 2) {
            return (
                <>
                </>
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
                <div className="h-full flex items-end justify-around drop-shadow-2xl py-5">
                    <button disabled={propertiesPage == 1} className="btn border-2 border-primary text-primary font-bold hover:text-accent hover:border-accent" onClick={previousPage}>&#60;</button>
                    <button disabled={propertiesPage == 2} className="btn border-2 border-primary text-primary font-bold hover:text-accent hover:border-accent" onClick={nextPage}>&#62;</button>
                </div>
            </div>
        </div>
    )
}

export default CustomView;
