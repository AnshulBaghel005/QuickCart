import React from 'react'

const NewsLetter = () => {
    const onSumbitHandler = (e) => {
        e.preventDefault();
        // Handle subscription logic here
    };
  return (
    <div className='text-center'>
        <h2 className='font-medium text-2xl text-gray-800'>Subscribe now & get 20% off</h2>
        <p className='text-gray-400  mt-3'>some text</p>
        <form onSubmit={onSumbitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-10 border pl-3' >
            <input
            className='w-full  sm:flex-1 outline-none'
            placeholder='Enter your email'
             type="email" name=""
             required 
            />
            <button  className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter