import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext= createContext()
export default function CartContextProvider(props) {
    let headers={
        token:localStorage.getItem("userToken")
    }
    const [cartId, setcartId] = useState(0)
    const [numberItems, setnumberItems] = useState(0)
  const [wishList, setwishList] = useState(null)


function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
          headers,
        })
          .then((res) => res)
          .catch((err) => err);
        }
function addProductToCard(productId) {
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            productId:productId,
        },
        {
            headers,
        }
    )
    .then((res)=> res)
    .catch((err)=>err)
}

function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers,}
    ) .then((res)=> {
        setnumberItems(res.data.numOfCartItems)
        console.log(res);
        setcartId(res.data.data._id)
        return res
    })
    .catch((err)=>err)
}

function updateCardProductQuantity(productId,newCount) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount}, {headers,}
    ) .then((res)=> res)
    .catch((err)=>err)
}
function deleteCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers,}
    ) .then((res)=> res)
    .catch((err)=>err)
}
function clearCartItem() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers,}
    ) .then((res)=> res)
    .catch((err)=>err)
}
 
function checkout(cardId,url,formData) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
         {shippingAddress:formData},{headers}   
    )
    .then((res)=> res)
    .catch((err)=>err)
    
}
  function addToWishList(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: id,},
        {headers}
      )
      .then((res) => res)
      .catch((err) => err);
  }
 
 useEffect(()=>{
    getLoggedUserCart()
 },[])
 return<CartContext.Provider value={{addToWishList ,getWishList ,wishList , setwishList,cartId,checkout,clearCartItem,deleteCartItem,updateCardProductQuantity,addProductToCard,getLoggedUserCart,setnumberItems,numberItems}}>
        {props.children}
    </CartContext.Provider>
}