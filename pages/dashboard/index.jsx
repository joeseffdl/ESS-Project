import AppNavigation from "../../components/AppNavigation"
import Link from "next/link"
function Home() {
    return (
        <>
        </>
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