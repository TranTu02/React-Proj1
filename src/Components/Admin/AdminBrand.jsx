import React, { useRef, useState, useEffect } from "react";
import style from "./Admin.module.css";
import { listBrand, updateListBrand } from "../Assets/data";
import axios from "axios";

export const AdminBrand = () => {
  updateListBrand(listBrand.sort((a, b) => b.BrandID - a.BrandID));
  const [listRowDisplay, setListRowDisplay] = useState(listBrand);
  useEffect(() => {
    setListRowDisplay(listBrand);
  }, [listBrand]);

  let nextID = listBrand.length !== 0 ? listBrand[0].BrandID + 1 : 1;

  const refID = useRef("");
  const refName = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleGetInfor = (brand) => {
    refID.current.value = brand.BrandID;
    refName.current.value = brand.BrandName;
    setSelectedImage(brand.Logo);
  };

  const deleteBrand = async (BrandID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/brands/${BrandID}`);

      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Brands or perform other tasks
    } catch (error) {
      console.error("Error deleting Brand:", error);
    }
  };

  const updateBrand = async (BrandID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/brands/${BrandID}`, updatedData);
    } catch (error) {
      console.error("Error updating Brand:", error);
    }
  };

  const postBrand = async (Brand) => {
    try {
      const response = await axios.post("http://localhost:3000/api/brands", Brand, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  const handleAddBrand = () => {
    if (refName.current.value === "" || selectedImage === "") {
      alert("Nhập đủ thông tin!");
      return false;
    }
    var result = window.confirm("Chắc chắn muốn thêm Brand có id: " + nextID + " ?");
    if (result) {
      const Brand = {
        BrandID: nextID,
        BrandName: refName.current.value,
        Logo: selectedImage,
      };
      postBrand(Brand)
        .then(() => {
          updateListBrand([...listBrand, Brand]);
        })
        .catch((error) => console.error("Error adding Brand:", error));
    }
  };

  const handleUpdateBrand = () => {
    if (refName.current.value === "" || selectedImage === "" || refID.current.value === "") {
      alert("Nhập đủ thông tin!");
      return false;
    }
    var result = window.confirm("Chắc chắn muốn sửa Brand có id: " + refID.current.value + " ?");
    if (result) {
      const updatedData = {
        BrandID: parseInt(refID.current.value),
        BrandName: refName.current.value,
        Logo: selectedImage,
      };
      updateBrand(parseInt(refID.current.value), updatedData)
        .then(() => {
          const updatedBrands = listBrand.map((Brand) => (Brand.BrandID === parseInt(refID.current.value) ? { ...Brand, ...updatedData } : Brand));
          updateListBrand(updatedBrands); // Cập nhật thông tin của tài khoản trong danh sách hiện tại
        })
        .catch((error) => console.error("Error updating Brand:", error));
    }
  };

  const handleDeleteBrand = () => {
    const ID = refID.current.value;
    const index = listBrand.findIndex((obj) => obj.BrandID === parseInt(ID));
    var result = window.confirm("Chắc chắn muốn xóa Brandcó id: " + ID + " ?");
    if (result) {
      if (ID === "") {
        alert("Nhập BrandID!");
        return false;
      }
      deleteBrand(parseInt(refID.current.value))
        .then(() => {
          updateListBrand([...listBrand.slice(0, index), ...listBrand.slice(index + 1)]); // Loại bỏ tài khoản đã xóa khỏi danh sách hiện tại
        })
        .catch((error) => console.error("Error deleting Brand:", error));
    }
  };

  const handleID = (event) => {
    refID.current.value = event.target.value;
  };
  const handleName = (event) => {
    refName.current.value = event.target.value;
  };

  const handleFind = () => {
    const id = refID.current.value.trim();
    const name = refName.current.value.trim();

    let filteredBrands = listBrand;

    if (id) {
      filteredBrands = filteredBrands.filter((obj) => obj.BrandID === parseInt(id));
    } else if (name) {
      filteredBrands = filteredBrands.filter((obj) => obj.BrandName.toLowerCase().includes(name.toLowerCase()));
    }
    setListRowDisplay(filteredBrands);
  };

  return (
    <div className={style.ProductManage}>
      <h2>Quản lý thương hiệu</h2>
      <h3>Form</h3>
      <table>
        <thead>
          <tr>
            <th>Mã thương hiệu</th>
            <th>Tên thương hiệu</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" ref={refID} onChange={handleID} />
            </td>
            <td>
              <input type="text" ref={refName} onChange={handleName} />
            </td>
            <td style={{ width: "600rem" }}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200rem" }} />}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={style.Action}>
        <button onClick={handleAddBrand}>Thêm</button>
        <button onClick={handleUpdateBrand}>Sửa</button>
        <button onClick={handleDeleteBrand}>Xóa</button>
        <button onClick={handleFind}>Tìm</button>
      </div>
      <h3>Danh sách tài khoản</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          <tr>
            <th>Mã thương hiệu</th>
            <th>Tên thương hiệu</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          {listRowDisplay.map((brand) => (
            <tr onClick={() => handleGetInfor(brand)} key={brand.BrandID}>
              <td>{brand.BrandID}</td>
              <td>{brand.BrandName}</td>
              <td>
                <img src={brand.Logo} width={"150rem"} height={"150rem"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
