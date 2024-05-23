import React from "react";
import Account from "../Components/Account/Account";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/Navbar/NavBar";
import SetRem from "../Contexts/SetRem";
import { useEffect, useState } from "react";

export const AccountPage = () => {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <SetRem />
      <Header />
      <NavBar />
      <Account />
      <Footer />
    </div>
  );
};
