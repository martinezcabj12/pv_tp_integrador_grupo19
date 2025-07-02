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
import { FiLogOut } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillHeart, AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
const links = [
  { name: "Inicio", path: "/", icon: <AiFillHome /> },
  { name: "Favoritos", path: "/favoritos", icon: <AiFillHeart /> },
  {
    name: "Crear Producto",
    path: "/formulario",
    icon: <AiOutlinePlusCircle />,
  },
];

const NavLink = ({ path, children, icon }) => (
  <ChakraLink
    as={RouterLink}
    to={path}
    px={3}
    py={2}
    gap={2}
    mx={5}
    rounded={"md"}
    display="flex"
    alignItems="center"
    _hover={{ textDecoration: "none", bg: "black" }}
    _activeLink={{ fontWeight: "bold", color: "teal.300" }}
  >
    {icon}
    {children}
  </ChakraLink>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.auth && state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sessionUser");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box bg="blue.500" px={4} mt={4} mx={2} color="white" borderRadius={"1rem"}>
      <Flex
        h={16}
        px={4}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <ChakraLink as={RouterLink} to="/">
          <Image
            height="50px"
            src="/logo.png"
            alt="Logo de FakeStore"
            title="FakeStore Logo"
            pr={8}
            filter="drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.45))"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
        </ChakraLink>
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
          {user &&
            links.map((link) => (
              <NavLink key={link.name} path={link.path} icon={link.icon}>
                {link.name}
              </NavLink>
            ))}
          {user ? (
            <>
              <Box mx={2} display="flex" alignItems="center">
                Bienvenido, {user.name}
                <IconButton
                  icon={<FiLogOut />}
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                  ml={2}
                  colorScheme="white"
                  variant="outline"
                  size="sm"
                  _hover={{ bg: "red.500", color: "white" }}
                />
              </Box>
            </>
          ) : (
            <>
              <NavLink path="/login">Login</NavLink>
              <NavLink path="/register">Registrarse</NavLink>
            </>
          )}
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
            {user && (
              <>
                {links.map((link) => (
                  <NavLink key={link.name} path={link.path} icon={link.icon}>
                    {link.name}
                  </NavLink>
                ))}
              </>
            )}
            {user ? (
              <>
                <Box mx={2} display="flex" alignItems="center">
                  Bienvenido, {user.name}
                  <IconButton
                    icon={<FiLogOut />}
                    onClick={handleLogout}
                    aria-label="Cerrar sesión"
                    ml={2}
                    colorScheme="white"
                    variant="outline"
                    size="sm"
                    _hover={{ bg: "red.500", color: "white" }}
                  />
                </Box>
              </>
            ) : (
              <>
                <NavLink path="/login">Login</NavLink>
                <NavLink path="/register">Registrarse</NavLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
