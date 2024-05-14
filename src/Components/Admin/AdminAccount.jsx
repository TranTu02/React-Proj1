import React, { useRef, useState, useEffect } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listAccount, updateApiAccount } from "../Assets/data";
import axios from "axios";
export const AdminAccount = () => {
  const [listColumnDisplay, setListColumnDisplay] = useState(listAccount);

  useEffect(() => {
    updateApiAccount();
    setListColumnDisplay(listAccount);
  }, [listAccount]);
  const currentAccount = listAccount.find((obj) => obj.AccountID === 5);
  const Title = () => {
    let arr = [];
    for (const key in listAccount[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    const item = listColumnDisplay.find((obj) => obj.AccountID === id);
    if (item?.Authorize < 3) {
      for (const key in item) {
        {
          arr.push(item[key]);
        }
      }
    }
    return arr;
  };
  // Ref
  const refID = useRef("");
  const refPhone = useRef("");
  const refName = useRef("");
  const refPwd = useRef("");
  const refBD = useRef("");
  const refAuth = useRef("");

  // handle data
  const handleID = (event) => {
    refID.current = event.target.value;
  };
  const handlePhone = (event) => {
    refPhone.current = event.target.value;
  };
  const handleName = (event) => {
    refName.current = event.target.value;
  };
  const handlePwd = (event) => {
    refPwd.current = event.target.value;
  };
  const handleBD = (event) => {
    refBD.current = event.target.value;
  };
  const handleAuth = (event) => {
    refAuth.current = event.target.value;
  };
  const handleFind = () => {
    const id = refID.current.value === "" ? "" : refID.current.trim();
    const phone = refPhone.current.value === "" ? "" : refPhone.current.trim();
    const name = refName.current.value === "" ? "" : refName.current.trim();
    const auth = refAuth.current.value === "" ? "" : refAuth.current.trim();
    if (id !== "") {
      setListColumnDisplay(listAccount?.filter((obj) => obj.AccountID === parseInt(id)));
    } else if (phone !== "") {
      setListColumnDisplay(listAccount?.filter((obj) => obj.PhoneNumber === parseInt(phone)));
    } else if (name !== "") {
      let filteredByName = listAccount?.filter((item) => item.Name.toLowerCase().includes(name.toLowerCase()));
      if (auth !== "") {
        filteredByName = filteredByName?.filter((item) => item?.Authorize === parseInt(auth));
      }
      setListColumnDisplay(filteredByName);
    } else if (auth !== "") {
      setListColumnDisplay(listAccount?.filter((item) => item?.Authorize === parseInt(auth)));
    } else {
      setListColumnDisplay(listAccount);
    }
  };

  return (
    <div className={style.ProductManage}>
      <h2>Quản lý tài khoản</h2>
      <h3>Form</h3>
      <table>
        <thead>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>

        <tbody>
          <td>
            <input type="text" ref={refID} onChange={handleID} />
          </td>
          <td>
            <input type="text" ref={refPhone} onChange={handlePhone}></input>
          </td>
          <td>
            <input type="text" ref={refName} onChange={handleName}></input>
          </td>
          <td>
            <input type="text" ref={refPwd} onChange={handlePwd}></input>
          </td>
          <td>
            <input type="text" ref={refBD} onChange={handleBD}></input>
          </td>
          <td>
            <input type="text" ref={refAuth} onChange={handleAuth}></input>
          </td>
        </tbody>
      </table>
      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={handleFind}>Tìm</button>
      </div>
      <h3>Danh sách tài khoản</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
        <tbody>
          {listAccount.map((account) => {
            return (
              <tr>
                {Value(account.AccountID).map((item) => (
                  <td>{item}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
