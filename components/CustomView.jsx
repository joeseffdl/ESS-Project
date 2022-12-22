import { useState } from "react";
import FormWindow from "./FormWindow";
function CustomView() {
    // State
    const [resumeFormat, setResumeFormat] = useState({
        template: "",
        fontFamily: "Helvetica",
        fontSize: "16px",
        textColor: "black",
        margin: "1.25rem",
        padding: "1.25rem",
    })

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == "fontSize") {
            setResumeFormat({ ...resumeFormat, [name]: value + "px" })
        } else if (name == "margin") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else if (name == "padding") {
            setResumeFormat({ ...resumeFormat, [name]: value + "rem" })
        } else {
            setResumeFormat({ ...resumeFormat, [name]: value })
        }
    }
    console.log(resumeFormat)

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

                        <div className="w-full flex align-center p-4 bg-white rounded-lg">
                            <label className="w-full relative flex align-center justify-between text-sm font-semibold">Font Size:
                                <input
                                    className="absolute w-1/2 left-20 top-0.5"
                                    name="fontSize"
                                    type="range"
                                    min="12"
                                    max="72"
                                    step="2"
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
