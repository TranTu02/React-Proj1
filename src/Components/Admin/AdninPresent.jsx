import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listPresentEvents, listPresentProduct } from "../Assets/data";
export const AdminPresent = () => {
  const [active, setActive] = useState(true);
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listPresentEvents : listPresentProduct);
  const handleSetActive = (value) => {
    setActive(value);
    setListColumnDisplay(value ? listPresentEvents : listPresentProduct);
  };
  useEffect(() => {
    // Đoạn mã JavaScript bạn muốn thực thi

    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = ` if (document.getElementById("dcTitle") != null ) document.getElementById("dcTitle").value = "";
    if (document.getElementById("prdID") != null ) document.getElementById("prdID").value = "";
    `;
    document.body.appendChild(scriptElement);
  }, [active]); // [] để chỉ thực thi một lần sau khi component được render
  const Title = () => {
    let arr = [];
    for (const key in active ? listPresentEvents[0] : listPresentProduct[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id, pid) => {
    let arr = [];
    let item = listColumnDisplay.find((obj) => (active ? obj.PresentID === id : obj.ProductID === pid && obj.PresentID === id));
    for (const key in item) {
      {
        if (key === "Start" || key === "End") {
          const date = new Date(item[key]);
          arr.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
        } else {
          arr.push(item[key]);
        }
      }
    }
    return arr;
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
  const refReduce = useRef("");

  const handlePresentIDChange = (event) => {
    refPresentID.current = event.target.value;
  };
  const handlePIDChange = (event) => {
    refPID.current = event.target.value;
  };
  const handleQuantityChange = (event) => {
    refQuantity.current = event.target.value;
  };
  const handleStartDChange = (event) => {
    refStartD.current = event.target.value;
  };
  const handleStartMChange = (event) => {
    refStartM.current = event.target.value;
  };
  const handleStartYChange = (event) => {
    refStartY.current = event.target.value;
  };
  const handleEndDChange = (event) => {
    refEndD.current = event.target.value;
  };
  const handleEndMChange = (event) => {
    refEndM.current = event.target.value;
  };
  const handleEndYChange = (event) => {
    refEndY.current = event.target.value;
  };
  const handleProductIDChange = (event) => {
    refProductID.current = event.target.value;
  };
  const handleReduceChange = (event) => {
    refReduce.current = event.target.value;
  };

  const handleFindPresentEvent = () => {
    const PresentID = refPresentID.current.value === "" ? "" : refPresentID.current.trim();
    const ProductID = refPID.current.value === "" ? "" : refPID.current.trim();
    const dateStart = parseInt(refStartD.current.value === "" ? "" : refStartD.current.trim());
    const monthStart = parseInt(refStartM.current.value === "" ? "" : refStartM.current.trim());
    const yearStart = parseInt(refStartY.current.value === "" ? "" : refStartY.current.trim());
    const dateEnd = parseInt(refEndD.current.value === "" ? "" : refEndD.current.trim());
    const monthEnd = parseInt(refEndM.current.value === "" ? "" : refEndM.current.trim());
    const yearEnd = parseInt(refEndY.current.value === "" ? "" : refEndY.current.trim());

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
      console.log();
      setListColumnDisplay((prev) => prev.filter((obj) => obj.Start >= dateS) || []);
    }
  };
  const handleFindPresentProduct = () => {
    const PresentID = refPresentID.current.value === "" ? "" : refPresentID.current.trim();
    const ProductID = refProductID.current.value === "" ? "" : refProductID.current.trim();
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
        <thead>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
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
              <input type="text" ref={refReduce} onChange={handleReduceChange} />
            </td>
          </tbody>
        )}
      </table>

      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={active ? handleFindPresentEvent : handleFindPresentProduct}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách sự kiện giảm giá</h3>
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
          <h3>Danh sách sản phẩm giảm giá</h3>
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
                    {Value(obj.PresentID, obj.ProductID).map((item) => (
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
