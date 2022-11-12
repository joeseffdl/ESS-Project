import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>OREGEN</title>
        <meta name="description" content="Research journal template generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen p-20 bg-orange-100">
        <section className="lg:my-20 md:my-28 my-40 md:flex md:flex-cols-2 font-bold">
          <div className="md:w-1/2 flex flex-col justify-center"> 
            <div >
                <p className="lg:text-4xl text-2xl ">Oregen <span className="md:text-2xl text-base">by GROUP 12</span></p>
                <p className="lg:text-6xl text-4xl ">Research journal <br />template generator</p>
                <Link href="/login">
                  <Button
                    className="
                      lg:text-xl font-semibold 
                      border-4 border-teal-500 text-teal-500 my-5 rounded-full 
                      hover:border-black hover:text-black hover:border-4 hover:scale-105 transition ease-in-out hover:duration-300"
                    size="medium"
                    variant="outlined"
                  >
                    Generate now
                  </Button>
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
                <div className="grid place-content-center shadow-lg p-5 rounded-xl my-10 bg-white" key={landing}>
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
                <div className="text-center shadow-lg p-10 rounded-xl lg:my-5 my-10 bg-white" key={features}>
                    <div className="grid place-content-center">
                        <Image src={`/${features.image}.jpg`} width={100} height={100} alt={`${features.name} image`} />
                    </div>
                    <p className="text-lg font-medium pt-8 pb-2">
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
              <p className="lg:text-5xl text-4xl font-bold ">Features</p>
              <p className="lg:text-2xl text-xl my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti nesciunt eligendi sapiente laboriosam iusto, cum sit maxime, veniam dolorum cupiditate beatae quod. Repudiandae quod itaque saepe minus exercitationem a.</p>
            </div>
          </div>
        </section>
        <section className="lg:my-40 my-20">
          <div className="text-center">
            <p className="text-3xl font-bold my-10">WHAT IS OREGEN <span className="text-base font-semibold">A BRIEF HISTORY</span></p>
            <p className="text-2xl ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti nesciunt eligendi sapiente laboriosam iusto, cum sit maxime, veniam dolorum cupiditate beatae quod. Repudiandae quod itaque saepe minus exercitationem a.</p>
            <Stack className="flex justify-center my-5" spacing={2} direction="row"> 
              <Button className="rounded-full" variant="outlined">&lt;</Button>
              <Button className="rounded-full" variant="outlined">&gt;</Button>
            </Stack> 
          </div>
        </section>
        <section className="lg:mt-40 my-20 ">
          <p className="text-4xl text-center font-bold py-2">The Team</p>
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
                      <div className="text-center shadow-lg p-10 rounded-xl my-10 bg-white" key={team}>
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
                                      <li className="text-teal-600 font-semibold py-1" key={skill}>
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
