import React, { useRef, useState, useEffect } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listAccount, updateApiAccount, updateApi } from "../Assets/data";
import axios from "axios";

export const AdminAccount = () => {
  const [listColumnDisplay, setListColumnDisplay] = useState(listAccount);

  useEffect(() => {
    updateApi();
    setListColumnDisplay(listAccount);
  }, []);

  const Title = () => {
    const keys = Object.keys(listAccount[0] || {});
    return keys.slice(1, -1); // Bỏ qua phần tử đầu và cuối
  };
  const Value = (id) => {
    const item = listColumnDisplay.find((obj) => obj.AccountID === id);
    return Object.values(item).slice(1, -1);
  };

  const refID = useRef("");
  const refPhone = useRef("");
  const refName = useRef("");
  const refPwd = useRef("");
  const refBD = useRef("");
  const refAuth = useRef("");

  const nextID = listAccount.length !== 0 ? listAccount[listAccount.length - 1].AccountID + 1 : 1;

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
      console.log(response.data); // Updated account information
      // After successful update, update the list of accounts or perform other tasks
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
      console.log("Response from server:", response.data);
      setListColumnDisplay([...listColumnDisplay, response.data]);
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  const handleAddAccount = () => {
    var result = window.confirm("Chắc chắn muốn thêm account có id: " + nextID + " ?");
    if (result) {
      const account = {
        AccountID: nextID,
        PhoneNumber: refPhone.current.value,
        Name: refName.current.value,
        Password: refPwd.current.value,
        Birthday: refBD.current.value,
        Authorize: parseInt(refAuth.current.value),
      };
      postAccount(account)
        .then(() => {
          updateApiAccount(); // Cập nhật dữ liệu từ server
          setListColumnDisplay([...listColumnDisplay, account]); // Thêm tài khoản mới vào danh sách hiện tại
        })
        .catch((error) => console.error("Error adding account:", error));
      window.location.reload();
    }
  };

  const handleUpdateAccount = () => {
    var result = window.confirm("Chắc chắn muốn sửa accountcó id: " + refID.current.value + " ?");
    if (result) {
      const updatedData = {
        PhoneNumber: refPhone.current.value,
        Name: refName.current.value,
        Password: refPwd.current.value,
        Birthday: refBD.current.value,
        Authorize: parseInt(refAuth.current.value),
      };
      updateAccount(parseInt(refID.current.value), updatedData)
        .then(() => {
          updateApiAccount(); // Cập nhật dữ liệu từ server
          const updatedAccounts = listColumnDisplay.map((account) => (account.AccountID === parseInt(refID.current.value) ? { ...account, ...updatedData } : account));
          setListColumnDisplay(updatedAccounts); // Cập nhật thông tin của tài khoản trong danh sách hiện tại
        })
        .catch((error) => console.error("Error updating account:", error));
      window.location.reload();
    }
  };

  const handleDeleteAccount = () => {
    var result = window.confirm("Chắc chắn muốn xóa accountcó id: " + refID.current.value + " ?");
    if (result) {
      deleteAccount(parseInt(refID.current.value))
        .then(() => {
          updateApiAccount(); // Cập nhật dữ liệu từ server
          setListColumnDisplay(listColumnDisplay); // Loại bỏ tài khoản đã xóa khỏi danh sách hiện tại
        })
        .catch((error) => console.error("Error deleting account:", error));
      window.location.reload();
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

    let filteredAccounts = listAccount;

    if (id) {
      filteredAccounts = filteredAccounts.filter((obj) => obj.AccountID === parseInt(id));
    } else if (phone) {
      filteredAccounts = filteredAccounts.filter((obj) => obj.PhoneNumber === phone);
    } else if (auth) {
      filteredAccounts = filteredAccounts.filter((item) => item.Authorize === parseInt(auth));
    }

    setListColumnDisplay(filteredAccounts);
  };

  return (
    <div className={style.ProductManage}>
      <h2>Quản lý tài khoản</h2>
      <h3>Form</h3>
      <table>
        <thead>
          <tr>
            {Title().map((key) => (
              <th key={key}>{key}</th>
            ))}
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
            {Title().map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listAccount.map((account) => (
            <tr key={account.AccountID}>
              {Value(account.AccountID).map((item, index) => (
                <td key={index}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
