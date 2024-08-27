import React, { useContext, useEffect } from 'react'
import style from './ProductDetails.module.css'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

function ProductDetails() {

  let { addProductToCard, addToWishList ,wishList ,setwishList ,getWishList } = useContext(CartContext);
  
  const [currentId, setcurrentId] = useState(0)
  const [loading, setloading] = useState(false)
  const [wishListIds, setwishListIds] = useState([])

  async function getWishListBridg(){
    let {data} = await getWishList()
    // console.log(data);
    if(data?.status === "success"){
      setwishList(data?.data)
      wishList?.forEach(element => {
        setwishListIds(prevArray => [...prevArray, element.id]);
      });
    }
  }
  useEffect(() => {
    getWishListBridg()
    
  }, [wishList , wishListIds])

  async function addToWL(id){
    let {data} =await addToWishList(id)
    // console.log(data);
    if (data?.status === "success") {
      toast.success(data?.message);
      getWishListBridg();

    } else {
      toast.error('something went wrong please refresh the page and try again', {
        duration: 4000,
        position: "top-right",
      });
      getWishListBridg();
    }
  }   async function addToCart(id) {
    setloading(true)
    setcurrentId(id)
   let response=await addProductToCard(id)
   console.log(response);
   if (response.data.status =="success") {
    toast.success(response.data.message)
    setloading(false)
   }else{
    toast.error(response.data.message)
    setloading(false)
  
   }
   
  }




  let {id,category}=useParams()
  const [product, setproduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000
  };

  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
setproduct(res.data.data)
    })
    .catch((res)=>{
      
    })
  }
  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
    let related=  res.data.data.filter((product)=>product.category.name ==category)
    setrelatedProducts(related)
          })
  }
  useEffect(() => {
    getProduct(id)
    getAllProducts()
  }, [id,category])
  return (
   <>
   <div className="row ">
    <div className="w-1/4 ">
    <Slider {...settings}>
{product?.images.map((src)=> <img src={src} className='w-full'/>)}
    </Slider>
    </div>
    <div className="w-3/4 py-9">
    <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
    <h4 className='text-gray-700 my-4'>{product?.description}</h4>
    <h4 className=''>{product?.category.name}</h4>
    <div className='flex justify-between p-3 my-3'>
       <span>{product?.price} EGP</span>
         <span>{product?.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
         </div>
        <span>
        
        <button     onClick={()=>addToWL(product.id , product)} className='  w-100 text-black' >
                        {loading && currentId==product.id ? <i className='fas fa-spinner fa-spin'></i>:<i className='fa fa-heart fa-2x float-end '></i>}
                          </button>
        </span>
        <button onClick={()=>addToCart(product.id)} className='btn hover:bg-emerald-600 w-100 text-white' >
                        {loading && currentId==product.id ? <i className='fas fa-spinner fa-spin'></i>:("Add +")}
                          </button>

    </div>
    

   </div>

   <div className='row  relative'>
        { relatedProducts.length >0 ?
            relatedProducts.map((product) => (
                <div key={product.id} className='sm:w-1/3 md:w-1/4 px-8 py-3 '>
                   <div className="product p-4 my-3 hover:shadow-green-500 " >
                   <NavLink to={`/productdetails/${product.id}/${product.category.name}`}>

                        <img src={product.imageCover} className='w-full' alt="" />
                        <div className="inner text-center">
                            <h3 className=' text-green-600 font-semibold font-sans'>{product.category.name}</h3>
                            <h3 className='mb-2 font-sans font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                          <div className='flex justify-between p-3'>
                          <span>{product.price} EGP</span>
                          <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
                          </div>
                          </div>
                   </NavLink>

              
                   <button style={{ color: wishListIds?.includes(product.id) ? 'red' : 'black' }}
                  onClick={()=>addToWL(product.id , product)} className={ `heart-btn w-25 m-0 float-end  `}>
                    <i  className="fa-solid fa-heart m-0 text-2xl   "></i>
                </button>
                   <button onClick={()=>addToCart(product.id)} className='btn hover:bg-emerald-600 text-white' >
                   {loading && currentId==product.id ? <i className='fas fa-spinner fa-spin'></i>:("Add +")}
                     </button>

                    </div>
                </div>
            ))
            : 
                <div className="spinner"></div>
           

        }
    </div>
   </>
  )
}

export default ProductDetails