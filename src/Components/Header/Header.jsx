import styles from './Header.module.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import PinMapIcon from '../Assets/pin-map.png';
import Cart from '../Assets/shopping-cart.png';
import User from '../Assets/user.png';
import { ShopContext } from "../../Contexts/CartContext.jsx";

function Header() {
  const navigate = useNavigate();
  const {getTotalCartItems} = useContext(ShopContext);
  const routeLogin = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/Login");
  }
  const routeHome = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/");
  }
  const routeCart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/CartPage");
  }
  return (
    <div className={styles.Header}>
        <div className={styles.HeaderLogo} onClick={routeHome}>       
            <h1>E'Mart</h1>
            <h3>Điểm đến mua sắm hoàn hảo</h3>
        </div>
        <SearchBar/>
        <div className={styles.Location}>
          <img src={PinMapIcon} />
          <div className={styles.LocationAddress}>
            <h2>Giao hàng</h2>
            <h3>Trung Hòa - Cầu giấy - Hà Nội</h3>
          </div>
        </div>
        <div className={styles.Cart} onClick = {routeCart}>
          <img src={Cart} />
          <p>Giỏ hàng({getTotalCartItems()})</p>
        </div>
        <div className={styles.User} onClick={routeLogin}>
          <img src={User} />
          <p>Hội Viên</p>
        </div>
    </div>
  );
}

export default Header;