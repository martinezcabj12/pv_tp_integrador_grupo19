import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import Footer from "./components/Footer";
import Favoritos from "./views/Favoritos";

function App() {
  return (
    <BrowserRouter>
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/formulario" element={<h1>Formulario</h1>} />
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
