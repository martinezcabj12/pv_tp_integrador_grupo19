import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardProducto = ({ producto }) => {
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
    <Image
      src={producto.image}
      alt={producto.title}
      boxSize="150px"
      objectFit="contain"
      mx="auto"
    />
    <Text mt={2} fontWeight="bold">
      {producto.title}
    </Text>
    <Text color="gray.600">${producto.price}</Text>
    <Button
      as={Link}
      to={`/detalle/${producto.id}`}
      colorScheme="teal"
      mt={2}
      width={"100%"}
    >
      Ver más detalles
    </Button>
  </Box>;
};

export default CardProducto;

