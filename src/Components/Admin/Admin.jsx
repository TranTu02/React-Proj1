import React, { useRef, useState } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listProducts } from "../Assets/data";
import { AdminProduct } from "./AdminProduct";
import { AdminAccount } from "./AdminAccount";
import { AdminLocation } from "./AdminLocation";
import { AdminPhoto } from "./AdminPhoto";
import { AdminCategory } from "./AdminCategory";
import { AdminSale } from "./AdminSale";
import { AdminPresent } from "./AdninPresent";
import { AdminStock } from "./AdminStock";
import { AdminBill } from "./AdminBill";
import { AdminBrand } from "./AdminBrand";
export const Admin = () => {
  const [adminPage, setAdminPage] = useState(0);
  const display = useRef(<></>);
  const setDisplay = (page) => {
    display.current = page;
  };

  switch (adminPage) {
    case 0:
      setDisplay(<AdminProduct />);
      break;
    case 1:
      setDisplay(<AdminAccount />);
      break;
    case 2:
      setDisplay(<AdminCategory />);
      break;
    case 3:
      setDisplay(<AdminPresent />);
      break;
    case 4:
      setDisplay(<AdminSale />);
      break;
    case 5:
      setDisplay(<AdminPhoto />);
      break;
    case 6:
      setDisplay(<AdminLocation />);
      break;
    case 7:
      setDisplay(<AdminLocation />);
      break;
    case 8:
      setDisplay(<AdminBill />);
      break;
    case 9:
      setDisplay(<AdminBrand />);

    default:
      setDisplay(<></>);
  }
  return (
    <div className={style.AdminContainer}>
      <div className={style.Sidebar}>
        <div className={style.Task} onClick={() => setAdminPage(0)}>
          <h3>Sản phẩm</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(1)}>
          <h3>Tài khoản</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(9)}>
          <h3>Thương hiệu</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(2)}>
          <h3>Danh mục</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(3)}>
          <h3>Quà tặng </h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(4)}>
          <h3>Khuyến mại</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(5)}>
          <h3>Hình ảnh</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(6)}>
          <h3>Nhập kho</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(7)}>
          <h3>Khu vực giao hàng</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(8)}>
          <h3>Hóa đơn</h3>
        </div>
        <div className={style.Task} onClick={() => setAdminPage(10)}>
          <h3>Thống kê</h3>
        </div>
      </div>
      <div className={style.Main}>{display.current}</div>
    </div>
  );
};
