import React from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listProducts } from "../Assets/data";
export const AdminProduct = () => {
  const productTitle = () => {
    let arr = [];
    for (const key in listProducts[0]) {
      arr.push(key);
    }
    return arr;
  };
  const productValue = (id) => {
    let arr = [];
    for (const key in listProducts[id]) {
      if (key === "present" || key == "Require" || key === "Reduce") {
      } else if (key === "Date") {
        function formatDate(date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        arr.push(formatDate(listProducts[id][key]));
      } else {
        arr.push(listProducts[id][key]);
      }
    }
    return arr;
  };

  return (
    <div className={style.ProductManage}>
      <h2>Quản lý sản phẩm</h2>
      <h3>Form</h3>
      <table>
        <thead>
          {productTitle().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>

        <tbody>
          {productTitle().map((obj) => {
            return (
              <td>
                <input type="text" />
              </td>
            );
          })}
        </tbody>
      </table>
      <div className={style.ImageChoose}>
        <h4>Chọn ảnh</h4>
        <input type="file" id="imageInput" accept="image" />
      </div>
      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button>Tìm</button>
      </div>
      <h3>Danh sách sản phẩm</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          {productTitle().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
        <tbody>
          {listProducts.map((product) => (
            <tr>
              {productValue(product.ProductID - 1).map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
