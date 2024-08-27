import React from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';

function Layout() {
  return <>
  <Navbar/>
  <div className="container mx-auto py-16 p-5 md:py-8">
  <Outlet/>

  </div>

  <Footer/>
  </>
}

export default Layout