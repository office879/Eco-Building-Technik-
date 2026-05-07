import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EnergyPage from "./pages/EnergyPage";

function App() {
  return (
    <div className="App grain" data-testid="app-root">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:slug" element={<ProductDetail />} />
              <Route path="/energie-rechner" element={<EnergyPage />} />
              <Route path="/ueber-uns" element={<About />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </BrowserRouter>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "#0A0A0A",
              border: "1px solid #00FF66",
              borderRadius: 0,
              color: "#fff",
              fontFamily: "Manrope, sans-serif",
            },
          }}
        />
      </CartProvider>
    </div>
  );
}

export default App;
