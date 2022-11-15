import AppNavigation from "../../components/AppNavigation";

function Projects() {
    const projects = [
        {title: "Project 1", owner:"You", last_modified:"1m ago", actions:["edit","delt"]},
        {title: "Project 2", owner:"You", last_modified:"1m ago", actions:["edit","delt"]},
        {title: "Project 3", owner:"You", last_modified:"1m ago", actions:["edit","delt"]},
    ]

    return (
        <section className="w-full flex justify-center items-center">
            <section className="w-1/3 h-screen hidden mx-5 my-10 p-5 bg-neutral-focus rounded-xl
                sm:flex sm:flex-col items-center sm:mr-0
                md:w-1/4 md:ml-10
                lg:w-1/5"
            >
                <div className="btn btn-secondary btn-outline my-3 w-full">New Project</div>
                <div className="btn btn-secondary my-1 w-full">All Projects</div>
                <div disabled className="btn btn-secondary my-1 w-full">Your Projects</div>
            </section>
            <section className="w-full h-screen mx-5 my-10 p-5 bg-neutral-focus rounded-xl
                sm:w-2/3 
                md:3/4 md:mr-10 md:p-10
                lg:w-4/5"
            >
                <h2 className="text-white text-xl font-bold p-2
                    sm:text-2xl sm:mt-5
                    md:text-3xl md:mb-5
                    lg:text-4xl"
                >
                    Projects Overview
                </h2>
                <div className="bg-white p-5 rounded-2xl divide-y-2">
                    <div className="grid grid-cols-3 items-center font-bold text-sm text-neutral-focus
                        sm:text-base md:text-lg lg:text-xl">
                        <div className="pl-2">Project Title</div>
                        <div className="col-span-2">
                            <ul className="grid grid-cols-3 justify-items-end items-center">
                                <li className="">Owner</li>
                                <li className="">Modified</li>
                                <li className="pr-2">Actions</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {projects.map((project) => {
                            return (
                                <>
                                    <div className="grid grid-cols-3 items-center font-semibold text-sm text-neutral-focus my-2
                                        sm:text-base md:text-lg lg:text-xl hover:bg-accent/50 rounded-lg py-2 px-2" key={project.title}>
                                        <div className="">{project.title}</div>
                                        <div className="col-span-2">
                                            <ul className="grid grid-cols-3 justify-items-end items-center">
                                                <li>{project.owner}</li>
                                                <li>{project.last_modified}</li>
                                                <ul className="flex gap-1">{project.actions.map((action) => {
                                                    return (
                                                        <>
                                                            <li>{action}</li>
                                                        </>
                                                    )
                                                })}</ul>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Projects;

Projects.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}