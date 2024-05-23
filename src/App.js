import SetRem from "./Contexts/SetRem.jsx";
import style from "./App.module.css";
import { BrowserRouter, useParams, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import NavBar from "./Components/Navbar/NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import MainPage from "./Pages/MainPage";
import CategoryPage from "./Pages/CategoryPage.jsx";
import DetailPage from "./Pages/DetailPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import LoginSignUp from "./Pages/Login-SignUp.jsx";
import Location from "./Components/Location/Location.jsx";
import { AccountPage } from "./Pages/AccountPage.jsx";
import { Adminpage } from "./Pages/Adminpage.jsx";
import { initializeData, listProducts, listSaleEvents, updateApi } from "./Components/Assets/data.js";
import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className={style.Page}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/SearchPage/:searchTerm" element={<SearchPage />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />
          <Route path="/CategoryPage/:CategoryID?/:BrandID?/:TypeID?/:Others?" element={<CategoryPage />} />
          <Route path="/Admin" element={<Adminpage />} />
          <Route path="/Login" element={<LoginSignUp />}>
            <Route path="/Login/:path" element={<LoginSignUp />} />
          </Route>
          <Route path="/Account" element={<AccountPage />} />
          <Route path="/Detail/:ProductID" element={<DetailPage />} />
          <Route path="/Cart/Payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
