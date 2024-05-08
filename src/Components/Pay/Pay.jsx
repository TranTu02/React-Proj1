import React,{useState,useContext} from "react";
import style from "./Pay.module.css";
import { ShopContext } from "../../Contexts/CartContext";
import * as DATA from "../Assets/data.js";

function Pay(){    
    let formatter = new Intl.NumberFormat('en-US');
    const currentDate = new Date();
    // lấy thông tin thời gian
    const currentTime = currentDate.getHours();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // Lấy thứ hiện tại (từ 0 đến 6, 0 là Chủ Nhật, 6 là Thứ Bảy)
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    // ngày hiện tại
    const dayName = daysOfWeek[ currentDate.getDay()];
    // ngày kế tiếp    
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDay + 1); 
    //thông tin ngày kế
    const nextDay = nextDate.getDate();
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();
    const nextDayName = daysOfWeek[nextDate.getDay()];
    // lấy thông tin ngày được chọn
    const [selectedDay,setSelectedDay] = useState(currentDate);
    const isChecked = () =>{
        return currentDate.getDate() === selectedDay.getDate();
    }
    const handleChangeSelectedDay = (event) => {
        setSelectedDay(new Date(event.target.value));
    };
    const isDisplayDeliveryTime = (hour) =>{
        if(hour > selectedDay.getHours() || selectedDay > currentDate){
            return true;
        }else {
            return false;
        }
    }

    //lấy thông tin giờ được chọn
    const [selectedTime,setSelectedTime] = useState(null);
    const [isInvoice,setIsInvoice] = useState(false);
    const { cartItems,getTotalCartAmount } = useContext(ShopContext);
    const cartInfor = DATA.ListCartInfor(cartItems);
    const shipCost = getTotalCartAmount(0) >= 300000 ? 0 : 10000;
    return(
        <div className={style.PayContainer}>
            <div className={style.CheckoutBox}>
                <h2 className={style.Heading}>Thông tin đặt hàng</h2>
                <div className={style.InputForm}>
                    <p>Họ tên người nhận</p>
                    <input type="text" placeholder="Nhập họ tên đầy đủ"/>
                </div>
                <div className={style.InputForm}>
                    <p>Số điện thoại</p>
                    <input type="text" placeholder="Nhập số điện thoại"/>
                </div>
                <div className={style.InputForm}>
                    <p><b>Khu vực giao hàng</b></p>
                    <div className={style.ChooseLocation}>
                        <input type="text" value={"abc, bcd , cde"}/>
                        <div className={style.Btn}><p>Đổi khu vực</p></div>
                    </div>
                </div>
                <div className={style.InputForm}>
                    <p>Địa chỉ</p>
                    <input type="text" placeholder="Nhập số nhà, tên đường, ..."/>
                </div>
            </div>
            <div className={style.CheckoutBox}>
                <h2 className={style.Heading}>Chọn thời gian giao hàng</h2>
                <p className={style.Title}>Chọn ngày giao hàng</p>
                <div className={style.DeliveryDay}>
                    <input type="radio" id={3} checked={isChecked()} name="Day" value={currentDate} onChange={handleChangeSelectedDay}/>
                    <label htmlFor={3}>
                        <p>{dayName}</p>
                        <p>{currentDay + "/" + currentMonth + "/" + currentYear}</p>
                    </label>
                    <input type="radio" id={4} name="Day" value={nextDate} onChange={handleChangeSelectedDay}/>
                    <label htmlFor={4}>
                        <p>{nextDayName}</p>
                        <p>{nextDay + "/" + nextMonth + "/" + nextYear}</p>
                    </label>
                </div>
                <p className={style.Title}>Chọn thời gian giao hàng</p>
                <div className={style.DeliveryTime}>
                    <div className={style.SelectForm}>
                        <p className={style.Label}>Sáng</p>
                        <input type="radio" id={8} name="Time" value={"08:00-10:00"} />
                        {isDisplayDeliveryTime(8)&&
                            <label htmlFor={8}>
                                <p>08:00-10:00</p>
                            </label>
                            
                        }
                        <input type="radio" id={10} name="Time" value={"10:00-12:00"} />
                        {isDisplayDeliveryTime(10)&&
                            <label htmlFor={10}>
                                <p>10:00-12:00</p>
                            </label>
                            
                        }
                    </div>
                    <div className={style.SelectForm}>
                        <p className={style.Label}>Chiều</p>
                        <input type="radio" id={12} name="Time" value={"12:00-14:00"} />
                        {isDisplayDeliveryTime(12)&&
                            <label htmlFor={12}>
                                <p>12:00-14:00</p>
                            </label>
                            
                        }
                        <input type="radio" id={14} name="Time" value={"14:00-16:00"} />
                        {isDisplayDeliveryTime(14)&&
                            <label htmlFor={14}>
                                <p>14:00-16:00</p>
                            </label>
                        }
                        <input type="radio" id={16} name="Time" value={"16:00-18:00"} />
                        {isDisplayDeliveryTime(16)&&
                            <label htmlFor={16}>
                                <p>16:00-18:00</p>
                            </label>
                        }
                    </div>
                    <div className={style.SelectForm}>
                        <p className={style.Label}>Tối</p>
                        <input type="radio" id={18} name="Time" value={"18:00-20:00"} />
                        {isDisplayDeliveryTime(18)&&
                            <label htmlFor={18}>
                                <p>18:00-20:00</p>
                            </label>
                        }
                    </div>
                </div>
            </div>
            <div className={style.PaymentMethod}>
                <h2>Phương thức thanh toán</h2>
                <div className={style.Method}>
                    <input type="radio" id={1} name="paymentMethod" value={1} />
                        <label htmlFor={1} >Thanh toán online</label>   
                    <input type="radio" id={2} name="paymentMethod" value={2} />
                        <label htmlFor={2} >Thanh toán khi nhận hàng (COD)</label>   
                </div>
                <h2>Ghi chú</h2>
                <textarea rows="4" aria-invalid="false" autocomplete="off" id="note" name="note" placeholder="" className={style.Note}>
                </textarea>
            </div>
            <div className={style.InvoiceField}>
                <input type="checkbox" id="Invoice" checked={isInvoice} onClick={()=>setIsInvoice(!isInvoice)}/>
                <p>Yêu cầu xuất hóa đơn</p>
            </div> 
            {
                isInvoice &&                
                <div className={style.CheckoutBox}>
                    <h2 className={style.Heading}>Thông tin đặt hàng</h2>
                    <div className={style.InputForm}>
                        <p>Tên công ty</p>
                        <input type="text" placeholder="Nhập tên công ty"/>
                    </div>
                    <div className={style.InputForm}>
                        <p>Email</p>
                        <input type="text" placeholder="Nhập địa chỉ email"/>
                    </div>
                    <div className={style.InputForm}>
                        <p>Mã số thuế</p>
                        <input type="text" placeholder="Nhập mã số thuế"/>
                    </div>
                    <div className={style.InputForm}>
                        <p>Địa chỉ công ty</p>
                        <input type="text" placeholder="Nhập địa chỉ công ty"/>
                    </div>
                </div>
            }
            <div className={style.ConfirmBox}>
                <div className={style.Infor}>
                    <p>Tổng tiền hàng</p>
                    <p>{formatter.format(cartInfor.totalCart)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Phí vận chuyển</p>
                    <p>{formatter.format(shipCost)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Khuyến mại</p>
                    <p>{formatter.format(cartInfor.totalReduce)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Tổng thanh toán</p>
                    <p className={style.Total}>{formatter.format(getTotalCartAmount(shipCost))} ₫</p>
                </div>
                <div className={style.AcceptBox}>
                    <input type="checkbox" id = "Accept" />
                    <p>
                        Bằng việc chọn vào Đặt Hàng, bạn đồng ý với <a>Điều khoản và điều kiện giao dịch trên E'Mart</a> và đồng ý trở thành Hội viên E'Mart theo <a>Điều khoản và điều kiện của Chương trình Hội viên E'Mart</a> sẽ được kích hoạt khi đơn hàng được giao thành công.
                    </p>
                </div>
                <div className={style.Btn}>
                    <p>XÁC NHẬN ĐẶT HÀNG</p>
                </div>
            </div>            

        </div>
    );
}

export default Pay;