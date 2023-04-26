import React from 'react'
import { useRouter } from 'next/router'
import { useSelector , useDispatch } from 'react-redux'
import { remove , incrementCartItem , decrementCartItem , getCartTotal  } from '@/redux/reducers/cartSlice';
const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const {cartProduct , totalPrice , totalQuantity} = useSelector((state)=>state.cart)
  console.log(cartProduct)
  dispatch(getCartTotal())


  const handleContinueShopping = ()=>{
    router.push('/books')
  }

  const handleCheckOut = ()=>{
    router.push("/checkout")
  }

const increment = (id)=>{
  console.log(id)
  dispatch(incrementCartItem(id))
}
const decrement = (id)=>{
    dispatch(decrementCartItem(id));
}
  const removeItem = (id)=>{
    dispatch(remove(id))
  }




    if(cartProduct?.length === 0 ){
      return(
        <div className='w-full h-screen flex flex-col  justify-center items-center' >
          <h1 className="w-1/3 font-bold text-center py-4 text-3xl "  >
              You Have No Items In Cart
          </h1>
          <button onClick={handleContinueShopping}  className='bg-green-500  ml-5	 hover:bg-green-400	flex items-center  justify-center w-48  text-white px-4 py-2 rounded-lg  shadow-lg' >Continue Shopping  </button>
        </div>
      )
    }


  return (
    <>
      <div    className = 'flex flex-col pt-20  bg-cart-img justify-center bg-[100%] bg-center items-center w-full min-h-screen px-20' >
      <div className='w-full bg-white/10 py-3 shadow-lg rounded-xl backdrop-blur-lg border border-slate-400 flex justify-between mt-20 items-start' >
      <button onClick={handleContinueShopping}  className='bg-green-500  ml-5	 hover:bg-green-400	flex items-center  justify-center w-48  text-white px-4 py-2 rounded-lg  shadow-lg' >Continue Shopping  </button>
        <div className='text-white font-bold flex w-1/3 justify-evenly ' >
          <div>
          <h1>Total Items : {totalQuantity} </h1>
          <h1>Total Amount : {totalPrice} </h1>
          </div>
          <div>

      <button onClick={handleCheckOut}  className='bg-sky-500 	 hover:bg-sky-400	flex items-center  justify-center w-48  text-white px-4 py-2 rounded-lg  shadow-lg' >Check Out  </button>
      <button onClick={handleContinueShopping}  className='bg-red-500 	 hover:bg-red-400	flex items-center  justify-center w-48 mt-5  text-white px-4 py-2 rounded-lg  shadow-lg' >Clear All  </button>
          </div>

        </div>
      </div>

       {cartProduct?.map((book)=>{
        return(

       
        <div key = {book.id} className = ' my-3 flex shadow-lg mt-20 backdrop-blur-sm w-[75%] bg-white/10  p-5 rounded-lg border border-slate-400 ' >
          <div className='w-1/2 mt-5 px-2' >
            <div className='flex justify-between' >
              <div>
          <h1 className='text-lg font-bold' >{book.title}</h1>
          <h1 className='text-sm font-bold' >Review : 5</h1>

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
          <img
            src={book.bookImage}
            alt = 'book'
            className = 'rounded-lg h-36 w-auto border shadow-md px-3 py-2'
          />
          </div>
          <div className='mt-4 flex items-center  ' >
            <button onClick = {()=>decrement(book.id)} className='bg-green-500	 hover:bg-green-400 	flex items-center  justify-center  text-white  w-8 h-8 rounded-full  shadow-lg' >-   </button>
            <h1 className='text-white w-8 text-center ' >{book.quantity}</h1>
            <button onClick = {()=>increment(book.id)} className='bg-green-500	 hover:bg-green-400 	flex items-center  justify-center  text-white  w-8 h-8 rounded-full  shadow-lg' >+   </button>
          </div>
          <div className='mt-4' >
            <button onClick={()=>removeItem(book.id)}  className='bg-red-500	 hover:bg-red-400	flex items-center  justify-between  text-white px-4 py-2 rounded-lg  shadow-lg' >Remove Item   </button>
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