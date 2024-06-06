import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get Cart Items

export const fetchCartItems = createAsyncThunk(
  "fetchCartItems",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const responce = await axios.get(
        "http://localhost:5000/api/cart/getcart",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

// Add Item in cart

export const addToCart = createAsyncThunk(
  "addToCart",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { productId, quantity, price } = payload;
    console.log(payload);

    try {
      const responce = await axios.post(
        "http://localhost:5000/api/cart/addtocart",
        {
          productId: productId,
          quantity: quantity ? quantity : 1,
          price: price,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );
      // console.log(responce.data);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update cart

export const updateCart = createAsyncThunk(
  "updateCart",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { id, quantity } = payload;

    // console.log(id);
    try {
      const responce = await axios.put(
        `http://localhost:5000/api/cart/updatecart/${id}`,
        { quantity },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

// Delete cart Item

export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const responce = await axios.delete(
        `http://localhost:5000/api/cart/removeitem/${id}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("userInfo")).token,
          },
        }
      );
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

const cartSlices = createSlice({
  name: "cartSlices",
  initialState: {
    cartItems: [],
    isLoading: false,
    isError: null,
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
    message: {},
  },
  extraReducers: (builder) => {
    // Fetch Cart Add
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // Add Item in Cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.isAdded = false;
      state.isError = null;
      state.message = {};
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAdded = true;
      state.message = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
      state.message = {};
    });

    // Update Cart
    builder.addCase(updateCart.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.isUpdated = false;
      state.message = {};
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
      state.message = action.payload;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = action.payload;
      state.message = {};
    });

    // Delete Cart Item
    builder.addCase(deleteCartItem.pending, (state) => {
      state.isLoading = true;
      state.isDeleted = false;
      state.isError = null;
      state.message = {};
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleted = true;
      state.message = action.payload;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isDeleted = false;
      state.message = {};
    });
  },
});

export default cartSlices.reducer;
