import React from 'react'
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Title from '../componets/Title';
const Order = () => {
  const {backend_url,token,currency}=useContext(ShopContext)
  const [orderData,setOrderData]=useState([])
    
  const loadUserData=async()=>{
    try{
      if(!token) return null
      const res=await axios.post(`${backend_url}/api/v1/order/userorders`,{},
       {
        headers:{ 
          Authorization:`Bearer ${token}`
        }
      })
       console.log(res.data.orders,'user orders')
      if(res.data.success){
        let allOrdersItem=[];
        let data=res.data.orders
        data.map((order)=>{
          order.items.map((item)=>{
          item['status']=order.status
          item['date']=order.date
          item['paymentMethod']=order.paymentMethod
          item['paymentStatus']=order.paymentStatus

          allOrdersItem.push(item)
        }
      )
        })
        console.log(allOrdersItem,'All orders item')
        setOrderData(allOrdersItem.reverse())
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    loadUserData()
  },[token,orderData])
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 border-b pb-2">
        <Title text1={'MY'} text2={"Order"}/>
      </h1>

      {orderData.length > 0 ? (
        orderData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-4"
          >
            {/* Product Info */}
            <div className="flex gap-4 items-center">
              <img
                src={item.image[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {currency}
                  {item.price} &nbsp; Quantity: {item.quantity} &nbsp; Size:{" "}
                  {item.size}
                </p>
                <p className="text-sm text-gray-500">Date: {item.date}</p>
              </div>
            </div>

            {/* Status + Button */}
            <div className="flex flex-col items-end gap-2">
              <p className="flex items-center text-green-600 text-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                {item.status}
              </p>
              <button className="px-4 py-1 border rounded-lg text-sm hover:bg-gray-100">
                Track Order
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default Order
