import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { I18nProvider } from "./context/I18nContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EnergyPage from "./pages/EnergyPage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <I18nProvider>
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
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
            <CookieBanner />
          </BrowserRouter>
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#0B1736",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 0,
                color: "#fff",
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </CartProvider>
      </I18nProvider>
    </div>
  );
}

export default App;
