import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {string} from "yup";

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

export interface StateData {
    orderData: CartItem[];
    FCMToken: string;
    os: string
}

const initialState: StateData = {
    orderData: [],
    FCMToken: '',
    os: ''
};

export const cartSlice = createSlice({
    name: 'cart', initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ pizza: Pizza; quantity: number }>) => {
            const {pizza, quantity} = action.payload;
            const existingItem = state.orderData.find(item => item.pizza.id === pizza.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.orderData.push({pizza, quantity});
            }
        },
        increaseQuantity: (state, action: PayloadAction<Pizza>) => {
            const pizza = state.orderData.find(p => p.pizza.id === action.payload.id);
            if (pizza) {
                pizza.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<Pizza>) => {
            const pizza = state.orderData.find(p => p.pizza.id === action.payload.id);
            if (pizza && pizza.quantity > 1) {
                pizza.quantity -= 1;
            } else {
                state.orderData = state.orderData.filter(p => p.pizza.id !== action.payload.id);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.orderData = state.orderData
                .map(item =>
                    item.pizza.id === action.payload
                        ? {...item, quantity: item.quantity - 1}
                        : item,
                )
                .filter(item => item.quantity > 0);
        },
        clearCart: state => {
            state.orderData = [];
        },

        addedFCMToken: (state, action: PayloadAction<string>) => {
            state.FCMToken = action.payload
        },

        addedOS: (state, action: PayloadAction<string>) => {
            state.os = action.payload
        }
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    addedFCMToken,
    addedOS
} = cartSlice.actions;
export default cartSlice.reducer;
