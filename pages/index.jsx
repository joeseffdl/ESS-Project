import Image from 'next/image'
import Link from 'next/link'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"

export default function Home() {
  // Handle user 
  const [user, loading] = useAuthState(auth)

  return (
    <>
      <main className="w-screen text-gray-900 ">
        {/* LANDING PAGE SECTION */}
        <section className="lg:flex lg:flex-cols-2 h-screen font-extrabold px-10 xl:px-24">
          <div className="h-3/5 flex flex-col justify-end items-center 
            lg:w-1/2 lg:h-full lg:pt-0
            sm:justify-center sm:pt-24">
            <div className="text-neutral-focus" >
              <p className="lg:text-4xl text-4xl ">Oregen: <span className="md:text-xl text-2xl">Resume builder</span></p>
              <p className="lg:text-6xl text-5xl ">Your Professional <br />Journey Begins With Us!</p>

              <Link href={!user ? "/login" : "/choose-template"}>
                <button
                  className="btn btn-outline btn-secondary
                      lg:btn-lg
                      border-4 rounded-full my-5
                      hover:bg-none hover:scale-105 transition ease-in-out hover:duration-300"
                >
                  Generate now
                </button>
              </Link>
            </div>
          </div>
          <div className="h-2/5 lg:w-1/2 lg:h-full ">
            <div className="h-full">
              {[
                {
                  image: 'Sample',
                  name: 'Landing Page',
                  desc: 'Image',
                }
              ].map((landing) => {
                return (
                  <div className="h-full flex justify-center items-center relative" key={landing.name}>
                    {/* <Image src={`/${landing.image}.jpg`} fill alt={`${landing.name} image`} className="object-cover lg:rounded-br-full lg:rounded-bl-full lg:pb-10" /> */}
                    <div className="w-full h-full bg-gradient-to-b from-primary-focus to-secondary-focus lg:rounded-br-full lg:rounded-bl-full lg:mb-10"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-accent my-10 lg:h-screen lg:flex-row flex flex-col-reverse p-10 xl:pr-24 lg:py-0 lg:pl-0">
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-full bg-gradient-to-tr from-accent-focus to-primary-focus lg:rounded-br-full lg:mb-10"></div>
          </div>
          <div className="lg:w-1/2 lg:pl-20 flex flex-col justify-center">
            <p className="text-primary-focus lg:text-5xl text-4xl font-extrabold">Features</p>
            <p className="lg:text-2xl text-xl my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti nesciunt eligendi sapiente laboriosam iusto, cum sit maxime, veniam dolorum cupiditate beatae quod. Repudiandae quod itaque saepe minus exercitationem a.</p>
          </div>
        </section>

        {/* HISTORY SECTION */}
        <section className="lg:my-40 my-20 px-10 xl:px-24">
          <div className="text-center">
            <p className="text-3xl text-primary-focus font-extrabold my-5">WHAT IS OREGEN <span className="text-base text-primary font-semibold">A BRIEF HISTORY</span></p>
            <p className="text-2xl ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti nesciunt eligendi sapiente laboriosam iusto, cum sit maxime, veniam dolorum cupiditate beatae quod. Repudiandae quod itaque saepe minus exercitationem a.</p>

            <div className="btn-group py-5">
              <button className="btn btn-circle btn-outline ">&lt;</button>
              <button className="btn btn-circle btn-outline ">&gt;</button>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="flex flex-col justify-center bg-neutral lg:mt-40 mt-10 p-10 xl:px-24">
          <p className="text-4xl text-center text-accent font-extrabold py-2">The Team</p>
          <div className="lg:grid lg:grid-cols-3 gap-10">
            {[
              {
                image: 'Sample',
                name: 'Lance Blas',
                desc: 'Developer',
                skills: ['Project Manager', 'Quality Assurance',]
              },
              {
                image: 'Sample',
                name: 'Joseph De Leon',
                desc: `Developer`,
                skills: ['Front-end', 'Back-end',]
              },
              {
                image: 'Sample',
                name: 'Daniel Vasquez',
                desc: 'Developer',
                skills: ['Front-end', 'Back-end',]
              },
            ].map((team) => {
              return (
                <div className="card glass lg:flex-row bg-neutral-focus p-5 my-5 duration-300 ease-in-out" key={team.name}>
                  <div className="w-full flex justify-center items-center
                      lg:w-1/2 lg:mr-10 lg:justify-end
                      ">
                    <Image src={`/${team.image}.jpg`} width={100} height={100} alt={`${team.name} image`}
                      className="object-cover rounded-full border-2 border-gray-700 
                        sm:rounded-xl" />
                  </div>
                  <div className="w-full flex flex-col items-center justify-center
                  lg:items-start">
                    <p className="text-accent-focus text-2xl font-extrabold my-2">
                      {team.name}
                    </p>
                    <ul>
                      {team.skills.map((skill) => {
                        return (
                          <li className="badge badge-accent text-neutral-focus font-semibold mr-1" key={skill}>
                            {skill}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}
