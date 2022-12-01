function OutputTemplate({ children }) {
    return (
        <div className="bg-neutral w-full p-5 hidden lg:flex lg:justify-center">
            <div className="w-[8.5in] h-[11in]  bg-white  text-black">
                {children}
            </div>
        </div>
    )
}

export default OutputTemplate;

