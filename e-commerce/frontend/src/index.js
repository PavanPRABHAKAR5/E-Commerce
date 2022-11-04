import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"
import { cartReducer, orderReducer, productReducer } from './reducers';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';


const store = configureStore(
  {
    reducer: {
      product: productReducer,
      cart: cartReducer,
      order: orderReducer,

    }
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

  {/* <App/> */}
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}>
        <Route index element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  </BrowserRouter>

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
