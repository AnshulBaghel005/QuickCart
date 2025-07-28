import React, { useContext, useState } from 'react'
import assets from "../../assets/frontend_assets/assets.js";
import { NavLink } from 'react-router'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext.jsx';
const Navbar = () => {
  const [visible, setvisible] = useState(false)
  const {setShowSearch, getCartCount} = useContext(ShopContext)
  return (
    <div className='flex justify-between items-center py-5 font-medium'>
        <Link to='/'>
         <img 
        className='w-36'
        src={assets.logo} alt="" 
        />
        </Link>
        
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
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer'alt="" />
            <div className='group relative'>
              <img className='w-5 cursor-pointer'src={assets.profile_icon} alt="" />
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
               src={assets.cart_icon} alt="" />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </NavLink>
            <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden ' alt="" />
        </div>
        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden  bg-white transition-all ${visible ? 'w-full' :'w-0'}`}>
          <div className='flex flex-col text-gray-700'>
            <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
              <p className='font-medium'>Back</p>
            </div>
            {
              menu.map((item,index)=>{
                return(
                  <NavLink 
                  onClick={()=>setvisible(false)}
                  className='py-2 pl-6 border uppercase font-medium'
                  key={index} to={item.path}>{item.name}</NavLink>
                )
              })
            }
          </div>
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