import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_ORDER, FETCH_ORDER, FETCH_ALL_USERS_ORDERS, UPDATE_ORDER_STATUS, ADD_PREPAID_ORDER } from "../../ServerRoughts";

const submitOrder = createAsyncThunk(
  "submitOrder",
  async ({ user, cart, mode, amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        ADD_ORDER,
        { user, cart, mode, amount },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// This is for a particular user
const fetchOrder = createAsyncThunk(
  "fetchOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FETCH_ORDER, { withCredentials: true });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

const fetchAllOrders = createAsyncThunk(
  "fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FETCH_ALL_USERS_ORDERS, { withCredentials: true });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);



const updateOrderStatus = createAsyncThunk(
  'updateOrderStatus',
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.post(UPDATE_ORDER_STATUS, { orderId, newStatus });
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);




const submitPrepaidOrder =  createAsyncThunk(
  "submitPrepaidOrder",
  async ({ user, cart, mode, amount,responseId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        ADD_PREPAID_ORDER,
        { user, cart, mode, amount,responseId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);



const OrderReducer = createSlice({
  name: "OrderReducer",
  initialState: {
    error: null,
    isLoading: false,
    data: {},
  },
  reducers: {},

  // Add a new order
  extraReducers: (builder) => {
    builder.addCase(submitOrder.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(submitOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    // Fetch orders
    builder.addCase(fetchOrder.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    // Fetch all users' orders
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });



    builder.addCase(updateOrderStatus.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });


    
    builder.addCase(submitPrepaidOrder.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(submitPrepaidOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(submitPrepaidOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });



  },
});

export default OrderReducer.reducer;
export { submitOrder, fetchOrder, fetchAllOrders, updateOrderStatus, submitPrepaidOrder };
