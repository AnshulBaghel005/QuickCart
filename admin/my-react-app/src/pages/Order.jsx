import React, { useEffect, useState } from 'react';
import { backendUrl } from "../App";
import img from "../assets/admin_assets/parcel_icon.svg";
import axios from 'axios';
import { toast } from 'react-toastify';
import { use } from 'react';

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  if (!token) return null;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setOrders(res.data.orders || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching products");
    }
  };
  const statusHandler=async(orderId,status)=>{
    try{
      const res=await axios.post(`${backendUrl}/api/v1/order/update-status`,{orderId,status},{
        headers:{Authorization:`Bearer ${token}`}
      })
      if(res.data.success){
        console.log(res.data)
        toast.success(res.data.message)
       await  fetchOrders()
      }else{
        toast.error(res.data.message)
      }
    }catch(err){
      console.log(err)
      toast.error("Error in updating order status")
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []);

 

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Orders</h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 hover:shadow-lg transition"
          >
            {/* Parcel Icon */}
            <div className="flex items-center gap-3">
              <img src={img} alt="Parcel" className="w-10 h-10" />
              <p className="text-lg font-semibold text-gray-700">
                Order #{index + 1}
              </p>
            </div>

            {/* Items */}
            <div className="border-t border-gray-200 pt-3">
              {order.items.map((item, idx) => (
                <p
                  key={idx}
                  className="text-sm text-gray-600 flex justify-between"
                >
                  <span>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-400">({item.size})</span>
                  </span>
                </p>
              ))}
            </div>

            {/* Customer Info */}
            <div className="text-sm text-gray-700">
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.pincode}
              </p>
            </div>

            {/* Order Details */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                <span
                  className={`font-semibold ${
                    order.paymentStatus ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.paymentStatus ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="text-lg font-semibold text-gray-800">
              Amount: ₹{order.amount}
            </p>

            {/* Status Dropdown */}
            <select
              className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              defaultValue="Order Placed"
              onChange={(e) => statusHandler(order._id, e.target.value)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
