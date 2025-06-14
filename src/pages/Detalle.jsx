import { useParams, Link } from "react-router-dom";
import ProductoDetalle from "../components/ProductoDetalle";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Detalle = () => {
  const { id } = useParams();
  const productos = useSelector((state) => state.products.items);
  const producto = productos.find((prod) => prod.id === Number(id));

  if (!producto) {
    return (
      <Box textAlign="center" mt={10}>
        Producto no encontrado
      </Box>
    );
  }

  return (
    <Box mt={3}>
      <ProductoDetalle producto={producto} />
      <Box>
        {" "}
        <Button as={Link} to="/" colorScheme="teal" my={4}>
          Volver al Store
        </Button>
      </Box>
    </Box>
  );
};

export default Detalle;
