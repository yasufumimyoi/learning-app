import '../styles/globals.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Header from '../components/Header'
import Auth from '../components/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="bg-gray-900">
        <div className="w-11/12 mx-auto xl:max-w-7xl xl:mx-auto">
          <Auth />
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  )
}

export default MyApp
