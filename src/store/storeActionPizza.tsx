import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Pizza {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart', initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{pizza: Pizza; quantity: number}>,) => {
      const {pizza, quantity} = action.payload;
      const existingItem = state.cart.find(item => item.pizza.id === pizza.id);
      if (existingItem) {
        existingItem.quantity += quantity;
        // existingItem.allPrice =  pizza.price *  existingItem.quantity;
      } else {
        state.cart.push({pizza, quantity});
      }
    },
    increaseQuantity: (state, action: PayloadAction<Pizza>) => {
      const pizza = state.cart.find(p => p.pizza.id === action.payload.id);
      if (pizza) {
        pizza.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<Pizza>) => {
      const pizza = state.cart.find(p => p.pizza.id === action.payload.id);
      if (pizza && pizza.quantity > 1) {
        pizza.quantity -= 1;
      } else {
        state.cart = state.cart.filter(p => p.pizza.id !== action.payload.id);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart
        .map(item =>
          item.pizza.id === action.payload
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0);
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
