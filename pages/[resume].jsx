
function View() {
    return (
        <>
            View
        </>
    )
}

export default View;

View.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}