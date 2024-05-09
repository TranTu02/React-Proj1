import React from "react";
import style from "./Location.module.css";
import { useContext,useState } from "react";
import { ShopContext } from "../../Contexts/CartContext";
import * as DATA from "../Assets/data.js";
import Header from "../Header/Header.jsx";

export default function Location({handleOnClick}){
    let formatter = new Intl.NumberFormat('en-US');
    const {currentLocation,setLocation} = useContext(ShopContext);
    const click = handleOnClick;
    console.log(click);
    const handleLocation = (locationID) =>{
        setLocation(locationID);
        if (handleOnClick) {
            handleOnClick();
        }
    }

    return(
        <div>           
                <div className={style.BackGround} onClick={handleOnClick}/>
                <div className={style.LocationContainer} >
                    <h2>Chọn địa điểm</h2>
                    {
                        DATA.listLocations.map( item => {    
                            return(                    
                                <div className={style.Location} onClick={()=>handleLocation(item.LocationID)}>
                                    <h3>{item.Location}</h3>
                                    <p>Khoảng cách: {item.Distance} - Phí vận chuyển: {formatter.format(item.Distance * 5000)} ₫</p>
                                </div>
                            );
                        })
                    }
                </div>
        </div>
    );
}