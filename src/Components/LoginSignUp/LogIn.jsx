import React,{useState} from "react";
import {Link } from "react-router-dom";
import style from "./LoginSignUp.module.css";

export default function LogIn(){
    const [isHidePassword,setHidePassword] = useState(true);
    return(
        <div className={style.Body}>
            <div className={style.Form}>
                <h2>Đăng nhập</h2>
                <div className={style.Input}>
                    <input type="text" placeholder="Số điện thoại" required/>
                    <label>Số điện thoại</label>
                </div>                
                <div className={style.Input}>
                    <input type={isHidePassword ? "password" : "text"} placeholder="Mật khẩu" required/>
                    <label>Mật khẩu</label>
                    <div className={isHidePassword ? style.BtnHide : style.BtnLook} onClick={()=>setHidePassword(!isHidePassword)}></div>
                </div>       
                <button className={style.BtnActive}>Đăng nhập</button>
                <a href="#">Quên mật khẩu</a>
                <div className={style.Line}>
                    <p>Hoặc</p>
                </div>
                <Link to="/Login/SignUp"> <button className={style.Btn} >Đăng ký</button> </Link>
            </div>
        </div>
    );
}

