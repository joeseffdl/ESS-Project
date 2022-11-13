import Footer from "../../components/Footer"
import Link from "next/link"
import { useState } from "react"
import { useForm, useController } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
function SignUp({ user = {} }) {
    // NavBar State
    let [open, setOpen] = useState(false)

    const educationOptions = [
        { value: 'Lower Secondary Education', label: "Lower Secondary Education (Junior High school)" },
        { value: 'Upper Secondary Education', label: "Upper Secondary Education (Senior High school)" },
        { value: 'Undergraduate', label: "Undergraduate (Bachelor's Degree)" },
        { value: 'Postgraduate', label: "Postgraduate (Master’s Degree)" },
        { value: 'Doctoral', label: "Doctoral (PhD)" },
    ]

    const institutionOptions = [
        { value: 'Lower Secondary Education', label: "Lower Secondary Education (Junior High school)" },
        { value: 'Upper Secondary Education', label: "Upper Secondary Education (Senior High school)" },
        { value: 'Undergraduate', label: "Undergraduate (Bachelor's Degree)" },
        { value: 'Postgraduate', label: "Postgraduate (Master’s Degree)" },
        { value: 'Doctoral', label: "Doctoral (PhD)" },
    ]

    // Form Validation
    const schema = z.object({
        name: string().min(1, { message: "Please enter your name"}),
        surname: string().min(1, { message: "Please enter your Surname"}),
        education: string(),
        institution: string(),
        email: string().email(),
        password: string().min(1, { message: "Password is required"}),
        confirm_password: string().min(1, { message: "Confirm your password"}),
        agreed_to_terms: string(),
    })

    // React Form Hook
    const { register, control, handleSubmit, formState } = useForm({ defaultValues: user, resolver: zodResolver(schema) })
    const { field } = useController({ name: "education", control })
    const { errors } = formState

    // Functions
    const handleSelectChange = ((options) => {
        field.onChange(options.value)
    })

    const onSubmit = formValues => {
        console.log(formValues)
    }

    return (
        <main className="w-screen text-primary-focus">
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
                    
                    <li className="hover:translate-x-2 ease-in-out duration-300">
                        <Link href="/login">
                            <p className="md:text-2xl text-xl">Login</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <section className="w-screen h-screen flex justify-center">
                <div className="container">
                    <div className="flex justify-center items-center p-10">
                        <form className="form-control w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                            
                            <h2 className="text-3xl font-bold text-center pb-5">Sign Up to Oregen</h2>
                            <div className="flex pb-3">
                                <label className="label">
                                    <span className="label-text">Given Name</span>
                                </label>
                                <input {...register("name")} type="text" placeholder="Given Name" className="input input-secondary input-bordered w-full max-w-md" />
                                <div className="text-red-500 p-2">{errors.name?.message}</div>
                            
                                <label className="label">
                                    <span className="label-text">Surname</span>
                                </label>
                                <input {...register("surname")} type="text" placeholder="Surname" className="input input-secondary input-bordered w-full max-w-md" />
                                <div className="text-red-500 p-2">{ errors.surname?.message}</div>
                            </div> 
                            <div>
                                <label className="label">
                                    <span className="label-text">Educational Attainment</span>
                                </label>
                                <select
                                    className="select select-secondary w-full max-w-md"
                                    value={educationOptions.find((value) => value == field.value)}
                                    onChange={handleSelectChange}
                                >
                                    <option disabled selected>Educational Attainment</option>
                                    {educationOptions.map((education) => {
                                        return (
                                            <>
                                                <option key={education.value}> {education.label} </option>
                                            </>
                                        )
                                    })}
                                </select>
                                <div className="text-red-500">{ errors.education?.message}</div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Institution</span>
                                </label>
                                <select
                                    className="select select-secondary w-full max-w-md"
                                    value={institutionOptions.find((value) => value == field.value)}
                                    onChange={handleSelectChange}
                                >
                                    <option disabled selected>Institution</option>
                                    {institutionOptions.map((institution) => {
                                        return (
                                            <>
                                                <option key={institution.value}> {institution.label} </option>
                                            </>
                                        )
                                    })}
                                </select>
                                <div className="text-red-500">{ errors.institution?.message}</div>
                            </div>
                            <div className="pb-3">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="text" placeholder="Email" className="input input-secondary input-bordered w-full max-w-md" />
                                <div className="text-red-500 p-2">{errors.email?.message}</div>
                            </div>  
                            <div className="flex pb-3">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="text" placeholder="Password" className="input input-secondary input-bordered w-full max-w-md" />
                                <div className="text-red-500 p-2">{errors.password?.message}</div>
                            
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("confirm_password")} type="text" placeholder="Password" className="input input-secondary input-bordered w-full max-w-md" />
                                <div className="text-red-500 p-2">{errors.confirm_password?.message}</div>
                            </div>
                            <div className="pb-3">
                                <label className="cursor-pointer label">
                                    <input {...register("agreed_to_terms")} type="checkbox" className="checkbox checkbox-secondary" />
                                    <span className="label-text ml-2">By signing up, you agree to the Terms of Service and Privacy Policy.</span>
                                </label>
                                <div className="text-red-500 p-2">{errors.agreed_to_terms?.message}</div>
                            </div>
                            <button className="btn btn-outline btn-accent">Sign In</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
  )
}

export default SignUp;

SignUp.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
            <Footer />
        </>
    )
}