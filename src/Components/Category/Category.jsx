import React, { useState, useEffect, useCallback } from "react";
import style from "./Category.module.css";
import down from "../Assets/down-arrow.png";
import sort from "../Assets/sort.png";
import * as DATA from "../Assets/data.js";
import bannerAll from "../Assets/banner2.jpg";
import bannerSale from "../Assets/discount.jpg";
import Item from "../Item/Item.jsx";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Assets/Banner/OIP (1).jpg";

function Category({ CategoryID, BrandID, TypeID, Others }) {
  const [lstCategories, setLstCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      console.log(DATA.ListProductsDetail());
      setLstCategories(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  let banner = bannerAll;
  const navigate = useNavigate();
  let title = "Tất cả sản phẩm";
  const filterList = () => {
    if (Others !== "Others") {
      if (Others === "AllProducts") {
        title = "Tất cả sản phẩm";
        banner = bannerAll;
        return DATA.ListProductsDetail();
      } else {
        title = "Sản phẩm khuyến mại";
        banner = bannerSale;
        return DATA.ListProductsDetail().filter((obj) => obj.Reduce !== undefined);
      }
    } else if (TypeID !== "Type") {
      if (DATA.listCategories.length !== 0) {
        banner = DATA.listCategories?.find((obj) => DATA.listCategory_Type.find((type) => type.ProductTypeID === parseInt(TypeID)).CategoryID === obj.CategoryID).CategoryIllustration;
        title = DATA.listCategory_Type?.find((obj) => obj.ProductTypeID === parseInt(TypeID)).ProductType;
      }
      return DATA.ListProductsDetail().filter((obj) => obj.ProductTypeID === parseInt(TypeID));
    } else if (BrandID !== "Brand") {
      if (DATA.listCategories.length !== 0) {
        banner = bannerAll;
        title = DATA.listBrand.find((obj) => obj.BrandID === parseInt(BrandID)).BrandName;
      }
      return DATA.listProductsByBrand(parseInt(BrandID));
    } else if (CategoryID !== "Category") {
      if (DATA.listCategories.length !== 0) {
        banner = DATA.listCategories.find((obj) => obj.CategoryID === parseInt(CategoryID)).CategoryIllustration;
        title = DATA.listCategories.find((obj) => obj.CategoryID === parseInt(CategoryID)).CategoryName;
      }

      return DATA.ListProductsDetail().filter((obj) => obj.CategoryID === parseInt(CategoryID));
    } else {
      return DATA.ListProductsDetail();
    }
  };
  const data = filterList();

  const [currentPage, setCurrentPage] = useState(2);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage > data.length ? (currentPage - 1) * itemsPerPage + (data.length % 5) : currentPage * itemsPerPage;
  const currentItems = data.slice(0, indexOfLastItem);
  const handleMore = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const showMoreButton = indexOfLastItem < data.length;

  const [showCategoryList, setShowCategoryList] = useState(true);

  const handleCategoryList = () => {
    setShowCategoryList(!showCategoryList);
  };

  const [showBrandList, setShowBrandList] = useState(true);

  const handleBrandList = () => {
    setShowBrandList(!showBrandList);
  };
  const [showFilterList, setShowFilterList] = useState(false);

  const handleFilterList = () => {
    setShowFilterList(!showFilterList);
  };

  const [titleFilterSort, setTitleFilterSort] = useState("Sắp xếp");
  const handleSortList = (props) => {
    switch (props) {
      case "PriceAscending":
        setTitleFilterSort("Từ thấp - cao");
        data.sort((a, b) => a.Price - b.Price);
        break;
      case "PriceDescending":
        setTitleFilterSort("Từ cao - thấp");
        data.sort((a, b) => b.Price - a.Price);
        break;
      case "NameDescending":
        setTitleFilterSort("Từ Z-A");
        data.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
        break;
      default:
        setTitleFilterSort("Từ A-Z");
        data.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
        break;
    }
    setShowFilterList(!showFilterList);
  };

  const routeCategoryFilter = (C, B, T, O) => {
    navigate(`/CategoryPage/${C !== "" ? C : "Category"}/${B !== "" ? B : "Brand"}/${T !== "" ? T : "Type"}/${O !== "" ? O : "Others"}`);
  };

  return (
    <div className={style.CategoryContainer}>
      <div className={style.FilterContainer}>
        <div className={style.Category}>
          <div className={style.CategoryTitle} onClick={handleCategoryList}>
            <h3>Danh mục sản phẩm</h3>
            <img src={down} width={25} className={showCategoryList ? style.rotate : ""} />
          </div>
          {showCategoryList && (
            <ul>
              <li onClick={() => routeCategoryFilter("", "", "", "AllProducts")}> Tất cả sản phẩm</li>
              <li onClick={() => routeCategoryFilter("", "", "", "Sale")}>Sản phẩm khuyến mại</li>
              {DATA.listCategories.map((item) => (
                <li>
                  <p onClick={() => routeCategoryFilter(item.CategoryID, "", "", "Others")}>{item?.CategoryName}</p>
                  <ul>
                    {DATA.listTypesByCategory(item?.CategoryID).map((type) => {
                      return <li onClick={() => routeCategoryFilter("", "", type?.ProductTypeID, "Others")}>{type.ProductType}</li>;
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={style.Brand}>
          <div className={style.BrandTitle} onClick={handleBrandList}>
            <h3>Thương hiệu</h3>
            <img src={down} width={25} className={showBrandList ? style.rotate : ""} />
          </div>
          {showBrandList && (
            <ul>
              {DATA.listBrand.map((item, index) => (
                <li onClick={() => routeCategoryFilter("", item.BrandID, "", "Others")}>{item.BrandName}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={style.ProductContainer}>
        {/* Fix */}
        <img className={style.Banner} src={banner} />
        <div className={style.Title}>
          <div className={style.HeadingBox}>
            <h2>{title}</h2>
            <span className={style.Count}>
              <b>{data.length}</b> Sản phẩm
            </span>
          </div>
          <div className={style.FilterBox}>
            <div className={style.FilterTitle} onClick={handleFilterList}>
              <img src={sort} height={25} />
              <p>{titleFilterSort}</p>
              <img src={down} height={16} className={showFilterList ? style.rotate : ""} />
            </div>
            {showFilterList && (
              <ul>
                <li onClick={() => handleSortList("df")}>Từ A-Z</li>
                <li onClick={() => handleSortList("NameDescending")}>Từ Z-A</li>
                <li onClick={() => handleSortList("PriceDescending")}>Từ cao-thấp</li>
                <li onClick={() => handleSortList("PriceAscending")}>Từ thấp-cao</li>
              </ul>
            )}
          </div>
        </div>
        <div className={style.Products}>
          {currentItems.map((item, index) => (
            <Item product={item} key={index} />
          ))}
        </div>
        {showMoreButton && (
          <div className={style.BtnMore} onClick={handleMore}>
            <a>Xem thêm sản phẩm</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
