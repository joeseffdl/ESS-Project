import { useState } from "react";
import FormWindow from "./FormWindow";

function CustomView(props) {
    // State
    const [resumeFormat, setResumeFormat] = useState({
        template: "",
        headerFontSize: "1.875rem",
        headerLineHeight: "1.25rem",
        fontFamily: "Helvetica",
        fontSize: "1rem",
        textColor: "black",
        margin: "1.25rem",
        padding: "1.25rem",
    })

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == "fontSize") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else if (name == "headerFontSize") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else if (name == "headerLineHeight") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else if (name == "margin") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else if (name == "padding") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else {
            setResumeFormat({ ...resumeFormat, [name]: value })
        }
    }
    props.dataFromCustomView(resumeFormat)

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

    const fontSizesArray = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
    ]

    return (
        <div className="xl:w-1/3 p-5 bg-neutral-focus drop-shadow-xl">
            <div className="w-full h-full flex justify-center bg-neutral-content rounded text-black">
                <FormWindow formTitle={"Resume Properties"}>
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

                        {/* <select
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
                        
                        <select
                            className="select bg-white"
                            name="headerFontSize"
                            onChange={handleChange}
                        >
                            <option value="headerFontSize" disabled selected>Header Font Size</option>
                            {
                                fontSizesArray.map((fontSize) =>
                                    <option
                                        value={fontSize}
                                        key={fontSize}
                                    >
                                        {fontSize}
                                    </option>)
                            }
                        </select> */}

                        <div className="w-full flex align-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex align-center justify-between text-sm font-semibold">Header:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="headerFontSize"
                                    type="range"
                                    min="0.75"
                                    max="3"
                                    step={
                                        resumeFormat.headerFontSize >= "1.25rem" && resumeFormat.headerFontSize < "1.5rem"
                                            ? '0.25'
                                            : resumeFormat.headerFontSize >= "1.5rem" && resumeFormat.headerFontSize < "2.25rem"
                                                ? "0.375"
                                                : resumeFormat.headerFontSize >= "2.25rem"
                                                    ? "0.75"
                                                    : "0.125"
                                    }
                                    onChange={handleChange}
                                />
                                {resumeFormat.headerFontSize}
                            </label>
                        </div>
                        
                        <div className="w-full flex align-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex align-center justify-between text-sm font-semibold">Head Gap:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="headerLineHeight"
                                    type="range"
                                    min="0.75"
                                    max="3"
                                    step={
                                        resumeFormat.headerLineHeight >= "1.25rem" && resumeFormat.headerLineHeight < "1.5rem"
                                            ? '0.25'
                                            : resumeFormat.headerLineHeight >= "1.5rem" && resumeFormat.headerLineHeight < "2.25rem"
                                                ? "0.375"
                                                : resumeFormat.headerLineHeight >= "2.25rem"
                                                    ? "0.75"
                                                    : "0.125"
                                    }
                                    onChange={handleChange}
                                />
                                {resumeFormat.headerLineHeight}
                            </label>
                        </div>

                        <div className="w-full flex align-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex align-center justify-between text-sm font-semibold">Font Size:
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

                        <div className="w-full flex align-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex align-center justify-between text-sm font-semibold">Margin:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="margin"
                                    type="range"
                                    min="0"
                                    max="72"
                                    step="0.125"
                                    onChange={handleChange}
                                />
                                {resumeFormat.margin}
                            </label>
                        </div>

                        <div className="w-full flex align-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex align-center justify-between text-sm font-semibold">Padding:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="padding"
                                    type="range"
                                    min="0"
                                    max="72"
                                    step="0.125"
                                    onChange={handleChange}
                                />
                                {resumeFormat.padding}
                            </label>
                        </div>
                    </div>
                </FormWindow>
            </div>
        </div>
    )
}

export default CustomView;
