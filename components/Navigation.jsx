import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { auth } from "../utils/firebase"

function Navigation() {
    // Handle user
    const [user, loading] = useAuthState(auth)

    const [showNav, setShowNav] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    let [open, setOpen] = useState(false)

    const handleScroll = () => {
        const position = window.pageYOffset
        setScrollPosition(position)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
        window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <main className={`text-primary fixed w-full transition-colors ease-in-out duration-300  px-10 min-h-20 z-50 
                ${scrollPosition > 0 || showNav ? 'bg-neutral-focus shadow-xl' : ''}`}>
            <nav className="py-8 font-bold">
                <div onClick={ () => setOpen(!open)} className="text-3xl absolute right-10 top-4 cursor-pointer md:hidden" >
                    <span>
                        { open ? <AiOutlineClose /> : <AiOutlineMenu /> }
                    </span>
                </div>
                <ul className={`px-10 md:flex md:items-center md:justify-between md:px-20 ${ open ? "block mt-10 md:mt-0" : "hidden"}`}>
                    <li className="hover:translate-x-2 md:hover:-translate-x-2 ease-in-out duration-300">
                        <Link href="/">
                            <p className="md:text-4xl text-3xl">Oregen</p>
                        </Link>
                    </li> 
                    {!user
                        ? (
                            <li className="hover:translate-x-2 ease-in-out duration-300">
                                <Link href="/login">
                                    <p className="md:text-2xl text-xl">Login</p>
                                </Link>
                            </li>
                        )
                        :
                        (
                        <li className="hover:translate-x-2 ease-in-out duration-300">
                            <Link href="/choose-template">
                                <p className="md:text-2xl text-xl">Generate</p>
                            </Link>
                        </li>
                        )
                    }
                    
                </ul>
            </nav>
        </main>
    )
}

export default Navigation;
