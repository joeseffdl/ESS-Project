import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useAuthState } from "react-firebase-hooks/auth";
import AppNavigation from "../../components/AppNavigation";
import { auth } from "../../utils/firebase";
function Welcome() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const getUser = async () => {
    if (loading) return;
    if (!user) return router.push("/login");
  };

  // Confetti
  const [pieces, setPieces] = useState(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    getUser();
    stopConfetti();
  }, [user, loading]);

  return (
    <section className="bg-gradient-to-t from-neutral-content to-primary h-screen">
      <div className="h-5/6 flex justify-center items-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div
            className="text-3xl text-white text-center font-extrabold px-6 leading-snug
                        md:text-3xl
                        lg:px-5 lg:text-4xl"
          >
            Welcome to OREGEN!
            <br /> We&apos;re excited to help you create a professional and
            effective resume <br />
            that will help you land your dream job.
          </div>
          <Link href="../choose-template">
            <button
              className="flex items-center justify-center font-bold text-sm text-neutral-focus bg-accent-focus rounded-xl mt-5 p-2
                                md:text-lg md:mt-10 md:p-4
                                hover:scale-105 transition ease-out hover:duration-150 hover:text-secondary-focus hover:bg-transparent hover:border-2 hover:border-secondary-focus"
            >
              Select a template
            </button>
          </Link>
        </div>
      </div>
      <Confetti gravity={0.2} numberOfPieces={pieces} />
    </section>
  );
}

export default Welcome;

Welcome.getLayout = function PageLayout(page) {
  return (
    <>
      <AppNavigation />
      {page}
    </>
  );
};
