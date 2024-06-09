import React from 'react'
import Banner from '../../components/Banner'
import Cateories from './Cateories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import Services from './Services'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Cateories/>
      <SpecialDishes/>
      <Testimonials/>
      <Services/>
    </div>
  )
}

export default Home