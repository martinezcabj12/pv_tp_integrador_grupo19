import { Button, Card, CardBody, CardFooter, Heading, Image, Text, HStack, Badge, Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../features/products/productsSlice';
import RatingStars from '../../../components/RatingStars';
import FavButton from '../../../components/FavButton';

const FavCard = ({ favorito }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(favorito.id);

  return (
    <Card
      width="100%"
      maxW="100%"
      overflow="hidden"
      display="flex"
      flexDirection="row"
      alignItems="stretch"
      position="relative"
      boxShadow="md"
      mb={4}
    >
      <Image
        src={favorito.image}
        alt={favorito.title}
        maxW="200px"
        minW="180px"
        objectFit="contain"
        bg="white" // Cambia el fondo a blanco para que combine mejor con la mayoría de las imágenes
        p={4}
      />
      <Box flex="1" display="flex" flexDirection="column" justifyContent="space-between">
        <CardBody pb={0}>
          <Heading size="md" minH="48px" mt={3}>{favorito.title}</Heading>
          <HStack mt={2} mb={2} alignItems="center">
            <Badge colorScheme="purple" fontSize="0.9em" px={2} py={0.5} borderRadius="md">
              {favorito.category}
            </Badge>
            {favorito.rating && favorito.rating.rate && (
              <RatingStars rate={favorito.rating.rate} count={favorito.rating.count} />
            )}
          </HStack>
          <Text fontSize="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            ${favorito.price}
          </Text>
        </CardBody>
        <CardFooter gap={2} pt={2}>
          <Button variant="solid" width="100%">Comprar</Button>
          <Button variant="outline" width="100%">Ver Detalles</Button>
        </CardFooter>
      </Box>
      <FavButton
        isFavorite={isFavorite}
        onClick={() => dispatch(toggleFavorite(favorito.id))}
        position="absolute"
        top="8px"
        right="8px"
        zIndex={2}
      />
    </Card>
  );
};

export default FavCard;