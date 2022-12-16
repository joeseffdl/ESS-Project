import Image from 'next/image'
import Link from 'next/link'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebase"

export default function Home() {
  // Handle user 
  const [user, loading] = useAuthState(auth)
  
  return (
    <>
      <main className="w-screen bg-neutral text-primary-focus p-20">
        <section className="lg:my-12 md:my-24 my-28 md:flex md:flex-cols-2 font-bold">
          <div className="md:w-1/2 flex flex-col justify-center"> 
            <div >
                <p className="lg:text-4xl text-3xl ">Oregen: <span className="md:text-2xl text-lg">Resume builder</span></p>
                <p className="lg:text-6xl text-5xl ">Where your Professional Journey <br />begins with us!</p>
              
              <Link href={!user ? "/login" : "/choose-template" }>
                  <button
                    className="btn btn-outline btn-accent
                      lg:btn-lg
                      border-4 rounded-full my-5
                      hover:bg-none hover:scale-105 transition ease-in-out hover:duration-300"
                  >
                    Generate now
                  </button>
                </Link>
              </div>
            </div>  
            <div className="md:w-1/2 md:block hidden">
              <div>
              {[
                {
                  image: 'Sample',
                  name: 'Landing Page',
                  desc: 'Image',
                }
              ].map((landing) => {
                return (
                  <div className="flex justify-center relative drop-shadow-xl p-5 rounded-xl my-10 bg-neutral-focus" key={landing.name}>
                    <Image src={`/${landing.image}.jpg`} width={500} height={500} alt={`${landing.name} image`} className="object-cover rounded-lg" />        
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section className="my-10 lg:h-screen lg:flex-row flex flex-col-reverse">
          <div className="lg:w-1/2 lg:grid">
            {[
              {
                image: 'Sample',
                name: 'Feature 1',
                desc: 'Template',
              },
              {
                image: 'Sample',
                name: 'Feature 2',
                desc: `Generator`,
              },
            ].map((features) => {
              return (
                <div className="card items-center drop-shadow-xl p-10 rounded-xl lg:my-5 my-10 bg-neutral-focus" key={features.name}>
                    <div className="flex-1 relative w-full ">
                        <Image src={`/${features.image}.jpg`} alt={`${features.name} image`} fill className="object-cover rounded-lg" />
                  </div>
                  
                    <h2 className="card-title text-accent text-lg font-medium pt-8">
                        { features.name }
                    </h2>
                    <p className="badge badge-secondary">
                        { features.desc }
                    </p>
                </div>
              )
            })}
          </div>
          <div className="lg:w-1/2 lg:pl-20 flex flex-col justify-center">
            <div >
              <p className="text-secondary-focus lg:text-5xl text-4xl font-bold ">Features</p>
              <p className="lg:text-2xl text-xl my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti nesciunt eligendi sapiente laboriosam iusto, cum sit maxime, veniam dolorum cupiditate beatae quod. Repudiandae quod itaque saepe minus exercitationem a.</p>
            </div>
          </div>
        </section>
        <section className="lg:my-40 my-20">
          <div className="text-center">
            <p className="text-3xl text-secondary-focus font-bold my-10">WHAT IS OREGEN <span className="text-base text-secondary font-semibold">A BRIEF HISTORY</span></p>
            <p className="text-2xl ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti nesciunt eligendi sapiente laboriosam iusto, cum sit maxime, veniam dolorum cupiditate beatae quod. Repudiandae quod itaque saepe minus exercitationem a.</p>
            
            <div className="btn-group py-5">
              <button className="btn btn-circle btn-outline ">&lt;</button>
              <button className="btn btn-circle btn-outline ">&gt;</button>
            </div>
          </div>
        </section>
        <section className="lg:mt-40 my-20 ">
          <p className="text-4xl text-center text-secondary-focus font-bold py-2">The Team</p>
          <div className="lg:grid lg:grid-cols-3 gap-10">
              {[
                  {
                      image: 'Sample',
                      name: 'Lance Blas',
                      desc: 'Developer',
                      skills: ['Project Manager','Quality Assurance',]
                  },
                  {
                      image: 'Sample',
                      name: 'Joseph De Leon',
                      desc: `Developer`,
                      skills: ['Front-end','Back-end',]
                  },
                  {
                      image: 'Sample',
                      name: 'Daniel Vasquez',
                      desc: 'Developer',
                    skills: ['Front-end', 'Back-end',]
                  },
              ].map((team) => {
                  return (
                      <div className="card glass text-center drop-shadow-xl p-10 rounded-xl my-10 bg-neutral-focus" key={team.name}>
                          <div className="grid place-content-center">
                              <Image src={`/${team.image}.jpg`} width={100} height={100} alt={`${team.name} image`} className="object-cover rounded-full border-2 border-neutral/50" />
                          </div>
                          <p className="text-neutral text-lg font-medium pt-8 pb-2">
                              { team.name }
                          </p>
                          <p className="text-slate-300 font-semibold py-2">
                              { team.desc }
                          </p>
                          <ul>
                              {team.skills.map((skill) => {
                                  return (
                                      <li className="badge badge-neutral text-accent font-semibold p-2 mx-1" key={skill}>
                                          {skill}
                                      </li>
                                  )
                              })}
                          </ul>
                      </div>
                  )
              })} 
          </div>
        </section>
      </main>
    </>
  )
}
