import React from 'react'
import style from './Home.module.css'
import RecentProduct from './../RecentProduct/RecentProduct';
import Categories from '../Categories/Categories';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';


function Home() {


  return (<>
  <MainSlider/>
      <CategoriesSlider/>
      <RecentProduct/>
  </>

  )
}

export default Home