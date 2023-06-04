import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AppNavigation from "../components/AppNavigation";
import ResumeTable from "../components/ResumeTable";
import { auth } from "../utils/firebase";

function YourResumes() {
  // Router
  const router = useRouter();

  // Handle user
  const [user, loading] = useAuthState(auth);

  // Links
  const Links = [
    {
      template: "/choose-template",
      resumes: "/resumes",
      yourResumes: "/your-resumes",
    },
  ];

  const getUser = async () => {
    if (loading) return;
    if (!user) return router.push("/login");
  };

  useEffect(() => {
    getUser();
  }, [user, loading]);

  return (
    <section className="w-full min-h-screen flex">
      <section
        className="hidden w-full p-5 bg-primary
                sm:w-2/5 sm:flex sm:flex-col items-center 
                md:w-1/3
                lg:w-1/4
                xl:w-1/5"
      >
        <div className="btn btn-neutral hover:bg-accent hover:text-gray-900 rounded-xl border-1 border-neutral btn-outline my-3 w-full font-semibold">
          <Link href={`${Links[0].template}`}>New Resume</Link>
        </div>
        <div className="btn btn-neutral hover:bg-accent hover:text-gray-900 rounded-xl border-1 border-neutral btn-outline my-1 w-full font-semibold">
          <Link href={`${Links[0].resumes}`}>All Resumes</Link>
        </div>
        <div
          // disabled={userResumes.length == 0}
          className="btn btn-accent hover:text-gray-900 hover:border-gray-900 rounded-xl border-1 border-neutral my-1 w-full font-semibold"
        >
          <Link href={`${Links[0].yourResumes}`}>
            Your Resumes
            {/* {userResumes.length >= 1 ? (`(${userResumes.length})`) : null} */}
          </Link>
        </div>
      </section>
      <ResumeTable user={user} Links={Links} />
    </section>
  );
}

export default YourResumes;

YourResumes.getLayout = function PageLayout(page) {
  return (
    <>
      <AppNavigation />
      {page}
    </>
  );
};
