import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ADD_USER, ALL_USER, GET_USER, LOGIN_EMAIL_PASSWORD, LOGIN_WITH_GOOGLE, LOGOUT_USER, UPDATE_USER, UPDATE_USER_WITHOUT_IMAGE, verifyUserLogin } from '../../ServerRoughts.js';

// Thunks
const validateLogin = createAsyncThunk('validateLogin', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(verifyUserLogin, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
});

const LoginUserWithEmailPassword = createAsyncThunk(
    'LoginUserWithEmailPassword',
    async (data, { rejectWithValue }) => {
        try {
            const { email, password } = data;
            const response = await axios.post(
                LOGIN_EMAIL_PASSWORD,
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response ? err.response.data : 'Network or server error');
        }
    }
);


const removeLogoutCookie = createAsyncThunk('removeLogoutCookie',async(_,{rejectWithValue})=>{

    try{
        const response = await axios.get(LOGOUT_USER,{
            withCredentials:true
        })
        return response.data;
    }catch(err){
        rejectWithValue(err.response.data)
    }
})

const LoginWithGoole = createAsyncThunk(
    'LoginWithGoole',
    async ({email, image,username}, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                LOGIN_WITH_GOOGLE,
                { email, image,username },
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response ? err.response.data : 'Network or server error');
        }
    }
);


const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(UPDATE_USER, data, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
});

const fetchAllUser = createAsyncThunk('fetchAllUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(ALL_USER);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
});

const RegisterUser = createAsyncThunk('RegisterUser', async (data, { rejectWithValue }) => {
    try {
        const { username, email, password } = data;
        const response = await axios.post(ADD_USER, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response ? err.response.data : 'Network or server error');
    }
});

const fetchUser = createAsyncThunk('fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(GET_USER,{
            withCredentials:true
        });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response ? err.response.data : 'An error occurred');
    }
});


const updateUserWithoutImage =  createAsyncThunk(
    'updateUserWithoutImage',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(UPDATE_USER_WITHOUT_IMAGE, userData,
            {
                withCredentials:true
            }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Slice
const userReducer = createSlice({
    name: 'userReducer',
    initialState: {
        data: {},
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Register User
        builder
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });



            //removeLogoutCookie
            builder
            .addCase(removeLogoutCookie.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeLogoutCookie.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removeLogoutCookie.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });



        // Login User
        builder
            .addCase(LoginUserWithEmailPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(LoginUserWithEmailPassword.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(LoginUserWithEmailPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch User
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Update User
        builder
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Validate Login
        builder
            .addCase(validateLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(validateLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(validateLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch All Users
        builder
            .addCase(fetchAllUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });




            //update user without image
            builder
            .addCase(updateUserWithoutImage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserWithoutImage.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateUserWithoutImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userReducer.reducer;
export { RegisterUser, LoginUserWithEmailPassword, fetchUser, updateUser, validateLogin, fetchAllUser,LoginWithGoole ,updateUserWithoutImage,removeLogoutCookie };
