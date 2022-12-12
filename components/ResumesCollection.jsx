
function ResumesCollection({ children, id, type, username, createdOn }) {

    return (
        <div className="flex justify-between md:grid md:grid-cols-3 items-center font-semibold text-sm text-neutral-focus my-2 py-2 pl-2
            sm:text-base md:text-lg lg:text-xl hover:bg-accent/50 rounded-lg ">
            <div className="">{type}</div>
            <div className="col-span-2 w-1/2 md:w-full">
                <ul className="flex justify-center items-center md:grid md:grid-cols-3 md:justify-items-center gap-1" key={id}>
                    <li className="hidden md:block">{username}</li>
                    <li className="hidden md:block">{new Date(createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ')}</li>
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default ResumesCollection;
