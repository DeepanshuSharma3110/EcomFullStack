import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_ADD_ITEM } from "../../ServerRoughts";
import axios from "axios";

// Async thunk for adding an item
const addItem = createAsyncThunk('admin/addItem', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(ADMIN_ADD_ITEM, data); 
        return response.data;
    } catch (err) {
        if (err.response && err.response.data) {
            return rejectWithValue(err.response.data);
        } else {
            return rejectWithValue({ message: 'Network or server error' });
        }
    }
});

// Slice to manage admin state
const adminReducer = createSlice({
    name: 'adminReducer',
    initialState: {
        isLoading: false,
        error: null,  
        data: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle fulfilled state (success)
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload; 
        });

        // Handle pending state (loading)
        builder.addCase(addItem.pending, (state) => {
            state.isLoading = true;
            state.error = null; 
        });

        // Handle rejected state (error)
        builder.addCase(addItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'An error occurred'; 
        });
    }
});

export default adminReducer.reducer;
export {addItem};
