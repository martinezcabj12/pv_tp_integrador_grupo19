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
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/products/productsSlice";
import { useToastManager } from "../hooks/useToastManager";
import RatingStars from "./RatingStars";
import FavButton from "./FavButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductEditDrawer from "./ProductEditDrawer";
import {
  updateProductAsync,
  deleteProductAsync,
} from "../redux/products/productsSlice";
import ConfirmDialog from "./ConfirmDialog";

// Animación para el corazón cuando se marca como favorito
const heartPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const ProductCard = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showFavoriteToast, showSuccessToast, showErrorToast } =
    useToastManager();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(items.id);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Eliminar producto con confirmación y feedback
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const resultAction = await dispatch(deleteProductAsync(items.id));
      if (deleteProductAsync.fulfilled.match(resultAction)) {
        showSuccessToast(
          "Producto eliminado",
          `El producto "${items.title}" fue eliminado correctamente.`,
        );
      } else {
        showErrorToast(
          resultAction.payload ||
            "No se pudo eliminar el producto. Intenta nuevamente.",
        );
      }
    } catch (error) {
      showErrorToast("No se pudo eliminar el producto. Intenta nuevamente.");
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  // Abrir/cerrar drawer de edición
  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  // Favoritos con animación y feedback
  const handleFavoriteClick = () => {
    const wasAlreadyFavorite = isFavorite;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    if (navigator.vibrate) {
      navigator.vibrate(wasAlreadyFavorite ? [50] : [100, 50, 100]);
    }
    dispatch(toggleFavorite(items.id));
    showFavoriteToast(items.id, !wasAlreadyFavorite);
  };

  // Badge de categoría
  const getCategoryColor = (category) => {
    const colors = {
      electronics: "blue",
      jewelery: "purple",
      "men's clothing": "green",
      "women's clothing": "pink",
    };
    return colors[category] || "gray";
  };

  // Disponibilidad
  const getAvailabilityStatus = (rating) => {
    if (!rating) return { status: "Disponible", color: "green" };
    const count = rating.count;
    if (count > 200) return { status: "Muy popular", color: "blue" };
    if (count > 100) return { status: "Popular", color: "green" };
    if (count < 50) return { status: "Pocas unidades", color: "orange" };
    return { status: "Disponible", color: "green" };
  };

  // Navegar a detalle
  const handleVerDetalle = () => {
    sessionStorage.setItem("storeScroll", window.scrollY);
    navigate(`/detalle/${items.id}`);
  };

  const availability = getAvailabilityStatus(items.rating);

  // Guardar edición
  const handleEditSave = async (editData) => {
    setIsSubmitting(true);
    await dispatch(updateProductAsync({ ...editData, id: items.id }));
    setIsSubmitting(false);
    setIsEditOpen(false);
  };

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
        transform: "translateY(-4px)",
        boxShadow: "2xl",
        borderColor: "blue.200",
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
          _hover={{ boxShadow: "lg" }}
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
          _hover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <CardBody display="flex" flexDirection="column" p={4} flex="1">
        {/* Título con tooltip */}
        <Tooltip label={items.title} hasArrow placement="top" openDelay={500}>
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
        {items.rating?.rate && (
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
            onClick={handleEditOpen}
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "md",
            }}
          >
            ✏ Editar
          </Button>
          <Button
            onClick={handleVerDetalle}
            variant="outline"
            colorScheme="blue"
            size="sm"
            flex="1"
            fontWeight="medium"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "md",
            }}
          >
            👁 Ver más
          </Button>
          <Button
            onClick={() => setIsConfirmOpen(true)}
            variant="outline"
            colorScheme="red"
            size="sm"
            flex="1"
            fontWeight="medium"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "md",
            }}
            isLoading={isDeleting}
          >
            🗑 Eliminar
          </Button>
        </Box>
      </CardFooter>

      <ProductEditDrawer
        isOpen={isEditOpen}
        onClose={handleEditClose}
        product={items}
        onSave={handleEditSave}
        isSubmitting={isSubmitting}
      />

      {/* Confirmación de eliminación reutilizable */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar producto?"
        message={`¿Seguro que deseas eliminar "${items.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        confirmColor="red"
        isLoading={isDeleting}
      />
    </Card>
  );
};

export default ProductCard;
