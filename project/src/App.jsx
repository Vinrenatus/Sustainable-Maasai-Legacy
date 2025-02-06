import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import About from "./components/About";

const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Story = lazy(() => import("./pages/Story"));
const Contact = lazy(() => import("./pages/Contact"));
const BecomeWarrior = lazy(() => import("./pages/BecomeWarrior"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const Store = lazy(() => import("./pages/Store"));
const Cart = lazy(() => import("./pages/Cart"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SearchResults = lazy(() => import("./pages/SearchResults"));

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const Home = () => (
  <>
    <Hero />
    <FeaturedProducts />
    <About />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/story" element={<Story />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/become-warrior" element={<BecomeWarrior />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
