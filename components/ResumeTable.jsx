import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import { db } from "../utils/firebase";
import { toast } from "react-toastify";

function ResumeTable({user, Links}) {
    // Router
    const router = useRouter()

    // Handle User Resume Data
    const [allResumes, setAllResumes] = useState([])
    const [userResumes, setUserResumes] = useState([])

    // Get Resume Data
    const getResumes = async () => {
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, orderBy('createdOn', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllResumes(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

    // Get Logged In User Resumes
    const getUserResumes = async () => {
        const collectionRef = collection(db, 'resumes')
        const q = query(collectionRef, where("user", "==", user.uid), orderBy('createdOn', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUserResumes(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }

    // Delete Resume
    const deleteResume = async (id) => {
        const docRef = doc(db, 'resumes', id)
        await deleteDoc(docRef)
        toast.success("Document deleted successfully 🗑️")
    }

    useEffect(() => {
        if(!user) return
        getResumes()
        getUserResumes()
    }, [user])

    return (
        <>
            <section className="w-full min-h-screen p-5
                md:p-10">
                <h2 className="text-neutral-focus text-xl font-bold p-2
                    sm:text-2xl sm:mt-5
                    md:text-3xl md:mb-5
                    lg:text-4xl"
                >
                    Resumes Overview
                </h2>
                <div className="overflow-auto rounded-lg shadow-2xl">
                    <table className="w-full divide-y-2 ">
                    <thead className="m-auto ">
                        <tr className="bg-slate-700 text-center text-white">
                            <th className="sm:w-48 p-4 ">Resume Template</th>
                            <th className="p-4 ">Owner</th>
                            <th className="p-4 ">Created</th>
                            <th className="p-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {router.pathname == Links[0].yourResumes
                            ? <>
                                {userResumes.map((resume) => (
                                    <tr className="text-center even:bg-white odd:bg-gray-300" key={resume.id}>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.type}</td>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.username}</td>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ')}</td>
                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide" >
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
                                    {allResumes.map((resume) => (
                                        <React.Fragment key={resume.id}>
                                            <tr className="text-center even:bg-white odd:bg-gray-300" >
                                            {user.uid == resume.user
                                                    ? (
                                                        <>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.type}</td>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{resume.username}</td>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide">{new Date(resume.createdOn.toMillis()).toDateString().split(' ').slice(1).join(' ')}</td>
                                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide" >
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
                                                        <td className="p-4 text-sm text-gray-700 whitespace-nowrap font-semibold tracking-wide" >
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
                </div>
            </section>
        </>
    )
}

export default ResumeTable;
