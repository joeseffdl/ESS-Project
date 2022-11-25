import Head from 'next/head'
import '../styles/globals.css'
import { DataProvider } from '../context/DataContext'
import Layout from '../components/Layout'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <DataProvider> 
        <Head>
          <title>OREGEN</title>
          <meta name="description" content="Research journal template generator" />
          <link rel="icon" href="/favicon.ico" />
          {/* <link href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" rel="stylesheet" /> */}
        </Head>
        <ToastContainer draggable={false} limit={1} autoClose={1500} />
        <Component {...pageProps} />
      </DataProvider> 
    )
  }
  
  return (
    <DataProvider>
      <Head>
        <title>OREGEN</title>
        <meta name="description" content="Research journal template generator" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" rel="stylesheet" /> */}
      </Head>
      <Layout>
        <ToastContainer draggable={false} limit={1} autoClose={1500} />
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp