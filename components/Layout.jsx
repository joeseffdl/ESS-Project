import Footer from "./Footer";
import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
