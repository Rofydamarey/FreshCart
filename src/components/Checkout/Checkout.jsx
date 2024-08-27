import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import {  Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext';


export default  function Checkout() {
let{checkout ,cartId}=useContext(CartContext)
  const [ApiError, setApiError] = useState("")

  let validationSchema=Yup.object().shape({
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/ ,'invalid number').required('phone is required'),
  
  })

let formik =useFormik({
  initialValues:{
    details:"",
    phone:"",
    city:"",

  },
  validationSchema,
  onSubmit:()=>handleCheckout(cartId,`http://localhost:5173`)
});

async  function handleCheckout(cardId , url) {
  let{data}=await checkout(cardId,url ,formik.values)
  console.log(data);

  console.log(data.session.url);
window.location.href=data.session.url
  }
 return (
    <>

<div className='my-4'>
{ApiError ?<div className='w-1/2 bg-red-500 text-center border rounded p-2 mx-auto text-white'>{ApiError}</div> :null}  

  <h1 className='font-bold text-center text-emerald-500 text-2xl mb-4'>Check Out Now</h1>
<form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
  <div className="left-0 relative z-0 w-full mb-4 group">


  <div className="left-0 relative z-0 w-full mb-4 group">
  <div className="relative z-0 w-full mb-4 group">
      <input type="text" name="details"
      value={formik.values.details}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-bottom border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Enter your details</label>
  </div>
  </div>

  <div className="left-0 relative z-0 w-full mb-4 group">
  <div className="relative z-0 w-full mb-4 group">
      <input type="tel" name="phone"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-bottom border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Enter your phone</label>
  </div>
  </div>
  {formik.errors.phone && formik.touched.phone ? 
  <div className='p-4 mb-2 text-sm text-red-600'>
    {formik.errors.phone}
  </div>
  :null}
 

  <div className="left-0 relative z-0 w-full mb-4 group">
  <div className="relative z-0 w-full mb-4 group">
      <input type="text" name="city"
      value={formik.values.city}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-bottom border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Enter your city</label>
  </div>
  </div>

  <div>
  <button type="submit" className="text-white me-3 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none
       focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600
        dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> CheckOut

        </button>
  </div>

  </div>

 </form>
</div>

    </>
   
  
  )
}

