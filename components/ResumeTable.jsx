import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where, limit, startAfter } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import { db } from "../utils/firebase";
import { toast } from "react-toastify";

function ResumeTable({ user, Links }) {
    // Router
    const router = useRouter()

    // Handle User Resume Data
    const [allResumes, setAllResumes] = useState([])
    const [userResumes, setUserResumes] = useState([])
    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState({
        field: "createdOn",
        order: "desc",
    })
    // let [latestDoc, setLatestDoc] = useState(0)

    // Filter searched resumes
    const filteredAllResume = useMemo(() => {
        return (allResumes?.filter(resume => (
            resume.type.toLowerCase().includes(search.toLowerCase()) ||
            resume.username.toLowerCase().includes(search.toLowerCase()) ||
            new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ').toLowerCase().includes(search.toLowerCase())
        )))
    }, [allResumes,search])

    const filteredUserResume = (userResumes?.filter(resume => (
        resume.type.toLowerCase().includes(search.toLowerCase()) ||
        resume.username.toLowerCase().includes(search.toLowerCase()) ||
        new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ').toLowerCase().includes(search.toLowerCase())
    )))

    // Sorting Type
    const sortBy = [
        { name: "Template - Ascending", properties: { field: "type", order: "asc" } },
        { name: "Template - Descending", properties: { field: "type", order: "desc" } },
        { name: "Owner - Ascending", properties: { field: "username", order: "asc" } },
        { name: "Owner - Descending", properties: { field: "username", order: "desc" } },
        { name: "Created - Ascending", properties: { field: "createdOn", order: "asc" } },
        { name: "Created - Descending", properties: { field: "createdOn", order: "desc" } },
    ]

    // Handle Sorting
    const handleSorting = (e) => {
        const { name, value } = e.target
        let properties = value.split(",")
        setSorting({
            field: properties[0],
            order: properties[1],
        })
    }

    // Get Resume Data
    const getResumes = async () => {
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, orderBy(`${sorting.field}`, `${sorting.order}`), limit(3))
        const unsubscribe = await onSnapshot(q, (snapshot) => {
            setAllResumes(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }
    
    // Load more
    const loadMore = async () => {
        let latestDoc = allResumes[allResumes.length - 1]
        console.log(latestDoc)
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, orderBy(`${sorting.field}`, `${sorting.order}`), startAfter(latestDoc), limit(3), )
        const unsubscribe = await onSnapshot(q, (snapshot) => {
            console.log(snapshot.docs.map((doc) => (doc.data())))
            // setAllResumes(snapshot.docs.map((doc) => ({
            //     ...allResumes,
            //     ...doc.data(),
            //     id: doc.id
            // })))
        })
        return unsubscribe
    }


    // Get Logged In User Resumes
    const getUserResumes = async () => {
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, where("user", "==", user.uid), orderBy(`${sorting.field}`, `${sorting.order}`))
        const unsubscribe = await onSnapshot(q, (snapshot) => {
            setUserResumes(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

    // Delete Resume
    const deleteResume = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            const docRef = doc(db, 'resumes', id)
            await deleteDoc(docRef)
            toast.success("Deleted successfully 🗑️")
        }
    }
    
    useEffect(() => {
        if (!user) return
        if (router.pathname == Links[0].resumes) {
            getResumes()
        } else if (router.pathname == Links[0].yourResumes) {
            getUserResumes()
        }
    }, [user, sorting])

    return (
        <>
            <section className="w-full min-h-screen p-5
                md:p-10">
                <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-y-2 my-5">
                    <h2 className="w-full text-neutral-focus text-2xl font-extrabold leading-none
                        lg:text-4xl"
                    >
                        Resumes Overview
                    </h2>
                    <div className="w-full md:h-9 lg:w-192 flex gap-1 ">
                        <input
                            className="w-full border-2 border-black disabled:border-gray-300 focus:border-accent-focus pl-1 disabled:cursor-not-allowed"
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {setSearch(e.target.value) }}
                        />
                        <select
                            className="w-full xl:w-2/5 border-2 border-black focus:border-accent-focus pl-1 text-xs bg-white cursor-pointer"
                            name="sortBy"
                            onChange={handleSorting}
                            defaultValue="Sort By"
                        >
                            <option disabled >Sort By</option>
                            {
                                (sortBy).map((sort, index) => {
                                    return (
                                        <option value={[ sort.properties.field, sort.properties.order ]} key={sort.name}>
                                            {sort.name}
                                        </option>
                                )})   
                            }
                        </select>
                        
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl">
                    <table className="w-full divide-y-2 ">
                    <thead className="m-auto ">
                        <tr className="bg-slate-700 text-center text-white">
                            <th className="w-48 p-4 ">Resume Template</th>
                            <th className="p-4 ">Owner</th>
                            <th className="p-4 ">Created</th>
                            <th className="p-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {router.pathname == Links[0].yourResumes
                            ? <>
                                    {filteredUserResume?.map((resume) => (
                                    <tr className="text-center even:bg-white odd:bg-gray-300" key={resume.id}>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.type}</td>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.username}</td>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ')}</td>
                                        <td className="flex justify-center gap-2 p-4 text-lg text-gray-700 whitespace-nowrap font-semibold tracking-wide" >
                                            <Link href={{
                                                pathname: `/${resume.id}`
                                            }}>
                                                <button className="hover:scale-110 hover:text-sky-600"><AiFillEye /></button>
                                            </Link>
                                            <Link href={{ pathname: `${Links[0].template}/${resume.type}/${[query.id]}`, query: { id: resume.id } }}>
                                                <button className="hover:scale-110 hover:text-amber-600"><AiFillEdit /></button>
                                            </Link>
                                            <Link href={`${Links[0].resumes}`}>
                                                <button className="hover:scale-110 hover:text-red-600" onClick={() => deleteResume(resume.id)}><AiFillDelete /></button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            : router.pathname == Links[0].resumes
                                ? <>
                                        {filteredAllResume?.map((resume) => (
                                        <React.Fragment key={resume.id}>
                                            <tr className="text-center even:bg-white odd:bg-gray-300" >
                                            {user.uid == resume.user
                                                    ? (
                                                        <>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.type}</td>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.username}</td>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ')}</td>
                                                            <td className="flex justify-center gap-2 p-4 text-lg text-gray-700 whitespace-nowrap font-semibold tracking-wide" >
                                                                <Link href={{ pathname: `/${resume.id}` }}>
                                                                    <button className="hover:scale-110 hover:text-sky-600" ><AiFillEye /></button>
                                                                </Link>
                                                                <Link href={{ pathname: `${Links[0].template}/${resume.type}/${[query.id]}`, query: { id: resume.id } }}>
                                                                    <button className="hover:scale-110 hover:text-amber-600" ><AiFillEdit /></button>
                                                                </Link>
                                                                <Link href={`${Links[0].resumes}`}>
                                                                    <button className="hover:scale-110 hover:text-red-600" onClick={() => deleteResume(resume.id)}><AiFillDelete /></button>
                                                                </Link>
                                                            </td>
                                                        </>
                                                )
                                                    : (
                                                        <>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.type}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.username}</td>
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ')}</td>
                                                        <td className="flex justify-center gap-2 p-4 text-lg text-gray-700 whitespace-nowrap font-semibold tracking-wide" >
                                                            <Link href={{ pathname: `/${resume.id}` }}>
                                                                <button className="hover:scale-110 hover:text-sky-600"><AiFillEye /></button>
                                                            </Link>
                                                        </td>
                                                    </>
                                                )
                                            }
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </>
                                : null
                        }
                    </tbody>
                    </table>
                    {
                        router.pathname == Links[0].resumes ? (
                            <div className="flex justify-center text-white text-lg tracking-wider font-semibold p-2 ">
                                <button
                                    disabled
                                    className="border-2 border-accent bg-slate-700 rounded-lg p-2 
                                        disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-accent
                                        hover:scale-105 hover:border-accent-focus ease-in-out duration-150"
                                    onClick={loadMore}>Load more
                                </button>
                            </div>
                        ) : null
                    }
                    
                </div>
            </section>
        </>
    )
}

export default ResumeTable;
