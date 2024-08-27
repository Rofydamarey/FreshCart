import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { jwtDecode } from 'jwt-decode'
import { CartContext } from '../../Context/CartContext'

function Allorders() {

  let {clearCartItem} = useContext(CartContext);
  useEffect(() => {
    clearCartItem();
  }, []);

  return (
  
    
      <>
          <h2 className="text-3xl text-center my-36 flex justify-center items-center">
      <i className="fa-solid fa-check font-bold text-white me-2 size-10 rounded-full bg-green-500 flex justify-center items-center"></i>{" "}
      Payment completed successfully
    </h2>
      </>
  
  )
}

export default Allorders