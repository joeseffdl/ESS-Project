import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AppNavigation from "../../components/AppNavigation";
import { auth } from "../../utils/firebase";
function Account() {
    // Router
    const router = useRouter()

    // Handle user
    const [user, loading] = useAuthState(auth)
    
    // Logged in?
    const getData = async () => {
        if (loading) return;
        if (!user) return router.push("/login")
    }

    // Get users data
    useEffect(() => {
        getData()
    }, [user,loading])

    return (
        <div className="bg-primary w-screen flex flex-col sm:flex-row">
            <div className="w-full bg-primary ease-in-out duration-150
                sm:w-3/5 sm:rounded-tl-3xl sm:bg-primary
                xl:w-2/5">
                <div className="relative h-screen flex flex-col bg-white rounded-tl-full rounded-br-full border-y-8 border-secondary
                    sm:border-r-4 sm:border-y-4 sm:rounded-none ">
                    {/* sm:mx-12 sm:rounded-none sm:border-none */}
                    {/* xl:mx-24 xl:h-full */}
                    <div className="h-fit w-full flex justify-center pt-10
                        
                        ">
                        {/* sm:justify-end sm:h-1/3 */}
                        <div className=" w-32 h-32 rounded-full  transparent border-4 border-secondary-focus p-1
                            
                            ">
                            {/* sm:w-5/6 sm:rounded-none sm:rounded-tl-3xl sm:h-full sm:border-none sm:p-0 */}
                            <img src={user?.photoURL} alt="Profile Picture" className="w-full rounded-full 
                                " />
                            {/* sm:rounded-none sm:rounded-tl-3xl sm:h-full */}
                        </div>
                    </div>
                    <h1 className="text-center text-neutral-focus text-3xl font-semibold mt-2 mb-1">
                        {user ? user.displayName.toUpperCase() : 'Loading...'}
                    </h1>
                    <p className="text-center text-neutral text-sm font-semibold">
                        {user? user.email : ''}
                    </p>

                    <div className="grid grid-cols-2 items-center my-5 divide-x-2 divide-accent-focus">
                        <div className="grid grid-rows-2 items-center justify-center font-semibold">
                            <h3 className="text-center">Resumes</h3>
                            <div className="text-center text-lg font-bold">
                                0
                            </div>
                        </div>
                        <div className="grid grid-rows-2 items-center justify-center font-semibold">
                            <h3 className="text-center">Account</h3>
                            <div className="text-center text-lg font-bold">
                                {user ? `${user.providerData[0].providerId.replace(".com", "").toUpperCase()}` : ''}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 items-center my-5  gap-5">
                        <div className="grid grid-rows-2 items-center justify-center font-semibold">
                            <h3 className="text-center">Created</h3>
                            <p className="text-center text-lg font-bold">{user ? user.metadata.creationTime : ''}</p>
                        </div>
                        <div className="grid grid-rows-2 items-center justify-center font-semibold">
                            <h3 className="text-center">Last Sign In</h3>
                            <p className="text-center text-lg font-bold">{user ? user.metadata.lastSignInTime : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block w-full h-full transparent">
                <div className="h-1/2 bg-primary flex items-center justify-center text-3xl text-center font-extrabold border-y-4 border-secondary
                    sm:h-screen ">
                    We are still constructing this part of the web page 👷🛠️
                </div>
            </div>
        </div>
    )
}

export default Account;

Account.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}