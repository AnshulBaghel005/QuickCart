import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddProduct from './pages/AddProduct'
import List from './pages/List'
import Order from './pages/Order'

export const backendUrl=import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
  useEffect(()=>{
    localStorage.setItem('token',token)
  })
  return (
    <div className='bg-gray-50 min-h-screen'>
      
      {token===""
      ? <Login setToken={setToken}/>
      : <>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] max-auto ml-[max(5vw,25px) my-8 text-gray-600 text-base'>
        <Routes>
        <Route path='/add' element={<AddProduct token={token}/>}/>
        <Route path='/list' element={<List token={token}/>}/>
        <Route path='orders' element={<Order token={token}/>}/>

      </Routes>
        </div>
      </div>
      </>
     
}

    
</div>
  )
}

export default App