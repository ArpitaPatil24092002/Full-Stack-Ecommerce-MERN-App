import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

    const fetchUserDetails=async()=>{
        const dataResponse=await fetch(SummaryApi.current_user.url,{
          method:SummaryApi.current_user.method,
          credentials:'include'
        })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
          dispatch(setUserDetails(dataApi.data))
        }
        console.log("data-user",dataResponse);
    }
    
  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
    console.log("dataApi",dataApi)
    setCartProductCount(dataApi?.data?.count)
  }

     useEffect(()=>{
      // userDetails
         fetchUserDetails()
      /**user Details cart product */
        fetchUserAddToCart()
     },[])
  return (
   <>
       <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
      <ToastContainer
         position='top-center'
      />
      <Header></Header>
      <main className='min-h[calc(100vh-120px)] pt-16'>
      <Outlet></Outlet>
      </main>
      <Footer/>
      </Context.Provider>
   </>
  )
}

export default App