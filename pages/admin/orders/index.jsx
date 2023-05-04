import React , {useEffect, useState} from 'react'
import {listOrders} from '../../../src/graphql/queries';
import { API } from 'aws-amplify';
const index = () => {
const [orders , setOrders] = useState()

    const getOrders = async ()=>{
        const todos =   await API.graphql({
          query: listOrders
        })
        const res =  await todos.data.listOrders.items;
        setOrders(res)
       
      }
    

      useEffect(()=>{
        getOrders()
      } ,[])
    
  return (
    <section className=" w-full h-screen flex justify-center text-gray-600 body-font">
    <div className=" w-full  mt-20  py-24 ">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Pricing</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
      </div>
      <div className="lg:w-2/3 w-full mx-auto overflow-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider  text-gray-900 text-sm bg-gray-100 rounded-tl font-bold rounded-bl">Name</th>
              <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">Email</th>
              <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">phone</th>
              <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100">Address</th>
              <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100 ">Price</th>
              <th className="px-4 py-3 title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100 ">Payment</th>
            </tr>
          </thead>
          <tbody>
            {
                orders?.map((order)=>{
return(

    <tr key={order.id} >
              <td className="px-4 py-3 text-gray-100">{order.name}</td>
              <td className="px-4 py-3 text-gray-100">{order.email}</td>
              <td className="px-4 py-3 text-gray-100">{order.phone}</td>
              <td className="px-4 py-3 text-gray-100">{order.address}</td>
              <td className="px-4 py-3 text-gray-100">$200</td>
              <td className="px-4 py-3 text-gray-100">paid</td>
              
            </tr>
                )
                })
            }
           

          </tbody>
        </table>
      </div>
    
    </div>
  </section>
  )
}

export default index