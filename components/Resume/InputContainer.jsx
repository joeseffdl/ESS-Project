import { useState, useEffect } from "react";
import { completedSteps } from "../../utils/store";

function InputResume({ children }) {
    // State Management
    let currentStep = completedSteps(state => state.steps)
    const setCurrentStep = completedSteps(state => state.setCompletedSteps)
    const [step, setStep] = useState(currentStep);

    function handleClick(val) {
        setStep(val)
    }

    useEffect(() => {
        setCurrentStep(step)
    }, [step])
    
    return (
        <>
            <div className="w-full h-24 flex justify-center items-center bg-primary-focus/75 shadow-2xl rounded-xl border-2 border-accent-focus ">
                <ul className="steps text-xs">
                    <button className={`step ${currentStep >= 1 ? "step-accent" : null}`} onClick={() => handleClick(1)}>🤵</button>
                    <button className={`step ${currentStep >= 2 ? "step-accent" : null}`} onClick={() => handleClick(2)}>💼</button>
                    <button className={`step ${currentStep >= 3 ? "step-accent" : null}`} onClick={() => handleClick(3)}>📚</button>
                    <button className={`step ${currentStep >= 4 ? "step-accent" : null}`} onClick={() => handleClick(4)}>🧰</button>
                    <button className={`step ${currentStep >= 5 ? "step-accent" : null}`} onClick={() => handleClick(5)}>🖥️</button>
                    <button className={`step ${currentStep >= 6 ? "step-accent" : null}`} onClick={() => handleClick(6)}>🏆</button>
                    <button className={`step ${currentStep >= 7 ? "step-accent" : null}`} onClick={() => handleClick(7)}>🕸️</button>
                </ul>
            </div>
            <div className="w-full h-full flex justify-center p-5 bg-primary-focus/90 border-2 border-accent-focus shadow-2xl rounded-xl">
                {children}
            </div>
        </>
    );
}

export default InputResume;
