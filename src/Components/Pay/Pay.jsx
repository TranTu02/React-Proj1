import React, { useState, useContext, useRef } from "react";
import style from "./Pay.module.css";
import { ShopContext } from "../../Contexts/CartContext";
import * as DATA from "../Assets/data.js";
import Bill from "../Bill/Bill.jsx";
import Location from "../Location/Location.jsx";
import { useNavigate } from "react-router-dom";

function Pay() {
  let formatter = new Intl.NumberFormat("en-US");
  // Thay đổi địa điểm
  const [isDisplayPinMap, setIsDisplayPinMap] = useState(false);
  const handlePinMap = () => {
    setIsDisplayPinMap(!isDisplayPinMap);
    console.log(isDisplayPinMap);
  };
  const currentDate = new Date();
  // lấy thông tin thời gian
  const currentTime = currentDate.getHours();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  // Lấy thứ hiện tại (từ 0 đến 6, 0 là Chủ Nhật, 6 là Thứ Bảy)
  const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  // ngày hiện tại
  const dayName = daysOfWeek[currentDate.getDay()];
  // ngày kế tiếp
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDay + 1);
  //thông tin ngày kế
  const nextDay = nextDate.getDate();
  const nextMonth = nextDate.getMonth();
  const nextYear = nextDate.getFullYear();
  const nextDayName = daysOfWeek[nextDate.getDay()];
  // lấy thông tin ngày được chọn
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const isChecked = () => {
    return currentDate.getDate() === selectedDay.getDate();
  };
  const handleChangeSelectedDay = (event) => {
    setSelectedDay(new Date(event.target.value));
  };
  const isDisplayDeliveryTime = (hour) => {
    if (hour > selectedDay.getHours() || selectedDay > currentDate) {
      return true;
    } else {
      return false;
    }
  };
  //lấy thông tin giờ được chọn
  const [selectedTime, setSelectedTime] = useState(null);
  const handleSelectedTime = (event) => {
    setSelectedTime(event.target.value);
  };
  // lấy phương thức thanh toán
  const [selectedPayment, setSelectedPayment] = useState(null);
  const handleSelectedPayment = (event) => {
    setSelectedPayment(event.target.value);
  };

  // lấy thông tin các ô checkbox
  const [isInvoice, setIsInvoice] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  // Giỏ hàng
  const { cartItems, deleteCart, getTotalCartAmount, currentLocation } = useContext(ShopContext);
  const cartInfor = DATA.ListCartInfor(cartItems);
  const shipCost = getTotalCartAmount(0) >= 300000 ? 0 : currentLocation.Distance * 5000;

  const [isDisplayBill, setIsDisplayBill] = useState(false);

  const handleDisplayBill = () => {
    const result = window.confirm("Bạn có chắc chắn muốn đặt đơn hàng?");
    if (result) {
      // Thực hiện hành động khi người dùng đồng ý
      alert("Đặt hàng thành công");
      setIsDisplayBill(!isDisplayBill);
      deleteCart();
    } else {
      // Thực hiện hành động khi người dùng từ chối
      alert("Đã hủy bỏ");
    }
  };
  const navigate = useNavigate();
  const routeMainPage = () => {
    const result = window.confirm("Xác nhận thoát và quay về trang chủ?");
    if (result) {
      navigate("/");
      alert("Cảm ơn khách hàng đã tin tưởng đặt hàng tại E'Mart");
    } else {
      // Thực hiện hành động khi người dùng từ chối
      alert("Đã hủy bỏ");
    }
  };

  //Lựa chọn

  // Lấy các thông tin
  const refName = useRef(null);
  const refPhone = useRef(null);
  const refLocation = useRef(null);
  const refAddress = useRef(null);
  const refNote = useRef("");
  const refCompanyName = useRef(null);
  const refEmail = useRef(null);
  const refTaxCode = useRef(null);
  const refCompanyAddress = useRef(null);

  const [billInfor, setBillInfor] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    let requireInfor1 = false;
    let requireInfor2 = false;
    let requireInfor3 = false;
    let requireInfor4 = true;
    const Name = refName.current ? refName.current.value : "";
    const PhoneNumber = refPhone.current ? refPhone.current.value : "";
    const Location = refLocation.current ? refLocation.current.value : "";
    const Address = refAddress.current ? refAddress.current.value : "";
    const Note = refNote.current ? refNote.current.value : "";
    const CompanyName = refCompanyName.current ? refCompanyName.current.value : "";
    const Email = refEmail.current ? refEmail.current.value : "";
    const TaxCode = refTaxCode.current ? refTaxCode.current.value : "";
    const CompanyAddress = refCompanyAddress.current ? refCompanyAddress.current.value : "";

    if (Name.trim() === "" || PhoneNumber.trim() === "" || Location.trim() === "" || Address.trim() === "") {
      requireInfor1 = false;
    } else {
      requireInfor1 = true;
    }

    if (selectedTime !== null) {
      requireInfor2 = true;
    } else {
      requireInfor2 = false;
    }
    if (selectedPayment !== null && isAccept) {
      requireInfor3 = true;
    } else {
      requireInfor3 = false;
    }
    if (isInvoice === true) {
      if (CompanyName.trim() === "" || Email.trim() === "" || TaxCode.trim() === "" || CompanyAddress.trim() === "") requireInfor4 = false;
      else requireInfor4 = true;
    } else {
      requireInfor4 = true;
    }
    if (requireInfor1 && requireInfor2 && requireInfor3 && requireInfor4) {
      setBillInfor({
        Name: Name,
        PhoneNumber: PhoneNumber,
        Location: Location,
        Address: Address,
        Date: `${selectedDay.getDate()}/${selectedDay.getMonth()}/${selectedDay.getFullYear()}`,
        Time: selectedTime,
        Payment: selectedPayment,
        Note: Note,
        CompanyName: CompanyName,
        Email: Email,
        TaxCode: TaxCode,
        CompanyAddress: CompanyAddress,
        totalCart: cartInfor.totalCart,
        totalPresent: cartInfor.totalPresent,
        ShipCost: shipCost,
        totalReduce: cartInfor.totalReduce,
        totalCost: getTotalCartAmount(shipCost),
      });
      console.log(billInfor);
      handleDisplayBill();
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className={style.PayContainer}>
      <div className={style.CheckoutBox}>
        <h2 className={style.Heading}>Thông tin đặt hàng</h2>
        <div className={style.InputForm}>
          <p>Họ tên người nhận</p>
          <input type="text" placeholder="Nhập họ tên đầy đủ" ref={refName} />
        </div>
        <div className={style.InputForm}>
          <p>Số điện thoại</p>
          <input type="text" placeholder="Nhập số điện thoại" ref={refPhone} />
        </div>
        <div className={style.InputForm}>
          <p>
            <b>Khu vực giao hàng</b>
          </p>
          <div className={style.ChooseLocation}>
            <input type="text" value={currentLocation.Location} ref={refLocation} />
            <div className={style.Btn} onClick={handlePinMap}>
              <p>Đổi địa điểm</p>
            </div>
          </div>
        </div>
        <div className={style.InputForm}>
          <p>Địa chỉ</p>
          <input type="text" placeholder="Nhập số nhà, tên đường, ..." ref={refAddress} />
        </div>
      </div>
      <div className={style.CheckoutBox}>
        <h2 className={style.Heading}>Chọn thời gian giao hàng</h2>
        <p className={style.Title}>Chọn ngày giao hàng</p>
        <div className={style.DeliveryDay}>
          <input type="radio" id={3} checked={isChecked()} name="Day" value={currentDate} onChange={handleChangeSelectedDay} />
          <label htmlFor={3}>
            <p>{dayName}</p>
            <p>{currentDay + "/" + currentMonth + "/" + currentYear}</p>
          </label>
          <input type="radio" id={4} name="Day" value={nextDate} onChange={handleChangeSelectedDay} />
          <label htmlFor={4}>
            <p>{nextDayName}</p>
            <p>{nextDay + "/" + nextMonth + "/" + nextYear}</p>
          </label>
        </div>
        <p className={style.Title}>Chọn thời gian giao hàng</p>
        <div className={style.DeliveryTime}>
          <div className={style.SelectForm}>
            <p className={style.Label}>Sáng</p>
            <input type="radio" id={8} name="Time" onChange={handleSelectedTime} value={"08:00-10:00"} />
            {isDisplayDeliveryTime(8) && (
              <label htmlFor={8}>
                <p>08:00-10:00</p>
              </label>
            )}
            <input type="radio" id={10} name="Time" onChange={handleSelectedTime} value={"10:00-12:00"} />
            {isDisplayDeliveryTime(10) && (
              <label htmlFor={10}>
                <p>10:00-12:00</p>
              </label>
            )}
          </div>
          <div className={style.SelectForm}>
            <p className={style.Label}>Chiều</p>
            <input type="radio" id={12} name="Time" onChange={handleSelectedTime} value={"12:00-14:00"} />
            {isDisplayDeliveryTime(12) && (
              <label htmlFor={12}>
                <p>12:00-14:00</p>
              </label>
            )}
            <input type="radio" id={14} name="Time" onChange={handleSelectedTime} value={"14:00-16:00"} />
            {isDisplayDeliveryTime(14) && (
              <label htmlFor={14}>
                <p>14:00-16:00</p>
              </label>
            )}
            <input type="radio" id={16} name="Time" onChange={handleSelectedTime} value={"16:00-18:00"} />
            {isDisplayDeliveryTime(16) && (
              <label htmlFor={16}>
                <p>16:00-18:00</p>
              </label>
            )}
          </div>
          <div className={style.SelectForm}>
            <p className={style.Label}>Tối</p>
            <input type="radio" id={18} name="Time" onChange={handleSelectedTime} value={"18:00-20:00"} />
            {isDisplayDeliveryTime(18) && (
              <label htmlFor={18}>
                <p>18:00-20:00</p>
              </label>
            )}
          </div>
        </div>
      </div>
      <div className={style.PaymentMethod}>
        <h2>Phương thức thanh toán</h2>
        <div className={style.Method}>
          <input type="radio" id={1} name="paymentMethod" onChange={handleSelectedPayment} value={"Online"} />
          <label htmlFor={1}>Thanh toán online</label>
          <input type="radio" id={2} name="paymentMethod" onChange={handleSelectedPayment} value={"COD"} />
          <label htmlFor={2}>Thanh toán khi nhận hàng (COD)</label>
        </div>
        <h2>Ghi chú</h2>
        <textarea rows="4" aria-invalid="false" autocomplete="off" id="note" name="note" ref={refNote} placeholder="" className={style.Note}></textarea>
      </div>
      <div className={style.InvoiceField}>
        <input type="checkbox" id="Invoice" checked={isInvoice} onClick={() => setIsInvoice(!isInvoice)} />
        <p>Yêu cầu xuất hóa đơn</p>
      </div>
      {isInvoice && (
        <div className={style.CheckoutBox}>
          <h2 className={style.Heading}>Thông tin đặt hàng</h2>
          <div className={style.InputForm}>
            <p>Tên công ty</p>
            <input type="text" placeholder="Nhập tên công ty" ref={refCompanyName} />
          </div>
          <div className={style.InputForm}>
            <p>Email</p>
            <input type="text" placeholder="Nhập địa chỉ email" ref={refEmail} />
          </div>
          <div className={style.InputForm}>
            <p>Mã số thuế</p>
            <input type="text" placeholder="Nhập mã số thuế" ref={refTaxCode} />
          </div>
          <div className={style.InputForm}>
            <p>Địa chỉ công ty</p>
            <input type="text" placeholder="Nhập địa chỉ công ty" ref={refCompanyAddress} />
          </div>
        </div>
      )}
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
          <input type="checkbox" id="Accept" checked={isAccept} onClick={() => setIsAccept(!isAccept)} />
          <p>
            Bằng việc chọn vào Đặt Hàng, bạn đồng ý với <a>Điều khoản và điều kiện giao dịch trên E'Mart</a> và đồng ý trở thành Hội viên E'Mart theo <a>Điều khoản và điều kiện của Chương trình Hội viên E'Mart</a> sẽ được kích hoạt khi đơn hàng được giao thành công.
          </p>
        </div>
        <div onClick={handleSubmit} className={style.Btn}>
          <p>XÁC NHẬN ĐẶT HÀNG</p>
        </div>
      </div>
      {isDisplayBill && (
        <>
          <Bill billInfor={billInfor} listCartItems={cartInfor.listItems} />
          <button onClick={routeMainPage} className={style.CloseBill}>
            Close
          </button>
        </>
      )}
      {isDisplayPinMap && <Location handleOnClick={handlePinMap} />}
    </div>
  );
}

export default Pay;
