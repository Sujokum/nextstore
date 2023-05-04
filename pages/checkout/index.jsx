import React , { useState , useEffect} from 'react'
import { API , graphqlOperation } from 'aws-amplify';
import {createPaymentIntent , createOrder} from '../../src/graphql/mutations'
import {Authenticator} from '@aws-amplify/ui-react';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';


const index = () => {
  const { email } = useSelector((state) => state.user);
  
  const route =  useRouter()
  const {cartProduct } = useSelector((state)=>state.cart)
  const [fields ,  setFields] = useState({
    name : '',
    email: email,
    phone : '',  
    address : '',
    
  });
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
                        
                        
                        setClientSecret(response.data.createPaymentIntent.clientSecret)
                      }catch(err){
                        console.log('err' , err)
                      }
                      }

  useEffect(()=>{
    fetchPaymentIntent();
  },[])
  
  const checkOut = async (e)=>{
    e.preventDefault()
    const {name, email, phone, address} = fields;
    if(!name){
      toast.error('Please Fill The name field')
    }
    if(!email){
      toast.error('Please Fill The Email field')
    }
    if(!phone){
      toast.error('Please Fill The Phone field')
    }
    if(!address){
      toast.error('Please Fill The Address field')
    }
    const data = {
      name  : name,
      email : email ,
      phone : phone,
      address : address
    }
    await API.graphql({
      query: createOrder,
      variables: {input: data},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }).then(()=>{
      toast.success('Your Order Is Submited')
    })
    route.push(clientSecret);

      
  }
  



  const stripePromise = loadStripe('pk_test_51MtZ9NIIgSkSVy7j7dvljbDW65tkK3z022qcY8ZJT4Odu5eG336Jgx2P1nm5nK0h2JaY3Sn4FSYWXBsAPYSPTMpb00YwTcZ0mB');
  return (
            <div className='w-full h-screen flex pt-28 justify-center flex-col  items-center' >
        <Authenticator>

        <Elements stripe={stripePromise}  >

      
                  <div className="contact-form w-1/2  mt-5  " >
            <span className="heading">Order Now</span>

            
            <form onSubmit={checkOut} >
           
              <label htmlFor="name">User Name:</label>
              <input type="text"  name = 'name' onChange={(e)=>setFields({...fields , name : e.target.value })} value={fields.name}  />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" disabled  value={fields.email} />
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" onChange={(e)=>setFields({...fields , phone : e.target.value })} value={fields.phone}  />
              <label htmlFor="address">Address:</label>
              <textarea className = 'w-full'  id="address" onChange={(e)=>setFields({...fields , address : e.target.value })} value={fields.address} name="address" ></textarea>
              <button type="submit">CheckOut</button>
            </form>
          </div>

        </Elements >
       
    </Authenticator>
    </div>
       
  )
}

export default index