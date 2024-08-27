import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { NavLink, useNavigate} from 'react-router-dom'
import logo from './../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

function Navbar() {
  let{userLogin,setuserLogin}=useContext(UserContext)
  let navigate= useNavigate()

let{numberItems}=useContext(CartContext)
function signOut() {
  localStorage.removeItem("userToken");
  setuserLogin(null)
  navigate("/Login")
}

  return (
    <>
<nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
 <img src={logo} alt="" />
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <ul className="flex  p-4 md:p-0  font-medium  md:space-x-2 rtl:space-x-reverse md:flex-row ">
<NavLink to={'/Cart'}>
<div   className="nav-link ng-star-inserted position-relative" href="/Ecommerce/cart">
      <i  className="fa-solid fa-cart-shopping fs-3 "></i>
      <div  className="badge position-absolute text-white bg-emerald-700 bottom-5 end-0 bg-main">{numberItems}</div></div>
</NavLink>
     
     
    </ul>


<ul className='flex p-4 md:p-0 '>

{userLogin !=null ?( <li>
        <span onClick={signOut}  className="block cursor-pointer  px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0" >SignOut</span>
      </li>):
      (
        <>
        <li className='ps-3'>
        <NavLink to="login" className="block   text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0">LogIn</NavLink>
      </li>
      <li>
        <NavLink to="register" className="block  px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0">Register</NavLink>
      </li>
        </>
      )}  
</ul>
      <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
 {userLogin != null ?(
     <ul className="flex flex-col font-medium  md:p-0   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
     <li>
       <NavLink to="" className="block py-2  md:p-0  bg-green-500 rounded md:bg-transparent md:text-green-500" aria-current="page">Home</NavLink>
     </li>
     <li>
       <NavLink to="cart" className="block py-2  md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
     </li>
     <li>
       <NavLink to="wishlist" className="block py-2  md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">WishList</NavLink>
     </li>
     <li>
       <NavLink to="categories" className="block py-2  md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
     </li>
     <li>
       <NavLink to="products" className="block py-2  md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
     </li>
     <li>
     <NavLink to="brand" className="block py-2  md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>

     </li>
   </ul>
 ):
 null
 }
  </div>
  </div>
</nav>

</>


  )
}

export default Navbar