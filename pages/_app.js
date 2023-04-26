import '@/styles/globals.css'
import '@aws-amplify/ui-react/styles.css';
import { Provider } from 'react-redux'
import {Amplify} from 'aws-amplify';
import { Hub } from "aws-amplify";
import {useState} from 'react'
import awsExports from '../src/aws-exports';
import store from '@/redux/store'
import Nav from '@/components/Navbar/Nav'
import {Auth  } from 'aws-amplify';

import {useEffect} from 'react'

Amplify.configure(awsExports);

export default function App({ Component, pageProps }) {
  // const dispatch = useDispatch();
  const [authChange , setAuthChange] = useState(false)

  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        console.log('sign in')
        setAuthChange(!authChange)
        break;
        case "signOut":
        setAuthChange(!authChange)
        break;
    }
  };

  Hub.listen("auth", listener);

  const storeAuth = async ()=>{
    console.log('hello auth')
     const user = await  Auth.currentAuthenticatedUser();
     console.log(user)
    const apiResponse = user?.signInUserSession?.idToken?.payload
    const groups = apiResponse['cognito:groups'];
    const username = user.username;
    const email = apiResponse.email;
if(groups){
  localStorage.setItem('aws-groups' , JSON.stringify(groups) )
} 

  localStorage.setItem('aws-username' , JSON.stringify(username) )
  localStorage.setItem('aws-email' , JSON.stringify(email) )

  }
  useEffect(()=>{
    storeAuth();

  },[authChange])
 
  return (
  <>
  <Provider store={store} >

  <Nav>
   

  <Component {...pageProps} />
   
  </Nav>
  </Provider>
  </>
  )
}
