import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import assets from '../assets/frontend_assets/assets'
import Title from '../componets/Title'
import ProductItems from '../componets/ProductItems'
import ReleatedProducts from '../componets/ReleatedProducts'

const Collections = () => {
  const {products,searchQuery,showSearch} =useContext(ShopContext)
  const [showFilter, setshowFilter] = useState(false)
  const [filterProducts, setfilterProducts] = useState([])
  const [category,setCategory]=useState([]);
  const [SubCategory,setSubCategory]=useState([]);
  const [sortType, setSortType] = useState('relevent');
  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(category.filter(item => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }

  }
  const toggleSubCatergory = (e) => {
    if(SubCategory.includes(e.target.value)){
      setSubCategory(SubCategory.filter(item => item !== e.target.value));
    } else {
      setSubCategory([...SubCategory, e.target.value]);
    }

  }
  const applyFilters = () => {
    let productCopy=products.slice();
    if(showSearch && searchQuery){
     productCopy=productCopy.filter((item)=>{
      return item.name.toLowerCase().includes(searchQuery.toLowerCase())  })
     }
  

    if(category.length > 0){
      productCopy=productCopy.filter((item)=>{
        return category.includes(item.category)  
      })
    }
    if(SubCategory.length > 0){
      productCopy=productCopy.filter((item)=>{
        return SubCategory.includes(item.subCategory) 
      })
    }
    setfilterProducts(productCopy);
  }
  useEffect(() => {
    applyFilters();
<<<<<<< HEAD
  }, [category,SubCategory,searchQuery,showSearch,products]);
=======
  }, [category,SubCategory,searchQuery,showSearch]);
>>>>>>> e57e1f7a60ef4ad85852c94bdcb2ab7df71c630c

  const sortProducts=()=>{
    let productsCopy=products.slice();

    if(sortType === 'low-high'){
     setfilterProducts( productsCopy.sort((a, b) => a.price - b.price));
    }
    else if(sortType === 'high-low'){
      setfilterProducts(productsCopy.sort((a, b) => b.price - a.price));
    } else {
      applyFilters();
    }
  }
  useEffect(()=>{
    sortProducts()
  },[sortType]);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 '>
       {/* Filter options */}
       <div className='min-w-60'>
        <h2 onClick={()=>setshowFilter(!showFilter)} className='my-2 uppercase text-xl flex items-center cursor-pointer sm:cursor-default gap-2  '>Filters
        <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''} `} src={assets.dropdown_icon} alt="" />
        </h2>
        {/* Categories Filters */}
        <div className={`border border-gray-300 pl-5 pr-20 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'}  onClick={toggleCategory} /> Men
             </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onClick={toggleCategory} /> Women
             </p>
              <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'}  onClick={toggleCategory}/> Kid
             </p>
          </div>
        </div>
        {/* SubCategories */}
        <div className={`border border-gray-300 pl-5 pr-20 py-3 my-5 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>Types</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'}  onClick={toggleSubCatergory}/> Topwear
             </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onClick={toggleSubCatergory} /> Bottomwear
             </p>
              <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onClick={toggleSubCatergory} /> Winterwear
             </p>
          </div>
        </div>
       </div>
       {/* right side */}
       <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'ALL'} text2={"COLLECTIONS"}/>
        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 rounded-md px-2 text-sm sm:text-base'> 
          <option  value="relavent">Sort by: Relevent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
        </div>
        {/* map products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-6'>
            {
              filterProducts.map((item,index)=>(
                <ProductItems key={index} product={item}/>
              ))
            }
        </div>
       </div>
    </div>
  )
}

export default Collections