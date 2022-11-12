import Navigation from "./Navigation"
import Footer from "./Footer"

function Layout({ children }) {
    return (
        <>
            <Navigation />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;
