import AppNavigation from "../../components/AppNavigation";

function Account() {
    return (
        <>
            Account
        </>
    )
}

export default Account;

Account.getLayout = function PageLayout(page) {
    return (
        <>
            <AppNavigation />
            {page}
        </>
    )
}