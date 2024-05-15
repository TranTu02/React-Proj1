import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listPresentEvents, listPresentProduct, updateApiPresentEvent, updateApiPresentProduct } from "../Assets/data";
import axios from "axios";
export const AdminPresent = () => {
  updateApiPresentProduct();

  const [active, setActive] = useState(true);
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listPresentEvents : listPresentProduct);
  const handleSetActive = (value) => {
    setActive(value);
  };
  useEffect(() => {
    // Đoạn mã JavaScript bạn muốn thực thi

    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = ` if (document.getElementById("dcTitle") != null ) document.getElementById("dcTitle").value = "";
    if (document.getElementById("prdID") != null ) document.getElementById("prdID").value = "";
    `;
    document.body.appendChild(scriptElement);
    if (active) {
      updateApiPresentEvent();
      setListColumnDisplay(listPresentEvents);
    } else {
      updateApiPresentProduct();
      setListColumnDisplay(listPresentProduct);
    }
  }, [active]); // [] để chỉ thực thi một lần sau khi component được render
  const Title = () => {
    const keys = Object.keys(listColumnDisplay[0] || {});
    return keys.slice(1, -1); // Bỏ qua phần tử đầu và cuối
  };

  const Value = (id) => {
    const item = active ? listPresentEvents.find((obj) => obj.PresentID === id) : listPresentProduct.find((obj) => obj.ProductID === id);
    if (!item) return [];
    const values = Object.keys(item).map((key) => {
      if (key === "Start" || key === "End") {
        return new Date(item[key]).toLocaleString();
      } else {
        return item[key];
      }
    });
    return values.slice(1, -1); // Bỏ qua phần tử đầu và cuối
  };
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
    const result = window.confirm(`Chắc chắn muốn thêm sự kiện quà tặng có id: ${nextID} ?`);
    if (result) {
      const PresentEvent = {
        PresentID: nextID,
        ProductID: parseInt(refPID.current.value),
        Quantity: parseInt(refQuantity.current.value),
        Start: new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value)),
        End: new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value)),
      };
      postPresentEvent(PresentEvent)
        .then(() => {
          updateApiPresentEvent();
          setListColumnDisplay([...listColumnDisplay, PresentEvent]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdatePresentEvent = () => {
    const result = window.confirm(`Chắc chắn muốn sửa quà tặng có id: ${refPresentID.current.value} ?`);
    if (result) {
      const updatedData = {
        ProductID: parseInt(refPID.current.value),
        Quantity: parseInt(refQuantity.current.value),
        Start: new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value)),
        End: new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value)),
      };
      updatePresentEvent(parseInt(refPresentID.current.value), updatedData)
        .then(() => {
          updateApiPresentEvent();
          setListColumnDisplay(listPresentEvents);
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeletePresentEvent = () => {
    const result = window.confirm(`Chắc chắn muốn xóa quà tặng có id: ${refPresentID.current.value} ?`);
    if (result) {
      deletePresentEvent(parseInt(refPresentID.current.value))
        .then(() => {
          updateApiPresentEvent();
          setListColumnDisplay(listPresentEvents);
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
      setListColumnDisplay(listPresentEvents.filter((obj) => obj.PresentID === parseInt(PresentID)) || []);
    } else if (refProductID !== "") {
      setListColumnDisplay(listPresentEvents.filter((obj) => obj.ProductID === parseInt(ProductID)));
    } else setListColumnDisplay(listPresentEvents);
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
      setListColumnDisplay(listPresentEvents.filter((obj) => obj.End <= dateE) || []);
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
      setListColumnDisplay((prev) => prev.filter((obj) => obj.Start >= dateS) || []);
    }
  };

  // present product
  const handleFindPresentProduct = () => {
    const PresentID = refPresentID.current.value === "" ? "" : refPresentID.current.value.trim();
    const ProductID = refProductID.current.value === "" ? "" : refProductID.current.value.trim();
    if (ProductID !== "" && PresentID !== "") {
      setListColumnDisplay(listPresentProduct.filter((obj) => obj.ProductID === parseInt(ProductID) && obj.PresentID === parseInt(PresentID)) || []);
    } else if (ProductID !== "") {
      setListColumnDisplay(listPresentProduct.filter((obj) => obj.ProductID === parseInt(ProductID)) || []);
    } else if (PresentID !== "") {
      setListColumnDisplay(listPresentProduct.filter((obj) => obj.PresentID === parseInt(PresentID)) || []);
    } else {
      setListColumnDisplay(listPresentProduct);
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
      setListColumnDisplay([...listColumnDisplay, response.data]);
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  const handleAddPresentProduct = () => {
    const result = window.confirm(`Chắc chắn muốn thêm sp quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      const PresentEvent = {
        ProductID: parseInt(refProductID.current.value),
        Require: parseInt(refRequire.current.value),
        PresentID: parseInt(refPresentID.current.value),
      };
      postPresentProduct(PresentEvent)
        .then(() => {
          setListColumnDisplay(listPresentProduct);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
    window.location.reload();
  };

  const handleUpdatePresentProduct = () => {
    const result = window.confirm(`Chắc chắn muốn sửa sản phẩm áp dụng có id: ${refProductID.current.value} ?`);
    if (result) {
      const updatedData = {
        Require: parseInt(refRequire.current.value),
        PresentID: parseInt(refPresentID.current.value),
      };
      updatePresentProduct(parseInt(refProductID.current.value), updatedData)
        .then(() => {
          updateApiPresentProduct();
          setListColumnDisplay(listPresentEvents);
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
    window.location.reload();
  };

  const handleDeletePresentProduct = () => {
    const result = window.confirm(`Chắc chắn muốn xóa sp quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      deletePresentProduct(parseInt(refProductID.current.value))
        .then(() => {
          updateApiPresentProduct();
          setListColumnDisplay(listPresentEvents);
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
    window.location.reload();
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
            <th>ProductID</th>
            <th>Require</th>
            <th>PresentID</th>
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
              <input type="text" id="prdID" ref={refProductID} onChange={handleProductIDChange} />
            </td>
            <td>
              <input type="text" ref={refRequire} onChange={handleReduceChange} />
            </td>
            <td>
              <input type="text" ref={refPresentID} onChange={handlePresentIDChange} />
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
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listColumnDisplay.map((id) => {
                return (
                  <tr>
                    {Value(id.PresentID).map((item) => {
                      return <td>{item}</td>;
                    })}
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
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listColumnDisplay.map((obj) => {
                return (
                  <tr>
                    {Value(obj.ProductID).map((item) => (
                      <td>{item}</td>
                    ))}
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
