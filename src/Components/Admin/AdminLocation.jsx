import React, { useRef, useState } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listLocations } from "../Assets/data";
export const AdminLocation = () => {
  const [listColumnDisplay, setListColumnDisplay] = useState(listLocations);
  const Title = () => {
    let arr = [];
    for (const key in listLocations[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    const item = listLocations.find((obj) => obj.LocationID === id);
    for (const key in item) {
      {
        arr.push(item[key]);
      }
    }
    return arr;
  };
  // Ref
  const refID = useRef("");
  const refLocation = useRef("");
  const refDistance = useRef("");

  // handle data
  const handleID = (event) => {
    refID.current = event.target.value;
  };
  const handleLocation = (event) => {
    refLocation.current = event.target.value;
  };
  const handleDistance = (event) => {
    refDistance.current = event.target.value;
  };
  const handleFindLocation = () => {
    const id = refID.current.value === "" ? "" : refID.current.trim();
    const Location = refLocation.current.value === "" ? "" : refLocation.current.trim();
    if (id !== "") {
      setListColumnDisplay(listLocations.filter((obj) => obj.LocationID === parseInt(id)) || []);
    } else if (Location !== "") {
      setListColumnDisplay(listLocations?.filter((item) => item.Location.toLowerCase().includes(Location.toLowerCase())));
    } else {
      setListColumnDisplay(listLocations);
    }
  };
  return (
    <div className={style.ProductManage}>
      <h2>Quản lý khu vực giao hàng</h2>
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
            <input type="text" ref={refLocation} onChange={handleLocation}></input>
          </td>
          <td>
            <input type="text" ref={refDistance} onChange={handleDistance}></input>
          </td>
        </tbody>
      </table>
      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={handleFindLocation}>Tìm</button>
      </div>
      <h3>Danh sách tài khoản</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
        <tbody>
          {listColumnDisplay.map((location) => (
            <tr>
              {Value(location.LocationID).map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
