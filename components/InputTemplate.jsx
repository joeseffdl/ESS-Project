function InputTemplate({ children }) {
    return (
        <div className="bg-neutral-focus w-full h-screen hidden p-5
                md:block">
            <div className="h-full bg-neutral shadow-2xl rounded-xl border-2 border-neutral-focus/75">
                <div className="h-full flex flex-col items-center justify-center gap-5 p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default InputTemplate;
