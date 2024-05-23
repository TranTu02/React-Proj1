import React, { useContext } from "react";
import style from "./Item.module.css";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Contexts/CartContext";
import img from "../Assets/Image/loc-4-hop-sua-tuoi-tiet-trung-nguyen-chat-khong-duong-th-true-milk-180ml-202108121600325528.jpg";
const Item = ({ product }) => {
  const navigate = useNavigate();
  // định dạng tiền tệ
  let formatter = new Intl.NumberFormat("en-US");
  const routeDetail = () => {
    navigate("/Detail/" + product.ProductID);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { addToCart } = useContext(ShopContext);
  const handleAddToCart = () => {
    if (product.Stock === 0) {
      alert("Sản phẩm tạm hết hàng!");
    } else addToCart(product.ProductID, 1);
  };
  return (
    <div className={style.ItemContainer}>
      <img src={product?.Image} onClick={routeDetail} />
      <div className={style.Infor}>
        <h2 onClick={routeDetail}>{product?.ProductName}</h2>
        <h4>{product?.PresentID !== undefined || product?.present !== undefined ? "Mua để nhận quà" : ""}</h4>
        <div className={style.price}>
          {product?.Reduce === undefined ? (
            <h3>{formatter.format(product?.Price)} ₫</h3>
          ) : (
            <>
              <h3>{formatter.format((product?.Price * (1 - product?.Reduce)).toFixed(0))} ₫</h3>
              <h3 className={style.original}>{formatter.format(product?.Price)} ₫</h3>
            </>
          )}
        </div>
        <button onClick={handleAddToCart}>Thêm vào giỏ</button>
      </div>
    </div>
  );
};

export default Item;
