import React from "react";
import Account from "../Components/Account/Account";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/Navbar/NavBar";
import SetRem from "../Contexts/SetRem";

export const AccountPage = () => {
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
