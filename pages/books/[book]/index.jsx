import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API  , Storage  } from 'aws-amplify';

import {AiOutlineShoppingCart} from 'react-icons/ai'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { add } from '@/redux/reducers/cartSlice';
import {getBook} from '../../../src/graphql/queries';




function BookItem(){
  
  const dispatch = useDispatch();
  const router = useRouter();

  const [bookData, setBookData] = useState();
  const [loading , setLoading] = useState(false)

  const handleCart = ()=>{
      const data = {...bookData , quantity : 1}
      dispatch(add(data))
  }
const handleContinueShopping = ()=>{
  router.push('/books')
}


const getItems = async ()=>{
  const id = router.query.book
         try {
          setLoading(true)
         const todos =   await API.graphql({
              query: getBook,
              variables: {  id },
              authMode: "API_KEY"
            })
          
            // const res = todos.data.listBooks.items;
            const res = todos.data.getBook;
            const imageUrl = await Storage.get(res.bookImage);
              const newDATA =  { ...res, bookImage: imageUrl };
            setBookData(newDATA);

            setTimeout(() => {
              
              setLoading(false)
            }, 3000);
          
            
          } catch (error) {
            console.log('You Have No Data' , error)  
          }
        }
        
        


        useEffect(()=>{
          getItems()
        },[router.query.book])
 


        if(loading){
          return <div className = 'w-full h-screen flex justify-center items-center' >
            <div className="typewriter">
            <div className="slide"><i></i></div>
            <div className="paper"></div>
            <div className="keyboard"></div>
            </div>
          </div>  
        }

  return (
    <div  style={{backgroundImage : 'url("/assests/productBack.jpg")'}}  className = 'flex justify-center bg-cover bg-center items-center w-full h-screen px-20' >
      {bookData ? (
        <div className = ' flex shadow-lg border backdrop-blur-md bg-white/25  p-5 rounded-lg ' >
          <div className='w-1/2 px-2' >
            <div className='flex justify-between' >
              <div>
          <h1 className='text-lg font-bold' >{bookData.title}</h1>
          <small className=' font-bold' >{bookData.author}</small>
          <h1 className='text-sm font-bold' >Review : 5</h1>

              </div>
          <h1 className='text-lg font-bold' >${bookData.price}</h1>

            </div>
          <p>{bookData.description}</p>
          <div className='py-3' >
            <p className='font-bold' >category : {bookData.category}</p>
          </div>
          <div className='py-3' >
            <p className='font-bold' >email : {bookData.email}</p>
          </div>
          </div>
          <div className='w-1/2 flex justify-center items-center flex-col  ' >
          <img
            src={bookData.bookImage}
            alt = 'book'
            
            className = 'rounded-lg border h-36 w-auto shadow-md px-3 py-2'
            
          />
          <div className='mt-4' >
            <button onClick={handleCart}  className='bg-orange-500	 hover:bg-orange-400	flex items-center  justify-between w-40 text-white px-4 py-2 rounded-lg  shadow-lg' >Add To Cart <AiOutlineShoppingCart/>  </button>
            <button onClick={handleContinueShopping}  className='bg-green-500	mt-5 hover:bg-green-400	flex items-center  justify-center w-48  text-white px-4 py-2 rounded-lg  shadow-lg' >Continue Shopping  </button>
          </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default BookItem;