import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

const categorias = [
  "Electrónica",
  "Ropa",
  "Hogar",
  "Juguetes",
  "Libros",
  "Otros",
];

const FormularioProducto = () => {
  const [form, setForm] = useState({
    titulo: "",
    precio: "",
    descripcion: "",
    categoria: "",
    imagen: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.titulo ||
      !form.precio ||
      !form.descripcion ||
      !form.categoria ||
      !form.imagen
    ) {
      toast({
        title: "Faltan campos",
        description: "Completá todos los campos antes de enviar.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Producto agregado",
      description: "El producto se agregó correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setForm({
      titulo: "",
      precio: "",
      descripcion: "",
      categoria: "",
      imagen: "",
    });
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="titulo" isRequired>
            <FormLabel>Título</FormLabel>
            <Input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Nombre del producto"
            />
          </FormControl>

          <FormControl id="precio" isRequired>
            <FormLabel>Precio</FormLabel>
            <Input
              name="precio"
              type="number"
              step="0.01"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio (ej: 199.99)"
            />
          </FormControl>

          <FormControl id="descripcion" isRequired>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto"
            />
          </FormControl>

          <FormControl id="categoria" isRequired>
            <FormLabel>Categoría</FormLabel>
            <Select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Seleccioná una categoría"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="imagen" isRequired>
            <FormLabel>URL de la imagen</FormLabel>
            <Input
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="https://..."
            />
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Agregar Producto
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default FormularioProducto;
