import { 
  SimpleGrid, 
  Spinner, 
  Center, 
  Text, 
  Box, 
  Button, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  AlertDescription,
  VStack
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, clearError } from "../../features/products/productsSlice";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const { items, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchProducts());
  };

  if (loading) {
    return (
      <Center minH="90vh" flexDirection="column">
        <Spinner 
          size="xl" 
          thickness="4px" 
          color="purple.500" 
          speed="0.65s"
        />
        <Text mt={4} fontSize="xl" color="gray.600" fontWeight="medium">
          Cargando productos...
        </Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="90vh" p={4}>
        <VStack spacing={4} maxW="md">
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <VStack align="start" spacing={2}>
              <AlertTitle>¡Ups! Algo salió mal</AlertTitle>
              <AlertDescription>
                No pudimos cargar los productos. Verifica tu conexión e intenta nuevamente.
              </AlertDescription>
            </VStack>
          </Alert>
          <Button 
            colorScheme="blue" 
            onClick={handleRetry}
            size="lg"
            borderRadius="full"
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            Intentar nuevamente
          </Button>
        </VStack>
      </Center>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column">
        <Center flex="1">
          <VStack spacing={4}>
            <Text fontSize="xl" color="gray.500">
              No hay productos para mostrar.
            </Text>
            <Button 
              colorScheme="blue" 
              onClick={handleRetry}
              size="lg"
              borderRadius="full"
            >
              Recargar productos
            </Button>
          </VStack>
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
      <Box maxW="1200px" width="100%">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign="left"
          mb={6}
          pl={{ base: 2, md: 4 }}
          bgGradient="linear(to-r, blue.500, purple.500)"
          bgClip="text"
        >
          Nuestros Productos ({items.length})
        </Text>
        
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: 4, md: 6 }}
          width="100%"
          justifyItems="center"
          alignItems="stretch"
        >
          {items.map((producto) => (
            <ProductCard key={producto.id} items={producto} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;