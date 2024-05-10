import React from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listPhoto } from "../Assets/data";
export const AdminPhoto = () => {
  const Title = () => {
    let arr = [];
    for (const key in listPhoto[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    for (const key in listPhoto[id]) {
      {
        arr.push(listPhoto[id][key]);
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
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>

        <tbody>
          {Title().map((obj) => {
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
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
        <tbody>
          {listPhoto.map((photo) => {
            return (
              <tr>
                {Value(photo.PhotoID - 1).map((item) => (
                  <td>{item}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
