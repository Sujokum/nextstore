import React , {useState} from "react";
import {Authenticator } from  '@aws-amplify/ui-react';
import toast, { Toaster } from 'react-hot-toast';
import { API , Storage    } from 'aws-amplify';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {createBook} from '../../src/graphql/mutations'
const Admin = () => {
  const {group } = useSelector((state)=>state.user)  
  const route =  useRouter()
  const [adminData , setAdminData] = useState({
    authorName : '',
    bookName : '',
    category : '',
    price : '',
    description : '',
    email : ''
  })

  const [bookImg , setBookImg] = useState()
  const [authorImg , setAuthorImg] = useState()
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
      try {
        const {authorName , bookName , category , price , description , email} = adminData;
        const result = await Storage.put(bookImg.name  , bookImg ,{
          level : 'public',
          contentType : bookImg.type
        } );
        const result2 = await Storage.put(authorImg.name  , authorImg ,{
          level : 'public',
          contentType : authorImg.type
        } );
        const bookKey  = result.key
        const authorKey  = result2.key;

    


      
        const addBook = {
          title :  bookName ,
          description,
          bookImage : bookKey,
          authorImage : authorKey,
          author : authorName , 
          price ,
          category ,
          email ,
        }

         await API.graphql({
          query: createBook,
          variables: {input: addBook},
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        })
        setAdminData({
          authorName : '',
          bookName : '',
          category : '',
          price : '',
          description : '',
          email : ''
        })
        setBookImg('');
        setAuthorImg('');
        toast.success('Book Added')
      } catch (error) {
          console.log(error)
      }    
  }





  return (


    <div className='w-full flex  py-20 justify-center  min-h-screen '>
      <Toaster/>
    <Authenticator>
    {({ signOut, user }) => group[0] === 'Admin' ? (
      <div className='max-w-screen-md   mx-auto p-5'>
        <div className='text-center mb-16'>
          <p className='mt-4 text-sm leading-7 text-gray-500 font-regular uppercase'>
            Welcome To Admin Page 
          </p>
          <h3 className='text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900'>
            Add {user.username} <span className='text-indigo-600'>Book</span>
          </h3>
        </div>

        <form className='w-full'>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='Author'
              >
                Author Name
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='Author'
                type='text'
                name="authorName"
                value={adminData.authorName}
                onChange={(e)=>setAdminData({...adminData , authorName : e.target.value})}
                placeholder='Suneel Ahmed'
              />
              {/* <p className='text-red-500 text-xs italic'>
                Please fill out this field.
              </p> */}
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='book'
              >
                Book Name
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='book'
                name="bookName"
                value={adminData.bookName}
                onChange={(e)=>setAdminData({...adminData , bookName : e.target.value})}
                type='text'
                placeholder='Javascript fundmentals'
              />
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='category'
              >
                Category
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='category'
                name="category"
                value={adminData.category}
                onChange={(e)=>setAdminData({...adminData , category : e.target.value})}
                type='text'
                placeholder='Programming'
                />
            </div>
            <div className='w-full md:w-1/2 px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='price'
              >
                Price
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='price'
                name="price"
                value={adminData.price}
                onChange={(e)=>setAdminData({...adminData , price : e.target.value})}
                type='text'
                placeholder='$50'
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='email'
                >
                Email Address
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='email'
                name="email"
                value={adminData.email}
                onChange={(e)=>setAdminData({...adminData , email : e.target.value})}
                type='email'
                placeholder='example@gmail.com'
                />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='authorImg'
              >
                Author Image
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='authorImg'
                name="authorImage"
         
                onChange = {(e)=> setAuthorImg(e.target.files[0])}
                type='file'
                />
            </div>
          </div>

          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='description'
                >
                Description
              </label>
              <textarea
                rows='7'
                name="description"
                value={adminData.description}
                onChange={(e)=>setAdminData({...adminData , description : e.target.value})}
                id="description"
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                ></textarea>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='bookImg'
                  >
                  Book Image
                </label>
                <input
                name="bookImage"
             
                onChange = {(e)=> setBookImg(e.target.files[0])}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='bookImg'
                  type='file'
                  />
              </div>
            </div>
            <div className='flex justify-between w-full px-3'>
              
              <button
                className='shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded'
                type='submit'
                onClick={handleSubmit}
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
