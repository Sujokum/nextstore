import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import Nav from '@/components/Navbar/Nav'
export default function App({ Component, pageProps }) {
  return (
  <>
  <Provider store={store} >

  <Nav/>
  <Component {...pageProps} />
  </Provider>
  </>
  )
}
