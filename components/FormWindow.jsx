import { useRouter } from "next/router";
function FormWindow({ children, formTitle, onSubmit }) {
    const router = useRouter();
    return (
        <>
            <form onSubmit={onSubmit} className="form-control gap-2 w-full ">
                {
                    formTitle
                        ? (
                            <h2 className={`text-2xl text-slate-900 text-center font-semibold mt-5 
                                ${router.pathname.includes('/choose-template')
                                    ? "text-3xl font-bold my-5 tracking-wider"
                                    : ""}`}>{formTitle}</h2>
                        )
                        : (
                            null    
                        )
                }
                {children}
            </form>
        </>
    )
}

export default FormWindow;
