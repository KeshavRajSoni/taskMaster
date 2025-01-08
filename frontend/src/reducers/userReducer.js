import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = "http://localhost:8080/api/user/users"

const initialState = {
    userList: [],
    status: "notFetchedYet",
    error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    const response = await axios.get(BASE_URL, {
        withCredentials: true
    });
    return response.data
});




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            //for fethc task
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                if (action.payload?.error) {
                    state.status = "failed";
                    state.error = action.payload.error;

                }
                else {

                    state.status = "succeeded"
                    state.userList = (action.payload);
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error
            })

    }
});


export default userSlice.reducer;