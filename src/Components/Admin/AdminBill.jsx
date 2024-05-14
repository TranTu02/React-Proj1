import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listBanner, listBrand, listBill, listLocations, listProducts } from "../Assets/data";
export const AdminBill = () => {
  const [active, setActive] = useState(true);
  const currentBill = useRef("");
  const [listRowDetail, setRow] = useState("");
  const [listRowDisplay, setListRowDisplay] = useState(active ? listBill : currentBill.current);
  const handleSetActive = (value) => {
    if (currentBill.current !== "") setActive(value);
  };
  //   type listProductsProps = {
  //     product:Pro
  //   }
  useEffect(() => {
    if (active) {
      setListRowDisplay(listBill);
    } else {
      const arr = [];
      for (const obj in currentBill.current) {
        arr.push(currentBill.current[parseInt(obj)]);
      }
      setRow(arr);
    }
  }, [active]);
  const Title = () => {
    let arr = [];
    if (active)
      for (const key in listBill[0]) {
        if (key !== "listItems") arr.push(key);
      }
    else arr = ["ProductID", "ProductName", "Price", "Quantity"];
    //   for (const key in currentBill.current[0]) {
    //     if (key !== "Date") arr.push(key);
    //   }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    let item = active ? listRowDisplay.find((obj) => obj.BillID === id) : listRowDisplay.find((obj) => obj.ProudctID === id);
    for (const key in item) {
      {
        if (active) {
          if (key !== "listItems" && key !== "Date") arr.push(item[key]);
          else if (key === "Date") arr.push(item[key].toString());
        } else if (key === "ProductID" || key === "ProductName" || key === "Price" || key === "Quantity") {
          arr.push(item[key]);
        }
      }
    }
    return arr;
  };
  const refBillID = useRef("");
  const refName = useRef("");
  const refPhone = useRef("");
  const [selectedLocation, setSelectedLocation] = useState(0);
  const refAddress = useRef("");
  const refDate = useRef("");
  const refTime = useRef("");
  const refPayment = useRef("");
  const refNote = useRef("");
  const refCompanyName = useRef("");
  const refEmail = useRef("");
  const refTax = useRef("");
  const refCompanyAddress = useRef("");
  const refCart = useRef("");
  const refPresent = useRef("");
  const refReduce = useRef("");
  const refCost = useRef("");
  const refStatus = useRef("");

  const refProductID = useRef("");
  const refQuantity = useRef("");
  const [ProductName, setProductName] = useState("");
  const [Price, setPrice] = useState(0);
  const handleBillIDChange = (event) => {
    refBillID.current = event.target.value;
    if (refBillID.current.trim() !== "") currentBill.current = listBill?.find((obj) => obj.BillID === parseInt(refBillID.current));
    if (currentBill.current !== undefined) {
      currentBill.current = currentBill.current.listItems;
    }
  };
  const handleNameChange = (event) => {
    refName.current = event.target.value;
  };
  const handlePhoneChange = (event) => {
    refPhone.current = event.target.value;
  };
  const handleAddressChange = (event) => {
    refAddress.current = event.target.value;
  };
  const handleDateChange = (event) => {
    refDate.current = event.target.value;
  };
  const handleTimeChange = (event) => {
    refTime.current = event.target.value;
  };
  const handlePaymentChange = (event) => {
    refPayment.current = event.target.value;
  };
  const handleNoteChange = (event) => {
    refNote.current = event.target.value;
  };
  const handleCompanyNameChange = (event) => {
    refCompanyName.current = event.target.value;
  };
  const handleEmailChange = (event) => {
    refEmail.current = event.target.value;
  };
  const handleTaxChange = (event) => {
    refTax.current = event.target.value;
  };
  const handleCompanyAddressChange = (event) => {
    refCompanyAddress.current = event.target.value;
  };
  const handleCartChange = (event) => {
    refCart.current = event.target.value;
    handleShipChange();
  };
  const handlePresentChange = (event) => {
    refPresent.current = event.target.value;
  };
  const handleReduceChange = (event) => {
    refReduce.current = event.target.value;
  };
  const handleCostChange = (event) => {
    refCost.current = event.target.value;
  };
  const handleStatusChange = (event) => {
    refStatus.current = event.target.value;
  };
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const hanldeProductChange = (event) => {
    refProductID.current = event.target.value;
    let product = listProducts?.find((prd) => prd.ProductID === parseInt(refProductID.current));
    if (product !== undefined) {
      setProductName(product.ProductName);
      setPrice(product.Price);
    } else {
      setProductName("");
      setPrice(0);
    }
  };
  const handleQuantityChange = (event) => {
    refQuantity.current = event.target.value;
  };
  useEffect(() => {
    handleShipChange();
  }, [selectedLocation]);
  const [shipCost, setShipCost] = useState(0);
  const handleShipChange = () => {
    let ship = true;
    let location = listLocations.find((obj) => obj.LocationID === parseInt(selectedLocation));
    if (parseFloat(refCart.current) >= 300000) ship = false;
    setShipCost(ship ? location.Distance * 5000 : 0);
  };

  const handleFindBill = () => {
    const id = refBillID.current.value === "" ? "" : refBillID.current.trim();
    const phone = refPhone.current.value === "" ? "" : refPhone.current.trim();
    const tax = refTax.current.value === "" ? "" : refTax.current.trim();
    const status = refStatus.current.value === "" ? "" : refStatus.current.trim();
    if (id !== "") {
      setListRowDisplay(listBill?.filter((obj) => obj.BillID === parseInt(id)));
    } else if (phone !== "") {
      setListRowDisplay(listBill?.filter((obj) => obj.PhoneNumber === phone) !== undefined ? listBill?.filter((obj) => obj.PhoneNumber === phone) : []);
    } else {
      setListRowDisplay(listBill);
    }

    if (tax.toLowerCase() === "all") {
      setListRowDisplay((prev) => prev.filter((obj) => obj.TaxCode !== ""));
    } else if (tax !== "") {
      setListRowDisplay((prev) => prev.filter((obj) => obj.TaxCode === tax));
    }
    if (status !== "") {
      setListRowDisplay((prev) => prev.filter((obj) => obj.Status === parseInt(status)));
    }
  };
  const handleDetail = () => {
    if (currentBill.current === undefined) alert("Nhập đúng BillID!");
    else handleSetActive(false);
  };
  const handleFindProduct = () => {
    const pid = refProductID.current.value === "" ? "" : refProductID.current;
    if (pid !== "") {
      console.log(pid);
      setRow(currentBill.current.filter((obj) => obj.ProductID === parseInt(pid)));
    } else {
      setListRowDisplay(currentBill.current);
    }
  };
  return (
    <div className={style.ProductManage}>
      <div className={style.Action}>
        <h2 onClick={() => handleSetActive(true)} className={active ? style.Active : ""}>
          Quản lý hóa đơn
        </h2>
        <h2 onClick={() => handleSetActive(false)} className={!active ? style.Active : ""}>
          Quản lý chi tiết hóa đơn
        </h2>
      </div>
      <h3>Form</h3>
      {active ? (
        <>
          <table>
            <thead>
              <th>BillID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
              <th>Note</th>
            </thead>
            <tbody>
              <td>
                <input type="text" ref={refBillID} onChange={handleBillIDChange} />
              </td>
              <td>
                <input type="text" ref={refName} onChange={handleNameChange} />
              </td>
              <td>
                <input type="text" ref={refPhone} onChange={handlePhoneChange} />
              </td>
              <td>
                <select value={selectedLocation} onChange={handleLocationChange}>
                  {listLocations.map((location) => (
                    <option key={location.LocationID} value={location.LocationID}>
                      {location.Location}
                    </option>
                  ))}
                </select>{" "}
              </td>
              <td>
                <input type="text" ref={refAddress} onChange={handleAddressChange} />
              </td>
              <td>
                <input type="text" ref={refDate} onChange={handleDateChange} />
              </td>
              <td>
                <input type="text" ref={refTime} onChange={handleTimeChange} />
              </td>
              <td>
                <input type="text" ref={refPayment} onChange={handlePaymentChange} />
              </td>
              <td>
                <textarea type="text" ref={refNote} onChange={handleNoteChange}></textarea>
              </td>
            </tbody>
          </table>

          <table>
            <thead>
              <th>CompanyName</th>
              <th>Email</th>
              <th>TaxCode</th>
              <th>CompanyAddress</th>
              <th>totalCart</th>
              <th>totalPresent</th>
              <th>ShipCost</th>
              <th>totalReduce</th>
              <th>totalCost</th>
              <th>Status</th>
            </thead>
            <tbody>
              <td>
                <input type="text" ref={refCompanyName} onChange={handleCompanyNameChange} />
              </td>
              <td>
                <input type="text" ref={refEmail} onChange={handleEmailChange} />
              </td>
              <td>
                <input type="text" ref={refTax} onChange={handleTaxChange} />
              </td>
              <td>
                <input type="text" ref={refCompanyAddress} onChange={handleCompanyAddressChange} />
              </td>
              <td>
                <input type="text" ref={refCart} onChange={handleCartChange} />
              </td>
              <td>
                <input type="text" ref={refPresent} onChange={handlePresentChange} />
              </td>
              <td>
                <input type="text" value={shipCost} onChange={handleShipChange} />
              </td>
              <td>
                <input type="text" ref={refReduce} onChange={handleReduceChange} />
              </td>
              <td>
                <input type="text" ref={refCost} onChange={handleCostChange} />
              </td>
              <td>
                <input type="text" ref={refStatus} onChange={handleStatusChange} />
              </td>
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table>
            <thead>
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              <td>
                <input type="text" ref={refProductID} onChange={hanldeProductChange} />
              </td>
              <td>
                <input type="text" value={ProductName} />
              </td>
              <td>
                <input type="text" value={Price} />
              </td>
              <td>
                <input type="text" ref={refQuantity} onChange={handleQuantityChange} />
              </td>
            </tbody>
          </table>
        </>
      )}
      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={active ? handleFindBill : handleFindProduct}>Tìm</button>
        {active ? <button onClick={handleDetail}>Chi tiết</button> : <button onClick={() => setActive(true)}>Quay lại</button>}
      </div>
      {active ? (
        <>
          <h3>Danh sách hóa đơn</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listRowDisplay.map((Category) => {
                return (
                  <tr>
                    {Value(Category.BillID).map((item) => (
                      <td>{item}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3>Chi tiết hóa đơn</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listRowDetail.map((product) => (
                <tr>
                  <td>{product.ProductID}</td>
                  <td>{product.ProductName}</td>
                  <td>{product.Price}</td>
                  <td>{product.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
