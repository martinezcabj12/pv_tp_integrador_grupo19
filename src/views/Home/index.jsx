import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Home = () => {
  const { items } = useSelector((state) => state.products);
  console.log(items); // Para ver los productos en consola

  return (
    <>
      <Heading color={"red"}>Home</Heading>
    </>
  );
};

export default Home;
