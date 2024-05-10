import React, { useContext, useRef, useState } from "react";
import { ShopContext } from "../../Contexts/CartContext";
import style from "./Account.module.css";
import { listAccount, listBill } from "../Assets/data";
import Bill from "../Bill/Bill";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { phoneNumber, setCurrentAccount } = useContext(ShopContext);
  const [isActive, setIsActive] = useState(true);
  const handleSetActive = (isInfor) => {
    isInfor === true ? setIsActive(true) : setIsActive(false);
  };
  // const phoneNumber = "0969504954";
  const accountInfor = listAccount.find(
    (obj) => obj.PhoneNumber === phoneNumber
  );
  // form
  const newName = useRef();
  const newBirth = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const password = useRef();
  const handleConfirmInfor = () => {
    if (
      password.current.value !==
      listAccount.find((obj) => obj.PhoneNumber === phoneNumber).Password
    ) {
      alert("Nhập đúng mật khẩu để thay đổi thông tin!");
    } else if (
      newName.current.value.trim() +
        newBirth.current.value.trim() +
        newPassword.current.value ===
      ""
    ) {
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
  const handleDisplayBill = (infor) => {
    setBillInfor(infor);
    setIsDisplayBill(true);
  };
  const handleCloseBill = () => {
    setIsDisplayBill(false);
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
          <h2
            onClick={() => handleSetActive(true)}
            className={isActive ? style.Active : style.nonActive}
          >
            THÔNG TIN TÀI KHOẢN
          </h2>
          <h2
            onClick={() => handleSetActive(false)}
            className={isActive ? style.nonActive : style.Active}
          >
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
              <input
                type="text"
                ref={newName}
                placeholder="Nguyễn Văn A . . ."
              />
            </div>

            <div className={style.Infor}>
              <p className={style.Label}>Đổi ngày sinh</p>
              <input type="text" ref={newBirth} placeholder="dd/mm/yyyy" />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Thay đổi mật khẩu</p>
              <input
                type="Password"
                ref={newPassword}
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Xác nhận mật khẩu</p>
              <input
                type="Password"
                ref={confirmPassword}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            <div className={style.Infor}>
              <p className={style.Label}>Nhập mật khẩu</p>
              <input
                type="Password"
                ref={password}
                placeholder="Nhập mật khẩu hiện tại để đổi thông tin"
              />
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
              <p>
                <b>Ngày</b>
              </p>
              <p>
                <b>Giờ</b>
              </p>
              <p>
                <b>Phương thức thanh toán</b>
              </p>
              <p>
                <b>Tổng tiền thanh toán</b>
              </p>
            </div>
            {listBill.map((bill) => {
              if (bill.PhoneNumber === phoneNumber) {
                return (
                  <div
                    onClick={() => handleDisplayBill(bill)}
                    className={style.ListBills}
                  >
                    <p>{bill.Date}</p>
                    <p>{bill.Time}</p>
                    <p>{bill.Payment}</p>
                    <p>{bill.totalCost}</p>
                  </div>
                );
              }
            })}
          </>
        )}
      </div>

      {isDisplayBill && (
        <>
          <Bill billInfor={billInfor} listCartItems={billInfor.listItems} />
          <button onClick={handleCloseBill} className={style.CloseBill}>
            Close
          </button>
        </>
      )}
    </div>
  );
}
