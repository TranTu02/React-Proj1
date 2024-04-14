import React,{useState} from "react";
import style from './BreadCrumb.module.css';

function BreadCrumb({CategoryName,ProductName}){
    return(
        <>{
            ProductName !== undefined ?<p className={style.BreadCrumb}>Trang chủ / {CategoryName} / {ProductName}</p>
            :     
            <p className={style.BreadCrumb}>Trang chủ / {CategoryName}</p>
            }
        </>

    );  
}

export default BreadCrumb;