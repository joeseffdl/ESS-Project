import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useController, useForm } from "react-hook-form"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { boolean, string, z } from "zod"
function SignUp({ user = {} }) {
    // Router
    const router = useRouter()

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
        surname: string().min(1, { message: "Please enter your surname"}),
        education: string().min(1, { message: "Please select your educational attainment"}),
        institution: string().min(1, { message: "Please select your institution"}),
        email: string().email(),
        password: string().min(1, { message: "Password is required"}),
        confirm_password: string().min(1, { message: "Confirm your password"}),
        terms: boolean(),
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
        <main className="w-screen h-screen flex flex-col text-primary-focus">
            <nav className="py-8 font-bold">
                <div onClick={ () => setOpen(!open)} className="text-3xl absolute right-10 top-4 cursor-pointer md:hidden" >
                    <span>
                        { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                    </span>
                </div>
                <ul className={`px-10 md:flex md:items-center md:justify-between md:px-20 ${ open ? "absolute md:mt-0" : "hidden"}`}>
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
            
            <section className="w-full h-full flex items-center justify-center">
                <div className="mb-10">
                    <div className="flex justify-center items-center p-5">
                        <form className="form-control w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
                            
                            <h2 className="md:text-4xl text-3xl font-bold text-center pb-5">Sign Up to Oregen</h2>
                            <div className="flex justify-between w-full gap-x-2">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Given Name</span>
                                    </label>
                                    <input {...register("name")} type="text" placeholder="Given Name" className="input input-secondary input-bordered w-full max-w-lg" />
                                    <div className="text-sm text-red-500 pt-2">{errors.name?.message}</div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Surname</span>
                                    </label>
                                    <input {...register("surname")} type="text" placeholder="Surname" className="input input-secondary input-bordered w-full max-w-lg" />
                                    <div className="text-sm text-red-500 pt-2 ml-1">{ errors.surname?.message}</div>
                                </div>
                            </div>
                            
                            
                            <div>
                                <label className="label">
                                    <span className="label-text">Educational Attainment</span>
                                </label>
                                <select
                                    className="select select-secondary w-full max-w-lg"
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
                                <div className="text-sm text-red-500 pt-2">{ errors.education?.message}</div>
                            </div>


                            <div>
                                <label className="label">
                                    <span className="label-text">Institution</span>
                                </label>
                                <select
                                    className="select select-secondary w-full max-w-lg"
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
                                <div className="text-sm text-red-500 pt-2">{ errors.institution?.message}</div>
                            </div>


                            <div className="">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="text" placeholder="Email" className="input input-secondary input-bordered w-full max-w-lg" />
                                <div className="text-sm text-red-500 pt-2">{errors.email?.message}</div>
                            </div>


                            <div className="flex justify-between w-full gap-x-2">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("password")} type="text" placeholder="Password" className="input input-secondary input-bordered w-full max-w-lg" />
                                    <div className="text-sm text-red-500 pt-2">{errors.password?.message}</div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input {...register("confirm_password")} type="text" placeholder="Password" className="input input-secondary input-bordered w-full max-w-lg" />
                                    <div className="text-sm text-red-500 pt-2 ml-1">{errors.confirm_password?.message}</div>
                                </div>
                            </div>
                            <div className="pb-3">
                                <label className="cursor-pointer label">
                                    <input {...register("terms")} type="checkbox" className="checkbox checkbox-secondary" />
                                    <span className="label-text ml-2">By signing up, you agree to the Terms of Service and Privacy Policy.</span>
                                </label>
                                <div className="text-sm text-red-500 pt-2">{errors.terms?.message}</div>
                            </div>
                            <button className="btn btn-outline btn-accent">Sign Up</button>
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
        </>
    )
}