import React, { useState, useEffect, useMemo } from "react";
import style from "./HotSale.module.css";
import Item from "../Item/Item.jsx";
import img from "../Assets/camera.png";
import * as DATA from "../Assets/data.js";
import { useNavigate } from "react-router-dom";
import Category from "../Category/Category.jsx";
const CountDown = (ExpirationDate) => {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      //const nextWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));
      const timeRemainingValue = ExpirationDate - currentDate;

      const days = Math.floor(timeRemainingValue / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemainingValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemainingValue % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemainingValue % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeRemaining;
};

function HotSale({ DiscountID }) {
  const timeRemaining = CountDown(new Date(DATA.listSaleEvents.find((obj) => obj.DiscountID === parseInt(DiscountID)).End));
  const arrProduct = DATA.ListProductsDetail().filter((obj) => obj.Reduce !== undefined);
  const data = arrProduct.slice(0, 20);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage > data.length ? (currentPage - 1) * itemsPerPage + (data.length % 6) : currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const blankItem = () => {
    let lst = [];
    for (;;) {
      if (data.length + lst.length < 6) {
        console.log("a");
        lst.push(<div style={{ width: "174rem", margin: "20rem 11rem", padding: "5rem" }}></div>);
      } else {
        break;
      }
    }
    return lst;
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const navigate = useNavigate();
  const routeCategory = () => {
    navigate("/CategoryPage/Category/Brand/Type/Sale");
  };
  if (timeRemaining.seconds < 0) return <></>;
  else
    return (
      <div className={style.HotSaleContainer}>
        <div onClick={routeCategory} className={style.HotSaleBanner}>
          <h3>Hot sale trong tháng</h3>
          <div className={style.CDContainer}>
            <h3>Kết thúc sau</h3>
            <ul>
              <li>{timeRemaining.days * 24 + timeRemaining.hours}</li>
              <li>{timeRemaining.minutes}</li>
              <li>{timeRemaining.seconds}</li>
            </ul>
          </div>
        </div>
        <div className={style.HotSaleItem}>
          <div className={style.Prev} onClick={prevPage}>
            &#10094;
          </div>
          <div className={style.Next} onClick={nextPage}>
            &#10095;
          </div>
          {currentItems.map((item, index) => (
            <Item product={item} key={index} />
          ))}
          {blankItem()}
        </div>
      </div>
    );
}

export default HotSale;
