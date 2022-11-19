import { useContext } from "react"
import DataContext from '../context/DataContext'

function InputMDPI({ children }) {
    // Data Context
    const { completedSteps, setCompletedSteps } = useContext(DataContext)

    // Use State
    let {step} = completedSteps

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-5">
            <div className="w-full h-24 flex justify-center items-center bg-neutral shadow-2xl rounded-xl border-2 border-accent-focus/75 ">
                <ul className="steps text-xs">
                    <li className="step step-accent">🖥️</li>
                    <li className={`step ${step == 2 ? "step-accent" : null}`}>😢</li>
                    <li className={`step ${step == 3 ? "step-accent" : null}`}>4️⃣</li>
                    <li className={`step ${step == 4 ? "step-accent" : null}`}>🆘</li>
                </ul>
            </div>
            <div className="w-full h-full flex justify-center p-5 bg-neutral-focus shadow-2xl rounded-xl">
                { children }
            </div>
        </div>
    )
}

export default InputMDPI;
