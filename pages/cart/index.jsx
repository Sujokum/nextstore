import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
const Cart = () => {
  const router = useRouter()
  const state = useSelector((state)=>state.cart)
  console.log(state)
  const handleContinueShopping = ()=>{
    router.push('/books')
  }
  return (
    <>
      <div    className = 'flex flex-col  bg-cart-img justify-center bg-[100%] bg-center items-center w-full min-h-screen px-20' >
      <button onClick={handleContinueShopping}  className='bg-green-500 	mt-20 hover:bg-green-400	flex items-center  justify-center w-48  text-white px-4 py-2 rounded-lg  shadow-lg' >Continue Shopping  </button>

       {state.map((book)=>{
        return(

       
        <div key = {book.id} className = ' my-3 flex shadow-lg mt-20 backdrop-blur-sm w-[75%] bg-white/10  p-5 rounded-lg shadow-black shadow-md ' >
          <div className='w-1/2 mt-5 px-2' >
            <div className='flex justify-between' >
              <div>
          <h1 className='text-lg font-bold' >{book.title}</h1>
          <h1 className='text-sm font-bold' >Review : {book.rating.rate}</h1>

              </div>
          <h1 className='text-lg font-bold' >${book.price}</h1>

            </div>
          <p>{book.description}</p>
          <div className='py-3' >
            <p className='font-bold' >category : {book.category}</p>
          </div>
          </div>
          <div className='w-1/2 flex justify-center items-center flex-col  ' >
          {/* <Image
            src={bookData.}
            alt = 'book'
            width={200}
            className = 'rounded-lg border shadow-md px-3 py-2'
            height = {200}
          /> */}
          <div className='mt-4 flex items-center  ' >
          <Image
            src={book.image}
            alt = 'book'
            width={100}
            height = {100}
            className = 'rounded-lg border shadow-md px-3 py-2'
          />
          </div>
          <div className='mt-4 flex items-center  ' >
            <button className='bg-green-500	 hover:bg-green-400 	flex items-center  justify-center  text-white  w-8 h-8 rounded-full  shadow-lg' >-   </button>
            <h1 className='text-white w-8 text-center ' >0</h1>
            <button className='bg-green-500	 hover:bg-green-400 	flex items-center  justify-center  text-white  w-8 h-8 rounded-full  shadow-lg' >+   </button>
          </div>
          <div className='mt-4' >
            <button className='bg-green-500	 hover:bg-green-400	flex items-center  justify-between  text-white px-4 py-2 rounded-lg  shadow-lg' >Shop Now   </button>
          </div>
          </div>
        </div>
       )
      })}
    </div>
     </>
  )
}

export default Cart