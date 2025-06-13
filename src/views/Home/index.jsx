import { SimpleGrid, Spinner, Center, Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";

const Home = () => {
  const { items, loading } = useSelector((state) => state.products);

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" thickness="4px" color="purple.500" speed="0.65s" />
        <Text ml={4} fontSize="xl">Cargando productos...</Text>
      </Center>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column">
        <Center flex="1">
          <Text fontSize="xl" color="gray.500">No hay productos para mostrar.</Text>
        </Center>
      </Box>
    );
  }

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={6}
        marginLeft={3}
        mt={4}
      >
        {items.map((producto) =>
          <ProductCard
            key={producto.id}
            producto={producto}
          />
        )}
      </SimpleGrid>
    </>
  );
};

export default Home;
