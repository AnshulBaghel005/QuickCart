<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const { backend_url, setToken,navigate } = useContext(ShopContext);

  // handle input change
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (currState === "Login") {
        const { email, password } = formData;
        res = await axios.post(`${backend_url}/api/v1/user/login`, {
          email,
          password,
        });
         if (res.data.success) {
          console.log(res.data)
        toast.success(res.data.message);
        setToken(res.data.token); // save token in context
        localStorage.setItem("token", res.data.token); // persist in localStorage
        setFormData({ name: "", email: "", password: "" }); // reset form data
        navigate("/"); // redirect to home page
      } 
      else{
          toast.error(res.data.message);
        }
      }
      // Sign Up
       else {
        const { name, email, password } = formData;
        res = await axios.post(`${backend_url}/api/v1/user/register`, {
          name,
          email,
          password,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setCurrState("Login"); // switch to login state after successful registration
          setFormData({ name: "", email: "", password: "" }); // reset form data
          navigate("/login"); // redirect to login page
        } else {
          toast.error(res.data.message);
        }
       console.log(res.data)
      }

     
    } catch (err) {
      console.log("Server Error:", err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center px-4 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {currState === "Login" ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmitHandler}>
          {currState === "Sign Up" && (
            <motion.input
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              required
            />
          )}

          <motion.input
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={onChangeHandler}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <motion.input
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
          >
            {currState === "Login" ? "Login" : "Sign Up"}
          </motion.button>
           <p className="text-center text-gray-600 mt-6">
          {currState === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() =>{
              setCurrState(currState === "Login" ? "Sign Up" : "Login")
            }
            }
            className="text-red-500 font-semibold hover:underline"
          >
            {currState === "Login" ? "Sign Up" : "Login"}
          </button>
        </p>
        </form>

        {/* Toggle */}
       
      </motion.div>
    </div>
  );
};

export default Login;
=======
import React from 'react'

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c
