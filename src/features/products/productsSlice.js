import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción para obtener productos de la API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // Lista de productos
    favorites: [], // Lista de productos favoritos
    loading: false, // Estado de carga
    error: null, // Estado de error
    lastRemovedFavorite: null, // Para la funcionalidad de undo
  },
  reducers: {
    // Reducer para alternar el estado de favorito de un producto
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        // Si está en favoritos, lo removemos y guardamos para undo
        state.favorites = state.favorites.filter((favId) => favId !== id);
        state.lastRemovedFavorite = id;
      } else {
        // Si no está en favoritos, lo agregamos
        state.favorites.push(id);
        state.lastRemovedFavorite = null; // Limpiamos el undo
      }
    },

    // Nuevo reducer para deshacer la última acción de remover favorito
    undoRemoveFavorite: (state) => {
      if (
        state.lastRemovedFavorite &&
        !state.favorites.includes(state.lastRemovedFavorite)
      ) {
        state.favorites.push(state.lastRemovedFavorite);
        state.lastRemovedFavorite = null;
      }
    },

    // Limpiar el historial de undo (útil cuando se navega a otra página)
    clearUndoHistory: (state) => {
      state.lastRemovedFavorite = null;
    },

    // Limpiar errores
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      });
  },
});

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (nuevoProducto, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const {
  toggleFavorite,
  undoRemoveFavorite,
  clearUndoHistory,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
