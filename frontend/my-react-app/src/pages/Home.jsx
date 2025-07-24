import React from 'react'
import Hero from '../componets/Home/Hero.jsx'
import LatestCollections from '../componets/Home/LatestCollections'
import BestSeller from '../componets/Home/BestSeller.jsx'
import OurPolicy from '../componets/Home/OurPolicy.jsx'
import NewsLetter from '../componets/Home/NewsLetter.jsx'
const Home = () => {
  return (
    <div>
      <Hero/>
    <LatestCollections/>
    <BestSeller/>
    <OurPolicy/>
    <NewsLetter/>
    </div>
    
  )
}

export default Home