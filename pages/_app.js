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
          <meta name="description" content="Resume template generator" />
          <link rel="icon" href="/favicon.ico" />
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
        <meta name="description" content="Resume template generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ToastContainer draggable={false} limit={1} autoClose={1500} />
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp