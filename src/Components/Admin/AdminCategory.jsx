import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listCategories, updateListCategory, updateListProductType } from "../Assets/data";
import axios from "axios";

export const AdminCategory = () => {
  const [active, setActive] = useState(true);
  updateListCategory(listCategories.sort((a, b) => b.CategoryID - a.CategoryID));
  updateListProductType(listCategory_Type.sort((a, b) => b.ProductTypeID - a.ProductTypeID));
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listCategories : listCategory_Type);
  const handleSetActive = (value) => {
    setActive(value);
    setListColumnDisplay(value ? listCategories : listCategory_Type);
  };

  useEffect(() => {
    if (active) {
      setListColumnDisplay(listCategories);
    } else {
      setListColumnDisplay(listCategory_Type);
    }
  }, [listCategories, listCategory_Type]);

  const refCategoryID = useRef("");
  const refCategoryName = useRef("");
  const refProductTypeID = useRef("");
  const refProductType = useRef("");
  const refOrder = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);
  const nextID = active ? (listCategories.length !== 0 ? listCategories[0].CategoryID + 1 : 1) : listCategory_Type.length !== 0 ? listCategory_Type[0].ProductTypeID + 1 : 1;

  const getInfor = (item) => {
    if (active) {
      refCategoryID.current.value = item.CategoryID;
      refCategoryName.current.value = item.CategoryName;
      setSelectedImage(item.CategoryIllustration);
      refOrder.current.value = item.Order;
    } else {
      refCategoryID.current.value = item.CategoryID;
      refProductTypeID.current.value = item.ProductTypeID;
      refProductType.current.value = item.ProductType;
    }
  };
  const deleteCategory = async (CategoryID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/categories/${CategoryID}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
  };

  const updateCategory = async (CategoryID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/categories/${CategoryID}`, updatedData);
      console.log(response.data); // Updated Category information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  const postCategory = async (Category) => {
    try {
      const response = await axios.post("http://localhost:3000/api/categories", Category, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  // Xử lý khi người dùng chọn tệp ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Lấy tệp ảnh đầu tiên từ sự kiện
    const reader = new FileReader();

    reader.onloadend = () => {
      // Khi đọc xong, cập nhật selectedImage với đường dẫn ảnh
      setSelectedImage(reader.result);
    };

    // Đọc dữ liệu của tệp ảnh
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event, ref) => {
    ref.current.value = event.target.value;
  };

  const handleCategoryIDChange = (event) => handleInputChange(event, refCategoryID);
  const handleCategoryNameChange = (event) => handleInputChange(event, refCategoryName);
  const handleProductTypeIDChange = (event) => handleInputChange(event, refProductTypeID);
  const handleProductTypeChange = (event) => handleInputChange(event, refProductType);
  const handleProductOrderChange = (event) => handleInputChange(event, refOrder);

  // Category
  const handleFindCategory = () => {
    const CategoryID = refCategoryID.current.value === "" ? "" : parseInt(refCategoryID.current.value);
    const CategoryName = refCategoryName.current.value === "" ? "" : refCategoryName.current.value;
    if (CategoryID !== "") {
      setListColumnDisplay(listCategories.filter((obj) => obj.CategoryID === CategoryID) || []);
    } else if (CategoryName !== "") {
      setListColumnDisplay(listCategories.filter((obj) => obj.CategoryName.toLowerCase().includes(CategoryName.toLowerCase())) || []);
    } else {
      setListColumnDisplay();
    }
  };

  const handleAddCategory = () => {
    const Category = {
      CategoryID: nextID,
      CategoryName: refCategoryName.current.value,
      CategoryIllustration: selectedImage,
      Order: parseInt(refOrder.current.value),
    };
    for (const key in Category) {
      if (Category[key] === "" || Category[key] === undefined) {
        alert("Nhập thông tin");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm Category có id: ${nextID} ?`);
    if (result) {
      postCategory(Category)
        .then(() => {
          updateListCategory([...listCategories, Category]); // Thêm tài khoản mới vào danh sách hiện tại
        })
        .catch((error) => console.error("Error adding Category:", error));
    }
  };

  const handleUpdateCategory = () => {
    const updatedCategory = {
      CategoryID: parseInt(refCategoryID.current.value),
      CategoryName: refCategoryName.current.value,
      CategoryIllustration: selectedImage,
      Order: parseInt(refOrder.current.value),
    };
    for (const key in updatedCategory) {
      if (updatedCategory[key] === "" || updatedCategory[key] === undefined) {
        alert("Nhập thông tin");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa Category có id: ${refCategoryID.current.value} ?`);
    if (result) {
      updateCategory(parseInt(refCategoryID.current.value), updatedCategory)
        .then(() => {
          const updatedCategories = listCategories.map((Category) => (Category.CategoryID === parseInt(refCategoryID.current.value) ? { ...Category, ...updatedCategory } : Category));
          updateListCategory(updatedCategories);
        })
        .catch((error) => console.error("Error updating Category:", error));
    }
  };

  const handleDeleteCategory = () => {
    if (refCategoryID.current.value === "") {
      alert("Nhập CategoryID!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa Category có id: ${refCategoryID.current.value} ?`);
    if (result) {
      deleteCategory(parseInt(refCategoryID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listCategories.map((obj) => {
              if (obj.CategoryID !== parseInt(refCategoryID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListCategory(newList());
        })
        .catch((error) => console.error("Error deleting Category:", error));
    }
  };

  // Type
  const deleteType = async (TypeID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/types/${TypeID}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateType = async (TypeID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/types/${TypeID}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postType = async (Type) => {
    try {
      const response = await axios.post("http://localhost:3000/api/types", Type, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };

  const handleFindType = () => {
    const CategoryID = refCategoryID.current.value;
    const TypeID = refProductTypeID.current.value;
    if (TypeID) {
      setListColumnDisplay(listCategory_Type.filter((obj) => obj.ProductTypeID === parseInt(TypeID)) || []);
    } else if (CategoryID) {
      setListColumnDisplay(listCategory_Type.filter((obj) => obj.CategoryID == parseInt(CategoryID)) || []);
    } else {
      setListColumnDisplay(listCategory_Type);
    }
  };
  const handleAddType = () => {
    const Type = {
      ProductTypeID: nextID,
      CategoryID: parseInt(refCategoryID.current.value),
      ProductType: refProductType.current.value,
    };
    for (const key in Type) {
      if (Type[key] === "" || Type[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm Type có id: ${nextID} ?`);
    if (result) {
      postType(Type)
        .then(() => {
          updateListProductType([...listCategory_Type, Type]);
        })
        .catch((error) => console.error("Error adding Type:", error));
    }
  };

  const handleUpdateType = () => {
    const Type = {
      ProductTypeID: parseInt(refProductTypeID.current.value),
      CategoryID: parseInt(refCategoryID.current.value),
      ProductType: refProductType.current.value,
    };
    for (const key in Type) {
      if (Type[key] === "" || Type[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa Type có id: ${refProductTypeID.current.value} ?`);
    if (result) {
      updateType(parseInt(refProductTypeID.current.value), Type)
        .then(() => {
          const newList = () => {
            let list = [];
            listCategory_Type.map((obj) => {
              if (obj.ProductTypeID !== parseInt(refProductTypeID.current.value)) {
                list.push(obj);
              } else {
                list.push(Type);
              }
            });
            return list;
          };
          updateListProductType(newList());
        })
        .catch((error) => console.error("Error updating Type:", error));
    }
  };

  const handleDeleteType = () => {
    if (refProductTypeID.current.value === "") {
      alert("Nhập ProductTypeID!");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn xóa Type có id: ${refProductTypeID.current.value} ?`);
    if (result) {
      deleteType(parseInt(refProductTypeID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listCategory_Type.map((obj) => {
              if (obj.ProductTypeID !== parseInt(refProductTypeID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListProductType(newList());
        })
        .catch((error) => console.error("Error deleting Type:", error));
    }
  };
  return (
    <div className={style.ProductManage}>
      <div className={style.Action}>
        <h2 onClick={() => handleSetActive(true)} className={active ? style.Active : ""}>
          Quản lý danh mục
        </h2>
        <h2 onClick={() => handleSetActive(false)} className={!active ? style.Active : ""}>
          Quản lý loại mặt hàng
        </h2>
      </div>
      <h3>Form</h3>
      <table>
        {active ? (
          <thead>
            <th>CategoryID</th>
            <th>CategoryName</th>
            <th>CategoryIllustration</th>
            <th>Order</th>
          </thead>
        ) : (
          <thead>
            <th>ProductTypeID</th>
            <th>CategoryType</th>
            <th>ProductType</th>
          </thead>
        )}

        {active ? (
          <tbody>
            <td style={{ width: "200rem" }}>
              <input type="text" ref={refCategoryID} onChange={handleCategoryIDChange} />
            </td>
            <td>
              <textarea rows={2} ref={refCategoryName} onChange={handleCategoryNameChange}></textarea>
            </td>
            <td style={{ width: "800rem" }}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "300rem" }} />}
            </td>
            <td style={{ width: "200rem" }}>
              <input type="text" ref={refOrder} onChange={handleProductOrderChange} />
            </td>
          </tbody>
        ) : (
          <tbody>
            <td>
              <input type="text" ref={refProductTypeID} onChange={handleProductTypeIDChange} />
            </td>
            <td>
              <input type="text" ref={refCategoryID} onChange={handleCategoryIDChange} />
            </td>
            <td>
              <input type="text" ref={refProductType} onChange={handleProductTypeChange} />
            </td>
          </tbody>
        )}
      </table>

      <div className={style.Action}>
        <button onClick={active ? handleAddCategory : handleAddType}>Thêm</button>
        <button onClick={active ? handleUpdateCategory : handleUpdateType}>Sửa</button>
        <button onClick={active ? handleDeleteCategory : handleDeleteType}>Xóa</button>
        <button onClick={active ? handleFindCategory : handleFindType}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách danh mục</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>CategoryID</th>
              <th>CategoryName</th>
              <th>CategoryIllustration</th>
              <th>Order</th>
            </thead>
            <tbody>
              {listColumnDisplay.map((Category) => {
                return (
                  <tr onClick={() => getInfor(Category)}>
                    <td>{Category.CategoryID}</td>
                    <td>{Category.CategoryName}</td>
                    <td>
                      <img src={Category.CategoryIllustration} alt="Image" style={{ maxWidth: "100%", maxHeight: "80px" }} />
                    </td>
                    <td>{Category.Order}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3>Danh sách thể loại sản phẩm</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>ProductTypeID</th>
              <th>CategoryID</th>
              <th>ProductType</th>
            </thead>
            <tbody>
              {listColumnDisplay.map((Type) => {
                return (
                  <tr onClick={() => getInfor(Type)}>
                    <td>{Type.ProductTypeID}</td>
                    <td>{Type.CategoryID}</td>
                    <td>{Type.ProductType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
