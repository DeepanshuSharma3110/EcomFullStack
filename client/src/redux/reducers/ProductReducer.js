import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADDITEMTOCART, CLEARCART, DELETE_PRODUCT, GET10ITEMS, GETALLCATEGORIES, GETALLPRODUCTS, GETBYCATEGORIES, GETCARTITEM, UPDATE_PRODUCT, UPDATEQUANTITY } from "../../ServerRoughts.js";

 const fetchAllCategories = createAsyncThunk('fetchAllCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(GETALLCATEGORIES);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

 const fetchByCategories = createAsyncThunk('fetchByCategories', async (type, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${GETBYCATEGORIES}/${type}`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});



 const fetch10Item = createAsyncThunk('fetch10Item', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(GET10ITEMS);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});




const addToCart = createAsyncThunk('addToCart', async(data,{rejectWithValue})=>{
    try{
        const response = await axios.post(ADDITEMTOCART,{
            item:data
        }, {
            withCredentials: true,
        });

        return response;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

const getCart = createAsyncThunk('getCart', async(rejectWithValue)=>{
    try{
        const response = await axios.get(GETCARTITEM,{
         withCredentials:true,   
        });
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

const clearCart = createAsyncThunk('clearCart',async (rejectWithValue)=>{
    try{
        const response = await axios.get(CLEARCART,{
            withCredentials:true,
        });
        return response.data;
    }catch(err){
        rejectWithValue(err.response.data)
    }
})

const updateQuantity = createAsyncThunk(
    'updateQuantity',
    async ({ id, quantity, operation }, { rejectWithValue }) => { 
      try {
        const response = await axios.post(UPDATEQUANTITY, {
          id,
          quantity,
          operation,
        }, {
          withCredentials: true,
        });
        return response.data; 
      } catch (err) {
        return rejectWithValue(err.response.data); 
      }
    }
  );

  const fetchAllItems = createAsyncThunk('fetchAllItems', async(_,{rejectWithValue})=>{
try{
    const response = await axios.get(GETALLPRODUCTS);
    return response.data;
}catch(err){
    return rejectWithValue(err.response.data); 
}
  });


  const deleteItem = createAsyncThunk('deleteItem',async({_id},{rejectWithValue})=>{
    try{
        const response = await axios.post(DELETE_PRODUCT,{_id});
        return response.data;
    }catch(err){
        rejectWithValue(err.response.data);
    }
  })


  const updateItem =  createAsyncThunk('deleteItem',async({ _id, title, categories, price, description},{rejectWithValue})=>{
    try{
        const response = await axios.post(UPDATE_PRODUCT,{ _id, title, categories, price, description});
        return response.data;
    }catch(err){
        rejectWithValue(err.response.data);
    }
  })

const ProductReducer = createSlice({
    name: 'ProductReducer',
    initialState: {
        isLoading: false,
        error: null,
        categories: [], 
        products: []    
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all categories
        builder.addCase(fetchAllItems.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAllItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // Directly use the payload
        });
        builder.addCase(fetchAllItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.categories = action.payload; // Update categories
        });


        //fetch all items
        builder.addCase(fetchAllCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // Directly use the payload
        });
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.categories = action.payload; // Update categories
        });

        // Fetch 10 items
        builder.addCase(fetch10Item.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetch10Item.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // Directly use the payload
        });
        builder.addCase(fetch10Item.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.products = action.payload; // Update products
        });

        // Fetch by categories
        builder.addCase(fetchByCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchByCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; // Directly use the payload
        });
        builder.addCase(fetchByCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.products = action.payload; // Update products
        });



        //add to cart
             // Fetch by categories
             builder.addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Directly use the payload
            });
            builder.addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload; // Update products
            });




            //getCartItem
             builder.addCase(getCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Directly use the payload
            });
            builder.addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload; // Update products
            });

            //updateQuantity
            builder.addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(updateQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Directly use the payload
            });
            builder.addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload; // Update products
            });


             //clearCart
             builder.addCase(clearCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
            builder.addCase(clearCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Directly use the payload
            });
            builder.addCase(clearCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload; // Update products
            });



                //DeleteItem
                builder.addCase(deleteItem.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                });
                builder.addCase(deleteItem.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload; // Directly use the payload
                });
                builder.addCase(deleteItem.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.products = action.payload; // Update products
                });



                
                //UpdateItem
                builder.addCase(updateItem.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                });
                builder.addCase(updateItem.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload; // Directly use the payload
                });
                builder.addCase(updateItem.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.error = null;
                    state.products = action.payload; // Update products
                });



    }
});

export default ProductReducer.reducer;
export { fetch10Item, fetchAllCategories, fetchByCategories,addToCart, getCart, updateQuantity, clearCart, fetchAllItems,deleteItem, updateItem };
