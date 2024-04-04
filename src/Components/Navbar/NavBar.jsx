import React, { useState } from 'react';
import style from './NavBar.module.css';
import CategoryImage from '../Assets/category.png';
import img from '../Assets/camera.png';
import Contact from '../Assets/contacting.png';
import News from '../Assets/email.png';

function NavBar() {

    return (
        <div className={style.Navbar}>
            <div className={style.Category} >
                <img src={CategoryImage} alt="Category" />
                <h3>Danh mục sản phẩm</h3>
                <ul className={style.DropList1}>
                    <li><a href='#'>ABCD</a>
                        <div className={style.DropList2}>
                            <ul>
                                <li><a href='#'>AA.aaaaa</a></li>
                                <li><a href='#'>AA.bb</a></li>
                                <li><a href='#'>AA.cc</a></li>
                            </ul>
                            <img src={img} />
                        </div>
                    </li>
                    <li><a href='#'>BB</a></li>
                    <li><a href='#'>CC</a></li>
                    <li><a href='#'>DD</a></li>
                </ul>                
            </div>
            <div className={style.link}>
                <div className={style.News}>
                    <img src={News}/>
                    <a href='#'>Tin tức E'Mart</a>
                </div>
                <div className={style.Contact}>
                    <img src={Contact} />
                    <p>Tư vấn mua hàng</p>
                    <div className={style.ContactDetail}>
                        <p>Liên hệ: +84 xxx yyy zzz</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
