import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';

function Login() {
  let {userLogin,setuserLogin}=useContext(UserContext)
  const navigate= useNavigate()
  const [ApiError, setApiError] = useState("")
  const [IsLoading, setIsLoading] = useState(false)

  // function validateRegister(values) {
  //   let errors={}

  //   if (!values.name) {
  //     errors.name='name is required'
  //   }else if (!/^[A-Z][a-z]{3}$/.test(values.name)){
  //   errors.name='not valid'
  //   }

  //   if (!values.phone) {
  //     errors.phone='phone is required'
  //   }else if (!/^01[0125][0-9]{8}$/.test(values.phone)){
  //   errors.phone='not valid'
  //   }
  //   return errors
  // }

  function handleLogin(values) {
  console.log(values);
  setIsLoading(true)

 axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
.then((res)=>{
  setIsLoading(false)
  if (res.data.message == "success") {
    localStorage.setItem("userToken",res.data.token)
    setuserLogin(res.data.token)
    navigate('/')
  }
  console.log(res)})
// setApiError(res.response.data.message)
.catch((res)=>{setApiError(res.response.data.message);
  setIsLoading(false)
})

}

let validationSchema=Yup.object().shape({
  email:Yup.string().email('is invalid').required("email is required"),
  password:Yup.string().matches(/^[A-Za-z0-0]{6,10}$/,'password should between 6,10 char').required('password is required'),

})

  let formik =useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:handleLogin
  })
  return (
    <>

<div className='my-4'>

{ApiError ?<div className='w-1/2 bg-red-500 text-center border rounded p-2 mx-auto text-white'>{ApiError}</div> :null}  
  <h1 className='font-bold text-center text-emerald-500 text-2xl mb-4'>Login Form</h1>
<form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
  <div className="left-0 relative z-0 w-full mb-4 group">


  <div className="left-0 relative z-0 w-full mb-4 group">
  <div className="relative z-0 w-full mb-4 group">
      <input type="email" name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-bottom border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Enter your email</label>
  </div>
  </div>
  {formik.errors.email && formik.touched.email ? 
  <div className='p-4 mb-2 text-sm text-red-600'>
    {formik.errors.email}
  </div>
  :null}




  <div className="left-0 relative z-0 w-full mb-4 group">
  <div className="relative z-0 w-full mb-4 group">
      <input type="password" name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-bottom border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Enter your password</label>
  </div>
  </div>
  {formik.errors.password && formik.touched.password ? 
  <div className='p-4 mb-2 text-sm text-red-600'>
    {formik.errors.password}
  </div>
  :null}


  <div className='text-center py-3'>
  <button type="submit" className="text-white me-3 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none
       focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600
        dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">

        {IsLoading ?<i className="fa-solid fa-spinner"></i>:"submit"}
        </button>
        <Link  to={'/Register'}><div className='text-main text-center py-2 '>Don't you have an account?Register </div> </Link>
  <Link className=" text-main fs-6 text-center py-2" to={"/forgetpassword"}>  forgot password </Link>

       
  </div >
  </div>

 </form>
</div>

    </>
   
  
  )
}

export default Login