import React, { useEffect, useState } from "react";
import SetRem from "../Contexts/SetRem.jsx";
import Header from "../Components/Header/Header.jsx";
import NavBar from "../Components/Navbar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import Banner from "../Components/Banner/Banner.jsx";
import HotSale from "../Components/HotSale/HotSale.jsx";
import CategoryHome from "../Components/CategoryHome/CategoryHome.jsx";
import Brand from "../Components/Brand/Brand.jsx";
import { listCategories, listSaleEvents } from "../Components/Assets/data.js";

function MainPage() {
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
      <Banner />
      {listSaleEvents.length > 0 && <HotSale DiscountID={listSaleEvents[listSaleEvents.length - 1].DiscountID} />}
      {listCategories.length > 0 && listCategories.sort((a, b) => b.Order - a.Order).map((obj) => <CategoryHome key={obj.CategoryID} CategoryID={obj.CategoryID} CategoryName={obj.CategoryName} />)}
      <Brand />
      <Footer />
    </div>
  );
}

export default MainPage;
