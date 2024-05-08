import React,{useState} from "react";
import style from "./LoginSignUp.module.css";
import {Link } from "react-router-dom";


export default function SignUp(){
    const [isHidePassword,setHidePassword] = useState(true);
    const [isHideConfirmPwd,setHideConfirmPwd] = useState(true);
    return(
        <div className={style.Body}>
            <div className={style.Form}>
                <h2>Đăng ký hội viên</h2>
                <div className={style.Input}>
                    <input type="text" placeholder="Số điện thoại" required/>
                    <label>Số điện thoại</label>
                </div>            
                <div className={style.Input}>
                    <input type="text" placeholder="Họ và tên" required/>
                    <label>Họ và tên</label>
                </div>       
                <div className={style.Input}>
                    <input type={isHidePassword ? "password" : "text"} placeholder="Mật khẩu" required/>
                    <label>Mật khẩu</label>
                    <div className={isHidePassword ? style.BtnHide : style.BtnLook} onClick={()=>setHidePassword(!isHidePassword)}></div>
                </div>       
                <div className={style.Input}>
                    <input type={isHideConfirmPwd ? "password" : "text"} placeholder="Nhập lại mật khẩu" required/>
                    <label>Nhập lại mật khẩu</label>
                    <div className={isHideConfirmPwd ? style.BtnHide : style.BtnLook} onClick={()=>setHideConfirmPwd(!isHideConfirmPwd)}></div>
                </div>     
                <div className={style.Input}>
                    <input type="text" placeholder="Ngày sinh (dd/mm/yyyy)" required/>
                    <label>Ngày sinh</label>
                </div>       
                <a href="#">Ấn vào đăng ký để trở thành hội viên E'Mart</a>
                <button className={style.BtnActive}>Đăng ký</button>
                <div className={style.Line}>
                    <p>Hoặc</p>
                </div>
                <Link to="/Login"><button className={style.Btn}>Đăng nhập</button></Link>
            </div>
        </div>
    );
}

