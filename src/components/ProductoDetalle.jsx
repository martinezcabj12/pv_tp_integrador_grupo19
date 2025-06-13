import { Box, Image, Text, Heading } from "@chakra-ui/react";

const ProductoDetalle = ({ producto }) => {
  return (
    <Box
      maxW="md"
      mx="auto"
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb={4}>
        {producto.title}
      </Heading>
      <Image
        src={producto.image}
        alt={producto.title}
        mx="auto"
        boxSize="200px"
        objectFit="contain"
        mb={4}
      />
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        ${producto.price}
      </Text>
      <Text mb={2}>{producto.description}</Text>
      <Text color="gray.500">Categoría: {producto.category}</Text>
    </Box>
  );
};

export default ProductoDetalle;

