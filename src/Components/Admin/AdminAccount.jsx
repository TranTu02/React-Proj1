import React from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listAccount } from "../Assets/data";
export const AdminAccount = () => {
  const Title = () => {
    let arr = [];
    for (const key in listAccount[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    for (const key in listAccount[id]) {
      {
        arr.push(listAccount[id][key]);
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
          {listAccount.map((account) => {
            return (
              <tr>
                {Value(account.AccountID - 1).map((item) => (
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
