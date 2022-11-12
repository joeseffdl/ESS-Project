import Footer from "../../components/Footer"
import Link from "next/link"
import { useForm, useController } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import Select from 'react-select'
import Button from '@mui/material/Button'

function SignUp({ user = {} }) {
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

    const schema = z.object({
        name: string().min(1, { message: "Please enter your name"}),
        surname: string().min(1, { message: "Please enter your Surname"}),
        education: string(),
        university: string(),
        email: string().email(),
        password: string().min(1, { message: "Password is required"}),
        confirm_password: string().min(1, { message: "Confirm your password"}),
        agreed_to_terms: string(),
    })

    const { register, control, handleSubmit, formState } = useForm({ defaultValues: user, resolver: zodResolver(schema) })

    const { field } = useController({ name: "education", control })
    
    const { errors } = formState

    const handleSelectChange = ((options) => {
        field.onChange(options.value)
    })

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
                        <Link href="/login">
                            <p className="md:text-2xl text-xl">Login</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <section className="h-full p-20 grid place-items-center border-2 border-sky-400">
                <div className="border-2 border-red-200">
                    <h2>Signup to Oregen</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex">
                            <p>Given name</p>
                            <input {...register("name")} />
                            <div className="text-red-500">{ errors.name?.message}</div>
                            <p>Surname</p>
                            <input {...register("surname")} />
                            <div className="text-red-500">{ errors.surname?.message}</div>
                        </div>
                        <div>
                            <p>Educational Attainment</p>
                            <Select
                                value={educationOptions.find((value) => value == field.value)}
                                options={educationOptions}
                                onChange={handleSelectChange}
                            />
                            <div className="text-red-500">{ errors.education?.message}</div>
                        </div>
                        {/* <div>
                            <p>University</p>
                            <Select
                                value={institutionOptions.find((value) => value == field.value)}
                                options={institutionOptions}
                                onChange={handleSelectChange}
                            />
                            <div className="text-red-500">{ errors.university?.message}</div>
                        </div> */}
                        <div>
                            <p>Email</p>
                            <input {...register("email")} />
                            <div className="text-red-500">{ errors.email?.message}</div>
                        </div>
                        <div className="flex">
                            <p>Password</p>
                            <input {...register("password")} />
                            <div className="text-red-500">{ errors.password?.message}</div>
                        
                            <p>Confirm Password</p>
                            <input {...register("confirm_password")} />
                            <div className="text-red-500">{ errors.confirm_password?.message}</div>
                        </div>
                        <div>
                            <input type="checkbox" {...register("agreed_to_terms")} />
                            <label>By signing up, you agree to the Terms of Service and Privacy Policy.</label>
                        </div>
                        <Button type="submit" variant="outlined">Proceed</Button>
                    </form>
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