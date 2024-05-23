import React, { useState } from "react";
import style from "./Footer.module.css";
import logo from "../Assets/Logo.png";
function Footer() {
  return (
    <footer className={style.FooterContainer}>
      <div className={style.FooterContent}>
        <div className={style.FooterContentSection}>
          <img src={logo} width={150} height={65} />
          <p className={style.FooterInfor}>Công Ty Cổ Phần Dịch Vụ Thương Mại Emart</p>
          <p className={style.FooterInfor}>Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010, đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023</p>
        </div>
        <div className={style.FooterContentSection}>
          <h4 className={style.FooterTitle}>Thông Tin Liên Hệ</h4>
          <a href="mailto:info@supermarket.com" className={style.FooterLink}>
            Email: info@supermarket.com
          </a>
          <a href="tel:+84123456789" className={style.FooterLink}>
            Điện thoại: +84 123 456 789
          </a>
          <a href="https://goo.gl/maps/example" className={style.FooterLink}>
            Địa chỉ: 123 Đường ABC, Phường XYZ, Thành phố Hồ Chí Minh
          </a>
        </div>
        <div className={style.FooterContentSection}>
          <h4 className={style.FooterTitle}>Chính Sách & Hỗ Trợ</h4>
          <a href="/chinh-sach-bao-mat" className={style.FooterLink}>
            Chính sách bảo mật
          </a>
          <a href="/chinh-sach-doi-tra" className={style.FooterLink}>
            Chính sách đổi trả
          </a>
          <a href="/huong-dan-mua-hang" className={style.FooterLink}>
            Hướng dẫn mua hàng
          </a>
          <a href="/ho-tro-khach-hang" className={style.FooterLink}>
            Hỗ trợ khách hàng
          </a>
        </div>
        <div className={style.FooterContentSection}>
          <h4 className={style.FooterTitle}>Kết Nối Với Chúng Tôi</h4>
          <div className={style.FooterPathContainer}>
            <a href="https://facebook.com/supermarket" className={style.FooterLink}>
              <img src="https://th.bing.com/th/id/OIP.L2_D3EO3Wtl16Z7bWcENjAHaHa?rs=1&pid=ImgDetMain" width={33} height={33} alt="Facebook" />
            </a>
            <a href="https://instagram.com/supermarket" className={style.FooterLink}>
              <img src="https://th.bing.com/th/id/OIP.X2o257HpNW7ME1yYHcU2QwHaHw?rs=1&pid=ImgDetMain" width={33} height={33} alt="Instagram" />
            </a>
            <a href="https://zalo.me/supermarket" className={style.FooterLink}>
              <img src="https://d1h69ey09xg1xv.cloudfront.net/wp-content/uploads/2013/02/zalo-messaging-app-vietnam.jpg" width={33} height={33} alt="Zalo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
