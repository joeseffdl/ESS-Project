import InputTemplate from "./InputTemplate";
import OutputTemplate from "./OutputTemplate";
import InputResume from "./Resume/InputResume";
import OutputResume from "./RESUME/OutputResume";

function TemplateContainer({ children }) {
    return (
        <div className="w-full flex flex-col xl:flex-row">
            <InputTemplate>
                <InputResume>
                    {children}
                </InputResume>
            </InputTemplate>
            <OutputTemplate>
                <OutputResume />
            </OutputTemplate>
        </div>
    )
}

export default TemplateContainer;
