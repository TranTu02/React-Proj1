import React, { useState, useEffect, useMemo } from 'react';
import style from './HotSale.module.css';
import Item from "../Item/Item.jsx";
import img from '../Assets/camera.png';
import * as DATA from '../Assets/data.js';

const CountDown = (ExpirationDate) => {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        //const nextWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));
        const timeRemainingValue = ExpirationDate - currentDate;
  
        const days = Math.floor(timeRemainingValue / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemainingValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemainingValue % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemainingValue % (1000 * 60)) / 1000);
  
        setTimeRemaining({ days, hours, minutes, seconds });
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return timeRemaining;
  }

function HotSale({DiscountID}){
    const timeRemaining = CountDown(DATA.listSaleEvents.find(obj => obj.DiscountID === DiscountID).End);
    const arrProduct = DATA.ListHotSale().filter(obj => obj.DiscountID === DiscountID);
    const data = arrProduct.slice(0,20);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage > data.length ? (currentPage - 1) * itemsPerPage + data.length % 5 : currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1); 
        } else if (currentPage === Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(1);         
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    if(timeRemaining.seconds < 0) return <></>
    else
    return(
        <div className={style.HotSaleContainer}>
            <div className={style.HotSaleBanner}>
                <h3>Hot sale tháng 4</h3>
                <div className={style.CDContainer}>
                    <h3>Kết thúc sau</h3>
                    <ul>
                        <li>{timeRemaining.days*24 + timeRemaining.hours}</li>
                        <li>{timeRemaining.minutes}</li>
                        <li>{timeRemaining.seconds}</li>
                    </ul>
                </div>
            </div>
            <div className={style.HotSaleItem}>
                <div className={style.Prev} onClick={prevPage}>&#10094;</div>
                <div className={style.Next} onClick={nextPage}>&#10095;</div>
                {currentItems.map((item, index) => (
                    <Item product={item} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default HotSale;