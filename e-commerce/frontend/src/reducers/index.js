import { ADD_TO_CART, CHANGE_ORDER_CART, CHANGED_QUANTITY, REMOVE_ITEM, INIT_CART, INIT_PRODUCTS } from "../actions";

const initialStateProducts = {
    products: [
      
    ],
  };
  
  const initialStateCart = {
    items: [],
  };

const initialStateOrder = {
    items: [],
    shipping_charges: 50,
    discount_in_percent: 10,
    shipping_address: "",
    total_items: 0,
    total_cost: 0
}


const productReducer = (state = initialStateProducts, action) => {
    switch(action.type){
      case INIT_PRODUCTS:
        return {...state,products:action.payload}
      default:  
         return state;
    }
  };

const cartReducer = (state = initialStateCart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.items.find(item => item._id === action.payload._id)) {
                return state;
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }
        case CHANGED_QUANTITY:
            const oldItem = state.items.find(item => item._id === action.payload._id)
            const index = state.items.indexOf(oldItem);
            const newItems = [...state.items];
            newItems[index] = action.payload;
            return { ...state, items: newItems }

        case REMOVE_ITEM:
            const item = action.payload
           const i = state.items.findIndex(it=>it._id===item._id);
           const itemsArray=[...state.items]
           itemsArray.splice(i,1)
           return {...state, items: itemsArray}

        default:
            return state;
    }

}

const orderReducer = (state = initialStateOrder, action) => {
    switch (action.type) {
        case CHANGE_ORDER_CART:
            const items = action.payload;
            const total_items = items.reduce((total, item) => total + (item.quantity) * 1, 0)
            const total_cost = items.reduce((total, item) => total + item.price * item.quantity, 0)
            return { ...state, items: action.payload, total_items, total_cost }

        default:
            return state;
    }
}




export { productReducer, cartReducer, orderReducer };