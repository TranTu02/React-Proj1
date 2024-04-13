import React, { useState } from 'react';
import style from './Footer.module.css';
import logo from '../Assets/Logo.png';
function Footer() {
    return (
        <footer className={style.FooterContainer}>
            <div className={style.FooterContent}>
                <div className={style.FooterContentSection}>
                    <img src={logo} width={150} height={65}/>
                    <p className={style.FooterInfor}>Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce</p>
                    <p className={style.FooterInfor}>Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010, đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023</p>
                    
                </div>
                <div className={style.FooterContentSection}>
                    <h4 className={style.FooterTitle}>Footer Title</h4>
                    <a href='#' className={style.FooterLink} >Footer link 1</a>
                    <a href='#' className={style.FooterLink} >Footer link 2</a>
                    <a href='#' className={style.FooterLink} >Footer link 3</a>
                    <a href='#' className={style.FooterLink} >Footer link 4</a>
                </div>
                <div className={style.FooterContentSection}>
                    <h4 className={style.FooterTitle}>Footer Title</h4>
                    <a href='#' className={style.FooterLink} >Footer link 1</a>
                    <a href='#' className={style.FooterLink} >Footer link 2</a>
                    <a href='#' className={style.FooterLink} >Footer link 3</a>
                    <a href='#' className={style.FooterLink} >Footer link 4</a>
                </div>
                <div className={style.FooterContentSection}>
                    <h4 className={style.FooterTitle}>Footer Title</h4>
                    <a href='#' className={style.FooterLink} >Footer link 1</a>
                    <a href='#' className={style.FooterLink} >Footer link 2</a>
                    <h4 className={style.FooterTitle}>Footer Title</h4>
                    <div className={style.FooterPathContainer}>
                        <img src='#' width={33} height={33}/>
                        <img src='#' width={33} height={33}/>
                        <img src='#' width={33} height={33}/>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
