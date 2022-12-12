import InputTemplate from "./InputTemplate";
import OutputTemplate from "./OutputTemplate";
import InputContainer from "./Resume/InputContainer";
import OutputResume from "./Resume/OutputResume";

function TemplateContainer({ children, outputChild }) {
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
