import ProductList from '../components/ProductList';
import {useDispatch, useSelector} from "react-redux"
import Navbar from '../components/Navbar';
import Carousel from '../components/Card';
import Footer from '../components/Footer';
import { addToCartAC, ADD_TO_CART ,initializeProductsAC } from '../actions';
import { useEffect } from 'react';


const Home =()=> {
  const dispatch = useDispatch()
  const products = useSelector(state=>state.product.products)
  const cartItems = useSelector(state=>state.cart.items)
  
  useEffect(()=>{
    dispatch(initializeProductsAC());
  },[]) 
  const addToCart=(product)=>{
    dispatch(addToCartAC(product))
  }



  return (
  <>
  <Navbar cartCount={cartItems.length}/>
  <Carousel/>
  <ProductList products={products}  addToCart={addToCart}/>
  <Footer/>
  </>
  );
}

export default Home;