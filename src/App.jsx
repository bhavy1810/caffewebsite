import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import Yourorder from "./pages/Yourorder";
import OrderAll from "./pages/OrderAll";


export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/yourorder" element={<Yourorder />} />
          <Route path="*" element={<Home />} />
          <Route path="/orderall" element={<OrderAll />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
