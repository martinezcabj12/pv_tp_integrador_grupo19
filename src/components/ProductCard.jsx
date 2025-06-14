import { Button, Card, CardBody, CardFooter, Heading, Image, Text, Tooltip, Badge } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/products/productsSlice';
import RatingStars from './RatingStars';
import FavButton from './FavButton';
import { Link } from 'react-router-dom';

const ProductCard = ({ items }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(items.id);

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
        onClick={() => dispatch(toggleFavorite(items.id))}
        position="absolute"
        top="8px"
        right="8px"
        zIndex={2}
      />
      <Image
        src={items.image}
        alt={items.title}
        maxH="180px"
        minH="180px"
        objectFit="contain"
        mx="auto"
        mt={4}
      />
      <CardBody display="flex" flexDirection={"column"} pb={0} textAlign={'left'}>
        <Tooltip label={items.title} hasArrow placement="right">
          <Heading size="md" isTruncated minH={"30px"}>{items.title}</Heading>
        </Tooltip>
        <Badge
          colorScheme="purple"
          fontSize={{ base: "0.85em", md: "0.88em" }}
          px={2}
          py={1}
          borderRadius="full"
          boxShadow="md"
          letterSpacing="wider"
          bgGradient="linear(to-r, purple.400, purple.600)"
          color="white"
          mt="0.2rem"
          mb="0.5rem"
          width="fit-content"
        >
          {items.category}
        </Badge>
        {items.rating && items.rating.rate && (
          <RatingStars rate={items.rating.rate} count={items.rating.count} />
        )}
        <Text fontSize="2xl" fontWeight="medium" letterSpacing="tight" mt="0.5rem" >
          ${items.price}
        </Text>
      </CardBody>
      <CardFooter gap="2" display="flex" mt="-1">
        <Button variant="solid" width="100%" >Comprar</Button>
        <Button
          as={Link}
          to={`/detalle/${items.id}`}
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