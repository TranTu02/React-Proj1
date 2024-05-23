import Cart from "../Components/Cart/Cart";
import BreadCrumb from "../Components/BreadCrumb/BreadCrumb.jsx";
import SetRem from "../Contexts/SetRem.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header/Header.jsx";
import NavBar from "../Components/Navbar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import { useEffect, useState } from "react";

function CartPage() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <SetRem />
      <Header />
      <NavBar />
      <Cart />
      <Footer />
    </div>
  );
}

export default CartPage;
