import styles from './Header.module.css';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PinMapIcon from '../Assets/pin-map.png';
import Cart from '../Assets/shopping-cart.png';
import User from '../Assets/user.png';
function Header() {
  return (
    <div className={styles.Header}>
        <div className={styles.HeaderLogo} >       
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
        <div className={styles.Cart}>
          <img src={Cart} />
          <p>Giao hàng(0)</p>
        </div>
        <div className={styles.User}>
          <img src={User} />
          <p>Hội Viên</p>
        </div>
    </div>
  );
}

export default Header;