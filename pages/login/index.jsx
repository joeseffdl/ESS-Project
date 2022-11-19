import Image from "next/image"
import Link from "next/link"
import { useRouter }  from "next/router"
import loginImage from "../../public/Sample.jpg"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import { AiOutlineClose, AiOutlineMenu, AiOutlineGithub } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"
import { auth } from "../../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import {toast} from "react-toastify"
function Login({ defaultUser = {} }) {
    // Router
    const router = useRouter()
    const [user, loading] = useAuthState(auth)

    // NavBar State
    let [open, setOpen] = useState(false)

    // Form Validation
    const schema = z.object({
        email: string().email(),
        password: string().min(1, { message: "Password is required"}),
    })

    // React Form Hook
    const { register, handleSubmit, formState } = useForm({ defaultValues: defaultUser, resolver: zodResolver(schema) })
    const { errors } = formState

    // Functions
    const onSubmit = formValues => {
        console.log(formValues)
        router.push("/dashboard/welcome")
    }

    // Sign in with Google
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            router.push("/dashboard/welcome")
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
            router.push("/dashboard/welcome")
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
                        
                        {/* <li className="hover:translate-x-2 ease-in-out duration-300">
                            <Link href="/signup">
                                <p className="md:text-2xl text-xl">Sign Up</p>
                            </Link>
                        </li> */}
                    </ul>
            </nav>
            <section className="w-full h-4/5 flex justify-center">
                <div className="w-full h-full lg:flex hidden items-center justify-center">
                    <Image src={loginImage} alt="Login Image" className="object-cover rounded-lg" />
                </div>
                <div className="container w-full">
                    <div className="h-full flex flex-col gap-3 justify-center items-center p-10">
                        <h2 className="text-3xl font-bold text-center pb-5">Login to your account</h2>
                        {/* <form className="form-control w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
                            
                            <div className="pb-2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="text" placeholder="Email" className="input input-secondary input-bordered w-full max-w-lg" />
                                <div className="text-red-500 p-2">{errors.email?.message}</div>
                            </div>  
                            <div className="pb-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="text" placeholder="Password" className="input input-secondary input-bordered w-full max-w-lg" />
                                <div className="text-red-500 p-2">{errors.password?.message}</div>
                            </div>
                            <p className="pb-4 text-center"><span className="font-semibold">Not yet a member?</span> <Link href="/signup">Sign up now</Link></p>
                            <button className="btn btn-outline btn-accent">Sign In</button>
                        </form> */}
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
