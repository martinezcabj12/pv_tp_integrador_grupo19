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
} from "@chakra-ui/react";

const categorias = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const FormularioProducto = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) return;
    dispatch(
      createProduct({
        ...form,
        price: Number.parseFloat(form.price),
      }),
    );
    setForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="400px" mx="auto" p={4}>
      <FormControl mb={3} isRequired>
        <FormLabel>Título</FormLabel>
        <Input name="title" value={form.title} onChange={handleChange} />
      </FormControl>
      <FormControl mb={3} isRequired>
        <FormLabel>Precio</FormLabel>
        <Input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3} isRequired>
        <FormLabel>Categoría</FormLabel>
        <Select name="category" value={form.category} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Imagen (URL)</FormLabel>
        <Input name="image" value={form.image} onChange={handleChange} />
      </FormControl>
      {error && (
        <Alert status="error" mb={3}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        colorScheme="blue"
        isLoading={loading}
        loadingText="Guardando..."
        isDisabled={loading}
        width="100%"
      >
        Crear producto
      </Button>
    </Box>
  );
};

export default FormularioProducto;
