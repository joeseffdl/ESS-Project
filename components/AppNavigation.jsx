import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { auth } from "../utils/firebase"

function AppNavigation() {
    // Handle user 
    const [user, loading] = useAuthState(auth)    

    // States
    let [open, setOpen] = useState(false)
    let [windowWidth, setWindowWidth] = useState(false)

    // Links
    let Links =[
      {name:"Resumes",link:"/resumes"},
      {name:"Account",link:"/dashboard/account"},
    ];

    const handleWindowResize = () => {
        const width = window.innerWidth
        setWindowWidth(width)
        if (windowWidth > 768) {
            setOpen(false)
        } else if (windowWidth == 768) {
            setOpen(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [])
    
    return (
        <main className="text-white shadow-xl w-screen ">
            <nav className={`flex items-center justify-between ${open && windowWidth <= 768 ? "bg-primary" : "bg-gradient-to-b from-secondary to-primary"} py-5 px-10 xl:px-24 font-bold`}>
                <div className="font-bold h-10 text-2xl cursor-pointer flex items-end">
                    <div className="flex items-end"><Link href="/" className="text-4xl font-extrabold hover:text-secondary-focus">Oregen</Link> <span className="hidden sm:block ml-2 text-sm">Resume Template Builder</span></div>
                </div>
                <div onClick={ () => setOpen(!open)} className="text-3xl text-neutral-focus cursor-pointer md:hidden" >
                    <span>
                        { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                    </span>
                </div>
                <ul className={`h-10 pb-5 absolute left-0 w-full
                    md:flex md:items-end md:pb-0 md:z-auto md:pl-0 md:w-auto md:static
                    ${open ? "top-16 z-50 h-1/4 border-b-2 border-accent bg-gradient-to-t from-secondary to-primary md:bg-none md:border-none" : "hidden"}`}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className='text-2xl mt-5 pt-3 px-10
                                md:ml-8 md:mt-0 md:border-none md:px-0 md:pt-0 '>
                                <Link onClick={() => setOpen(!open)}  href={link.link} className='md:hover:text-secondary-focus hover:text-accent-focus duration-150'>
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
                                    <Link href="/" className='md:hover:text-secondary-focus hover:text-accent-focus duration-150'>
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
