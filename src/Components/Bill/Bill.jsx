import React from "react";
import style from "./Bill.module.css";
import * as DATA from "../Assets/data.js";

export default function Bill({billInfor,listCartItems}){
    //const listProducts = DATA.ListProductsDetail();
    //const listCartItems = [{...listProducts[1], Quantity: 2},{...listProducts[2], Quantity: 3},{...listProducts[80], Quantity: 1}] ;
    //const billInfor = {Name: "Tran Quang Tu", PhoneNumber: "0969504954", Location: "Ha Thuong, Dai Tu, Thai Nguyen", Address: "Xom Viet Thang", Date : "18/05/2024", Time : "10:00-12:00", Payment: "Online",Note: "None" , CompanyName: "", Email: "", TaxCode: "", CompanyAddress:"",totalCart: 100000,totalPresent: 50000 , ShipCost: 10000, totalReduce: 20000, totalCost: 90000};
    // Thông tin cần thiết
    console.log(billInfor)
    const QRText = "https://img.vietqr.io/image/TCB-19038211821017-qr_only.png?amount=" + billInfor.totalCost + "&addInfo=Giao%20Dich%20E%27Mart%20" + billInfor.Time + "%20ngay%20"+ billInfor.Date +"&accountName=TRAN%20QUANG%20TU";
    
    return(
        <div className={style.BillContainer}>
            <h2 className={style.Header}>HÓA ĐƠN</h2>
            <div className={style.Infor}>
                <p>Họ và tên: {billInfor.Name}</p>
                <p>Số điện thoại: {billInfor.PhoneNumber}</p>
                <p>Khu vực: {billInfor.Location}</p>
                <p>Địa chỉ: {billInfor.Address}</p>
                <p>Ngày giao hàng: {billInfor.Date}</p>
                <p>Thời điểm giao hàng: {billInfor.Time}</p>
                <p>Phương thức thanh toán: {billInfor.Payment}</p>
            </div>
            <div className={style.Infor}>
                <p>Tên công ty: {billInfor.CompanyName}</p>
                <p>Email: {billInfor.Email}</p>
                <p>Mã số thuế: {billInfor.TaxCode}</p>
                <p>Địa chỉ công ty: {billInfor.CompanyAddress}</p>
            </div>
            <div className={style.Content}>
                <div className={style.Cost}>
                    <p><b>Sản phẩm</b></p>
                    <p><b>Số lượng</b></p>
                    <p><b>Giá tiền</b></p>
                </div>
                {listCartItems.map( (item,key) => {
                    return(
                    <div className={style.Cost}>
                        <p>{item.ProductName}</p>
                        <p>{item.Quantity}</p>
                        {
                            item.Reduce=== undefined ?
                            <p>{item.Price}</p> :
                            <p>
                                <p className={style.Ori}>{item.Price}</p><br/>
                                <p>{item.Price * (1 - item.Reduce)}</p>
                            </p>
                        }
                    </div>
                    );
                })}
                <div className={style.Cost}>
                    <p><b>Tổng tiền hàng</b></p>
                    <p></p>
                    <p>{billInfor.totalCart}</p>
                </div>                
                <div className={style.Cost}>
                    <p><b>Tiết kiệm được</b></p>
                    <p></p>
                    <p>{billInfor.totalPresent}</p>
                </div>                
                <div className={style.Cost}>
                    <p><b>Khuyến mại</b></p>
                    <p></p>
                    <p>{billInfor.totalReduce}</p>
                </div>                
                <div className={style.Cost}>
                    <p><b>Phí vận chuyển</b></p>
                    <p></p>
                    <p>{billInfor.ShipCost}</p>
                </div>                
                <div className={style.Cost}>
                    <p><b>Tổng tiền phải trả</b></p>
                    <p></p>
                    <p>{billInfor.totalCost}</p>
                </div>
                
            </div>
            <h3>Mã QR thanh toán</h3>            
            <img src={QRText} className={style.QRcode}/>
            <p><b>Ghi chú: </b>{billInfor.Note}</p>
            <h3>Cảm ơn khách hàng đã tin tưởng lựa chọn E'Mart!</h3>
        </div>
    );
}