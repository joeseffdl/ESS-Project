import AppNavigation from "../../components/AppNavigation"
import Image from "next/image"
import Link from "next/link"

function Templates() {
    const templates = [
        {name: "Template 1", image: "Sample"},
        {name: "Template 2", image: "Sample"},
        {name: "Template 3", image: "Sample"},
        {name: "Template 4", image: "Sample"},
        {name: "Template 5", image: "Sample"},
        {name: "Template 6", image: "Sample"},
        {name: "Template 7", image: "Sample"},
        {name: "Template 8", image: "Sample"},
        {name: "Template 9", image: "Sample"},
        {name: "Template 10", image: "Sample"},
        {name: "Template 11", image: "Sample"},
        {name: "Template 12", image: "Sample"},
    ]

    return (
        <section className="w-screen">
            <section className="flex flex-col">
                <div className="h-32 flex items-center justify-center font-bold">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl text-secondary">Gallery - Academic Journal</h2>
                </div>
                <div className="grid place-items-center border-4 border-primary bg-neutral mx-10 mb-20 py-10 drop-shadow-md rounded-xl
                md:mx-20 lg:py-20">
                    <div className="
                        grid gap-10   
                        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                    ">
                        {templates.map((template) => {
                            return (
                                <div className="w-60 h-60 rounded-xl drop-shadow-xl bg-secondary" key={template.name}>
                                    <Image
                                        className="object-cover rounded-xl drop-shadow-xl border-2 border-secondary hover:border-secondary-focus hover:scale-105 hover:border-4" 
                                        src={`/${template.image}.jpg`}
                                        alt={`${template.name} image`}
                                        fill
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-10 mx-auto ">
                        <button className="btn btn-outline btn-accent">Create first project</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Templates;

Templates.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}