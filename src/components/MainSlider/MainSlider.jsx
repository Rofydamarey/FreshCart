import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import slide1 from './../../assets/slide1.jpg'
import slide2 from './../../assets/slide2.jpg'
import slide3 from './../../assets/slide3.jpg'
import slide4 from './../../assets/slide4.jpg'
import slide5 from './../../assets/slide5.jpg'




function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
    <div className="row justify-content-center align-items-center mb-8">
      <div className="w-1/4">
      <Slider {...settings}>
      <img src={slide4} className='w-52 h-[150]' alt="" />
      <img src={slide5} className='w-52 h-[150]' alt="" />
      <img src={slide3} className='w-52 h-[150]' alt="" />
        
        </Slider> 
      
      </div>

      <div className="w-1/4">
      <img src={slide1} className='w-80 h-[300]' alt="" />
      <img src={slide2} className='w-80 h-[300]' alt="" />

      </div>
    </div>
  
    
 
    </>
  )
}

export default MainSlider