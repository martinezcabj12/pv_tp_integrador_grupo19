import { Box, Text, HStack, Link as ChakraLink, Image } from "@chakra-ui/react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer>
    <Box
      as="footer"
      bg="blue.500"
      color="white"
      py={4}
      borderRadius="2rem 2rem 0 0"
      width="100%"
      position="relative"
    >
      <HStack
        justifyContent="center"
        spacing={{ base: 1, md: 8 }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          height={{ base: "2rem", md: "2rem" }}
          objectFit="contain"
          mb={{ base: 2, md: 0 }}
        />
        <Text fontSize={{ base: "12px", md: "md" }} textAlign="center">
          &copy; {new Date().getFullYear()} Grupo 19 - Programación Visual
        </Text>
        <ChakraLink
          href="https://github.com/martinezcabj12/pv_tp_integrador_grupo19"
          isExternal
          color="white"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={2}
          fontSize={{ base: "sm", md: "md" }}
          mt={{ base: 2, md: 0 }}
        >
          <FaGithub /> GitHub
        </ChakraLink>
        <ChakraLink
          href="/contacto"
          color="white"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={2}
          fontSize={{ base: "sm", md: "md" }}
          mt={{ base: 2, md: 0 }}
        >
          <FaEnvelope /> Contacto
        </ChakraLink>
      </HStack>
    </Box>
  </footer>
);

export default Footer;
