
function FormWindow({children, formTitle, onSubmit}) {
    return (
        <>
            <form onSubmit={onSubmit} className="form-control gap-2 w-full ">
                {
                    formTitle
                        ? (
                            <h2 className="text-2xl text-bold text-center my-5">{formTitle}</h2>
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
