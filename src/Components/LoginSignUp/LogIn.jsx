import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./LoginSignUp.module.css";
import * as DATA from "../Assets/data.js";
import { ShopContext } from "../../Contexts/CartContext.jsx";

export default function LogIn() {
  const [isHidePassword, setHidePassword] = useState(true);
  const { phoneNumber, setCurrentAccount } = useContext(ShopContext);
  const refPhone = useRef();
  const refPassword = useRef();
  const navigate = useNavigate();
  const handleCheckInfor = () => {
    const PhoneNumber = refPhone.current ? refPhone.current.value : "";
    const Password = refPassword.current ? refPassword.current.value : "";
    if (
      DATA.listAccount.find((obj) => obj.PhoneNumber === PhoneNumber) ===
      undefined
    ) {
      alert("Số điện thoại chưa được đăng ký!");
    } else if (
      DATA.listAccount.find((obj) => obj.PhoneNumber === PhoneNumber)
        .Password !== Password
    ) {
      console.log(
        Password +
          "---" +
          DATA.listAccount.find((obj) => obj.PhoneNumber === PhoneNumber)
            .Password
      );
      alert("Sai mật khẩu");
    } else {
      alert("Đăng nhập thành công.");
      setCurrentAccount(PhoneNumber);
      navigate("/");
    }
  };
  return (
    <div className={style.Body}>
      <div className={style.Form}>
        <h2>Đăng nhập</h2>
        <div className={style.Input}>
          <input
            type="text"
            placeholder="Số điện thoại"
            ref={refPhone}
            required
          />
          <label>Số điện thoại</label>
        </div>
        <div className={style.Input}>
          <input
            type={isHidePassword ? "password" : "text"}
            ref={refPassword}
            placeholder="Mật khẩu"
            required
          />
          <label>Mật khẩu</label>
          <div
            className={isHidePassword ? style.BtnHide : style.BtnLook}
            onClick={() => setHidePassword(!isHidePassword)}
          ></div>
        </div>
        <button className={style.BtnActive} onClick={handleCheckInfor}>
          Đăng nhập
        </button>
        <a href="#">Quên mật khẩu</a>
        <div className={style.Line}>
          <p>Hoặc</p>
        </div>
        <Link to="/Login/SignUp">
          {" "}
          <button className={style.Btn}>Đăng ký</button>{" "}
        </Link>
      </div>
    </div>
  );
}
