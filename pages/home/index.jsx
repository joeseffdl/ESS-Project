import AppNavigation from "../../components/AppNavigation"
import Link from "next/link"

function Home() {
    return (
        <section className="w-screen h-screen flex items-center">
            <div className="w-full h-4/5 flex justify-center items-center">
                <div className="w-3/5 h-3/5 drop-shadow-lg rounded-lg bg-neutral-focus flex justify-center items-center">
                    <div className="text-center p-5 ">
                        <h2 className="font-bold xl:text-5xl md:text-4xl sm:text-3xl text-2xl pb-5">Welcome to Oregen!</h2>
                        <p className="xl:text-2xl md:text-xl sm:text-lg md:my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, consectetur sequi doloribus amet ratione qui iure nobis repudiandae nisi aut, sapiente excepturi dolore! Adipisci accusamus aspernatur eum vero nobis dolorem.</p>
                        <Link href="/">
                            <button
                                className="btn btn-sm btn-outline btn-accent rounded-xl my-5
                                xl:btn-lg sm:btn-md border-2 
                                hover:scale-105 transition ease-in-out hover:duration-300"
                            >
                                Select a template
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;

Home.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}