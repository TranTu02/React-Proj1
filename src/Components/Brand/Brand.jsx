import React,{useState} from "react";
import * as DATA from '../Assets/data.js';
import style from './Brand.module.css';

function Brand(){
    const listBrand = DATA.listBrand();
    const data = listBrand.slice(0,10);
    return(
        <div className={style.BrandContainer}>
            <h2>Thuơng hiệu nổi bật</h2>
            <div className={style.ListBrand}>
                {data.map((item, index) => (
                    <img src={item.Logo} key={index}/>
                ))}
            </div>  
        </div>
    );
}

export default Brand;