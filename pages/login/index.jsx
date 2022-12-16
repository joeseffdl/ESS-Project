import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { AiOutlineClose, AiOutlineGithub, AiOutlineMenu } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import loginImage from "../../public/Sample.jpg"
import { auth } from "../../utils/firebase"
function Login({ defaultUser = {} }) {
    // Router
    const router = useRouter()
    const [user, loading] = useAuthState(auth)

    // NavBar State
    let [open, setOpen] = useState(false)

    // Functions
    const onSubmit = formValues => {
        console.log(formValues)
        router.push("/dashboard")
    }

    // Sign in with Google
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            router.push("/dashboard")
        }
        catch (err) {
            toast.error("Unauthenticated ☹️")
            console.log(err)
        }
    }

    // Sign in with Google
    const githubProvider = new GithubAuthProvider()
    const GitHubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider)
            router.push("/dashboard")
        }
        catch (err) {
            toast.error("Unauthenticated ☹️")
            console.log(err)
        }
    }

    useEffect(() => {
        {
            user
                ? router.push("../dashboard")
                : console.log("No user logged in")
        }
    }, [user])

    return (
        <main className="w-screen h-screen text-primary-focus">
            <nav className="py-8 font-bold">
                    <div onClick={ () => setOpen(!open)} className="text-3xl absolute right-10 top-4 cursor-pointer md:hidden" >
                        <span>
                            { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                        </span>
                    </div>
                    <ul className={`px-10 md:flex md:items-center md:justify-between md:px-20 ${ open ? "absolute mt-10 md:mt-0" : "hidden"}`}>
                        <li className="hover:translate-x-2 md:hover:-translate-x-2 ease-in-out duration-300">
                            <Link href="/">
                                <p className="md:text-4xl text-3xl">Oregen</p>
                            </Link>
                        </li> 
                    </ul>
            </nav>
            <section className="w-full h-4/5 flex justify-center">
                <div className="w-full h-full lg:flex hidden items-center justify-center">
                    <Image src={loginImage} alt="Login Image" className="object-cover rounded-lg" />
                </div>
                <div className="container w-full">
                    <div className="h-full flex flex-col gap-3 justify-center items-center p-10">
                        <h2 className="text-3xl font-bold text-center text-secondary pb-5">Login to your account</h2>
                        
                        <div className="flex justify-center items-center w-full max-w-lg" >
                            <button onClick={GoogleLogin} className="btn btn-neutral w-full">
                                <FcGoogle className="text-2xl mr-2" />
                                Sign In with Google
                            </button>
                        </div> 
                        <div className="flex justify-center items-center w-full max-w-lg" >
                            <button onClick={GitHubLogin} className="btn btn-neutral w-full">
                                <AiOutlineGithub className="text-2xl mr-3" />
                                Sign In with GitHub
                            </button>
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
