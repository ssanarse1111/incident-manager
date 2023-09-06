import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../models/product";


const baseUrl = 'http://localhost:3005/';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await axios.get(baseUrl + 'products');
    return response.data;
});

export const createProduct = createAsyncThunk('products/create', async (data: Product) => {
    const response = await axios.post(baseUrl + 'products', data);
    return response.data;
});