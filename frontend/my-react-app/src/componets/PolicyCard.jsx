import React from 'react'

const PolicyCard = ({img,text1,text2}) => {
  return (
    <div className='bg-gray-100 p-2 rounded-sm'>
        <img 
        className='w-12 m-auto mb-5'
        src={img} alt="" 
        />
        <p className='font-semibold'>{text1}</p>
        <p className='text-gray-400'>{text2}</p>
    </div>
  )
}

export default PolicyCard