import { 
  Box, 
  Image, 
  Text, 
  Heading, 
  Grid, 
  GridItem, 
  Badge, 
  VStack, 
  HStack, 
  Divider, 
  Button, 
  Container,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  useColorModeValue,
  Flex,
  SimpleGrid
} from "@chakra-ui/react";
import { FaTruck, FaShieldAlt, FaUndoAlt, FaStore } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/products/productsSlice";
import { useToastManager } from "../hooks/useToastManager";
import FavButton from "./FavButton";
import RatingStars from "./RatingStars";

const ProductoDetalle = ({ producto }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(producto.id);
  const { showFavoriteAddedToast, showFavoriteRemovedToast } = useToastManager();

  // Simular stock basado en el rating count
  const getStockInfo = (ratingCount) => {
    if (ratingCount > 200) return { stock: "Alto", color: "green", cantidad: "25+" };
    if (ratingCount > 100) return { stock: "Medio", color: "yellow", cantidad: "10-25" };
    if (ratingCount > 50) return { stock: "Bajo", color: "orange", cantidad: "5-10" };
    return { stock: "Muy Bajo", color: "red", cantidad: "1-5" };
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      showFavoriteRemovedToast(producto.title, producto.id);
    } else {
      showFavoriteAddedToast(producto.title);
    }
    dispatch(toggleFavorite(producto.id));
  };

  const stockInfo = getStockInfo(producto.rating?.count || 0);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* Imagen del producto */}
        <GridItem>
          <Box
            bg={bgColor}
            borderRadius="2xl"
            border="1px"
            borderColor={borderColor}
            p={8}
            position="relative"
            boxShadow="lg"
          >
            <FavButton
              isFavorite={isFavorite}
              onClick={handleFavoriteToggle}
              position="absolute"
              top="16px"
              right="16px"
              zIndex={2}
              size="md"
            />
            <Image
              src={producto.image}
              alt={producto.title}
              w="100%"
              h="400px"
              objectFit="contain"
              borderRadius="xl"
            />
          </Box>
        </GridItem>

        {/* Información del producto */}
        <GridItem>
          <VStack align="stretch" spacing={6}>
            {/* Título y precio */}
            <Box>
              <Badge
                colorScheme="purple"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {producto.category}
              </Badge>
              <Heading size="lg" mb={2}>
                {producto.title}
              </Heading>
              <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                ${producto.price}
              </Text>
            </Box>

            {/* Rating y stock */}
            <HStack spacing={8}>
              <Box>
                {producto.rating && (
                  <RatingStars 
                    rate={producto.rating.rate} 
                    count={producto.rating.count} 
                  />
                )}
              </Box>
              <Badge
                colorScheme={stockInfo.color}
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                Stock: {stockInfo.stock} ({stockInfo.cantidad} unidades)
              </Badge>
            </HStack>

            <Divider />

            {/* Descripción */}
            <Box>
              <Heading size="md" mb={3}>
                Descripción
              </Heading>
              <Text lineHeight="1.8" color="gray.600">
                {producto.description}
              </Text>
            </Box>

            {/* Estadísticas del producto */}
            <SimpleGrid columns={3} spacing={4}>
              <Stat>
                <StatLabel>Calificación</StatLabel>
                <StatNumber>{producto.rating?.rate || "N/A"}</StatNumber>
                <StatHelpText>de 5 estrellas</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Reseñas</StatLabel>
                <StatNumber>{producto.rating?.count || 0}</StatNumber>
                <StatHelpText>compradores</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Disponibilidad</StatLabel>
                <StatNumber color={`${stockInfo.color}.500`}>
                  {stockInfo.stock}
                </StatNumber>
                <StatHelpText>{stockInfo.cantidad}</StatHelpText>
              </Stat>
            </SimpleGrid>

            {/* Características adicionales */}
            <Card variant="outline">
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Icon as={FaTruck} color="green.500" />
                    <Text>Envío gratis en compras mayores a $50</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaShieldAlt} color="blue.500" />
                    <Text>Garantía de satisfacción</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUndoAlt} color="orange.500" />
                    <Text>Devoluciones gratuitas hasta 30 días</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaStore} color="purple.500" />
                    <Text>Vendido y enviado por FakeStore</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Botones de acción */}
            <Flex gap={4} pt={4}>
              <Button 
                colorScheme="blue" 
                size="lg" 
                flex={2}
                borderRadius="full"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Comprar ahora
              </Button>
              <Button 
                variant="outline" 
                colorScheme="blue" 
                size="lg" 
                flex={1}
                borderRadius="full"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Agregar al carrito
              </Button>
            </Flex>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ProductoDetalle;