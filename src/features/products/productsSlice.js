import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk(// Acción para obtener productos
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");// Realiza una solicitud a la API de productos
    return await response.json();// Convierte la respuesta a JSON
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],// Lista de productos
    favorites: [],// Lista de productos favoritos
    loading: false,// Estado de carga
  },
  reducers: {
    // Reducer para alternar el estado de favorito de un producto
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    //aca se pueden agregar mas reducers si es necesario
    // Por ejemplo, para agregar o eliminar productos

  },
  extraReducers: (builder) => {// Define como manejar las acciones asincronas
      builder 
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.items = action.payload;// Actualiza los productos con los datos obtenidos
          state.loading = false;
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.loading = false;
        });
    },
});

export const { toggleFavorite } = productSlice.actions;// Exporta las acciones del slice

export default productSlice.reducer;