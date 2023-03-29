import React from 'react'
import {Authenticator} from '@aws-amplify/ui-react'
const index = () => {
  return (
      <div className='w-full h-screen flex justify-center items-center' >
        <Authenticator>
        <h1 className='text-3xl text-sky-500'>Welcome to CheckOut</h1>
    </Authenticator>
    </div>
  )
}

export default index