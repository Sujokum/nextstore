import '@/styles/globals.css'
import '@aws-amplify/ui-react/styles.css';
import { Provider } from 'react-redux'
import {Amplify} from 'aws-amplify';
import awsExports from '../src/aws-exports';
import store from '@/redux/store'
import Nav from '@/components/Navbar/Nav'

Amplify.configure(awsExports);

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
