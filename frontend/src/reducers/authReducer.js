import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/user";


const initialState = {
    id: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem("user")).id : null,
    name: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem("user")).name : null,
    token: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem("user")).token : null,
    isAuthenticated: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem("user")).isAuthenticated : false,
    role: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem("user")).role : null,

    status: "notFetchedYet",
    error: null,
};


export const logInReducer = createAsyncThunk(
    'auth/login',
    async ({ name, password }) => {
        const url = `${BASE_URL}/login`;
        const response = await axios.post(url, { name, password }, { withCredentials: true });
        return response.data;
    }
);
export const signUpReducer = createAsyncThunk(
    'auth/signup',
    async ({ name, password, role }) => {
        const url = `${BASE_URL}/signup`;
        const response = await axios.post(url, { name, password, role }, { withCredentials: true });

        //chekc the respose if there is error message

        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateError(state, action) {
            state.error = action.payload;
        },

        logOut(state, action) {
            //seting the state in reduc
            state.id = null
            state.name = null;
            state.role = null;
            state.isAuthenticated = false;
            state.token = null;
            state.status = "notFetchedYet";
            state.error = null;

            const updatedUserInLocalStorage = {
                id: null,
                name: null,
                token: null,
                isAuthenticated: false,
                role: null, // "admin", "user", null
            };

            localStorage.setItem("user", JSON.stringify(updatedUserInLocalStorage));
        },
    },
    extraReducers(builder) {
        builder
            //for signup
            .addCase(signUpReducer.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(signUpReducer.fulfilled, (state, action) => {
                //error message
                if (action.payload?.name === "UniqueViolationError") {
                    state.error = "UniqueViolationError";
                    state.status = "error";
                }
                else {
                    state.status = "succeeded"
                }
            })
            .addCase(signUpReducer.rejected, (state, action) => {

                state.status = "failed"
                state.error = action.error.message
            })

            //for login
            .addCase(logInReducer.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(logInReducer.fulfilled, (state, action) => {
                if (action.payload.status === 'failed') {
                    state.status = 'failed';
                    state.error = 'failed';
                }

                if (action.payload.status === 'success') {
                    // set everything in localStorage;
                    const user = {
                        id: action.payload.data.user.id,
                        name: action.payload.data.user.name,
                        token: action.payload.token,
                        isAuthenticated: true,
                        role: action.payload.data.user.role, // "admin", "user", null
                    };
                    localStorage.setItem("user", JSON.stringify(user));

                    // now update the data in the state for the first time;
                    state.status = "succeeded";
                    state.isAuthenticated = true;
                    state.name = action.payload.data.user.name;
                    state.token = action.payload.token;
                    state.role = action.payload.data.user.role;
                    state.id = action.payload.data.user.id;

                }
            })
            .addCase(logInReducer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

    }

});

export const {
    logOut,
    updateError,
} = authSlice.actions;

export default authSlice.reducer;
