import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./views/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<h1>Favoritos</h1>} />
        <Route path="/formulario" element={<h1>Formulario</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
