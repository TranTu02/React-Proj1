import React from "react";
import SetRem from "../Contexts/SetRem";
import Header from "../Components/Header/Header";
import NavBar from "../Components/Navbar/NavBar";
import { Admin } from "../Components/Admin/Admin";
import { useEffect, useState } from "react";

export const Adminpage = () => {
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
      <Admin />
    </div>
  );
};
