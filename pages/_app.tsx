import '../styles/globals.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Header from '../components/Header'
import Auth from '../components/Auth'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth />
      <Header />
      <div className="w-11/12 mx-auto xl:max-w-7xl xl:mx-auto">
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  )
}

export default MyApp
