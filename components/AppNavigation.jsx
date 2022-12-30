import Link from 'next/link'
import { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { auth } from "../utils/firebase"

function AppNavigation() {
    // Handle user 
    const [user, loading] = useAuthState(auth)    

    // States
    let [open, setOpen] = useState(false)

    // Links
    let Links =[
      {name:"Resumes",link:"/resumes"},
      {name:"Account",link:"/dashboard/account"},
    ];

    return (
        <main className="text-white shadow-xl w-screen ">
            <nav className="flex items-center justify-between bg-gradient-to-b from-neutral-content to-primary py-8 px-10 xl:px-24 font-bold">
                <div className="font-bold h-10 text-2xl cursor-pointer flex items-end">
                    <div className="flex items-end"><Link href="/" className="md:text-4xl text-3xl font-extrabold hover:text-neutral-focus">Oregen</Link> <span className="hidden md:block ml-2 text-sm">Resume Template Builder</span></div>
                </div>
                <div onClick={ () => setOpen(!open)} className="text-3xl cursor-pointer md:hidden" >
                    <span>
                        { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                    </span>
                </div>
                <ul className={`h-10  pb-5 absolute left-0 w-full transition-all duration-150 ease-in
                    md:flex md:items-end md:pb-0 md:z-auto md:pl-0 md:w-auto md:static
                    ${open ? "top-16 z-50" : "hidden"}`}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className='text-2xl mt-5 pt-3 px-10
                                md:ml-8 md:mt-0 md:border-none md:px-0 md:pt-0 '>
                                <Link href={link.link} className='md:hover:text-neutral hover:text-accent-focus duration-150'>
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                    {user
                        ? (
                            <>
                                <li key={user} className='text-2xl mt-5 pt-3 px-10
                                    md:ml-8 md:mt-0 md:border-none md:px-0 md:pt-0 '>
                                    <Link href="/" className='md:hover:text-neutral hover:text-accent-focus duration-150'>
                                        <button onClick={() => auth.signOut()}>Sign out</button>
                                    </Link>
                                </li>
                            </>
                        )
                        : null
                }
                </ul>
            </nav>
        </main>
    )
}

export default AppNavigation;
