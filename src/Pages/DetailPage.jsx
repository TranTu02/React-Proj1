import SetRem from "../Contexts/SetRem.jsx";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header.jsx";
import NavBar from "../Components/Navbar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import Detail from "../Components/Detail/Detail.jsx";
import BreadCrumb from "../Components/BreadCrumb/BreadCrumb.jsx";
import { ListProductsDetail } from "../Components/Assets/data.js";
import { useEffect, useState } from "react";

function DetailPage() {
  const ProductID = parseInt(useParams().ProductID);
  const [time, setTime] = useState(Date.now());
  const prd = ListProductsDetail().find((obj) => obj.ProductID === ProductID);
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
      {prd !== undefined && <Detail Product={prd} />}
      <Footer />
    </div>
  );
}

export default DetailPage;
