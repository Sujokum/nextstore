import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { add } from '@/redux/reducers/CartSlice';
function BookItem(){
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookData, setBookData] = useState();

  const handleCart = ()=>{
      const data = {...bookData , quantity : 1}
      dispatch(add(data))
  }
const handleContinueShopping = ()=>{
  router.push('/books')
}
  async function fetchData() {
    try{
      const id = router.query.book
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await res.json();
      console.log(data)
      setBookData(data);
  }catch(err){
    console.log(err)
  }
  }

  useEffect(() => {
    fetchData();
  }, [router.query.book]);

  return (
    <div  style={{backgroundImage : 'url("/assests/productBack.jpg")'}}  className = 'flex justify-center bg-cover bg-center items-center w-full h-screen px-20' >
      {bookData ? (
        <div className = ' flex shadow-lg border backdrop-blur-md bg-white/25  p-5 rounded-lg ' >
          <div className='w-1/2 px-2' >
            <div className='flex justify-between' >
              <div>
          <h1 className='text-lg font-bold' >{bookData.title}</h1>
          <h1 className='text-sm font-bold' >Review : {bookData.rating.rate}</h1>

              </div>
          <h1 className='text-lg font-bold' >${bookData.price}</h1>

            </div>
          <p>{bookData.description}</p>
          <div className='py-3' >
            <p className='font-bold' >category : {bookData.category}</p>
          </div>
          </div>
          <div className='w-1/2 flex justify-center items-center flex-col  ' >
          <Image
            src={bookData.image}
            alt = 'book'
            width={200}
            className = 'rounded-lg border shadow-md px-3 py-2'
            height = {200}
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