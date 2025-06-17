import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  Heading, 
  Image, 
  Text, 
  Tooltip, 
  Badge,
  keyframes,
  Box
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/products/productsSlice';
import { useToastManager } from '../hooks/useToastManager';
import RatingStars from './RatingStars';
import FavButton from './FavButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Animación para el corazón cuando se marca como favorito
const heartPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const ProductCard = ({ items }) => {
  const dispatch = useDispatch();
  const { showFavoriteToast } = useToastManager();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(items.id);
  const [isAnimating, setIsAnimating] = useState(false);

  // Función mejorada para manejar favoritos con animación y sonido
  const handleFavoriteClick = () => {
    const wasAlreadyFavorite = isFavorite;
    
    // Activar animación
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    
    // Simular sonido con vibración en dispositivos móviles
    if (navigator.vibrate) {
      navigator.vibrate(wasAlreadyFavorite ? [50] : [100, 50, 100]);
    }
    
    // Actualizar el estado de Redux
    dispatch(toggleFavorite(items.id));
    
    // Mostrar toast personalizado
    showFavoriteToast(items.id, !wasAlreadyFavorite);
  };

  // Función para determinar el color del badge basado en la categoría
  const getCategoryColor = (category) => {
    const colors = {
      electronics: 'blue',
      jewelery: 'purple',
      "men's clothing": 'green',
      "women's clothing": 'pink'
    };
    return colors[category] || 'gray';
  };

  // Función para determinar disponibilidad basada en rating
  const getAvailabilityStatus = (rating) => {
    if (!rating) return { status: 'Disponible', color: 'green' };
    
    const count = rating.count;
    if (count > 200) return { status: 'Muy popular', color: 'blue' };
    if (count > 100) return { status: 'Popular', color: 'green' };
    if (count < 50) return { status: 'Pocas unidades', color: 'orange' };
    return { status: 'Disponible', color: 'green' };
  };

  const availability = getAvailabilityStatus(items.rating);

  return (
    <Card
      maxW="280px"
      minW="250px"
      minH="480px"
      maxH="480px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      position="relative"
      m={2}
      boxShadow="lg"
      borderRadius="xl"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '2xl',
        borderColor: 'blue.200',
      }}
      border="1px solid"
      borderColor="gray.100"
      bg="white"
    >
      {/* Botón de favorito con animación */}
      <Box
        position="absolute"
        top="12px"
        right="12px"
        zIndex={3}
        animation={isAnimating ? `${heartPulse} 0.6s ease-in-out` : undefined}
      >
        <FavButton
          isFavorite={isFavorite}
          onClick={handleFavoriteClick}
          size="md"
          bg="white"
          borderRadius="full"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
        />
      </Box>

      {/* Badge de disponibilidad */}
      <Badge
        position="absolute"
        top="12px"
        left="12px"
        colorScheme={availability.color}
        fontSize="xs"
        px={2}
        py={1}
        borderRadius="full"
        zIndex={2}
      >
        {availability.status}
      </Badge>

      {/* Imagen del producto */}
      <Box
        bg="gray.50"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="200px"
      >
        <Image
          src={items.image}
          alt={items.title}
          maxH="180px"
          maxW="180px"
          objectFit="contain"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.05)' }}
        />
      </Box>

      <CardBody display="flex" flexDirection="column" p={4} flex="1">
        {/* Título con tooltip */}
        <Tooltip 
          label={items.title} 
          hasArrow 
          placement="top"
          openDelay={500}
        >
          <Heading 
            size="sm" 
            isTruncated 
            minH="40px"
            mb={2}
            color="gray.800"
            fontWeight="semibold"
            lineHeight="1.3"
          >
            {items.title}
          </Heading>
        </Tooltip>

        {/* Categoría */}
        <Badge
          colorScheme={getCategoryColor(items.category)}
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="full"
          mb={3}
          width="fit-content"
          textTransform="capitalize"
          variant="subtle"
        >
          {items.category}
        </Badge>

        {/* Rating */}
        {items.rating && items.rating.rate && (
          <Box mb={3}>
            <RatingStars rate={items.rating.rate} count={items.rating.count} />
          </Box>
        )}

        {/* Precio */}
        <Box mb={4} mt="auto">
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="green.600"
            lineHeight="1"
          >
            ${items.price}
          </Text>
          <Text fontSize="xs" color="gray.500">
            Envío gratis incluido
          </Text>
        </Box>
      </CardBody>

      {/* Botones de acción */}
      <CardFooter p={4} pt={0}>
        <Box display="flex" gap={2} width="100%">
          <Button 
            variant="solid" 
            colorScheme="blue"
            size="sm"
            flex="1"
            fontWeight="medium"
            _hover={{
              transform: 'translateY(-1px)',
              boxShadow: 'md'
            }}
          >
            🛒 Comprar
          </Button>
          <Button
            as={Link}
            to={`/detalle/${items.id}`}
            variant="outline"
            colorScheme="blue"
            size="sm"
            flex="1"
            fontWeight="medium"
            _hover={{
              transform: 'translateY(-1px)',
              boxShadow: 'md'
            }}
          >
            👁️ Ver más
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;