import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
export const store = configureStore({
  reducer: {
    products: productsReducer, // Reducer para manejar el estado de los productos
  },
})