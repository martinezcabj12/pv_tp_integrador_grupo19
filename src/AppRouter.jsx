import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Detalle from "./views/Detalle";
import Favoritos from "./views/Favoritos";
import FormularioProducto from "./views/Formulario";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/formulario" element={<FormularioProducto />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            {/* Default */}
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </main>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
