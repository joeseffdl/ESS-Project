import { useState, useEffect } from 'react'
import Link from 'next/link'

function Navigation() {
    const [showNav, setShowNav] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)

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
        <>
            <main className={`fixed w-full transition-colors ease-in-out duration-300  px-10 min-h-20 z-50 
                    ${scrollPosition > 0 || showNav ? 'bg-white shadow-xl' : ''}`}>
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
            </main>
        </>
    )
}

export default Navigation;
