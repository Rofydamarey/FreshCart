import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";


function CategoriesSlider() {
  const [categories, setcategories] = useState([])
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 2,
    };
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      console.log(res.data.data);
      
setcategories(res.data.data)
    })
  }
  useEffect(() => {
getCategories()  
  }, [])
  return (
    <>
      <Slider {...settings}>
        {categories.map((category)=> <div>
          <img src={category.image} className='w-full h-[250px]  object-cover' alt="" />
          <h4 className='font-semibold'>{category.name}</h4>
        </div>)}
      </Slider>
    </>
  )
}

export default CategoriesSlider