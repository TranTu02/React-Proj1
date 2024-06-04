import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listSaleEvents, listDiscountProduct, updateListSaleEvent, updateListDiscountProduct } from "../Assets/data";
import axios from "axios";
export const AdminSale = () => {
  const [active, setActive] = useState(true);
  updateListSaleEvent(listSaleEvents.sort((a, b) => b.DiscountID - a.DiscountID));
  updateListDiscountProduct(listDiscountProduct.sort((a, b) => b.DiscountID - a.DiscountID));

  let nextID = listSaleEvents.length !== 0 ? listSaleEvents[0].DiscountID + 1 : 1;
  const [listRowDisplay, setListRowDisplay] = useState(active ? listSaleEvents : listDiscountProduct);
  const handleSetActive = (value) => {
    setActive(value);
    setListRowDisplay(value ? listSaleEvents : listDiscountProduct);
  };

  useEffect(() => {
    setListRowDisplay(active ? listSaleEvents : listDiscountProduct);
  }, [listSaleEvents, listDiscountProduct]);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = ` if (document.getElementById("dcTitle") != null ) document.getElementById("dcTitle").value = "";
    if (document.getElementById("prdID") != null ) document.getElementById("prdID").value = "";
    `;
    document.body.appendChild(scriptElement);
  }, [active]);

  const refDiscountID = useRef("");
  const refDiscountTitle = useRef("");
  const refStartD = useRef("");
  const refStartM = useRef("");
  const refStartY = useRef("");
  const refEndD = useRef("");
  const refEndM = useRef("");
  const refEndY = useRef("");
  const refProductID = useRef("");
  const refReduce = useRef("");

  const handleGetSE = (se) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    refDiscountID.current.value = se.DiscountID;
    refDiscountTitle.current.value = se.DiscountTitle;
    refStartD.current.value = new Date(se.Start).getDate();
    refStartM.current.value = new Date(se.Start).getMonth() + 1;
    refStartY.current.value = new Date(se.Start).getFullYear();
    refEndD.current.value = new Date(se.End).getDate();
    refEndM.current.value = new Date(se.End).getMonth() + 1;
    refEndY.current.value = new Date(se.End).getFullYear();
  };

  const handleGetDP = (se) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    refDiscountID.current.value = se.DiscountID;
    refProductID.current.value = se.ProductID;
    refReduce.current.value = se.Reduce;
  };
  // API SALE EVENT
  const deleteSaleEvent = async (itemid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/saleevents/${itemid}`);
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateSaleEvent = async (itemid, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/saleevents/${itemid}`, updatedData);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postSaleEvent = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/saleevents", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  // API DISCOUNT PRODUCT
  const deleteDiscountPoduct = async (discountID, productID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/discountproducts/${discountID}/${productID}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateDiscountPoduct = async (discountID, productID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/discountproducts/${discountID}/${productID}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postDiscountPoduct = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/discountproducts", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  const handleDiscountIDChange = (event) => {
    refDiscountID.current.value = event.target.value;
  };
  const handleDiscountTitleChange = (event) => {
    refDiscountTitle.current.value = event.target.value;
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
    refReduce.current.value = event.target.value;
  };

  const handleAddSaleEvent = () => {
    const DS = new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value));
    const DE = new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value));
    const saleEvent = {
      DiscountID: nextID,
      DiscountTitle: refDiscountTitle.current.value,
      Start: DS.toString(),
      End: DE.toString(),
    };
    for (const key in saleEvent) {
      if (saleEvent[key] === "" || saleEvent[key] === undefined) {
        alert("Nhập đủ thông tin");
        return false;
      }
      if (DE < DS) {
        alert("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm sự kiện quà tặng có id: ${nextID} ?`);
    if (result) {
      postSaleEvent(saleEvent)
        .then(() => {
          updateListSaleEvent([...listSaleEvents, saleEvent]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdateSaleEvent = () => {
    const updatedData = {
      DiscountID: parseInt(refDiscountID.current.value),
      DiscountTitle: refDiscountTitle.current.value,
      Start: new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value)),
      End: new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value)),
    };

    const DS = new Date(parseInt(refStartY.current.value), parseInt(refStartM.current.value) - 1, parseInt(refStartD.current.value));
    const DE = new Date(parseInt(refEndY.current.value), parseInt(refEndM.current.value) - 1, parseInt(refEndD.current.value));
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin");
        return false;
      }
      if (DE < DS) {
        alert("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa quà tặng có id: ${refDiscountID.current.value} ?`);
    if (result) {
      updateSaleEvent(parseInt(refDiscountID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listSaleEvents.map((obj) => {
              if (obj.DiscountID === updatedData.DiscountID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListSaleEvent(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeleteSaleEvent = () => {
    if (refDiscountID.current.value === "") {
      alert("Nhập DiscountID");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa quà tặng có id: ${refDiscountID.current.value} ?`);
    if (result) {
      deleteSaleEvent(parseInt(refDiscountID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listSaleEvents.map((obj) => {
              if (obj.DiscountID !== refDiscountID.current.value) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListSaleEvent(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };
  const handleFindSaleEvent = () => {
    const DiscountID = refDiscountID.current.value === "" ? "" : refDiscountID.current.value.trim();
    const dateStart = parseInt(refStartD.current.value === "" ? "" : refStartD.current.value.trim());
    const monthStart = parseInt(refStartM.current.value === "" ? "" : refStartM.current.value.trim());
    const yearStart = parseInt(refStartY.current.value === "" ? "" : refStartY.current.value.trim());
    const dateEnd = parseInt(refEndD.current.value === "" ? "" : refEndD.current.value.trim());
    const monthEnd = parseInt(refEndM.current.value === "" ? "" : refEndM.current.value.trim());
    const yearEnd = parseInt(refEndY.current.value === "" ? "" : refEndY.current.value.trim());
    const date = new Date(yearStart, monthStart - 1, dateStart);

    if (DiscountID !== "") {
      setListRowDisplay(listSaleEvents.filter((obj) => obj.DiscountID === parseInt(DiscountID)) || []);
    } else setListRowDisplay(listSaleEvents);
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
      setListRowDisplay((prev) => prev.filter((obj) => new Date(obj.End) <= dateE) || []);
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
      setListRowDisplay((prev) => prev.filter((obj) => new Date(obj.Start) >= dateS) || []);
    }
  };
  const handleFindDiscountProduct = () => {
    const DiscountID = refDiscountID.current.value === "" ? "" : refDiscountID.current.value.trim();
    const ProductID = refProductID.current.value === "" ? "" : refProductID.current.value.trim();
    if (ProductID !== "" && DiscountID !== "") {
      setListRowDisplay(listDiscountProduct.filter((obj) => obj.ProductID === parseInt(ProductID) && obj.DiscountID === parseInt(DiscountID)) || []);
    } else if (ProductID !== "") {
      setListRowDisplay(listDiscountProduct.filter((obj) => obj.ProductID === parseInt(ProductID)) || []);
    } else if (DiscountID !== "") {
      setListRowDisplay(listDiscountProduct.filter((obj) => obj.DiscountID === parseInt(DiscountID)) || []);
    } else {
      setListRowDisplay(listDiscountProduct);
    }
  };
  const handleAddDiscountProduct = () => {
    if (refProductID.current.value === "" || refDiscountID.current.value === "" || refReduce.current.value === "") {
      alert("Nhập thông tin!");
    } else if (listDiscountProduct.find((obj) => obj.ProductID === parseInt(refProductID.current.value) && obj.DiscountID === parseInt(refDiscountID.current.value)) !== undefined) {
      alert("Sản phẩm đã áp dụng mã giảm giá này rồi!");
    } else {
      const DiscountProduct = {
        DiscountID: parseInt(refDiscountID.current.value),
        ProductID: parseInt(refProductID.current.value),
        Reduce: parseFloat(refReduce.current.value),
      };
      const result = window.confirm(`Chắc chắn muốn thêm sản phẩm giảm giá có id: ${refProductID.current.value} ?`);
      if (result) {
        postDiscountPoduct(DiscountProduct)
          .then(() => {
            updateListDiscountProduct([...listDiscountProduct, DiscountProduct]);
          })
          .catch((error) => console.error("Error adding Present event:", error));
      }
    }
  };

  const handleUpdateDiscountProduct = () => {
    if (refProductID.current.value === "" || refDiscountID.current.value === "" || refReduce.current.value === "") {
      alert("Nhập thông tin!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn sửa quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      const updatedData = {
        DiscountID: parseInt(refDiscountID.current.value),
        ProductID: parseInt(refProductID.current.value),
        Reduce: parseFloat(refReduce.current.value),
      };
      updateSaleEvent(parseInt(refDiscountID.current.value), parseInt(refProductID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listDiscountProduct.map((obj) => {
              if (obj.ProductID === parseInt(refProductID.current.value) && obj.DiscountID === parseInt(refDiscountID.current.value)) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListDiscountProduct(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeleteDiscountProduct = () => {
    if (refProductID.current.value === "" || refDiscountID.current.value === "") {
      alert("Nhập thông tin DiscountID và ProductID!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa quà tặng có id: ${refProductID.current.value} ?`);
    if (result) {
      deleteSaleEvent(parseInt(refDiscountID.current.value), parseInt(refProductID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listDiscountProduct.map((obj) => {
              if (obj.ProductID !== parseInt(refProductID.current.value) || obj.DiscountID !== parseInt(refDiscountID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListDiscountProduct(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };
  return (
    <div className={style.ProductManage}>
      <div className={style.Action}>
        <h2 onClick={() => handleSetActive(true)} className={active ? style.Active : ""}>
          Quản lý sự kiện giảm giá
        </h2>
        <h2 onClick={() => handleSetActive(false)} className={!active ? style.Active : ""}>
          Quản lý sản phẩm giảm giá
        </h2>
      </div>
      <h3>Form</h3>
      <table>
        {active ? (
          <thead>
            <th>Mã sự kiện giảm giá</th>
            <th>Tiêu đề </th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
          </thead>
        ) : (
          <thead>
            <th>Mã sự kiện giảm giá</th>
            <th>Mã sản phẩm</th>
            <th>Giảm</th>
          </thead>
        )}
        {active ? (
          <tbody>
            <td>
              <input type="text" ref={refDiscountID} onChange={handleDiscountIDChange} />
            </td>
            <td>
              <input type="text" id="dcTitle" ref={refDiscountTitle} onChange={handleDiscountTitleChange} />
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
              <input type="text" ref={refDiscountID} onChange={handleDiscountIDChange} />
            </td>
            <td>
              <input type="text" id="prdID" ref={refProductID} onChange={handleProductIDChange} />
            </td>
            <td>
              <input type="text" ref={refReduce} onChange={handleReduceChange} />
            </td>
          </tbody>
        )}
      </table>

      <div className={style.Action}>
        <button onClick={active ? handleAddSaleEvent : handleAddDiscountProduct}>Thêm</button>
        <button onClick={active ? handleUpdateSaleEvent : handleUpdateDiscountProduct}>Sửa</button>
        <button onClick={active ? handleDeleteSaleEvent : handleDeleteDiscountProduct}>Xóa</button>
        <button onClick={active ? handleFindSaleEvent : handleFindDiscountProduct}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách sự kiện giảm giá</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>Mã sự kiện giảm giá</th>
              <th>Tiêu đề </th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
            </thead>
            <tbody>
              {listRowDisplay.map((Row) => {
                return (
                  <tr onClick={() => handleGetSE(Row)}>
                    <td>{Row.DiscountID}</td>
                    <td>{Row.DiscountTitle}</td>
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
          <h3>Danh sách sản phẩm giảm giá</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>Mã sự kiện giảm giá</th>
              <th>Mã sản phẩm</th>
              <th>Giảm</th>
            </thead>
            <tbody>
              {listRowDisplay.map((Row) => {
                return (
                  <tr onClick={() => handleGetDP(Row)}>
                    <td>{Row.DiscountID}</td>
                    <td>{Row.ProductID}</td>
                    <td>{Row.Reduce}</td>
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
