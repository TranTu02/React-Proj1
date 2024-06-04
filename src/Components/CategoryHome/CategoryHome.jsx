import React, { useEffect, useState } from "react";
import style from "./CategoryHome.module.css";
import Item from "../Item/Item.jsx";
import * as DATA from "../Assets/data.js";
import { useNavigate } from "react-router-dom";

function CategoryHome({ CategoryID, CategoryName, BrandID }) {
  const in4 = CategoryID !== undefined ? DATA.listProducts?.filter((obj) => obj.CategoryID === parseInt(CategoryID)) : DATA.listProducts?.filter((obj) => obj.BrandID === parseInt(BrandID));
  const data = in4.sort((a, b) => b.ProductID - a.ProductID).slice(0, 20);
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
    navigate("/CategoryPage/" + CategoryID + "/Brand/Type/Others");
  };
  return (
    <div className={style.ListContainer}>
      <div className={style.ListTitle}>
        <h3 onClick={routeCategory}>{CategoryName}</h3>
        <div>
          <div className={style.Prev} onClick={prevPage}>
            &#10094;
          </div>
          <div className={style.Next} onClick={nextPage}>
            &#10095;
          </div>
        </div>
      </div>
      <div className={style.ListItem}>
        {currentItems.map((item, index) => (
          <Item product={item} key={index} />
        ))}
        {blankItem()}
      </div>
    </div>
  );
}

export default CategoryHome;
