import React, { useEffect, useRef, useState } from "react";
import style from "./Admin.module.css";
import { listStock, updateListStock } from "../Assets/data";
import axios from "axios";
export const AdminStock = () => {
  updateListStock(listStock.sort((a, b) => b.StockID - a.StockID));
  const [listRowDisplay, setlistRowDisplay] = useState(listStock);
  useEffect(() => {
    setlistRowDisplay(listStock);
  }, [listStock]);
  // Ref
  const refID = useRef("");
  const refProduct = useRef("");
  const refQuantity = useRef("");
  const refRemaining = useRef("");
  const refD = useRef("");
  const refM = useRef("");
  const refY = useRef("");
  const refED = useRef("");
  const refEM = useRef("");
  const refEY = useRef("");
  const refCost = useRef("");
  const refSTC = useRef("");
  const getInfor = (item) => {
    refID.current.value = item.StockID;
    refProduct.current.value = item.ProductID;
    refQuantity.current.value = item.Quantity;
    refRemaining.current.value = item.Remaining;
    refD.current.value = new Date(item.Date).getDate();
    refM.current.value = new Date(item.Date).getMonth() + 1;
    refY.current.value = new Date(item.Date).getFullYear();
    refED.current.value = new Date(item.ExpirationDate).getDate();
    refEM.current.value = new Date(item.ExpirationDate).getMonth() + 1;
    refEY.current.value = new Date(item.ExpirationDate).getFullYear();
    refCost.current.value = item.Cost;
    refSTC.current.value = item.SupplierTaxCode;
  };
  // handle data
  const handleID = (event) => {
    refID.current.value = event.target.value;
  };
  const handleProduct = (event) => {
    refProduct.current.value = event.target.value;
  };
  const handleQuantityChange = (event) => {
    refQuantity.current.value = event.target.value;
  };
  const handleDChange = (event) => {
    refD.current.value = event.target.value;
  };
  const handleMChange = (event) => {
    refM.current.value = event.target.value;
  };
  const handleYChange = (event) => {
    refY.current.value = event.target.value;
  };
  const handleEDChange = (event) => {
    refED.current.value = event.target.value;
  };
  const handleEMChange = (event) => {
    refEM.current.value = event.target.value;
  };
  const handleEYChange = (event) => {
    refEY.current.value = event.target.value;
  };
  const handleCostChange = (event) => {
    refCost.current.value = event.target.value;
  };

  const handleSTCChange = (event) => {
    refSTC.current.value = event.target.value;
  };
  const handleRemainingChange = (event) => {
    refRemaining.current.value = event.target.value;
  };

  const deleteRow = async (itemid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/stocks/${itemid}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateRow = async (itemid, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/stocks/${itemid}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postRow = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/stocks", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  //

  var nextID = listStock.length !== 0 ? listStock[0].StockID + 1 : 1;
  const handleAddStock = () => {
    const date = parseInt(refD.current.value === "" ? "" : refD.current.value.trim());
    const month = parseInt(refM.current.value === "" ? "" : refM.current.value.trim());
    const year = parseInt(refY.current.value === "" ? "" : refY.current.value.trim());
    const dateStock = new Date(year, month - 1, date);
    const dateE = parseInt(refED.current.value === "" ? "" : refED.current.value.trim());
    const monthE = parseInt(refEM.current.value === "" ? "" : refEM.current.value.trim());
    const yearE = parseInt(refEY.current.value === "" ? "" : refEY.current.value.trim());
    const dateExpiration = new Date(yearE, monthE - 1, dateE);
    const result = window.confirm(`Chắc chắn muốn thêm id: ${nextID} ?`);
    if (
      date === "" ||
      month === "" ||
      year === "" ||
      dateE === "" ||
      monthE === "" ||
      yearE === "" ||
      refProduct.current.value === "" ||
      refQuantity.current.value === "" ||
      refCost.current.value === "" ||
      refSTC.current.value === ""
    ) {
      alert("Nhập đủ thông tin!");
      return false;
    }

    const Stock = {
      StockID: nextID,
      ProductID: parseInt(refProduct.current.value),
      Quantity: parseInt(refQuantity.current.value),
      Remaining: parseInt(refQuantity.current.value),
      Date: dateStock,
      ExpirationDate: dateExpiration,
      Cost: refCost.current.value,
      SupplierTaxCode: refSTC.current.value,
    };
    if (result) {
      postRow(Stock)
        .then(() => {
          updateListStock([...listStock, Stock]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdateStock = () => {
    const date = parseInt(refD.current.value === "" ? "" : refD.current.value.trim());
    const month = parseInt(refM.current.value === "" ? "" : refM.current.value.trim());
    const year = parseInt(refY.current.value === "" ? "" : refY.current.value.trim());
    const dateStock = new Date(year, month - 1, date);
    const dateE = parseInt(refED.current.value === "" ? "" : refED.current.value.trim());
    const monthE = parseInt(refEM.current.value === "" ? "" : refEM.current.value.trim());
    const yearE = parseInt(refEY.current.value === "" ? "" : refEY.current.value.trim());
    const dateExpiration = new Date(yearE, monthE - 1, dateE);
    if (
      date === "" ||
      month === "" ||
      year === "" ||
      dateE === "" ||
      monthE === "" ||
      yearE === "" ||
      refID.current.value === "" ||
      refProduct.current.value === "" ||
      refQuantity.current.value === "" ||
      refCost.current.value === "" ||
      refSTC.current.value === ""
    ) {
      alert("Nhập đủ thông tin!");
      return false;
    }

    const result = window.confirm(`Chắc chắn muốn sửa id: ${refID.current.value} ?`);
    if (result) {
      const updatedData = {
        StockID: parseInt(refID.current.value),
        ProductID: parseInt(refProduct.current.value),
        Quantity: parseInt(refQuantity.current.value),
        Remaining: parseInt(refRemaining.current.value),
        Date: dateStock,
        ExpirationDate: dateExpiration,
        Cost: refCost.current.value,
        SupplierTaxCode: refSTC.current.value,
      };
      updateRow(parseInt(refID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listStock.map((obj) => {
              if (obj.StockID === updatedData.StockID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListStock(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeleteStock = () => {
    if (refID.current.value === "") {
      alert("Nhập StockID!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa có id: ${refID.current.value} ?`);
    if (result) {
      console.log(refID.current.value);
      deleteRow(parseInt(refID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listStock.map((obj) => {
              if (obj.StockID !== parseInt(refID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListStock(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };

  const handleFindStock = () => {
    const id = refID.current.value === "" ? "" : refID.current.value.trim();
    const Product = refProduct.current.value === "" ? "" : refProduct.current.value.trim();
    const date = parseInt(refD.current.value === "" ? "" : refD.current.value.trim());
    const month = parseInt(refM.current.value === "" ? "" : refM.current.value.trim());
    const year = parseInt(refY.current.value === "" ? "" : refY.current.value.trim());
    if (id !== "") {
      setlistRowDisplay(listStock?.filter((obj) => obj.StockID === parseInt(id)));
    } else if (Product !== "") {
      setlistRowDisplay(listStock?.filter((item) => item.ProductID === parseInt(Product)));
    } else {
      setlistRowDisplay(listStock);
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
      setlistRowDisplay((prev) =>
        prev?.filter((obj) => obj.Date.getFullYear() === dateStock.getFullYear() && obj.Date.getMonth() === dateStock.getMonth() && obj.Date.getDate() === dateStock.getDate())
      );
    }
  };
  return (
    <div className={style.ProductManage}>
      <h2>Quản lý nhập kho</h2>
      <h3>Form</h3>
      <table>
        <thead>
          {" "}
          <th>StockID</th>
          <th>ProductID</th>
          <th>Quantity</th>
          <th>Remaining</th>
          <th>Date</th>
          <th>Expiration</th>
          <th>Cost</th>
          <th>SupplierTaxCode</th>
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
            <input type="text" ref={refRemaining} onChange={handleRemainingChange}></input>
          </td>
          <td>
            <div className={style.Date}>
              <h4>Ngày</h4>
              <input type="text" ref={refD} onChange={handleDChange} />
            </div>
            <div className={style.Date}>
              <h4>Tháng</h4>
              <input type="text" ref={refM} onChange={handleMChange} />
            </div>
            <div className={style.Date}>
              <h4>Năm</h4>
              <input type="text" ref={refY} onChange={handleYChange} />
            </div>
          </td>
          <td>
            <div className={style.Date}>
              <h4>Ngày</h4>
              <input type="text" ref={refED} onChange={handleEDChange} />
            </div>
            <div className={style.Date}>
              <h4>Tháng</h4>
              <input type="text" ref={refEM} onChange={handleEMChange} />
            </div>
            <div className={style.Date}>
              <h4>Năm</h4>
              <input type="text" ref={refEY} onChange={handleEYChange} />
            </div>
          </td>
          <td>
            <input type="text" ref={refCost} onChange={handleCostChange}></input>
          </td>
          <td>
            <input type="text" ref={refSTC} onChange={handleSTCChange}></input>
          </td>
        </tbody>
      </table>
      <div className={style.Action}>
        <button onClick={handleAddStock}>Thêm</button>
        <button onClick={handleUpdateStock}>Sửa</button>
        <button onClick={handleDeleteStock}>Xóa</button>
        <button onClick={handleFindStock}>Tìm</button>
      </div>
      <h3>Danh sách nhập kho</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          <th>StockID</th>
          <th>ProductID</th>
          <th>Quantity</th>
          <th>Remaining</th>
          <th>Date</th>
          <th>ExpirationDate</th>
          <th>Cost</th>
          <th>SupplierTaxCode</th>
        </thead>
        <tbody>
          {listRowDisplay.map((stock) => (
            <tr onClick={() => getInfor(stock)}>
              <td>{stock.StockID}</td>
              <td>{stock.ProductID}</td>
              <td>{stock.Quantity}</td>
              <td>{stock.Remaining}</td>
              <td>{`${new Date(stock.Date).getDate()}/${new Date(stock.Date).getMonth() + 1}/${new Date(stock.Date).getFullYear()}`}</td>
              <td>{`${new Date(stock.ExpirationDate).getDate()}/${new Date(stock.ExpirationDate).getMonth() + 1}/${new Date(stock.ExpirationDate).getFullYear()}`}</td>
              <td>{stock.Cost}</td>
              <td>{stock.SupplierTaxCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
