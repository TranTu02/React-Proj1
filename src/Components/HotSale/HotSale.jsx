import React, { useState, useEffect } from 'react';
import style from './HotSale.module.css';
import Item from "../Item/Item.jsx";


function CountdownToNextMonth() {
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const nextWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));
        const timeRemainingValue = nextWeekDate - currentDate;
  
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
function HotSale(){
    const timeRemaining = CountdownToNextMonth();
    const data =[
        {src: '', price: 10000, productName: 'SP1 mmmmmmmmm mmmmmmm mmmmmmmmmmm mmmmmmmmmm mmmmmmmm', discont: 0.2, present:'s'},
        {src: '', price: 10000, productName: 'SP2', discont: 0.2, present:'a'},
        {src: '', price: 10000, productName: 'SP3', discont: 0.2, present:'a'},
        {src: '', price: 10000, productName: 'SP4', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP5', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP6', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP7', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP8', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP9', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP10', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP11', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP12', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP13', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP14', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP15', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP16', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP17', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP18', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP19', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP20', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP21', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP22', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP23', discont: 0.2, present:''},
        {src: '', price: 10000, productName: 'SP24', discont: 0.2, present:''}
    ]
    
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
                    <Item src={item.imgSrc} discont={item.discont} productName={item.productName} price={item.price} present={item.present} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default HotSale;