import {completedSteps} from "../../utils/store"

function InputResume({ children }) {
    // State Management
    let step = completedSteps(state => state.steps)

    return (
        <>
            <div className="w-full h-24 flex justify-center items-center bg-neutral shadow-2xl rounded-xl border-2 border-accent-focus/75 ">
                <ul className="steps text-xs">
                    <li className="step step-accent">🤵</li>
                    <li className={`step ${step >= 2 ? "step-accent" : null}`}>💼</li>
                    <li className={`step ${step >= 3 ? "step-accent" : null}`}>📚</li>
                    <li className={`step ${step >= 4 ? "step-accent" : null}`}>🧰</li>
                    <li className={`step ${step >= 5 ? "step-accent" : null}`}>🖥️</li>
                    <li className={`step ${step >= 6 ? "step-accent" : null}`}>🏆</li>
                    <li className={`step ${step >= 7 ? "step-accent" : null}`}>🕸️</li>
                </ul>
            </div>
            <div className="w-full h-full flex justify-center p-5 bg-neutral-focus shadow-2xl rounded-xl">
                {children}
            </div>
        </>
    )
}

export default InputResume;
