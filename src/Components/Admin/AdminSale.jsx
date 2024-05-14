import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listSaleEvents, listDiscountProduct } from "../Assets/data";
export const AdminSale = () => {
  const [active, setActive] = useState(true);
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listSaleEvents : listDiscountProduct);
  const handleSetActive = (value) => {
    setActive(value);
    setListColumnDisplay(value ? listSaleEvents : listDiscountProduct);
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
    for (const key in active ? listSaleEvents[0] : listDiscountProduct[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    let item = listColumnDisplay.find((obj) => (active ? obj.DiscountID === id : obj.ProductID === id));
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

  const handleDiscountIDChange = (event) => {
    refDiscountID.current = event.target.value;
  };
  const handleDiscountTitleChange = (event) => {
    refDiscountTitle.current = event.target.value;
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

  const handleFindSaleEvent = () => {
    const DiscountID = refDiscountID.current.value === "" ? "" : refDiscountID.current.trim();
    const dateStart = parseInt(refStartD.current.value === "" ? "" : refStartD.current.trim());
    const monthStart = parseInt(refStartM.current.value === "" ? "" : refStartM.current.trim());
    const yearStart = parseInt(refStartY.current.value === "" ? "" : refStartY.current.trim());
    const dateEnd = parseInt(refEndD.current.value === "" ? "" : refEndD.current.trim());
    const monthEnd = parseInt(refEndM.current.value === "" ? "" : refEndM.current.trim());
    const yearEnd = parseInt(refEndY.current.value === "" ? "" : refEndY.current.trim());
    const date = new Date(yearStart, monthStart - 1, dateStart);

    if (DiscountID !== "") {
      setListColumnDisplay(listSaleEvents.filter((obj) => obj.DiscountID === parseInt(DiscountID)) || []);
    } else setListColumnDisplay(listSaleEvents);
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
      setListColumnDisplay(listSaleEvents.filter((obj) => obj.End <= dateE) || []);
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
      setListColumnDisplay(listSaleEvents.filter((obj) => obj.Start >= dateS) || []);
    }
  };
  const handleFindDiscountProduct = () => {
    const DiscountID = refDiscountID.current.value === "" ? "" : refDiscountID.current.trim();
    const ProductID = refProductID.current.value === "" ? "" : refProductID.current.trim();
    if (ProductID !== "" && DiscountID !== "") {
      setListColumnDisplay(listDiscountProduct.filter((obj) => obj.ProductID === parseInt(ProductID) && obj.DiscountID === parseInt(DiscountID)) || []);
    } else if (ProductID !== "") {
      setListColumnDisplay(listDiscountProduct.filter((obj) => obj.ProductID === parseInt(ProductID)) || []);
    } else if (DiscountID !== "") {
      setListColumnDisplay(listDiscountProduct.filter((obj) => obj.DiscountID === parseInt(DiscountID)) || []);
    } else {
      setListColumnDisplay(listDiscountProduct);
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
        <thead>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
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
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={active ? handleFindSaleEvent : handleFindDiscountProduct}>Tìm</button>
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
              {listColumnDisplay.map((Category) => {
                return (
                  <tr>
                    {Value(Category.DiscountID).map((item) => {
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
              {listColumnDisplay.map((Category) => {
                return (
                  <tr>
                    {Value(Category.ProductID).map((item) => (
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