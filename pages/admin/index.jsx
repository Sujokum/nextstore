import React from "react";
import {Authenticator } from  '@aws-amplify/ui-react';
import { useRouter } from "next/router";
const Admin = () => {
  const route =  useRouter()
  return (


    <div className='w-full flex  py-20 justify-center  min-h-screen '>
    <Authenticator>
    {({ signOut, user }) => user.username === 'admin' ? (
      <div class='max-w-screen-md   mx-auto p-5'>
        <button onClick={signOut} >Sign Out</button>
        <div class='text-center mb-16'>
          <p class='mt-4 text-sm leading-7 text-gray-500 font-regular uppercase'>
            Welcome To Admin Page 
          </p>
          <h3 class='text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900'>
            Add {user.username} <span class='text-indigo-600'>Book</span>
          </h3>
        </div>

        <form class='w-full'>
          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='Author'
              >
                Author Name
              </label>
              <input
                class='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='Author'
                type='text'
                placeholder='Suneel Ahmed'
              />
              {/* <p class='text-red-500 text-xs italic'>
                Please fill out this field.
              </p> */}
            </div>
            <div class='w-full md:w-1/2 px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='book'
              >
                Book Name
              </label>
              <input
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='book'
                type='text'
                placeholder='Javascript fundmentals'
              />
            </div>
            <div class='w-full md:w-1/2 px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='category'
              >
                Category
              </label>
              <input
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='category'
                type='text'
                placeholder='Programming'
                />
            </div>
            <div class='w-full md:w-1/2 px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='price'
              >
                Price
              </label>
              <input
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='price'
                type='text'
                placeholder='$50'
              />
            </div>
          </div>
          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='email'
                >
                Email Address
              </label>
              <input
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='email'
                type='email'
                placeholder='example@gmail.com'
                />
            </div>
          </div>
          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='authorImg'
              >
                Author Image
              </label>
              <input
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='authorImg'
                type='file'
                />
            </div>
          </div>

          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full px-3'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='description'
                >
                Description
              </label>
              <textarea
                rows='7'
                id="description"
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                ></textarea>
            </div>
            <div class='flex flex-wrap -mx-3 mb-6'>
              <div class='w-full px-3'>
                <label
                  class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='bookImg'
                  >
                  Book Image
                </label>
                <input
                  class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='bookImg'
                  type='file'
                  />
              </div>
            </div>
            <div class='flex justify-between w-full px-3'>
              <div class='md:flex md:items-center'>
                <label class='block text-gray-500 font-bold'>
                  <input class='mr-2 leading-tight' type='checkbox' />
                  <span class='text-sm'>Send me your newsletter!</span>
                </label>
              </div>
              <button
                class='shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded'
                type='submit'
              >
                Add Book
              </button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div className=" justify-center flex flex-col items-center w-full " >
            <h1 className="text-4xl text-sky-500 text-bold  " >Login Successfully </h1>
            <button onClick = {()=>route.push('/')} className="text-2xl text-white text-bold bg-green-500 rounded-xl shadow mt-3 px-3 py-2  " >Go To Home </button>
      </div>
    )
  }
 </Authenticator>
    </div>
  );
};

export default Admin;
