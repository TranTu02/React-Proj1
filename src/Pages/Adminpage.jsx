import React from "react";
import SetRem from "../Contexts/SetRem";
import Header from "../Components/Header/Header";
import NavBar from "../Components/Navbar/NavBar";
import { Admin } from "../Components/Admin/Admin";

export const Adminpage = () => {
  return (
    <div>
      <SetRem />
      <Header />
      <Admin />
    </div>
  );
};
