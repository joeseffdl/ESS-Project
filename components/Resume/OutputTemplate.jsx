import { useRouter } from "next/router";

function OutputTemplate({ children }) {
    const router = useRouter()
    const viewing = router.query.viewResume

    return (
        <div className={`bg-primary border-t-2 border-secondary-focus w-full p-5 ${viewing ? 'flex' : 'hidden'} lg:flex justify-center`}>
            <div className="w-[8.5in] min-h-[11in]  bg-white  text-black">
                {children}
            </div>
        </div>
    )
}

export default OutputTemplate;

