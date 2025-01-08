import { Tuple, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer';
import logger from 'redux-logger';


const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        user: userReducer,
    },
    middleware: () => new Tuple(thunk, logger),

});

export default store;