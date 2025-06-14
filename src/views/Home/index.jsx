import { SimpleGrid, Spinner, Center, Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const { items, loading } = useSelector((state) => state.products);

  if (loading) {
    return (
      <Center minH="90vh" flexDirection="column" >
        <Spinner size="xl" thickness="4px" color="purple.500" speed="0.65s" />
        <Text ml={4} fontSize="xl" color="gray.600" fontWeight="medium">
          Cargando productos...
        </Text>
      </Center>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column">
        <Center flex="1">
          <Text fontSize="xl" color="gray.500">
            No hay productos para mostrar.
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      w="100%"
      minH="100vh"
      p={{ base: 2, md: 4 }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        maxW="1200px"
        width="100%"
        justifyItems="center"
        alignItems="stretch"
      >
        {items.map((producto) => (
          <ProductCard key={producto.id} items={producto} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
