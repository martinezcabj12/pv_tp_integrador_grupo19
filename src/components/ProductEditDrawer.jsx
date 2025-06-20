import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Textarea
} from "@chakra-ui/react";

const ProductEditDrawer = ({ isOpen, onClose, product, onSave, isSubmitting }) => {
  const [editData, setEditData] = useState(product || {});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) setEditData(product || {});
  }, [product,isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  const handleConfirmEdit = () => {
    setIsAlertOpen(false);
    onSave(editData);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent display="flex" flexDirection="column" height="100%">
          <DrawerCloseButton />
          <DrawerHeader>Editar producto</DrawerHeader>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <DrawerBody flex="1">
              <FormControl mb={3}>
                <FormLabel>Título</FormLabel>
                <Input name="title" value={editData.title || ""} onChange={handleChange} required />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Precio</FormLabel>
                <Input name="price" type="number" value={editData.price || ""} onChange={handleChange} required />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleChange}
                  required
                  minH="100px"
                  maxH="200px"
                  resize="vertical"
                  overflowY="auto"
                />
              </FormControl>
              {/* Agrega más campos según tu modelo */}
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={isSubmitting}>
                Guardar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      {/* AlertDialog de confirmación */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirmar edición
          </AlertDialogHeader>
          <AlertDialogBody>
            ¿Estás seguro de que quieres guardar los cambios en este producto?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleConfirmEdit} ml={3} isLoading={isSubmitting}>
              Sí, guardar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductEditDrawer;
