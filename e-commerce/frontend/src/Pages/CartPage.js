import React, { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CHANGE_ORDER_CART, CHANGED_QUANTITY , REMOVE_ITEM, changeOrderWithCart,changeQuantityAC, removeItemAC} from '../actions';
import Cart from '../components/Cart';

const CartPage = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state=>state.cart.items)
    const order = useSelector(state=>state.order)
    useEffect(()=>{
       dispatch(changeOrderWithCart(cartItems));
    },[cartItems])

    const changeQuantity = (quantity, item)=>{
        dispatch(changeQuantityAC({...item, quantity:quantity}))
    }

    const removeItem = (item)=>{
        dispatch(removeItemAC(item))
    }
    return (
    <>
    <Navbar cartCount={cartItems.length}/>
    <Cart items={cartItems} order={order} changeQuantity={changeQuantity} removeItem={removeItem}/>
    <Footer/>
    </>
    );
}

export default CartPage