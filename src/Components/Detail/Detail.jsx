import React, { useState, useEffect, useContext } from "react";
import style from "./Detail.module.css";
import CategoryHome from "../CategoryHome/CategoryHome.jsx";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Contexts/CartContext.jsx";
import * as DATA from "../Assets/data.js";

function Detail({ Product }) {
  const navigate = useNavigate();
  let formatter = new Intl.NumberFormat("en-US");

  let listPhoto = [
    Product.Image,
    ...DATA.listPhoto
      .filter((obj) => obj.ProductID === Product.ProductID && Product.Image !== obj.ImgSrc)
      .map((obj) => {
        return obj.ImgSrc;
      }),
  ];
  const [MainPhoto, setMainPhoto] = useState(0);
  const brand = Product !== undefined ? Product.BrandID : "";
  const discount = Product.Reduce !== undefined ? Product.Reduce : undefined;
  const isPresent = Product.present !== undefined ? Product.present.ProductID : false;
  let lines = "\n";
  let cmts = DATA.listComment.filter((obj) => obj.ProductID === Product.ProductID);
  const isGroup = DATA.listGroupProducts.find((obj) => obj.ProductID === Product.ProductID) ? DATA.listGroupProducts.find((obj) => obj.ProductID === Product.ProductID).GroupID : false;
  const group = isGroup ? DATA.listGroupProducts.filter((gr) => gr.GroupID === isGroup) : undefined;
  const listType = isGroup
    ? DATA.listProducts.filter((type) => {
        return group.find((obj) => obj.ProductID === type.ProductID);
      })
    : null;

  const [active, setActive] = useState("desc");
  const [display, setDisplay] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State để quản lý việc mở rộng/thu gọn

  useEffect(() => {
    lines = Product.Description.split("\n");
    cmts = DATA.listComment.filter((obj) => obj.ProductID === Product.ProductID);
    setDisplay(
      active === "desc" ? (
        <div className={isExpanded ? style.DescriptionBoxFull : style.DescriptionBox}>
          {lines.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <h3 onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Thu gọn" : "Xem thêm..."}</h3>
        </div>
      ) : (
        <div className={style.CmtBox}>
          {cmts.map((cmt, index) => (
            <div className={style.Cmt} key={index}>
              <span>
                <b>{cmt.Title}</b> - {cmt.Time.toLocaleString()} <br /> <p>{cmt.Comment}</p>
              </span>
            </div>
          ))}
        </div>
      )
    );
  }, [Product, active, isExpanded]);

  const { allProduct, cartItems, addToCart, getTotalCartAmount } = useContext(ShopContext);
  const product = allProduct.find((obj) => obj.ProductID === Product.ProductID);

  const handleMainImg = (img) => {
    setMainPhoto(img);
  };

  const handleType = (productID) => {};

  const handleDesc = () => {
    if (active !== "desc") setActive("desc");
  };

  const handleCmt = () => {
    if (active === "desc") setActive("cmt");
  };

  const [quantity, setQuantity] = useState(1);
  const handleUp = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDown = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const routeCart = () => {
    if (Product.Stock <= 0) {
      alert("Sản phẩm tạm hết hàng");
    } else {
      addToCart(Product.ProductID, quantity);
      navigate("/CartPage");
    }
  };

  return (
    <div className={style.DetailPage}>
      {Product !== undefined ? (
        <>
          <div className={style.DetailContainer}>
            <div className={style.ProductDetailContainer}>
              <div className={style.Illustration}>
                <img src={listPhoto[MainPhoto]} className={style.MainPhoto} />
                <div className={style.PhotoList}>
                  {listPhoto.map((photo, index) => (
                    <img className={listPhoto[MainPhoto] === photo ? style.Display : ""} onClick={() => handleMainImg(index)} src={photo} key={index} />
                  ))}
                </div>
              </div>
              <div className={style.Content}>
                <div className={style.HeadingBox}>
                  <h1>{Product.ProductName}</h1>
                  <span className={style.Infor}>
                    Mã sản phẩm: <a>{Product.ProductID}</a>
                  </span>
                  <span className={style.Infor}>
                    Tình trạng: <a>{Product.Stock > 0 ? "Còn " + Product.Stock + " sản phẩm" : "Hết hàng"}</a>
                  </span>
                  <span className={style.Infor}>
                    Thương hiệu: <a>{DATA.listBrand.find((obj) => obj.BrandID === parseInt(brand)).BrandName}</a>
                  </span>
                </div>
                <div className={style.DetailLayout}>
                  <div className={style.DetailBox}>
                    <div className={style.PriceBox}>
                      <span className={style.Title}>Giá:</span>
                      <span className={style.Price}>{formatter.format(discount === undefined ? Product.Price : (Product.Price * (1 - discount)).toFixed(0))} ₫</span>
                      {discount !== undefined ? (
                        <>
                          <span className={style.Original}>{formatter.format(Product.Price)} ₫</span>
                          <span className={style.Recent}>-{discount * 100}%</span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className={style.Overview}>
                      <span>{Product.Overview}</span>
                    </div>

                    <form className={style.Variant}>
                      <span className={style.Title}>Loại: </span>
                      <div className={style.Type}>
                        {false ? (
                          listType.map((type, index) => (
                            <>
                              <input type="radio" id={type.ProductID} name="options" value={type.ProductID} key={index} />
                              <label
                                htmlFor={type.ProductID}
                                onClick={() => {
                                  handleType(type.ProductID);
                                }}
                              >
                                {type.CalculationUnit}
                              </label>
                            </>
                          ))
                        ) : (
                          <>
                            <input type="radio" id={Product.ProductID} name="options" value={Product.ProductID} checked={true} />
                            <label htmlFor={Product.ProductID} onClick={() => handleType(Product.ProductID)}>
                              {Product.CalculationUnit}
                            </label>
                          </>
                        )}
                      </div>
                    </form>

                    <div className={style.Quantity}>
                      <span className={style.Title}>Số lượng:</span>
                      <button type="button" onClick={handleDown}>
                        -
                      </button>
                      <input type="text" value={quantity}></input>
                      <button type="button" onClick={handleUp}>
                        +
                      </button>
                    </div>
                    {isPresent && (
                      <div className={style.Present}>
                        <img src={DATA.listProducts.find((obj) => obj.ProductID === Product.present.ProductID).Image} width={40} height={40} />
                        <p>
                          Mua {Product.Require} sản phẩm {Product.ProductName} để nhận {Product.present.Quantity} sản phẩm{" "}
                          {DATA.listProducts.find((obj) => obj.ProductID === Product.present.ProductID).ProductName} miễn phí.
                        </p>
                      </div>
                    )}
                    <div className={style.Action}>
                      <div
                        className={style.AddCart}
                        onClick={() => {
                          Product.Stock > 0 ? addToCart(Product.ProductID, quantity) : alert("Sản phẩm tạm hết hàng!");
                        }}
                      >
                        <span>THÊM VÀO GIỎ</span>
                      </div>
                      <div className={style.Buy} onClick={routeCart}>
                        <span>MUA NGAY</span>
                      </div>
                    </div>
                  </div>
                  <div className={style.DelivelyBox}>
                    <span className={style.Title}>Chính sách bán hàng</span>
                    <div className={style.DelivelyItem}>
                      <img src="https://www.pxpng.com/public/uploads/preview/-31638573690o4d9jxqwgy.png" />
                      <p>Cam kết 100% chính hãng</p>
                    </div>
                    <div className={style.DelivelyItem}>
                      <img src="https://www.pxpng.com/public/uploads/preview/-31638573690o4d9jxqwgy.png" />
                      <p>Hỗ trợ 24/7</p>
                    </div>
                    <span className={style.Title}>Thông tin thêm</span>
                    <div className={style.DelivelyItem}>
                      <img src="https://www.pxpng.com/public/uploads/preview/-31638573690o4d9jxqwgy.png" />
                      <p>Mở hộp kiểm tra nhận hàng</p>
                    </div>
                    <div className={style.DelivelyItem}>
                      <img src="https://www.pxpng.com/public/uploads/preview/-31638573690o4d9jxqwgy.png" />
                      <p>Đổi trả trong 7 ngày</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.DescriptionContainer}>
              <div className={style.NavTabs}>
                <p className={active === "desc" ? style.Active : style.Tab} onClick={handleDesc}>
                  MÔ TẢ SẢN PHẨM
                </p>
                <p className={active === "cmt" ? style.Active : style.Tab} onClick={handleCmt}>
                  NHẬN XÉT
                </p>
              </div>
              {display}
            </div>
          </div>
          <div onClick={() => setMainPhoto(0)}>
            <CategoryHome BrandID={parseInt(Product.BrandID)} CategoryName="SẢN PHẨM CÙNG THƯƠNG HIỆU" />
          </div>
          <div onClick={() => setMainPhoto(0)}>
            <CategoryHome CategoryID={parseInt(Product.CategoryID)} CategoryName="SẢN PHẨM LIÊN QUAN" />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(Detail);
