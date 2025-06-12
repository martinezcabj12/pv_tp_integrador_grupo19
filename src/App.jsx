import {useEffect } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/products/productsSlice"
function App() {
  const dispatch = useDispatch();
  
  // para cargar los productos al inicio
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
