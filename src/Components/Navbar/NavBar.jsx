import React, { useState, useRef } from "react";
import style from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import CategoryImage from "../Assets/category.png";
import img from "../Assets/camera.png";
import Contact from "../Assets/contacting.png";
import News from "../Assets/email.png";
import * as DATA from "../Assets/data.js";

function NavBar() {
  const navigate = useNavigate();
  const DDlist1 = useRef(true);
  const routeCategory = (CateID, TypeID) => {
    if (CateID === undefined || TypeID === undefined)
      navigate("/CategoryPage/Category/Brand/Type/AllProducts");
    else if (TypeID !== "") {
      navigate("/CategoryPage/Category/Brand/" + TypeID + "/Others");
      DDlist1.current = false;
    } else if (TypeID === "" && CateID === "")
      navigate("/CategoryPage/Category/Brand/Type/Sale");
    else if (DDlist1.current === true) {
      navigate("/CategoryPage/" + CateID + "/Brand/Type/Others");
    } else {
      DDlist1.current = true;
    }
  };
  const listCat = DATA.listCategories;
  return (
    <div className={style.Navbar}>
      <div className={style.Category}>
        <img src={CategoryImage} alt="Category" />
        <h3 onClick={() => routeCategory()}>Danh mục sản phẩm</h3>
        <ul className={style.DropList1}>
          <li onClick={() => routeCategory()}>
            <a>Tất cả sản phẩm</a>
          </li>
          <li onClick={() => routeCategory("", "")}>
            <a>Sản phẩm khuyến mãi</a>
          </li>
          {listCat.map((item) => {
            return (
              <li onClick={() => routeCategory(item.CategoryID, "")}>
                <a>{item.CategoryName}</a>
                <div className={style.DropList2} key={item.CategoryID}>
                  <ul>
                    {DATA.listTypesByCategory(item.CategoryID).map((type) => {
                      return (
                        <li
                          onClick={() => routeCategory("", type.ProductTypeID)}
                        >
                          <a>{type.ProductType}</a>
                        </li>
                      );
                    })}
                  </ul>
                  <img src={item.CategoryIllustration} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.link}>
        <div className={style.News}>
          <img src={News} />
          <a href="#">Tin tức E'Mart</a>
        </div>
        <div className={style.Contact}>
          <img src={Contact} />
          <p>Tư vấn mua hàng</p>
          <div className={style.ContactDetail}>
            <p>Liên hệ: +84 xxx yyy zzz</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
