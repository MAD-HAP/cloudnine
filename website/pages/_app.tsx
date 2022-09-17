import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Navbar} from "../components/common/Navbar";
import Sidebar from '../components/common/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div>
        <Navbar />
        <Sidebar />
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
