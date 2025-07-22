import React from 'react'
import logo from '../../assets/frontend_assets/logo.png'
import search_icon from '../../assets/frontend_assets/search_icon.png'
import profile_icon from '../../assets/frontend_assets/profile_icon.png'
import cart_icon from '../../assets/frontend_assets/cart_icon.png'

import { NavLink } from 'react-router'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-5 font-medium'>
        <img 
        className='w-36'
        src={logo} alt="" 
        />
        <div className='hidden sm:flex gap-5 text-sm text-gray-700'>
          {
          menu.map((item,index)=>{
            return(
              <NavLink to={item.path} key={index} className='flex flex-col  items-center gap-1 uppercase' >
                <div>{item.name}</div>
                <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
        
              </NavLink>
            )
          })
        }
        </div>
        <div className='flex items-center gap-6'>
            <img src={search_icon} className='w-5 cursor-pointer'alt="" />
            <div className='group relative'>
              <img className='w-5 cursor-pointer'src={profile_icon} alt="" />
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 text-gray-700'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded-md  cursor-pointer'>
                    <p className='hover:text-black transition ease-in'>My Profile</p>
                    <p className='hover:text-black transition ease-in'>Orders</p>
                    <p className='hover:text-black transition ease-in'>Logout</p>
                </div>
                
              </div>
            </div>
            <NavLink to='/cart' className='relative'>
               <img 
               className='w-5 cursor-pointer'
               src={cart_icon} alt="" />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
            </NavLink>
        </div>
        

    </div>
  )
}
//
const menu=[{
  name: "Home",
  path:'/'
},
{
  name: "Collection",
  path:'/collection'
},  
{
  name: "About",
  path:'/about'
},
{
  name: "Contact",
  path:'/contact',
},
]

export default Navbar