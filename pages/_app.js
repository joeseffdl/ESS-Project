import '../styles/globals.css'
import { DataProvider } from '../context/DataContext'
import Layout from '../components/Layout'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <DataProvider> 
        <ToastContainer draggable={false} limit={1} />
        <Component {...pageProps} />
      </DataProvider> 
    )
  }
  
  return (
    <DataProvider>
      <Layout>
        <ToastContainer draggable={false} limit={1} />
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp