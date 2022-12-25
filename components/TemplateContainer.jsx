import OutputResume from "../pages/choose-template/Resume/OutputResume";
import InputTemplate from "./InputTemplate";
import OutputTemplate from "./OutputTemplate";
import InputContainer from "./Resume/InputContainer";

function TemplateContainer({ children }) {
    return (
        <div className="w-full flex flex-col xl:flex-row">
            <InputTemplate>
                <InputContainer>
                    {children}
                </InputContainer>
            </InputTemplate>
            <OutputTemplate>
                <OutputResume />
            </OutputTemplate>
        </div>
    )
}

export default TemplateContainer;
