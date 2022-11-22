
function UserJournals({ children, title, id, user, username, createdOn }) {
    return (
        <div className="grid grid-cols-3 items-center font-semibold text-sm text-neutral-focus my-2
            sm:text-base md:text-lg lg:text-xl hover:bg-accent/50 rounded-lg py-2 px-2">
            <div className="truncate">{title}</div>
            <div className="col-span-2 ">
                <ul className="grid grid-cols-3 justify-items-center items-center truncate" key={id}>
                    <li className="truncate">{username}</li>
                    <li className="truncate">{new Date(createdOn.toMillis()).toDateString()}</li>
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default UserJournals;
