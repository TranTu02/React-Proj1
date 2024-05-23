import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../../Contexts/CartContext";
import style from "./Account.module.css";
import { listAccount, listBill, listDetailBill, ListProductsDetail, updateListBill } from "../Assets/data";
import Bill from "../Bill/Bill";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Account() {
  let formatter = new Intl.NumberFormat("en-US");
  const [listBillDisplay, setListBillDisplay] = useState(listBill.sort((a, b) => b.BillID - a.BillID));
  useEffect(() => {
    setListBillDisplay(listBill.sort((a, b) => b.BillID - a.BillID));
  }, [listBill]);
  const { phoneNumber, setCurrentAccount } = useContext(ShopContext);
  const [isActive, setIsActive] = useState(true);
  const handleSetActive = (isInfor) => {
    isInfor === true ? setIsActive(true) : setIsActive(false);
  };

  let accountInfor = listAccount.find((obj) => obj.PhoneNumber === phoneNumber);
  if (accountInfor === undefined) {
    accountInfor = [];
  }
  // form
  const updateRow = async (itemid, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/bills/${itemid}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const newName = useRef();
  const newBirth = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const password = useRef();
  const handleConfirmInfor = () => {
    if (password.current.value !== listAccount.find((obj) => obj.PhoneNumber === phoneNumber).Password) {
      alert("Nhập đúng mật khẩu để thay đổi thông tin!");
    } else if (newName.current.value.trim() + newBirth.current.value.trim() + newPassword.current.value === "") {
      alert("Nhập thông tin bất kì để thay đổi!");
    } else if (newPassword.current.value !== confirmPassword.current.value) {
      alert("Xác nhận mật khẩu phải trùng với mật khẩu mới!");
    } else {
      const result = window.confirm("Xác nhận thay đổi thông tin cá nhân?");
      if (result) {
        alert("Thay đổi thành công!");
        // back-end
        newName.current.value = "";
        newBirth.current.value = "";
        newPassword.current.value = "";
        confirmPassword.current.value = "";
        password.current.value = "";
      }
    }
  };
  // displaybill
  const [isDisplayBill, setIsDisplayBill] = useState(false);
  const [billInfor, setBillInfor] = useState();
  const [listItems, setListItems] = useState();
  const handleDisplayBill = (infor) => {
    setBillInfor(infor);
    setListItems(
      listDetailBill
        .filter((obj) => obj.BillID === infor.BillID)
        .map((item) => {
          return { ...ListProductsDetail().find((id) => id.ProductID === item.ProductID), Quantity: item.Quantity };
        })
    );
    setIsDisplayBill(true);
  };

  // const cartInfor = DATA.ListCartInfor(cartItems);
  const handleCloseBill = () => {
    setIsDisplayBill(false);
  };
  //confirm
  const handleConfirm = async (infor) => {
    const result = window.confirm("Xác nhận đã nhận được hàng!");
    if (result) {
      let updatedBill = { ...infor, Status: 0 }; // Tạo một bản sao của billInfor và cập nhật Status
      try {
        await updateRow(infor.BillID, updatedBill); // Gửi yêu cầu cập nhật lên server
        // Sau khi cập nhật thành công, cập nhật lại danh sách hóa đơn trong state
        const newList = () => {
          let list = [];
          listBill.map((obj) => {
            if (obj.BillID === updatedBill.BillID) {
              list.push(updatedBill);
            } else {
              list.push(obj);
            }
          });
          return list;
        };
        updateListBill(newList());
        alert("Đã nhận hàng thành công!");
      } catch (error) {
        console.error("Error updating bill:", error);
        alert("Có lỗi xảy ra khi xác nhận đơn hàng.");
      }
    }
  };

  // log out
  const navigate = useNavigate();
  const handleLogOut = () => {
    const result = window.confirm("Xác nhận đăng xuất?");
    if (result) {
      setCurrentAccount("");
      navigate("/");
      alert("Đăng xuất thành công");
    }
  };
  return (
    <div className={style.AccountBody}>
      <div className={style.AccountContainer}>
        <div className={style.Title}>
          <h2 onClick={() => handleSetActive(true)} className={isActive ? style.Active : style.nonActive}>
            THÔNG TIN TÀI KHOẢN
          </h2>
          <h2 onClick={() => handleSetActive(false)} className={isActive ? style.nonActive : style.Active}>
            LỊCH SỬ MUA HÀNG
          </h2>
        </div>
        {isActive ? (
          <>
            <div className={style.Infor}>
              <p className={style.Label}>Số điện thoại</p>
              <input type="text" value={accountInfor.PhoneNumber} />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Họ và tên</p>
              <input type="text" value={accountInfor.Name} />
            </div>

            <div className={style.Infor}>
              <p className={style.Label}>Ngày sinh</p>
              <input type="text" value={accountInfor.Birthday} />
            </div>
            <h2>Thay đổi thông tin</h2>
            <div className={style.Infor}>
              <p className={style.Label}>Đổi tên</p>
              <input type="text" ref={newName} placeholder="Nguyễn Văn A . . ." />
            </div>

            <div className={style.Infor}>
              <p className={style.Label}>Đổi ngày sinh</p>
              <input type="text" ref={newBirth} placeholder="dd/mm/yyyy" />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Thay đổi mật khẩu</p>
              <input type="Password" ref={newPassword} placeholder="Nhập mật khẩu mới" />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Xác nhận mật khẩu</p>
              <input type="Password" ref={confirmPassword} placeholder="Nhập lại mật khẩu mới" />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Nhập mật khẩu</p>
              <input type="Password" ref={password} placeholder="Nhập mật khẩu hiện tại để đổi thông tin" />
            </div>
            <div className={style.Infor}>
              <button onClick={handleConfirmInfor} className={style.Btn}>
                Đổi thông tin
              </button>
              <button onClick={handleLogOut} className={style.Btn}>
                Đăng xuất
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={style.TitleList}>
              <p className={style.DateTime}>
                <b>Ngày</b>
              </p>
              <p className={style.DateTime}>
                <b>Giờ</b>
              </p>
              <p>
                <b>Phương thức</b>
              </p>
              <p>
                <b>Tổng tiền</b>
              </p>
              <p>
                <b>SDT người giao</b>
              </p>
              <p>
                <b>Tình trạng</b>
              </p>
            </div>
            {listBillDisplay.map((bill) => {
              if (bill.PhoneNumber === phoneNumber) {
                return (
                  <div key={bill.BillID} onClick={() => handleDisplayBill(bill)} className={style.ListBills}>
                    <p className={style.DateTime}>{bill.Date}</p>
                    <p className={style.DateTime}>{bill.Time}</p>
                    <p>{bill.Payment}</p>
                    <p>{formatter.format(bill.totalCost)}</p>
                    <p>{bill?.Shipper}</p>
                    <p>
                      {bill.Status !== 0 ? (
                        <button
                          onClick={() => {
                            handleConfirm(bill);
                          }}
                        >
                          Xác nhận đơn hàng
                        </button>
                      ) : (
                        "Đã nhận được hàng"
                      )}
                    </p>
                  </div>
                );
              }
            })}
          </>
        )}
      </div>

      {isDisplayBill && (
        <>
          <Bill billInfor={billInfor} listCartItems={listItems} />
          <button onClick={handleCloseBill} className={style.CloseBill}>
            Close
          </button>
        </>
      )}
    </div>
  );
}
