import { createContext, useState } from 'react'
import './App.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Brand from './components/Brand/Brand';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishList from './components/WishList/WishList';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import Forgetpassword from './components/Forgetpassword/Forgetpassword';
import ResetPass from './components/ResetPass/ResetPass';
import Resetcode from './components/Resetcode/Resetcode';

let query=new QueryClient()

let x=createBrowserRouter([
{path:"" ,element:<Layout/>,children:[
{index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
{path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
{path:"wishlist",element:<ProtectedRoute><WishList/></ProtectedRoute>},
{path:"checkout",element:<ProtectedRoute><Checkout/></ProtectedRoute>},
{path:"allorders",element:<ProtectedRoute><Allorders/></ProtectedRoute>},
{path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
{path:"brand",element:<ProtectedRoute><Brand/></ProtectedRoute>},
{path:"productdetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
{path:"login",element:<Login/>},
{path:"forgetpassword",element:<Forgetpassword/>},
{path:"resetpass",element:<ResetPass/>},
{path:"resetcode",element:<Resetcode/>},
{path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:'register',element:<Register/>},
{path:"*",element:<Notfound/>},
  ]}
])
function App() {
  const [count, setCount] = useState(0)

  return(
    <>
    <UserContextProvider>
    <CounterContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
  <RouterProvider router={x}></RouterProvider>
<Toaster/>
        </CartContextProvider>
<ReactQueryDevtools/>
      </QueryClientProvider>
  </CounterContextProvider>
    </UserContextProvider>
 

  </>
  )
}

export default App
