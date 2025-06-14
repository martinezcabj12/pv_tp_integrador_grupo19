import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Link as ChakraLink,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Favoritos", path: "/favoritos" },
  { name: "Formulario", path: "/Formulario" },
];

const NavLink = ({ path, children }) => (
  <ChakraLink
    as={RouterLink}
    to={path}
    px={3}
    py={2}
    gap={5}
    mx={5}
    rounded={"md"}
    _hover={{ textDecoration: "none", bg: "black" }}
    _activeLink={{ fontWeight: "bold", color: "teal.300" }}
  >
    {children}
  </ChakraLink>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} mt={4} color="white" borderRadius={"2rem"}>
      <Flex
        h={16}
        px={4}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image
          height="50px"
          src="/logo.png"
          alt="Logo"
          pr={8}
          filter="drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.45))"
        />

        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Abrir menú"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
        />

        <HStack
          spacing={4}
          fontFamily={"Onyra"}
          display={{ base: "none", md: "flex" }}
        >
          {links.map((link) => (
            <NavLink key={link.name} path={link.path}>
              {link.name}
            </NavLink>
          ))}
        </HStack>
      </Flex>

      {isOpen ? (
        <Box
          pb={4}
          fontFamily={"Onyra"}
          letterSpacing={2}
          display={{ md: "none" }}
        >
          <Stack as={"nav"} spacing={2}>
            {links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
export default Navbar;
