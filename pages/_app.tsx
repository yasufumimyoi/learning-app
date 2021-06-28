import '../styles/globals.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-900">
      <div className="w-11/12 mx-auto xl:max-w-7xl xl:mx-auto">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  )
}

export default MyApp
