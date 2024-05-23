import React, { useRef, useState, useEffect, useContext } from "react";
import style from "./Admin.module.css";
import { listAccount, updateListAccounts } from "../Assets/data";
import axios from "axios";
import { ShopContext } from "../../Contexts/CartContext";

export const AdminAccount = () => {
  updateListAccounts(listAccount.sort((a, b) => b.AccountID - a.AccountID));
  const [listRowDisplay, setListRowDisplay] = useState(listAccount);

  const { phoneNumber } = useContext(ShopContext);
  const currentAuthorize = useRef();
  useEffect(() => {
    if (listAccount.find((obj) => obj.PhoneNumber === phoneNumber) !== undefined) {
      currentAuthorize.current = listAccount.find((obj) => obj.PhoneNumber === phoneNumber).Authorize;
    }
  }, []);
  useEffect(() => {
    setListRowDisplay(listAccount.filter((obj) => obj.Authorize < currentAuthorize.current));
  }, [listAccount]);

  let nextID = listAccount.length !== 0 ? listAccount[0].AccountID + 1 : 1;

  const refID = useRef("");
  const refPhone = useRef("");
  const refName = useRef("");
  const refPwd = useRef("");
  const refBD = useRef("");
  const refAuth = useRef("");

  const handleGetInfor = (Account) => {
    if (Account !== undefined) {
      refID.current.value = Account.AccountID;
      refPhone.current.value = Account.PhoneNumber;
      refName.current.value = Account.Name;
      refPwd.current.value = Account.Password;
      refBD.current.value = Account.Birthday;
      refAuth.current.value = Account.Authorize;
    } else {
      refID.current.value = "";
      refPhone.current.value = "";
      refName.current.value = "";
      refPwd.current.value = "";
      refBD.current.value = "";
      refAuth.current.value = "";
    }
  };

  const deleteAccount = async (accountID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/accounts/${accountID}`);

      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of accounts or perform other tasks
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const updateAccount = async (accountID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/accounts/${accountID}`, updatedData);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const postAccount = async (account) => {
    try {
      const response = await axios.post("http://localhost:3000/api/accounts", account, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  const handleAddAccount = () => {
    const account = {
      AccountID: nextID,
      PhoneNumber: refPhone.current.value,
      Name: refName.current.value,
      Password: refPwd.current.value,
      Birthday: refBD.current.value,
      Authorize: parseInt(refAuth.current.value),
    };
    if (parseInt(refAuth.current.value) >= currentAuthorize.current) {
      alert("Bạn không có đủ thẩm quyền để thực hiện!");
      return false;
    }
    for (const key in account) {
      if (account[key] === "" || account[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    var result = window.confirm("Chắc chắn muốn thêm account có id: " + nextID + " ?");
    if (result) {
      if (listAccount.find((obj) => obj.PhoneNumber === account.PhoneNumber) === undefined) {
        postAccount(account)
          .then(() => {
            updateListAccounts([...listAccount, account]);
          })
          .catch((error) => console.error("Error adding account:", error));
      } else {
        alert("Đã tồn tại số điện thoại");
      }
    }
  };

  const handleUpdateAccount = () => {
    const updatedData = {
      AccountID: parseInt(refID.current.value),
      PhoneNumber: refPhone.current.value,
      Name: refName.current.value,
      Password: refPwd.current.value,
      Birthday: refBD.current.value,
      Authorize: parseInt(refAuth.current.value),
    };
    if (parseInt(refAuth.current.value) >= currentAuthorize.current) {
      alert("Bạn không có đủ thẩm quyền để thực hiện!");
      return false;
    }
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    var result = window.confirm("Chắc chắn muốn sửa account có id: " + refID.current.value + " ?");
    if (result) {
      updateAccount(parseInt(refID.current.value), updatedData)
        .then(() => {
          const updatedAccounts = listAccount.map((account) => (account.AccountID === parseInt(refID.current.value) ? { ...account, ...updatedData } : account));
          updateListAccounts(updatedAccounts); // Cập nhật thông tin của tài khoản trong danh sách hiện tại
        })
        .catch((error) => console.error("Error updating account:", error));
    }
  };

  const handleDeleteAccount = () => {
    const ID = refID.current.value;
    const index = listAccount.filter((account) => account.Authorize < currentAuthorize.current).findIndex((obj) => obj.AccountID === parseInt(ID));
    var result = window.confirm("Chắc chắn muốn xóa accountcó id: " + ID + " ?");
    if (result) {
      if (ID === "") {
        alert("Nhập AccountID!");
        return false;
      }
      deleteAccount(parseInt(refID.current.value))
        .then(() => {
          updateListAccounts([...listAccount.slice(0, index), ...listAccount.slice(index + 1)]); // Loại bỏ tài khoản đã xóa khỏi danh sách hiện tại
        })
        .catch((error) => console.error("Error deleting account:", error));
    }
  };

  const handleID = (event) => {
    refID.current.value = event.target.value;
  };
  const handlePhone = (event) => {
    refPhone.current.value = event.target.value;
  };
  const handleName = (event) => {
    refName.current.value = event.target.value;
  };
  const handlePwd = (event) => {
    refPwd.current.value = event.target.value;
  };
  const handleBD = (event) => {
    refBD.current.value = event.target.value;
  };
  const handleAuth = (event) => {
    refAuth.current.value = event.target.value;
  };

  const handleFind = () => {
    const id = refID.current.value.trim();
    const phone = refPhone.current.value.trim();
    const name = refName.current.value.trim();
    const auth = refAuth.current.value.trim();

    let filteredAccounts = listAccount.filter((obj) => obj.Authorize < currentAuthorize.current);

    if (id) {
      filteredAccounts = filteredAccounts.filter((obj) => obj.AccountID === parseInt(id));
    } else if (phone) {
      filteredAccounts = filteredAccounts.filter((obj) => obj.PhoneNumber === phone);
    } else if (auth) {
      filteredAccounts = filteredAccounts.filter((item) => item.Authorize === parseInt(auth));
    }

    setListRowDisplay(filteredAccounts);
  };

  return (
    <div className={style.ProductManage}>
      <h2>Quản lý tài khoản</h2>
      <h3>Form</h3>
      <table>
        <thead>
          <tr>
            <th>AccountID</th>
            <th>PhoneNumber</th>
            <th>Name</th>
            <th>Password</th>
            <th>Birthday</th>
            <th>Authorize</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" ref={refID} onChange={handleID} />
            </td>
            <td>
              <input type="text" ref={refPhone} onChange={handlePhone} />
            </td>
            <td>
              <input type="text" ref={refName} onChange={handleName} />
            </td>
            <td>
              <input type="text" ref={refPwd} onChange={handlePwd} />
            </td>
            <td>
              <input type="text" ref={refBD} onChange={handleBD} />
            </td>
            <td>
              <input type="text" ref={refAuth} onChange={handleAuth} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={style.Action}>
        <button onClick={handleAddAccount}>Thêm</button>
        <button onClick={handleUpdateAccount}>Sửa</button>
        <button onClick={handleDeleteAccount}>Xóa</button>
        <button onClick={handleFind}>Tìm</button>
      </div>
      <h3>Danh sách tài khoản</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          <tr>
            <th>AccountID</th>
            <th>PhoneNumber</th>
            <th>Name</th>
            <th>Password</th>
            <th>Birthday</th>
            <th>Authorize</th>
          </tr>
        </thead>
        <tbody>
          {listRowDisplay.map((account) => (
            <tr onClick={() => handleGetInfor(account)} key={account.AccountID}>
              <td>{account.AccountID}</td>
              <td>{account.PhoneNumber}</td>
              <td>{account.Name}</td>
              <td>{account.Password}</td>
              <td>{account.Birthday}</td>
              <td>{account.Authorize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
