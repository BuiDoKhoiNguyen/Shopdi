import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = 'http://localhost:8080/orders/history';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    };
    const response = await axios.get(API_URL, config);
    return response.data.result.items;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: {},
        loading: false,
        error: null,
    },
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
            state.error = null;
        }
    },
    extraReducers: (builder )=> {
        builder
            .addCase(fetchOrders.pending, (state) => {
            state.loading = true;
        })
            .addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
            .addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const {clearOrders} = orderSlice.actions;
export default orderSlice.reducer;