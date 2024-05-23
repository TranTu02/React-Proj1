import React from "react";
import style from "./SlideShow.module.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const SlideImage = ({ src, CategoryID, BrandID, ProductTypeID, Other, styleImg }) => {
  const navigate = useNavigate();
  const routeCategoryFilter = (C, B, T, O) => {
    console.log(`/CategoryPage/${C !== "" ? C : "Category"}/${B !== "" ? B : "Brand"}/${T !== "" ? T : "Type"}/${O !== "" ? O : "Others"}`);
    navigate(`/CategoryPage/${C !== "" ? C : "Category"}/${B !== "" ? B : "Brand"}/${T !== "" ? T : "Type"}/${O !== "" ? O : "Others"}`);
  };
  return <img className={style.ImgBanner} src={src} style={styleImg} onClick={() => routeCategoryFilter(CategoryID, BrandID, ProductTypeID, Other)} />;
};

export default SlideImage;
