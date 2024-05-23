import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listPresentEvents, listPresentProduct, updateListPresentEvent, updateListPresentProduct } from "../Assets/data";
import axios from "axios";
export const AdminPresent = () => {
  updateListPresentEvent(listPresentEvents.sort((a, b) => b.PresentID - a.PresentID));
  updateListPresentProduct(listPresentProduct.sort((a, b) => b.PresentID - a.PresentID));
  const [active, setActive] = useState(true);
  const [listRowDisplay, setListRowDisplay] = useState(active ? listPresentEvents : listPresentProduct);
  const handleSetActive = (value) => {
    setActive(value);
    setListRowDisplay(value ? listPresentEvents : listPresentProduct);
  };
  useEffect(() => {
    setListRowDisplay(active ? listPresentEvents : listPresentProduct);
  }, [listPresentEvents, listPresentProduct]);

  const refPresentID = useRef("");
  const refPID = useRef("");
  const refQuantity = useRef("");
  const refStartD = useRef("");
  const refStartM = useRef("");
  const refStartY = useRef("");
  const refEndD = useRef("");
  const refEndM = useRef("");
  const refEndY = useRef("");
  const refProductID = useRef("");
  const refRequire = useRef("");
  const getInfor = (item) => {
    if (active) {
      refPresentID.current.value = item.PresentID;
      refPID.current.value = item.ProductID;
      refQuantity.current.value = item.Quantity;
      refStartD.current.value = new Date(item.Start).getDate();
      refStartM.current.value = new Date(item.Start).getMonth() + 1;
      refStartY.current.value = new Date(item.Start).getFullYear();
      refEndD.current.value = new Date(item.End).getDate();
      refEndM.current.value = new Date(item.End).getMonth() + 1;
      refEndY.current.value = new Date(item.End).getFullYear();
    } else {
      refPresentID.current.value = item.PresentID;
      refProductID.current.value = item.ProductID;
      refRequire.current.value = item.Require;
    }
  };

  const handlePresentIDChange = (event) => {
    refPresentID.current.value = event.target.value;
  };
  const handlePIDChange = (event) => {
    refPID.current.value = event.target.value;
  };
  const handleQuantityChange = (event) => {
    refQuantity.current.value = event.target.value;
  };
  const handleStartDChange = (event) => {
    refStartD.current.value = event.target.value;
  };
  const handleStartMChange = (event) => {
    refStartM.current.value = event.target.value;
  };
  const handleStartYChange = (event) => {
    refStartY.current.value = event.target.value;
  };
  const handleEndDChange = (event) => {
    refEndD.current.value = event.target.value;
  };
  const handleEndMChange = (event) => {
    refEndM.current.value = event.target.value;
  };
  const handleEndYChange = (event) => {
    refEndY.current.value = event.target.value;
  };
  const handleProductIDChange = (event) => {
    refProductID.current.value = event.target.value;
  };
  const handleReduceChange = (event) => {
    refRequire.current.value = event.target.value;
  };

  const deletePresentEvent = async (PresentID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/presentevents/${PresentID}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updatePresentEvent = async (PresentID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/presentevents/${PresentID}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postPresentEvent = async (Type) => {
    try {
      const response = await axios.post("http://localhost:3000/api/presentevents", Type, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  var nextID = listPresentEvents.length !== 0 ? listPresentEvents[listPresentEvents.length - 1].PresentID + 1 : 1;
  const handleAddPresentEvent = () => {
    const PresentEvent = {
      PresentID: nextID,
      ProductID: parseInt(refPID.current.value),
      Quantity: parseInt(refQuantity.current.value),
      Start: new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value)),
      End: new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value)),
    };

    for (const key in PresentEvent) {
      if (PresentEvent[key] === "" || PresentEvent[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm sự kiện quà tặng có id: ${nextID} ?`);
    if (result) {
      postPresentEvent(PresentEvent)
        .then(() => {
          updateListPresentEvent([...listPresentEvents, PresentEvent]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdatePresentEvent = () => {
    const updatedData = {
      PresentID: parseInt(refPresentID.current.value),
      ProductID: parseInt(refPID.current.value),
      Quantity: parseInt(refQuantity.current.value),
      Start: new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value)),
      End: new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value)),
    };
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa quà tặng có id: ${refPresentID.current.value} ?`);
    if (result) {
      updatePresentEvent(parseInt(refPresentID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listPresentEvents.map((obj) => {
              if (obj.PresentID === updatedData.PresentID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListPresentEvent(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeletePresentEvent = () => {
    if (refPresentID.current.value === "") {
      alert("Nhập đủ thông tin!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa quà tặng có id: ${refPresentID.current.value} ?`);
    if (result) {
      deletePresentEvent(parseInt(refPresentID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listPresentEvents.map((obj) => {
              if (obj.PresentID !== parseInt(refPresentID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListPresentEvent(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };

  const handleFindPresentEvent = () => {
    const PresentID = refPresentID.current.value === "" ? "" : refPresentID.current.value.trim();
    const ProductID = refPID.current.value === "" ? "" : refPID.current.value.trim();
    const dateStart = parseInt(refStartD.current.value === "" ? "" : refStartD.current.value.trim());
    const monthStart = parseInt(refStartM.current.value === "" ? "" : refStartM.current.value.trim());
    const yearStart = parseInt(refStartY.current.value === "" ? "" : refStartY.current.value.trim());
    const dateEnd = parseInt(refEndD.current.value === "" ? "" : refEndD.current.value.trim());
    const monthEnd = parseInt(refEndM.current.value === "" ? "" : refEndM.current.value.trim());
    const yearEnd = parseInt(refEndY.current.value === "" ? "" : refEndY.current.value.trim());

    if (PresentID !== "") {
      setListRowDisplay(listPresentEvents.filter((obj) => obj.PresentID === parseInt(PresentID)) || []);
    } else if (refProductID !== "") {
      setListRowDisplay(listPresentEvents.filter((obj) => obj.ProductID === parseInt(ProductID)));
    } else setListRowDisplay(listPresentEvents);
    if (
      Number.isInteger(dateEnd) &&
      Number.isInteger(monthEnd) &&
      Number.isInteger(yearEnd) &&
      dateEnd > 0 &&
      dateEnd <= 31 && // dd nằm trong khoảng từ 1 đến 31
      monthEnd > 0 &&
      monthEnd <= 12 && // mm nằm trong khoảng từ 1 đến 12
      yearEnd > 0 // yyyy là số dương
    ) {
      const dateE = new Date(yearEnd, monthEnd - 1, dateEnd);
      setListRowDisplay(listPresentEvents.filter((obj) => obj.End <= dateE) || []);
    }
    if (
      Number.isInteger(dateStart) &&
      Number.isInteger(monthStart) &&
      Number.isInteger(yearStart) &&
      dateStart > 0 &&
      dateStart <= 31 && // dd nằm trong khoảng từ 1 đến 31
      monthStart > 0 &&
      monthStart <= 12 && // mm nằm trong khoảng từ 1 đến 12
      yearStart > 0 // yyyy là số dương
    ) {
      const dateS = new Date(yearStart, monthStart - 1, dateStart);
      setListRowDisplay((prev) => prev.filter((obj) => obj.Start >= dateS) || []);
    }
  };

  // present product
  const handleFindPresentProduct = () => {
    const PresentID = refPresentID.current.value === "" ? "" : refPresentID.current.value.trim();
    const ProductID = refProductID.current.value === "" ? "" : refProductID.current.value.trim();
    if (ProductID !== "" && PresentID !== "") {
      setListRowDisplay(listPresentProduct.filter((obj) => obj.ProductID === parseInt(ProductID) && obj.PresentID === parseInt(PresentID)) || []);
    } else if (ProductID !== "") {
      setListRowDisplay(listPresentProduct.filter((obj) => obj.ProductID === parseInt(ProductID)) || []);
    } else if (PresentID !== "") {
      setListRowDisplay(listPresentProduct.filter((obj) => obj.PresentID === parseInt(PresentID)) || []);
    } else {
      setListRowDisplay(listPresentProduct);
    }
  };
  const deletePresentProduct = async (ProductID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/presentproducts/${ProductID}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updatePresentProduct = async (ProductID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/presentproducts/${ProductID}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postPresentProduct = async (PP) => {
    try {
      const response = await axios.post("http://localhost:3000/api/presentproducts", PP, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from server:", response.data);
      setListRowDisplay([...listRowDisplay, response.data]);
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  const handleAddPresentProduct = () => {
    const Present = {
      PresentID: parseInt(refPresentID.current.value),
      ProductID: parseInt(refProductID.current.value),
      Require: parseInt(refRequire.current.value),
    };
    for (const key in Present) {
      if (Present[key] === "" || Present[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    if (listPresentProduct.find((obj) => obj.PresentID === Present.PresentID && obj.ProductID === Present.ProductID) !== undefined) {
      alert("Sản phẩm đã áp dụng chương trình quà tặng này!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn thêm sp quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      postPresentProduct(Present)
        .then(() => {
          updateListPresentProduct([...listPresentProduct, Present]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdatePresentProduct = () => {
    const Present = {
      ProductID: parseInt(refProductID.current.value),
      Require: parseInt(refRequire.current.value),
      PresentID: parseInt(refPresentID.current.value),
    };
    for (const key in Present) {
      if (Present[key] === "" || Present[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa sản phẩm áp dụng quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      updatePresentProduct(parseInt(refProductID.current.value), Present)
        .then(() => {
          const newList = () => {
            let list = [];
            listPresentProduct.map((obj) => {
              if (obj.PresentID === Present.PresentID && obj.ProductID === Present.ProductID) {
                list.push(Present);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListPresentEvent(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeletePresentProduct = () => {
    if (listPresentProduct.find((obj) => obj.PresentID === parseInt(refPresentID.current.value) && obj.ProductID === parseInt(refProductID.current.value)) === undefined) {
      alert("Nhập đúng thông tin PresentID và ProductID để xóa!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa sp quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      deletePresentProduct(parseInt(refProductID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listPresentProduct.map((obj) => {
              if (obj.PresentID !== parseInt(refPresentID.current.value) || obj.ProductID !== parseInt(refProductID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListPresentEvent(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };
  return (
    <div className={style.ProductManage}>
      <div className={style.Action}>
        <h2 onClick={() => handleSetActive(true)} className={active ? style.Active : ""}>
          Quản lý sự kiện quà tặng
        </h2>
        <h2 onClick={() => handleSetActive(false)} className={!active ? style.Active : ""}>
          Quản lý sản phẩm quà tặng
        </h2>
      </div>
      <h3>Form</h3>
      <table>
        {active ? (
          <thead>
            <th>PresentID</th>
            <th>ProductID</th>
            <th>Quantity</th>
            <th>Start</th>
            <th>End</th>
          </thead>
        ) : (
          <thead>
            <th>PresentID</th>
            <th>ProductID</th>
            <th>Require</th>
          </thead>
        )}

        {active ? (
          <tbody>
            <td>
              <input type="text" ref={refPresentID} onChange={handlePresentIDChange} />
            </td>
            <td>
              <input type="text" id="dcTitle" ref={refPID} onChange={handlePIDChange} />
            </td>
            <td>
              <input type="text" ref={refQuantity} onChange={handleQuantityChange} />
            </td>
            <td>
              <div className={style.Date}>
                <h4>Ngày</h4>
                <input type="text" ref={refStartD} onChange={handleStartDChange} />
              </div>
              <div className={style.Date}>
                <h4>Tháng</h4>
                <input type="text" ref={refStartM} onChange={handleStartMChange} />
              </div>
              <div className={style.Date}>
                <h4>Năm</h4>
                <input type="text" ref={refStartY} onChange={handleStartYChange} />
              </div>
            </td>{" "}
            <td>
              <div className={style.Date}>
                <h4>Ngày</h4>
                <input type="text" ref={refEndD} onChange={handleEndDChange} />
              </div>
              <div className={style.Date}>
                <h4>Tháng</h4>
                <input type="text" ref={refEndM} onChange={handleEndMChange} />
              </div>
              <div className={style.Date}>
                <h4>Năm</h4>
                <input type="text" ref={refEndY} onChange={handleEndYChange} />
              </div>
            </td>
          </tbody>
        ) : (
          <tbody>
            <td>
              <input type="text" ref={refPresentID} onChange={handlePresentIDChange} />
            </td>
            <td>
              <input type="text" id="prdID" ref={refProductID} onChange={handleProductIDChange} />
            </td>
            <td>
              <input type="text" ref={refRequire} onChange={handleReduceChange} />
            </td>
          </tbody>
        )}
      </table>

      <div className={style.Action}>
        <button onClick={active ? handleAddPresentEvent : handleAddPresentProduct}>Thêm</button>
        <button onClick={active ? handleUpdatePresentEvent : handleUpdatePresentProduct}>Sửa</button>
        <button onClick={active ? handleDeletePresentEvent : handleDeletePresentProduct}>Xóa</button>
        <button onClick={active ? handleFindPresentEvent : handleFindPresentProduct}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách sự kiện quà tặng</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>PresentID</th>
              <th>ProductID</th>
              <th>Quantity</th>
              <th>Start</th>
              <th>End</th>
            </thead>
            <tbody>
              {listRowDisplay.map((Row) => {
                return (
                  <tr onClick={() => getInfor(Row)}>
                    <td>{Row.PresentID}</td>
                    <td>{Row.ProductID}</td>
                    <td>{Row.Quantity}</td>
                    <td>{`${new Date(Row.Start).getDate()}/${new Date(Row.Start).getMonth() + 1}/${new Date(Row.Start).getFullYear()}`}</td>
                    <td>{`${new Date(Row.End).getDate()}/${new Date(Row.End).getMonth() + 1}/${new Date(Row.End).getFullYear()}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3>Danh sách sản phẩm quà tặng</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>PresentID</th>
              <th>ProductID</th>
              <th>Require</th>
            </thead>
            <tbody>
              {listRowDisplay.map((Row) => {
                return (
                  <tr onClick={() => getInfor(Row)}>
                    <td>{Row.PresentID}</td>
                    <td>{Row.ProductID}</td>
                    <td>{Row.Require}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
