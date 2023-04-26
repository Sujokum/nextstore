import React from 'react'
import {Authenticator} from  '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
const index = () => {
  const route = useRouter();
  

  return (
    <div className = 'w-full h-screen  flex items-center justify-center' >

    <Authenticator>
      {({user})=>{
        return(
          
          <div className=" justify-center flex flex-col items-center w-full h-screen" >
            <h1 className="text-4xl text-rose-500 text-bold  " >Welcome {user.username} to Our Book Store </h1>
            <h1 className="text-4xl text-sky-500 text-bold  " >Login Successfully </h1>
            <button onClick = {()=>route.push('/')} className="text-2xl text-white text-bold bg-green-500 rounded-xl shadow mt-3 px-3 py-2  " >Go To Home </button>
      </div>
          )
      }}
    </Authenticator>
    </div>
  )
}

export default index