// SignUp.js

import React, { useContext, useRef, useState } from "react";
import style from "./LoginSignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as DATA from "../Assets/data.js";
import axios from "axios";
import { ShopContext } from "../../Contexts/CartContext.jsx";

export default function SignUp() {
  const { setCurrentAccount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isHidePassword, setHidePassword] = useState(true);
  const [isHideConfirmPwd, setHideConfirmPwd] = useState(true);
  const refPN = useRef();
  const refName = useRef();
  const refPW = useRef();
  const refCF = useRef();
  const refBD = useRef();

  const handleChangePN = (event) => {
    refPN.current.value = event.target.value;
  };

  const handleChangePW = (event) => {
    refPW.current.value = event.target.value;
  };

  const handleChangeCF = (event) => {
    refCF.current.value = event.target.value;
  };

  const handleChangeBD = (event) => {
    refBD.current.value = event.target.value;
  };

  const handleChangeName = (event) => {
    refName.current.value = event.target.value;
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split("/");
    const dateObj = new Date(`${year}-${month}-${day}`);

    return dateObj.getFullYear() == year && dateObj.getMonth() + 1 == month && dateObj.getDate() == Number(day);
  };

  const postAccount = async (account) => {
    try {
      const response = await axios.post("http://localhost:3000/api/accounts", account, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  const handleRegister = () => {
    const PhoneNumber = refPN.current.value;
    const Name = refName.current.value;
    const Password = refPW.current.value;
    const ConfirmPassword = refCF.current.value;
    const Birthdate = refBD.current.value;

    if (!PhoneNumber || !Name || !Password || !ConfirmPassword || !Birthdate) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (Password !== ConfirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    if (DATA.listAccount.find((obj) => obj.PhoneNumber === PhoneNumber)) {
      alert("Số điện thoại đã được đăng ký!");
      return;
    }

    if (!isValidDate(Birthdate)) {
      alert("Ngày sinh không hợp lệ!");
      return;
    }

    const account = {
      AccountID: DATA.listAccount[DATA.listAccount.length - 1].AccountID + 1,
      PhoneNumber: PhoneNumber,
      Name: Name,
      Password: Password,
      Birthday: Birthdate,
      Authorize: parseInt(0),
    };
    console.log(account);
    postAccount(account)
      .then(() => {
        alert("Đăng ký thành công!");
        setCurrentAccount(account);
        navigate("/");
      })
      .catch((error) => console.error("Error adding account:", error));
  };

  return (
    <div className={style.Body}>
      <div className={style.Form}>
        <h2>Đăng ký hội viên</h2>
        <div className={style.Input}>
          <input type="text" ref={refPN} onChange={handleChangePN} placeholder="Số điện thoại" required />
          <label>
            Số điện thoại <span style={{ color: "red" }}>(*)</span>
          </label>
        </div>
        <div className={style.Input}>
          <input type="text" ref={refName} onChange={handleChangeName} placeholder="Họ và tên" required />
          <label>
            Họ và tên <span style={{ color: "red" }}>(*)</span>
          </label>
        </div>
        <div className={style.Input}>
          <input type={isHidePassword ? "password" : "text"} ref={refPW} onChange={handleChangePW} placeholder="Mật khẩu" required />
          <label>
            Mật khẩu <span style={{ color: "red" }}>(*)</span>
          </label>
          <div className={isHidePassword ? style.BtnHide : style.BtnLook} onClick={() => setHidePassword(!isHidePassword)}></div>
        </div>
        <div className={style.Input}>
          <input type={isHideConfirmPwd ? "password" : "text"} ref={refCF} onChange={handleChangeCF} placeholder="Nhập lại mật khẩu" required />
          <label>
            Nhập lại mật khẩu <span style={{ color: "red" }}>(*)</span>
          </label>
          <div className={isHideConfirmPwd ? style.BtnHide : style.BtnLook} onClick={() => setHideConfirmPwd(!isHideConfirmPwd)}></div>
        </div>
        <div className={style.Input}>
          <input type="text" ref={refBD} onChange={handleChangeBD} placeholder="Ngày sinh (dd/mm/yyyy)" required />
          <label>
            Ngày sinh <span style={{ color: "red" }}>(*)</span>
          </label>
        </div>
        <a href="#">Ấn vào đăng ký để trở thành hội viên E'Mart</a>
        <button className={style.BtnActive} onClick={handleRegister}>
          Đăng ký
        </button>
        <div className={style.Line}>
          <p>Hoặc</p>
        </div>
        <Link to="/Login">
          <button className={style.Btn}>Đăng nhập</button>
        </Link>
      </div>
    </div>
  );
}
