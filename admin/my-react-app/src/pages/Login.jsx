import React, { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [form, setForm] = useState({ email: '', password: '' });
  let {email,password}=form;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
    let res=await axios.post(`${backendUrl}/api/v1/user/adminLogin`,{email,password})
    console.log(res.data,'hiiiii')
    if(res.data.success){
      setToken(res.data.token)
      console.log(res.data.token,'jiiii')
    }
    else{
      toast.error(res.data.message);
    }
  }
  catch(err){
    console.log(err);
    toast.error("Wrong Password")

  }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
