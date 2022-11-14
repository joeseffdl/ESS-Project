import AppNavigation from "../../components/AppNavigation";

function Projects() {
    return (
       <></>
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