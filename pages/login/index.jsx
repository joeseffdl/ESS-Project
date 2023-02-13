import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import { auth } from "../../utils/firebase"

function Login() {
    // Router
    const router = useRouter()
    const [user, loading] = useAuthState(auth)

    // NavBar State
    let [open, setOpen] = useState(false)

    // Sign in with Google
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = async () => {
        try {
            const result = await signInWithRedirect(auth, googleProvider)
            if (user) {
                if (user?.metadata.createdAt == user?.metadata.lastLoginAt) {
                    router.push("/dashboard")
                } else {
                    router.push("/resumes")
                }
            }
        }
        catch (err) {
            toast.error("There was an error while signing in with your Google account ☹️")
            console.log(err)
        }
    }

    useEffect(() => {
        if (user) {
            if (user?.metadata.createdAt == user?.metadata.lastLoginAt) {
                router.push("/dashboard")
                toast.success("Welcome to Oregen 🎉")
            } else {
                router.push("/resumes")
                toast.success("Welcome back to Oregen 🎉")
            }
        } else {
            console.log("No user logged in")
        }
    }, [user])

    return (
        <main className="w-screen h-screen bg-slate-900">
            <nav className="py-8 font-bold">
                    <div onClick={ () => setOpen(!open)} className="text-3xl text-white absolute right-10 top-4 cursor-pointer md:hidden" >
                        <span>
                            { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                        </span>
                    </div>
                    <ul className={`px-10 md:flex md:items-center md:justify-between md:px-24 ${ open ? "absolute mt-10 md:mt-0" : "hidden"}`}>
                        <li className="hover:translate-x-2 md:hover:-translate-x-2 ease-in-out duration-300">
                            <Link href="/">
                                <p className="md:text-4xl text-3xl text-white font-extrabold">Oregen</p>
                            </Link>
                        </li> 
                    </ul>
            </nav>
            <section className="w-full h-4/5 border-t-2 md:border-y-2 flex justify-center">
                <div className="container w-full">
                    <div className="h-full flex flex-col gap-3 justify-center items-center p-10">
                        <div>
                            <h1 className="text-3xl font-bold text-center text-white mb-2
                                sm:text-4xl md:text-5xl lg:text-6xl">Welcome to OREGEN
                            </h1>
                            <h2 className="text-lg text-center text-gray-200 mb-3
                                md:text-xl lg:text-2xl">Log in to Oregen to continue
                            </h2>
                        </div>
                        
                        <div className="w-full flex flex-col gap-2 justify-center items-center
                            md:flex-row">
                            <div className="flex justify-center items-center w-fit" >
                                <button onClick={GoogleLogin} className="w-full flex items-center justify-center font-semibold text-sm md:text-lg p-2 rounded-md bg-white text-gray-900 ">
                                    <FcGoogle className="text-2xl md:text-3xl mr-2" />
                                    Sign In with Google
                                </button>
                            </div>
                        </div>
                    </div>     
                </div>
            </section>
        </main>
    )
}

export default Login;

Login.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}
