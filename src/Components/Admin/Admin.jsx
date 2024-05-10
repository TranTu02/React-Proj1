import React from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listProducts } from "../Assets/data";
import { AdminProduct } from "./AdminProduct";
import { AdminAccount } from "./AdminAccount";
import { AdminLocation } from "./AdminLocation";
import { AdminPhoto } from "./AdminPhoto";
export const Admin = () => {
  return (
    <div className={style.AdminContainer}>
      <div className={style.Sidebar}>
        <div className={style.Task}>
          <h3>Sản phẩm</h3>
        </div>
        <div className={style.Task}>
          <h3>Tài khoản</h3>
        </div>
        <div className={style.Task}>
          <h3>Danh mục</h3>
        </div>
        <div className={style.Task}>
          <h3>Quà tặng </h3>
        </div>
        <div className={style.Task}>
          <h3>Khuyến mại</h3>
        </div>
        <div className={style.Task}>
          <h3>Hình ảnh</h3>
        </div>
        <div className={style.Task}>
          <h3>Biểu ngữ</h3>
        </div>
        <div className={style.Task}>
          <h3>Khu vực giao hàng</h3>
        </div>
        <div className={style.Task}>
          <h3>Hóa đơn</h3>
        </div>
      </div>
      <div className={style.Main}>
        {/* <AdminProduct /> */}
        {/* <AdminAccount /> */}
        {/* <AdminLocation /> */}
        <AdminPhoto />
      </div>
    </div>
  );
};
