import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { ThreeDots } from 'react-loader-spinner';


function Products() {
  let { addProductToCard, addToWishList ,wishList ,setwishList ,getWishList } = useContext(CartContext);


  const [currentId, setcurrentId] = useState(0)
  const [loading, setloading] = useState(false)
  const [wishListIds, setwishListIds] = useState([])
  const [filterText, setfilterText] = useState('')

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
  }


   async function addToCart(id) {
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
  function getProducts() {
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   }
 let { data ,isError ,error,isLoading } =useQuery({
   queryKey:['recentProduct'],
   queryFn:getProducts
 })
 
 if (isError) {
   return <h3>{error.message}</h3>
 }
 if (isLoading) {
   return <div className="spinner"></div>
 }
 
 //   const [products, setproducts] = useState([])
 // function getProducts() {
 //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
 //   .then((res)=>{
     
 //   setproducts(res.data.data)
 //   })
 //   .catch((res)=>{})
 // }
 // useEffect(() => {
 // getProducts()
 // }, [])
 return (        <>

<div className='row grid place-content-center relative'>

<form >
        <div className="text-center  mx-auto my-5 d-flex align-items-center m-10">
          <input type="search" className="form-control w-full rounded "
            placeholder="search... "
            value={filterText}
            onChange={(e)=>setfilterText(e.target.value)}
          />
        </div>
      </form>
    {data?.data?.data.map((product) => {
       if (
        product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1
      ) {
        return;
      }
           return(
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
           )
})  

    }
</div>
</>
)
}

export default Products