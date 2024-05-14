import React, { useRef, useState } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listStock } from "../Assets/data";
export const AdminStock = () => {
  const [listColumnDisplay, setListColumnDisplay] = useState(listStock);
  const Title = () => {
    let arr = [];
    for (const key in listStock[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    const item = listStock.find((obj) => obj.StockID === id);
    for (const key in item) {
      if (key === "Date") {
        const date = new Date(item[key]);
        arr.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
      } else {
        arr.push(item[key]);
      }
    }
    return arr;
  };
  // Ref
  const refID = useRef("");
  const refProduct = useRef("");
  const refQuantity = useRef("");
  const refD = useRef("");
  const refM = useRef("");
  const refY = useRef("");
  const refCost = useRef("");

  // handle data
  const handleID = (event) => {
    refID.current = event.target.value;
  };
  const handleProduct = (event) => {
    refProduct.current = event.target.value;
  };
  const handleQuantityChange = (event) => {
    refQuantity.current = event.target.value;
  };
  const handleDChange = (event) => {
    refD.current = event.target.value;
  };
  const handleMChange = (event) => {
    refM.current = event.target.value;
  };
  const handleYChange = (event) => {
    refY.current = event.target.value;
  };
  const handleCostChange = (event) => {
    refCost.current = event.target.value;
  };
  const handleFindStock = () => {
    const id = refID.current.value === "" ? "" : refID.current.trim();
    const Product = refProduct.current.value === "" ? "" : refProduct.current.trim();
    const date = parseInt(refD.current.value === "" ? "" : refD.current.trim());
    const month = parseInt(refM.current.value === "" ? "" : refM.current.trim());
    const year = parseInt(refY.current.value === "" ? "" : refY.current.trim());
    if (id !== "") {
      setListColumnDisplay(listStock?.filter((obj) => obj.StockID === parseInt(id)));
    } else if (Product !== "") {
      setListColumnDisplay(listStock?.filter((item) => item.ProductID === parseInt(Product)));
    } else {
      setListColumnDisplay(listStock);
    }
    if (
      Number.isInteger(date) &&
      Number.isInteger(month) &&
      Number.isInteger(year) &&
      date > 0 &&
      date <= 31 && // dd nằm trong khoảng từ 1 đến 31
      month > 0 &&
      month <= 12 && // mm nằm trong khoảng từ 1 đến 12
      year > 0 // yyyy là số dương
    ) {
      const dateStock = new Date(year, month - 1, date);
      setListColumnDisplay((prev) => prev?.filter((obj) => obj.Date.getFullYear() === dateStock.getFullYear() && obj.Date.getMonth() === dateStock.getMonth() && obj.Date.getDate() === dateStock.getDate()));
    }
  };
  return (
    <div className={style.ProductManage}>
      <h2>Quản lý nhập kho</h2>
      <h3>Form</h3>
      <table>
        <thead>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>

        <tbody>
          <td>
            <input type="text" ref={refID} onChange={handleID} />
          </td>
          <td>
            <input type="text" ref={refProduct} onChange={handleProduct}></input>
          </td>
          <td>
            <input type="text" ref={refQuantity} onChange={handleQuantityChange}></input>
          </td>
          <td>
            {" "}
            <div className={style.Date} style={{ width: 300 }}>
              <h4>Ngày</h4>
              <input type="text" ref={refD} onChange={handleDChange} />
              <h4>Tháng</h4>
              <input type="text" ref={refM} onChange={handleMChange} />
              <h4>Năm</h4>
              <input type="text" ref={refY} onChange={handleYChange} />
            </div>
          </td>
          <td>
            <input type="text" ref={refCost} onChange={handleCostChange}></input>
          </td>
        </tbody>
      </table>
      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={handleFindStock}>Tìm</button>
      </div>
      <h3>Danh sách nhập kho</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
        <tbody>
          {listColumnDisplay.map((stock) => (
            <tr>
              {Value(stock.StockID).map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
