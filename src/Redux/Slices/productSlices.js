import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Product Create
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({ data, imageFile }, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("user", data.user);
      formData.append("image", imageFile);
      const responce = await axios.post(
        "http://localhost:5000/api/product/createproduct",
        {
          name: formData.get("name"),
          description: formData.get("description"),
          price: parseInt(formData.get("price")),
          stock: parseInt(formData.get("stock")),
          category: formData.get("category"),
          image: formData.get("image"),
        },
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

// Get All Product
export const fetchAllProduct = createAsyncThunk(
  "fetchAllProduct",
  async (payload, { rejectWithValue, state, dispatch }) => {
    try {
      const responce = await axios.get(
        "http://localhost:5000/api/product/getallproduct"
      );
      return responce.data.data;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

// get Single Product

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id, { rejectWithValue, state, dispatch }) => {
    try {
      const responce = await axios.get(
        `http://localhost:5000/api/product/getsingleproduct/${id}`
      );

      return responce.data.data;
    } catch (error) {
      return rejectWithValue(error.responce.data);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue, state, dispatch }) => {
    try {
      const responce = await axios.delete(
        `http://localhost:5000/api/product/${id}`,
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

// Update Product
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (payload, { rejectWithValue, state, dispatch }) => {
    const { data, imageFile, productId } = payload;
    console.log(data.category);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("image", imageFile);
      const responce = await axios.put(
        `http://localhost:5000/api/product/${productId}`,
        formData,
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

const productSlices = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    isError: null,
    isLoading: false,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
  },
  extraReducers: (builder) => {
    // Product Addes
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.product = {};
      state.isError = null;
      state.isLoading = true;
      state.isAdded = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAdded = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
    });

    // Get all product
    builder.addCase(fetchAllProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
    });

    // Get Single Product
    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isAdded = false;
    });

    // Delete Category
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isDeleted = false;
    });

    // Update Category
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.isUpdated = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isUpdated = false;
    });
  },
});

export default productSlices.reducer;
