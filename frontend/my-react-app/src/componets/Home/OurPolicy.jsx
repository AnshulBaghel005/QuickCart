import React from 'react'
import PolicyCard from '../PolicyCard'
import assets from "../../assets/frontend_assets/assets.js";
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 bg-'>
        <PolicyCard img={assets.exchange_icon} text1='Easy Exchaange Policy' text2='We offer hassle free exchage policy'/>
        <PolicyCard img={assets.quality_icon} text1='7 Days Return Policy' text2='We provide 7 days free return policy'/>
        <PolicyCard img={assets.support_img} text1='Best customer support' text2='We provide 24/7 customer support'/>

    </div>
  )
}

export default OurPolicy