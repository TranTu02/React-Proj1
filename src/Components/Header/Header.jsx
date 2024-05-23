import styles from "./Header.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import PinMapIcon from "../Assets/pin-map.png";
import Cart from "../Assets/shopping-cart.png";
import User from "../Assets/user.png";
import { ShopContext } from "../../Contexts/CartContext.jsx";
import { listAccount, listLocations } from "../Assets/data.js";
import Location from "../Location/Location.jsx";

function Header() {
  const navigate = useNavigate();
  const { getTotalCartItems, currentLocation, phoneNumber } = useContext(ShopContext);
  const [isDisplayPinMap, setIsDisplayPinMap] = useState(false);
  const handlePinMap = () => {
    setIsDisplayPinMap(!isDisplayPinMap);
  };
  const [accountName, setaccountName] = useState();

  const routeLogin = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/Login");
  };
  const routeHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };
  const routeCart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/CartPage");
  };
  const routeAccount = () => {
    navigate("/Account");
  };
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.HeaderLogo} onClick={routeHome}>
          <h1>E'Mart</h1>
          <h3>Điểm đến mua sắm hoàn hảo</h3>
        </div>
        <SearchBar />
        <div className={styles.Location} onClick={handlePinMap}>
          <img src={PinMapIcon} />
          <div className={styles.LocationAddress}>
            <h2>Giao hàng</h2>
            <h3>{currentLocation.Location}</h3>
          </div>
        </div>
        <div className={styles.Cart} onClick={routeCart}>
          <img src={Cart} />
          <p>Giỏ hàng({getTotalCartItems()})</p>
        </div>
        <div className={styles.User} onClick={phoneNumber !== "" ? routeAccount : routeLogin}>
          <img src={User} />
          <p>
            {listAccount.find((obj) => obj.PhoneNumber === JSON.parse(localStorage.getItem("PhoneNumber"))) === undefined
              ? "Hội Viên"
              : listAccount.find((obj) => obj.PhoneNumber === JSON.parse(localStorage.getItem("PhoneNumber"))).Name}
          </p>
        </div>
      </div>
      {isDisplayPinMap && <Location handleOnClick={handlePinMap} />}
    </>
  );
}

export default Header;
