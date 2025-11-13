import React, { useContext, useState } from "react";
import Title from "../componets/Title";
import CartTotal from "../componets/Cart/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder=()=> {
  const {navigate,backend_url,token,cartItems,setcartItems,delivery_fee,getCartAmount,products}=useContext(ShopContext)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
    paymentMethod: "",
  });


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
    try{
      let orderItems=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find((product)=>product._id==items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }

      
    }
  }
  let orderData={
    address:formData,
    items:orderItems,
    amount:getCartAmount()+delivery_fee,
  }
  if(formData.paymentMethod==="cod"){
    orderData.paymentMethod="cod"
    console.log(orderData)
    const res=await axios.post(`${backend_url}/api/v1/order/place`,orderData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(res.data.success){
      setcartItems({});
      toast.success("Order Placed Successfully")
      navigate("/order")
    }
    else{
      toast.error(res.data.message)
    }
  }
}catch(err){  
  console.log(err)
  console.log('err found')
}

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-20 p-4"
    >
      {/* Delivery Information */}
      <div>
        <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
          required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
          required
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="pincode"
            placeholder="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
          required
        />
      </div>

      {/* Cart Totals + Payment Method */}
      <div>
       <div>
        <CartTotal/>
       </div>

        {/* Payment Method */}
        <h2 className="text-lg font-bold mb-2">Payment Method</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              onChange={handleChange}
              required
            />
            Stripe
          </label>
          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              name="paymentMethod"
              value="razorpay"
              onChange={handleChange}
            />
            Razorpay
          </label>
          <label className="flex items-center gap-2 border p-2 rounded">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}

export default PlaceOrder;
