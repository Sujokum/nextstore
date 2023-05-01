import React , { useState , useEffect} from 'react'
import { API , graphqlOperation } from 'aws-amplify';
import {createPaymentIntent} from '../../src/graphql/mutations'
import {Authenticator} from '@aws-amplify/ui-react';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';


const index = () => {
  const route =  useRouter()
  const {cartProduct , totalPrice , totalQuantity} = useSelector((state)=>state.cart)
  // const {redirectToCheckout} = useStripe();
  // console.log(cartProduct);
  // const [fields ,  setFields] = useState({
  //   name : '',
  //   email: '',
  //   phone : '',  
  //   address : '',
    
  // });
  const [clientSecret , setClientSecret] = useState('');
 
         const fetchPaymentIntent = async ()=>{
         try{
          const cartData = {
            items : cartProduct
          }
          // const cartItem = JSON.stringify(cartData);
                    const response = await API.graphql(
                          graphqlOperation(createPaymentIntent, {input : cartData}),
                        );
                        
                        // console.log('response' , response.data.createPaymentIntent)
                        setClientSecret(response.data.createPaymentIntent.clientSecret)
                      }catch(err){
                        console.log('err' , err)
                      }
                      }

  useEffect(()=>{
    fetchPaymentIntent()
  },[])
  
  const checkOut = async (e)=>{
    e.preventDefault()
    // const {name, email, phone, address} = fields;
    // if(!name){
    //   toast.error('Please Fill The name field')
    // }
    // if(!email){
    //   toast.error('Please Fill The name field')
    // }
    // if(!phone){
    //   toast.error('Please Fill The name field')
    // }
    // if(!address){
    //   toast.error('Please Fill The name field')
    // }

    // await API.graphql({
    //   query: createBook,
    //   variables: {input: addBook},
    //   authMode: 'AMAZON_COGNITO_USER_POOLS'
    // })
    route.push(clientSecret);
      
  }
  



  const stripePromise = loadStripe('pk_test_51MtZ9NIIgSkSVy7j7dvljbDW65tkK3z022qcY8ZJT4Odu5eG336Jgx2P1nm5nK0h2JaY3Sn4FSYWXBsAPYSPTMpb00YwTcZ0mB');
  return (
            <div className='w-full h-screen flex pt-28 justify-center flex-col  items-center' >
        <Authenticator>

        <Elements stripe={stripePromise}  >

      
                  <div className="contact-form w-1/2  mt-5  " >
            <span className="heading">Order Now</span>

            
            <form>
           
              <label htmlFor="name">User Name:</label>
              <input type="text"  name = 'name'   />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"   />
              <label htmlFor="phone">Phone:</label>
              <input type="email" id="phone" name="phone" />
              <label htmlFor="address">Address:</label>
              <textarea className = 'w-full'  id="address"  name="address" ></textarea>
              <button onClick = {checkOut} type="submit">CheckOut</button>
            </form>
          </div>

        </Elements >
       
    </Authenticator>
    </div>
       
  )
}

export default index