import { useSelector } from 'react-redux';
import FavCard from './components/FavCard';
import { SimpleGrid, Text, Box } from '@chakra-ui/react';


const Favoritos = () => {
  const favorites = useSelector((state) => state.products.favorites);
  const items = useSelector((state) => state.products.items);
  const favoritos = items.filter(producto => favorites.includes(producto.id));

  if (!favoritos || favoritos.length === 0) {
    return (
      <Box minH="70vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="xl" color="gray.500">No hay favoritos para mostrar.</Text>
      </Box>
    );
  }

  return (
    <Box px={2} width="100%" minH="70vh" display="flex" flexDirection="column" justifyContent="flex-start">
      <SimpleGrid 
        gap={6} 
        marginLeft={3} 
        mt={4}
      >
        {favoritos.map((favorito) =>
          <FavCard key={favorito.id} favorito={favorito} />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Favoritos;