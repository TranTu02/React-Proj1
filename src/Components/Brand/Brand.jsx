import React, { useState } from "react";
import * as DATA from "../Assets/data.js";
import style from "./Brand.module.css";
import { useNavigate } from "react-router-dom";

function Brand() {
  const navigate = useNavigate();
  const listBrand = DATA.listBrand;
  const data = listBrand.slice(1, 10);
  const routeBrand = (BrandID) => {
    navigate("/CategoryPage/Category/" + BrandID + "/Type/Others");
  };
  return (
    <div className={style.BrandContainer}>
      <h2>Thương hiệu nổi bật</h2>
      <div className={style.ListBrand}>
        {data.map((item, index) => (
          <img src={item.Logo} onClick={() => routeBrand(item.BrandID)} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Brand;
