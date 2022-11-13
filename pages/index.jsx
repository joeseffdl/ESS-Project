import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>OREGEN</title>
        <meta name="description" content="Research journal template generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen bg-neutral text-primary-focus p-20">
        <section className="lg:my-12 md:my-24 my-36 md:flex md:flex-cols-2 font-bold">
          <div className="md:w-1/2 flex flex-col justify-center"> 
            <div >
                <p className="lg:text-4xl text-2xl ">Oregen <span className="md:text-2xl text-base">by GROUP 12</span></p>
                <p className="lg:text-6xl text-4xl ">Research journal <br />template generator</p>
                <Link href="/login">
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
                <div className="grid place-content-center drop-shadow-xl p-5 rounded-xl my-10 bg-neutral-focus" key={landing}>
                  <Image src={`/${landing.image}.jpg`} width={500} height={500} alt={`${landing.name} image`} />        
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
                <div className="text-center drop-shadow-xl p-10 rounded-xl lg:my-5 my-10 bg-neutral-focus" key={features}>
                    <div className="grid place-content-center">
                        <Image src={`/${features.image}.jpg`} width={100} height={100} alt={`${features.name} image`} />
                    </div>
                    <p className="text-accent text-lg font-medium pt-8 pb-2">
                        { features.name }
                    </p>
                    <p className="py-2">
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
                      skills: ['Project Manager',]
                  },
                  {
                      image: 'Sample',
                      name: 'Joseph De Leon',
                      desc: `Developer`,
                      skills: ['Full Stack Web Developer',]
                  },
                  {
                      image: 'Sample',
                      name: 'Daniel Vasquez',
                      desc: 'Developer',
                      skills: ['Fullstack Web Developer',]
                  },
              ].map((team) => {
                  return (
                      <div className="text-center drop-shadow-xl p-10 rounded-xl my-10 bg-neutral-focus" key={team}>
                          <div className="grid place-content-center">
                              <Image src={`/${team.image}.jpg`} width={100} height={100} alt={`${team.name} image`} />
                          </div>
                          <p className="text-lg font-medium pt-8 pb-2">
                              { team.name }
                          </p>
                          <p className="py-2">
                              { team.desc }
                          </p>
                          <ul>
                              {team.skills.map((skill) => {
                                  return (
                                      <li className="text-accent font-semibold py-1" key={skill}>
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
