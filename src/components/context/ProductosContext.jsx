import { createContext, useState, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

const ProductosContext = createContext();

const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const toast = useToast();

  const fetchProductos = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      toast({
        title: "Error al obtener los productos",
        description:
          "No se pudieron cargar los productos. Intenta nuevamente más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.error("Error al obtener los productos:", error);
    }
  }, [toast]);

  const agregarAFavoritos = (producto) => {
    setFavoritos((prevFavoritos) => [...prevFavoritos, producto]);
  };

  const quitarDeFavoritos = (productoId) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((producto) => producto.id !== productoId),
    );
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        favoritos,
        agregarAFavoritos,
        quitarDeFavoritos,
        fetchProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export { ProductosContext, ProductosProvider };

