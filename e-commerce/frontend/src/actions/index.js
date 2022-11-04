import axios from 'axios';
axios.defaults.withCredentials = true;
export const ADD_TO_CART = 'ADD_TO_CART';
export const CHANGE_ORDER_CART = 'CHANGE_ORDER_CART';
export const CHANGED_QUANTITY = 'CHANGED_QUANTITY';
export const REMOVE_ITEM = "REMOVE_ITEM";
export const INIT_PRODUCTS = 'INIT_PRODUCTS';
export const INIT_CART ="INIT_CART"

export const initializeProductsAC = ()=>{  
    return function(dispatch){
        axios.get('http://localhost:8080/product').then(function (response) {
            console.log(response);
            dispatch({type:INIT_PRODUCTS, payload: response.data})
          })
          .catch(function (error) {
            console.log(error);
          })  
    }
}

export const changeQuantityAC =(item)=>{
    return function (dispatch){
        dispatch({type:CHANGED_QUANTITY, payload:item})
    } 
}

export const addToCartAC =(product)=>{
    return function (dispatch){
        dispatch({type:ADD_TO_CART, payload:product})
    } 
}

export const changeOrderWithCart =(cartItems)=>{
    return function (dispatch){
        dispatch({type:CHANGE_ORDER_CART, payload:cartItems})
    } 
}



export const removeItemAC =(item)=>{
    return function (dispatch){
        dispatch({type:REMOVE_ITEM, payload:item})
    } 
}


