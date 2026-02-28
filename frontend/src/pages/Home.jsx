import React from 'react'
import Header from '../components/HomePageComponents/Header'
import SpecialityMenu from '../components/HomePageComponents/SpecialityMenu'
import TopDoctors from '../components/HomePageComponents/TopDoctors'
import FuturisticFeatures from '../components/HomePageComponents/FuturisticFeatures'
import Banner from '../components/HomePageComponents/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <FuturisticFeatures/>
      <Banner/>
    </div>
  )
}

export default Home
