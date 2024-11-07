import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import Latestjobs from "./Latestjobs"
const Home = () => {
  
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <Latestjobs/>
    </div>
  )
}

export default Home