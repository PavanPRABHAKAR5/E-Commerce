import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {  } from '../actions';
import Checkout from '../components/Checkout';


const CheckoutPage = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state=>state.cart.items)
    const order = useSelector(state=>state.order)
    const user = useSelector(state=>state.user)
 
    return (
    <>
    <Navbar cartCount={cartItems.length}/>
    <Checkout order={order} user={user}/>
    <Footer/>
    </>
    );
}

export default CheckoutPage