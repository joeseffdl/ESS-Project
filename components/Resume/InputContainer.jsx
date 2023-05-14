import { completedSteps } from "../../utils/store";

function InputResume({ children }) {
    // State Management
    let step = completedSteps(state => state.steps)
    const setCompletedSteps = completedSteps(state => state.setCompletedSteps)

    return (
        <>
            <div className="w-full h-24 flex justify-center items-center bg-primary-focus/75 shadow-2xl rounded-xl border-2 border-accent-focus ">
                <ul className="steps text-xs">
                    <button className="step step-accent" onClick={setCompletedSteps(1)}>🤵</button>
                    <button className={`step ${step >= 2 ? "step-accent" : null}`} onClick={setCompletedSteps(2)}>💼</button>
                    <button className={`step ${step >= 3 ? "step-accent" : null}`} onClick={setCompletedSteps(3)}>📚</button>
                    <button className={`step ${step >= 4 ? "step-accent" : null}`} onClick={setCompletedSteps(4)}>🧰</button>
                    <button className={`step ${step >= 5 ? "step-accent" : null}`} onClick={setCompletedSteps(5)}>🖥️</button>
                    <button className={`step ${step >= 6 ? "step-accent" : null}`} onClick={setCompletedSteps(6)}>🏆</button>
                    <button className={`step ${step >= 7 ? "step-accent" : null}`} onClick={setCompletedSteps(7)}>🕸️</button>
                </ul>
            </div>
            <div className="w-full h-full flex justify-center p-5 bg-primary-focus/90 border-2 border-accent-focus shadow-2xl rounded-xl">
                {children}
            </div>
        </>
    )
}

export default InputResume;
