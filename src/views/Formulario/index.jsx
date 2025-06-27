import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../features/products/productsSlice";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Alert,
  SimpleGrid, 
  VStack,     
  Heading,    
  Image,      
  Text,       
  InputGroup, 
  InputLeftElement, 
} from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa"; 
import { useToastManager } from "../../hooks/useToastManager";
const categorias = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const FormularioProducto = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const { showErrorToast, showSuccessToast } = useToastManager();
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [imgError, setImgError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") setImgError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.image) {
      showErrorToast("Por favor, llena todos los campos requeridos.");
      return;
    }
    if (imgError) {
      showErrorToast("No se pudo cargar la imagen. Verifica la URL antes de crear el producto.");
      return;
    }
    dispatch(
      createProduct({
        ...form,
        price: Number.parseFloat(form.price),
      }),
    );
    showSuccessToast("Producto Creado", `El producto "${form.title}" fue creado exitosamente.`);
    setForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setImgError(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="1000px" mx="auto" p={8}>
      <Heading as="h1" size="xl" mb={8} textAlign="center" bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">
        Crear Nuevo Producto
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>

        {/* Columna Izquierda: Información Principal */}
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Precio</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                <FaDollarSign />
              </InputLeftElement>
              <Input name="price" type="number" value={form.price} onChange={handleChange} pl={10} />
            </InputGroup>
          </FormControl>
          <FormControl >
            <FormLabel>Categoría</FormLabel>
            <Select name="category" value={form.category} onChange={handleChange} placeholder="Seleccionar categoría">
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </FormControl>
        </VStack>

        {/* Columna Derecha: Imagen y Vista Previa */}
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Imagen (URL)</FormLabel>
            <Input name="image" value={form.image} onChange={handleChange} />
          </FormControl>
          <FormLabel>Vista Previa</FormLabel>
          <Box w="100%" h="250px" borderWidth={2} borderRadius="md" borderColor="gray.200" borderStyle="dashed" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
            {form.image ? (
              <Image
                src={form.image}
                alt="Vista previa"
                maxH="100%"
                objectFit="contain"
                onError={() => setImgError(true)}
                onLoad={() => setImgError(false)}
              />
            ) : (
              <Text color="gray.400">La imagen aparecerá aquí</Text>
            )}
          </Box>
          {imgError && (
            <Text color="red.500" fontSize="sm" mt={2}>
              No se pudo cargar la imagen. Verifica la URL.
            </Text>
          )}
        </VStack>
      </SimpleGrid>

      {/* El Alert de error de Redux sigue siendo útil para errores del servidor */}
      {error && (
        <Alert status="error" mt={6}>
          Error del servidor: {error}
        </Alert>
      )}

      <Button
        type="submit"
        colorScheme="blue"
        isLoading={loading}
        loadingText="Guardando..."
        width="full"
        mt={8}
        size="lg"
      >
        Crear producto
      </Button>
    </Box>
  );
};

export default FormularioProducto;
