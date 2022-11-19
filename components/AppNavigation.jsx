import { useState } from 'react'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { auth } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

function AppNavigation() {
    // Handle user 
    const [user, loading] = useAuthState(auth)    

    // States
    let [open, setOpen] = useState(false)

    // Links
    let Links =[
      {name:"Projects",link:"/projects"},
      {name:"Account",link:"/dashboard/account"},
    ];

    return (
        <main className="text-primary shadow-xl w-full top-0 left-0 border-b-2 border-secondary-focus/75">
            <nav className="flex items-center justify-between bg-neutral py-5 px-10 font-bold">
                <div className="font-bold text-2xl cursor-pointer flex items-center">
                    <div className="flex items-center"><Link href="/dashboard" className="text-primary hover:text-primary-focus">Oregen</Link> <span className="hidden md:block mt-2 ml-5 text-sm">Research Template Builder</span></div>
                </div>
                <div onClick={ () => setOpen(!open)} className="text-3xl cursor-pointer md:hidden" >
                    <span>
                        { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                    </span>
                </div>
                <ul className={`md:flex md:items-center md:pb-0 md:z-auto md:pl-0 md:w-auto pb-5 absolute md:static md:border-none bg-neutral left-0 w-full border-b-2 transition-all duration-150 ease-in ${ open ? "top-16 z-50" : "hidden"}`}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className='md:ml-8 text-xl md:mt-0 md:border-none md:px-0 md:pt-0 mt-5 pt-3 border-t-2 border-neutral-focus px-10'>
                                <Link href={link.link} className='md:text-primary md:hover:text-primary-focus text-accent hover:text-accent-focus duration-150'>
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                    {user
                        ? (
                            <>
                                <li key={user} className='md:ml-8 text-xl md:mt-0 md:border-none md:px-0 md:pt-0 mt-5 pt-3 border-t-2 border-neutral-focus px-10'>
                                    <Link href="/" className='md:text-primary md:hover:text-primary-focus text-accent hover:text-accent-focus duration-150'>
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
