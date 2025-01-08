import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = "http://localhost:8080/api/task"

const initialState = {
    taskList: [],
    status: "notFetchedYet",
    error: null,
    statics: null,
};

export const fetchTasks = createAsyncThunk("task/fetchTasks", async (pageNo) => {
    const response = await axios.get(`${BASE_URL}?page=${pageNo}`);
    return response?.data
});
export const fetchStats = createAsyncThunk("task/fetchStats", async () => {
    const url = `${BASE_URL}/stats`;
    const response = await axios.get(url);
    return response?.data
});
export const fetchUserTasks = createAsyncThunk("task/fetchUserTasks", async (id) => {
    const url = `${BASE_URL}/${id}/task`;
    const response = await axios.get(url);
    return response?.data
});

export const taskDone = createAsyncThunk(
    'task/taskDone',
    async (taskId) => {
        const url = `${BASE_URL}/${taskId}`;
        const today = new Date().toISOString().split('T')[0];

        const response = await axios.patch(url, { status: 'completed', completionDate: today });
        return response.data;
    }
);

export const taskUndo = createAsyncThunk(
    'task/taskUndo',
    async (taskId) => {
        const url = `${BASE_URL}/${taskId}`;
        const response = await axios.patch(url, { status: 'pending', completionDate: null });
        return response.data;
    }
);

export const createTask = createAsyncThunk(
    'task/createTask',
    async (newTask) => {
        const response = await axios.post(BASE_URL, newTask);
        return response.data;
    }
);
export const updateTaskReducer = createAsyncThunk(

    'task/updateTask',
    async (updatedTask) => {
        const { id } = updatedTask;
        const url = `${BASE_URL}/${id}`;
        const response = await axios.patch(url, updatedTask);
        return response;
    }
);
export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (taskId) => {
        const url = `${BASE_URL}/${taskId}`;
        const response = await axios.delete(url);
        return response;
    }
)



const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            //for fethc task
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.taskList = (action.payload);
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            //for fethc user task
            .addCase(fetchUserTasks.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.taskList = (action.payload);
            })
            .addCase(fetchUserTasks.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

            //for taskDone
            .addCase(taskDone.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(taskDone.fulfilled, (state, action) => {
                state.status = "succeeded"
            })
            .addCase(taskDone.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            //for taskUndo
            .addCase(taskUndo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(taskUndo.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(taskUndo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            //creat task
            .addCase(createTask.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.taskList = state.taskList.concat(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            //update Task
            .addCase(updateTaskReducer.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(updateTaskReducer.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(updateTaskReducer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //delte Task
            .addCase(deleteTask.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            //stats
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.statics = action.payload;
            })

    }
});


export default taskSlice.reducer;