import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listBill, listLocations, listDetailBill, updateListBill, updateListDetailBill } from "../Assets/data";
import axios from "axios";
export const AdminBill = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
      const updateApiBill = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/bills");
          // Xử lý khi có kết quả trả về thành công
          const presentevent = response.data; // Mảng sản phẩm từ phản hồi
          // console.log(presentevent);
          return presentevent;
        } catch (error) {
          // Xử lý khi có lỗi xảy ra
          console.error("Lỗi khi lấy dữ liệu:", error);
          throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
        }
      };

      updateApiBill()
        .then((items) => {
          updateListBill(items);
        })
        .catch((error) => {
          // Xử lý lỗi nếu cần
          console.error("Lỗi khi cập nhật dữ liệu:", error);
        });
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  updateListBill(listBill.sort((a, b) => b.BillID - a.BillID));
  updateListDetailBill(listDetailBill.sort((a, b) => b.BillID - a.BillID));
  const [active, setActive] = useState(true);
  const [listRowDisplay, setListRowDisplay] = useState(active ? listBill : listDetailBill);
  const handleSetActive = (value) => {
    setActive(value);
    setListRowDisplay(value ? listBill : listDetailBill);
  };

  useEffect(() => {
    setListRowDisplay(active ? listBill : listDetailBill);
  }, [listBill, listDetailBill]);
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
  const refShipper = useRef("");

  const refProductID = useRef("");
  const refQuantity = useRef("");

  const getInfor = (item) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (active) {
      const locationID = listLocations.find((obj) => obj.Location === item.Location);
      refBillID.current.value = item.BillID;
      refName.current.value = item.Name;
      refPhone.current.value = item.PhoneNumber;
      setSelectedLocation(locationID === undefined ? 0 : locationID.LocationID);
      refAddress.current.value = item.Address;
      refDate.current.value = item.Date;
      refTime.current.value = item.Time;
      refPayment.current.value = item.Payment;
      refNote.current.value = item.Note;
      refCompanyName.current.value = item.CompanyName;
      refEmail.current.value = item.Email;
      refTax.current.value = item.TaxCode;
      refCompanyAddress.current.value = item.CompanyAddress;
      refCart.current.value = item.totalCart;
      refPresent.current.value = item.totalPresent;
      refReduce.current.value = item.totalReduce;
      refCost.current.value = item.totalCost;
      refStatus.current.value = item.Status;
      refShipper.current.value = item.Shipper || "";
    } else {
      refBillID.current.value = item.BillID;
      refProductID.current.value = item.ProductID;
      refQuantity.current.value = item.Quantity;
    }
  };

  const deleteForm = () => {
    if (active) {
      refBillID.current.value = "";
      refName.current.value = "";
      refPhone.current.value = "";
      setSelectedLocation(0);
      refAddress.current.value = "";
      refDate.current.value = "";
      refTime.current.value = "";
      refPayment.current.value = "";
      refNote.current.value = "";
      refCompanyName.current.value = "";
      refEmail.current.value = "";
      refTax.current.value = "";
      refCompanyAddress.current.value = "";
      refCart.current.value = "";
      refPresent.current.value = "";
      refReduce.current.value = "";
      refCost.current.value = "";
      refStatus.current.value = "";
      refShipper.current.value = "";
    } else {
      refBillID.current.value = "";
      refProductID.current.value = "";
      refQuantity.current.value = "";
    }
  };

  const handleBillIDChange = (event) => {
    refBillID.current.value = event.target.value;
  };
  const handleNameChange = (event) => {
    refName.current.value = event.target.value;
  };
  const handlePhoneChange = (event) => {
    refPhone.current.value = event.target.value;
  };
  const handleAddressChange = (event) => {
    refAddress.current.value = event.target.value;
  };
  const handleDateChange = (event) => {
    refDate.current.value = event.target.value;
  };
  const handleTimeChange = (event) => {
    refTime.current.value = event.target.value;
  };
  const handlePaymentChange = (event) => {
    refPayment.current.value = event.target.value;
  };
  const handleNoteChange = (event) => {
    refNote.current.value = event.target.value;
  };
  const handleCompanyNameChange = (event) => {
    refCompanyName.current.value = event.target.value;
  };
  const handleEmailChange = (event) => {
    refEmail.current.value = event.target.value;
  };
  const handleTaxChange = (event) => {
    refTax.current.value = event.target.value;
  };
  const handleCompanyAddressChange = (event) => {
    refCompanyAddress.current.value = event.target.value;
  };
  const handleCartChange = (event) => {
    refCart.current.value = event.target.value;
    handleShipChange();
  };
  const handlePresentChange = (event) => {
    refPresent.current.value = event.target.value;
  };
  const handleReduceChange = (event) => {
    refReduce.current.value = event.target.value;
  };
  const handleCostChange = (event) => {
    refCost.current.value = event.target.value;
  };
  const handleStatusChange = (event) => {
    refStatus.current.value = event.target.value;
  };
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const hanldeProductChange = (event) => {
    refProductID.current.value = event.target.value;
  };
  const handleQuantityChange = (event) => {
    refQuantity.current.value = event.target.value;
  };
  const handleShipperChange = (event) => {
    refShipper.current.value = event.target.value;
  };
  useEffect(() => {
    handleShipChange();
  }, [selectedLocation]);
  const [shipCost, setShipCost] = useState(0);
  const handleShipChange = () => {
    let ship = true;
    let location = listLocations.find((obj) => obj.LocationID === parseInt(selectedLocation));
    if (parseFloat(refCart.current.value) >= 300000) ship = false;
    setShipCost(ship ? location.Distance * 5000 : 0);
  };

  const deleteRow = async (itemid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/bills/${itemid}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateRow = async (itemid, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/bills/${itemid}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postRow = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/bills", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  //

  var nextID = listBill.length !== 0 ? listBill[0].BillID + 1 : 1;
  const handleAddBill = () => {
    const Bill = {
      BillID: nextID,
      Name: refName.current.value,
      PhoneNumber: refPhone.current.value,
      Location: listLocations.find((obj) => obj.LocationID === parseInt(selectedLocation)).Location,
      Address: refAddress.current.value,
      Date: refDate.current.value,
      Time: refTime.current.value,
      Payment: refPayment.current.value,
      Note: refNote.current.value,
      CompanyName: refCompanyName.current.value,
      Email: refEmail.current.value,
      TaxCode: refTax.current.value,
      CompanyAddress: refCompanyAddress.current.value,
      totalCart: parseInt(refCart.current.value),
      totalPresent: parseFloat(refPresent.current.value),
      ShipCost: shipCost,
      totalReduce: parseInt(refReduce.current.value),
      totalCost: parseInt(refCost.current.value),
      Shipper: refShipper.current.value,
      Status: parseInt(refStatus.current.value),
    };
    for (const key in Bill) {
      if (Bill[key] === "" || Bill[key] === undefined) {
        if (key !== "Shipper" && key !== "Note" && key !== "CompanyName" && key !== "CompanyAddress" && key !== "TaxCode" && key !== "Email") alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm id: ${nextID} ?`);
    if (result) {
      postRow(Bill)
        .then(() => {
          updateListBill([...listBill, Bill]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdateBill = () => {
    const updatedData = {
      BillID: parseInt(refBillID.current.value),
      Name: refName.current.value,
      PhoneNumber: refPhone.current.value,
      Location: listLocations.find((obj) => obj.LocationID === parseInt(selectedLocation)).Location,
      Address: refAddress.current.value,
      Date: refDate.current.value,
      Time: refTime.current.value,
      Payment: refPayment.current.value,
      Note: refNote.current.value,
      CompanyName: refCompanyName.current.value,
      Email: refEmail.current.value,
      TaxCode: refTax.current.value,
      CompanyAddress: refCompanyAddress.current.value,
      totalCart: parseInt(refCart.current.value),
      totalPresent: parseFloat(refPresent.current.value),
      ShipCost: shipCost,
      totalReduce: parseInt(refReduce.current.value),
      totalCost: parseInt(refCost.current.value),
      Shipper: refShipper.current.value,
      Status: parseInt(refStatus.current.value),
    };
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        if (key !== "Shipper" && key !== "Note" && key !== "CompanyName" && key !== "CompanyAddress" && key !== "TaxCode" && key !== "Email") {
          alert("Nhập đủ thông tin!");
          return false;
        }
      }
    }

    const result = window.confirm(`Chắc chắn muốn sửa id: ${refBillID.current.value} ?`);
    if (result) {
      updateRow(parseInt(refBillID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listBill.map((obj) => {
              if (obj.BillID === updatedData.BillID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListBill(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeleteBill = () => {
    if (refBillID.current.value === "") {
      alert("Nhập thông tin BillID!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa có id: ${refBillID.current.value} ?`);
    if (result) {
      console.log(refBillID.current.value);
      deleteRow(parseInt(refBillID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listBill.map((obj) => {
              if (obj.BillID === parseInt(refBillID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListBill(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };

  const handleFindBill = () => {
    const id = refBillID.current.value === "" ? "" : refBillID.current.value.trim();
    const phone = refPhone.current.value === "" ? "" : refPhone.current.value.trim();
    const tax = refTax.current.value === "" ? "" : refTax.current.value.trim();
    const status = refStatus.current.value === "" ? "" : refStatus.current.value.trim();
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
  const deleteRowD = async (itemid, idp) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/detailbill/${itemid}/${idp}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateRowD = async (itemid, idp, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/detailbill/${itemid}/${idp}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postRowD = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/detailbill", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  //

  const handleAddDetailBill = () => {
    const Bill = {
      BillID: parseInt(refBillID.current.value),
      ProductID: parseInt(refProductID.current.value),
      Quantity: parseInt(refQuantity.current.value),
    };
    for (const key in Bill) {
      if (Bill[key] === "" || Bill[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    if (listDetailBill.find((obj) => obj.BillID === Bill.BillID && obj.ProductID === Bill.ProductID) !== undefined) {
      alert("Đã tồn tại sản phẩm trong hóa đơn!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn thêm id: ${refBillID.current.value} + ${refProductID.current.value}?`);
    if (result) {
      postRowD(Bill)
        .then(() => {
          updateListDetailBill([...listDetailBill, Bill]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdateDetailBill = () => {
    const updatedData = {
      BillID: parseInt(refBillID.current.value),
      ProductID: parseInt(refProductID.current.value),
      Quantity: parseInt(refQuantity.current.value),
    };
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa id: ${refBillID.current.value} ?`);
    if (result) {
      updateRowD(parseInt(refBillID.current.value), parseInt(refProductID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listDetailBill.map((obj) => {
              if (obj.BillID === updatedData.BillID && obj.ProductID === updatedData.ProductID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListDetailBill(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeleteDetailBill = () => {
    if (refBillID.current.value === "" || refProductID.current.value === "") {
      alert("Nhập đủ thông tin BillID và ProductID!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa có id: ${refBillID.current.value} ?`);
    if (result) {
      console.log(refBillID.current.value);
      deleteRowD(parseInt(refBillID.current.value), parseInt(refProductID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listDetailBill.map((obj) => {
              if (obj.BillID !== parseInt(refBillID.current.value) || obj.ProductID !== parseInt(refProductID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListDetailBill(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };
  const handleFindProduct = () => {
    const id = refBillID.current.value === "" ? "" : refBillID.current.value.trim();
    if (id !== "") {
      setListRowDisplay(listDetailBill.filter((obj) => obj.BillID === parseInt(id)));
    } else {
      setListRowDisplay(listDetailBill);
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
              <th>Mã HĐ</th>
              <th>Họ tên</th>
              <th>Điện thoại</th>
              <th>Khu vực</th>
              <th>Địa chỉ</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Phương thức</th>
              <th>Ghi chú</th>
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
                <input type="text" ref={refDate} onChange={handleDateChange} placeholder="yyyy-mm-dd" />
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
              <th>Tên công ty</th>
              <th>Thư điện tử</th>
              <th>Mã số thuế</th>
              <th>Địa chỉ công ty</th>
              <th>Tổng giỏ</th>
              <th>Tổng quà</th>
              <th>Phí vận chuyển</th>
              <th>Tổng giảm</th>
              <th>Tổng thanh toán</th>
              <th>SĐT giao hàng</th>
              <th>Trạng thái</th>
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
                <input type="text" ref={refShipper} onChange={handleShipperChange} />
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
              <th>Mã hóa đơn</th>
              <th>Mã sản phẩm</th>
              <th>Số lượng</th>
            </thead>
            <tbody>
              <td>
                <input type="text" ref={refBillID} onChange={handleBillIDChange} />
              </td>
              <td>
                <input type="text" ref={refProductID} onChange={hanldeProductChange} />
              </td>

              <td>
                <input type="text" ref={refQuantity} onChange={handleQuantityChange} />
              </td>
            </tbody>
          </table>
        </>
      )}
      <div className={style.Action}>
        <button onClick={active ? handleAddBill : handleAddDetailBill}>Thêm</button>
        <button onClick={active ? handleUpdateBill : handleUpdateDetailBill}>Sửa</button>
        <button onClick={active ? handleDeleteBill : handleDeleteDetailBill}>Xóa</button>
        <button onClick={active ? handleFindBill : handleFindProduct}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách hóa đơn</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead} onClick={deleteForm}>
              <th>Mã HĐ</th>
              <th>Họ tên</th>
              <th>Điện thoại</th>
              <th>Khu vực</th>
              <th>Địa chỉ</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Phương thức</th>
              <th>Ghi chú</th>
              <th>Tên công ty</th>
              <th>Thư điện tử</th>
              <th>Mã số thuế</th>
              <th>Địa chỉ công ty</th>
              <th>Tổng giỏ</th>
              <th>Tổng quà</th>
              <th>Phí vận chuyển</th>
              <th>Tổng giảm</th>
              <th>Tổng thanh toán</th>
              <th>SĐT giao hàng</th>
              <th>Trạng thái</th>
            </thead>
            <tbody>
              {listRowDisplay.map((bill) => {
                return (
                  <tr onClick={() => getInfor(bill)}>
                    <td>{bill.BillID}</td>
                    <td>{bill.Name}</td>
                    <td>{bill.PhoneNumber}</td>
                    <td>{bill.Location}</td>
                    <td>{bill.Address}</td>
                    <td>{bill.Date}</td>
                    <td>{bill.Time}</td>
                    <td>{bill.Payment}</td>
                    <td>{bill.Note}</td>
                    <td>{bill.CompanyName}</td>
                    <td>{bill.Email}</td>
                    <td>{bill.TaxCode}</td>
                    <td>{bill.CompanyAddress}</td>
                    <td>{bill.totalCart}</td>
                    <td>{bill.totalPresent}</td>
                    <td>{bill.ShipCost}</td>
                    <td>{bill.totalReduce}</td>
                    <td>{bill.totalCost}</td>
                    <td>{bill.Shipper === undefined ? "" : bill.Shipper}</td>
                    <td>{bill.Status}</td>
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
            <thead className={style.TableHead} onClick={deleteForm}>
              <th>Mã hóa đơn</th>
              <th>Mã sản phẩm</th>
              <th>Số lượng</th>
            </thead>
            <tbody>
              {listRowDisplay.map((bill) => (
                <tr onClick={() => getInfor(bill)}>
                  <td>{bill.BillID}</td>
                  <td>{bill.ProductID}</td>
                  <td>{bill.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
