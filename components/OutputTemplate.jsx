function OutputTemplate({ children }) {
    return (
        <div className="bg-neutral w-full h-screen p-5">
            <div className="bg-white h-full text-black rounded-xl">
                {children}
            </div>
        </div>
    )
}

export default OutputTemplate;

