import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import assets from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router';

const SearchBar = () => {
    const {searchQuery,setSearchQuery,showSearch,setShowSearch} = useContext(ShopContext);
    const location=useLocation();
    const [visible, setvisible] = useState(false)
    useEffect(()=>{
     if(location.pathname === '/collection'){
        setvisible(true);
     }
     else{
        setvisible(false)
     }
    },[location])
  return showSearch &&visible? (
    <div className='border-t border-b bg-gray-50 text-center mb-2'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-4 rounded-full w-3/4 sm:w-1/2  '>
            <input
            placeholder='Search for products...'
            className='flex-1 outline-none text-sm sm:text-base bg-inherit' 
            type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} id="" 
            />
            <img className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img className='inline ml-1 w-3 cursor-pointer' onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" />
    </div>
  ):null
}

export default SearchBar