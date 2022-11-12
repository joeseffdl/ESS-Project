import Footer from "../../components/Footer"
import Image from "next/image"
import Link from "next/link"
import loginImage from "../../public/Sample.jpg"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import Button from '@mui/material/Button'


function Login({ user = {} }) {
    const schema = z.object({
        email: string().email(),
        password: string().min(1, { message: "Password is required"}),
    })

    const { register, handleSubmit, formState } = useForm({ defaultValues: user, resolver: zodResolver(schema) })

    const { errors } = formState

    const onSubmit = formValues => {
        // onSave(formValues)
        console.log(formValues)
    }

    return (
        <main className="w-screen h-screen bg-orange-100">
            <nav className="py-10 font-bold">
                <ul className="flex items-center justify-between md:px-20 px-10">
                    <li className="hover:-translate-x-2 ease-in-out duration-300">
                        <Link href="/">
                            <p className="md:text-4xl text-3xl">Oregen</p>
                        </Link>
                    </li> 
                    
                    <li className="hover:translate-x-2 ease-in-out duration-300">
                        <Link href="/signup">
                            <p className="md:text-2xl text-xl">Sign Up</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <section className="h-full p-20 grid lg:grid-cols-2 place-items-center border-2 border-sky-400">
                <div className="border-2 border-red-200 hidden lg:block">
                    <Image src={loginImage} alt="Login Image" />
                </div>
                <div className="border-2 border-red-200">
                    <h2>Login to your account</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>Email</p>
                        <input {...register("email")} />
                        <div className="text-red-500">{ errors.email?.message}</div>
                        
                        <p>Password</p>
                        <input {...register("password", { required: true })} />
                        <div className="text-red-500">{ errors.password?.message}</div>
                        <p><span className="font-semibold">Not yet a member?</span> <Link href="/signup">Sign up now</Link></p>
                        <Button type="submit" variant="outlined">Sign In</Button>
                    </form>
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
            <Footer />
        </>
    )
}
