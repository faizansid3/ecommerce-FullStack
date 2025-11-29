import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api= axios.create({baseURL : "http://localhost:8000"});
const authHeader= ()=>{
    const token= localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

//fetch cart of particular user 
export const fetchCart= createAsyncThunk(
    "cart/fetchCart",
    async(userId,{rejectWithValue})=> {
        try{
            const res= await api.get(`/cart/${userId}`,{ headers: authHeader() })
            return res.data.items ?? res.data;
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// add to the particular user's cart
export const addToCartBackend = createAsyncThunk(
    "cart/addToCartBackend",
    async({userId,product},{rejectWithValue})=>{
        try{
            const body={
                userId,
                productId: product.productId ?? String(product.id ?? product.productId),
                title:  product.title ?? product.name,
                price: product.price,
                image: product.image,
            }   
            const res= await api.post("/cart/add",body,{ headers: authHeader() })
            return res.data.items?? res.data;
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
//updateCartItemBackend userID,productId
export const updateCartItemBackend= createAsyncThunk(
    "cart/updateCartItemBackend",
    async({userId,productId,action},{rejectWithValue})=>{
        try{
            const res= await api.put("/cart/update",{
                userId,
                productId,
                action
            },
            { headers: authHeader() })
            return res.data.items ?? res.data;
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
//removeCartItemBackend

export const removeCartItemBackend= createAsyncThunk(
    "cart/removeCartItemBackend",
    async({userId,productId},{rejectWithValue})=>{
        try{
            const res= await api.delete("/cart/remove",{
                headers: { ...authHeader(), "Content-Type": "application/json" },
                data: { userId, productId },
            })
            return res.data.items ?? res.data;
        }
        catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)




const initialState= {
    items: [],
    loading: false,
    error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.productId === item.productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCartLocal: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
    increaseQuantityLocal: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) item.quantity += 1;
    },
    decreaseQuantityLocal: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.productId !== productId);
      }
    },
    setCartLocal: (state, action) => {
      state.items = action.payload || [];
    },
    clearCartLocal: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchCart.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchCart.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // addToCartBackend
      .addCase(addToCartBackend.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addToCartBackend.fulfilled, (s, a) => { s.loading = false; s.items = a.payload || s.items; })
      .addCase(addToCartBackend.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // updateCartItemBackend
      .addCase(updateCartItemBackend.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateCartItemBackend.fulfilled, (s, a) => { s.loading = false; s.items = a.payload || s.items; })
      .addCase(updateCartItemBackend.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // removeCartItemBackend
      .addCase(removeCartItemBackend.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(removeCartItemBackend.fulfilled, (s, a) => { s.loading = false; s.items = a.payload || s.items; })
      .addCase(removeCartItemBackend.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  }
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  increaseQuantityLocal,
  decreaseQuantityLocal,
  setCartLocal,
  clearCartLocal
} = cartSlice.actions;

export default cartSlice.reducer