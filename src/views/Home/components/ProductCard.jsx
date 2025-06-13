import { Button, Card, CardBody, CardFooter, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../features/products/productsSlice';
import RatingStars from '../../../components/RatingStars';
import FavButton from '../../../components/FavButton';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(producto.id);

  return (
    <Card
      maxW="250px"
      minW="200px"
      minH="420px"
      maxH="420px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      position="relative"
      m={1} // Reduce el margen entre cards
      boxShadow="md"
    >
      <FavButton
        isFavorite={isFavorite}
        onClick={() => dispatch(toggleFavorite(producto.id))}
        position="absolute"
        top="8px"
        right="8px"
        zIndex={2}
      />
      <Image
        src={producto.image}
        alt={producto.title}
        maxH="180px"
        minH="180px"
        objectFit="contain"
        mx="auto"
        mt={4}
      />
      <CardBody display="flex" flexDirection="column" flexGrow={1} pb={0}>
        <Tooltip label={producto.title} hasArrow placement="right">
          <Heading size="md" isTruncated minH="48px">{producto.title}</Heading>
        </Tooltip>
        {producto.rating && producto.rating.rate && (
          <RatingStars rate={producto.rating.rate} count={producto.rating.count} />
        )}
        <Text fontSize="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${producto.price}
        </Text>
      </CardBody>
      <CardFooter gap="2" >
        <Button variant="solid" width="100%">Comprar</Button>
        <Button
          as={Link}
          to={`/detalle/${producto.id}`}
          variant="solid"
          width="100%"
        >
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;