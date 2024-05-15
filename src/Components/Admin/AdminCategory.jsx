import React, { useState, useRef, useEffect } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listCategories, updateApiCategory, listProducts, updateApiType } from "../Assets/data";
import axios from "axios";

export const AdminCategory = () => {
  const [active, setActive] = useState(true);
  const [update, setUpdate] = useState(true);
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listCategories : listCategory_Type);
  const handleSetActive = (value) => {
    setActive(value);
    setListColumnDisplay(value ? listCategories : listCategory_Type);
  };

  useEffect(() => {
    if (active) {
      updateApiCategory();
      setListColumnDisplay(listCategories);
    } else {
      updateApiType();
      setListColumnDisplay(listCategory_Type);
    }
  }, [active, update]);

  const Title = () => {
    if (active) {
      const keys = Object.keys(listCategories[0] || {});
      return keys.slice(1, -1); // Bỏ qua phần tử đầu và cuối
    } else {
      const keys = Object.keys(listCategory_Type[0] || {});
      return keys.slice(1, -1); // Bỏ qua phần tử đầu và cuối
    }
  };

  const Value = (id) => {
    if (active) {
      const category = listCategories.find((obj) => obj.CategoryID === id);
      if (!category) return [];
      const values = Object.keys(category).map((key) => {
        if (key === "CategoryIllustration") {
          return <img src={category[key]} alt="Image" style={{ maxWidth: "100%", maxHeight: "80px" }} />;
        } else {
          return category[key];
        }
      });
      return values.slice(1, -1); // Bỏ qua phần tử đầu và cuối
    } else {
      const type = listColumnDisplay.find((obj) => obj.ProductTypeID === id);
      if (!type) return [];
      return Object.values(type).slice(1, -1);
    }
  };

  const refCategoryID = useRef("");
  const refCategoryName = useRef("");
  const refProductTypeID = useRef("");
  const refProductType = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);
  const nextID = active
    ? listCategories.length !== 0
      ? listCategories[listCategories.length - 1].CategoryID + 1
      : 1
    : listCategory_Type.length !== 0
    ? listCategory_Type[listCategory_Type.length - 1].ProductTypeID + 1
    : 1;

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
      console.log("Response from server:", response.data);
      setListColumnDisplay([...listColumnDisplay, response.data]);
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
    ref.current = event.target.value;
  };

  const handleCategoryIDChange = (event) => handleInputChange(event, refCategoryID);
  const handleCategoryNameChange = (event) => handleInputChange(event, refCategoryName);
  const handleProductTypeIDChange = (event) => handleInputChange(event, refProductTypeID);
  const handleProductTypeChange = (event) => handleInputChange(event, refProductType);

  // Category
  const handleFindCategory = () => {
    const CategoryID = refCategoryID.current === "" ? "" : parseInt(refCategoryID.current);
    const CategoryName = refCategoryName.current === "" ? "" : refCategoryName.current;
    if (CategoryID !== "") {
      setListColumnDisplay(listCategories.filter((obj) => obj.CategoryID === CategoryID) || []);
    } else if (CategoryName !== "") {
      setListColumnDisplay(listCategories.filter((obj) => obj.CategoryName.toLowerCase().includes(CategoryName.toLowerCase())) || []);
    } else {
      setListColumnDisplay();
    }
  };

  const handleAddCategory = () => {
    const result = window.confirm(`Chắc chắn muốn thêm Category có id: ${nextID} ?`);
    if (result) {
      const Category = {
        CategoryID: nextID,
        CategoryName: refCategoryName.current,
        CategoryIllustration: selectedImage,
      };
      postCategory(Category)
        .then(() => {
          updateApiCategory(); // Cập nhật dữ liệu từ server
          setListColumnDisplay([...listColumnDisplay, Category]); // Thêm tài khoản mới vào danh sách hiện tại
        })
        .catch((error) => console.error("Error adding Category:", error));
      window.location.reload();
    }
  };

  const handleUpdateCategory = () => {
    const result = window.confirm(`Chắc chắn muốn sửa Category có id: ${refCategoryID.current} ?`);
    if (result) {
      const updatedData = {
        CategoryName: refCategoryName.current,
        CategoryIllustration: selectedImage,
      };
      updateCategory(parseInt(refCategoryID.current), updatedData)
        .then(() => {
          updateApiCategory(); // Cập nhật dữ liệu từ server
          const updatedCategories = listColumnDisplay.map((Category) => (Category.CategoryID === parseInt(refCategoryID.current) ? { ...Category, ...updatedData } : Category));
          setListColumnDisplay(updatedCategories); // Cập nhật thông tin của tài khoản trong danh sách hiện tại
        })
        .catch((error) => console.error("Error updating Category:", error));
      window.location.reload();
    }
  };

  const handleDeleteCategory = () => {
    const result = window.confirm(`Chắc chắn muốn xóa Category có id: ${refCategoryID.current} ?`);
    if (result) {
      deleteCategory(parseInt(refCategoryID.current))
        .then(() => {
          updateApiCategory(); // Cập nhật dữ liệu từ server
          setListColumnDisplay(listCategories); // Loại bỏ tài khoản đã xóa khỏi danh sách hiện tại
        })
        .catch((error) => console.error("Error deleting Category:", error));
      window.location.reload();
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
    window.location.reload();
  };

  const updateType = async (TypeID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/types/${TypeID}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
    window.location.reload();
  };

  const postType = async (Type) => {
    try {
      const response = await axios.post("http://localhost:3000/api/types", Type, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from server:", response.data);
      setListColumnDisplay([...listColumnDisplay, response.data]);
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
    window.location.reload();
  };

  const handleFindType = () => {
    const CategoryID = refCategoryID.current;
    const TypeID = refProductTypeID.current;
    if (TypeID) {
      setListColumnDisplay(listCategory_Type.filter((obj) => obj.ProductTypeID === parseInt(TypeID)) || []);
    } else if (CategoryID) {
      setListColumnDisplay(listCategory_Type.filter((obj) => obj.CategoryID == parseInt(CategoryID)) || []);
    } else {
      setListColumnDisplay(listCategory_Type);
    }
  };
  const handleAddType = () => {
    const result = window.confirm(`Chắc chắn muốn thêm Type có id: ${nextID} ?`);
    if (result) {
      const Type = {
        ProductTypeID: nextID,
        CategoryID: parseInt(refCategoryID.current),
        ProductType: refProductType.current,
      };
      postType(Type)
        .then(() => {
          updateApiType(); // Cập nhật dữ liệu từ server
          setListColumnDisplay([...listColumnDisplay, Type]); // Thêm tài khoản mới vào danh sách hiện tại
        })
        .catch((error) => console.error("Error adding Type:", error));
      setUpdate(!update);
    }
  };

  const handleUpdateType = () => {
    const result = window.confirm(`Chắc chắn muốn sửa Type có id: ${refProductTypeID.current} ?`);
    if (result) {
      const updatedData = {
        CategoryID: refCategoryID.current,
        ProductType: refProductType.current,
      };
      updateType(parseInt(refProductTypeID.current), updatedData)
        .then(() => {
          updateApiType(); // Cập nhật dữ liệu từ server
          setListColumnDisplay(listCategory_Type); // Cập nhật thông tin của tài khoản trong danh sách hiện tại
        })
        .catch((error) => console.error("Error updating Type:", error));
      setUpdate(!update);
    }
  };

  const handleDeleteType = () => {
    const result = window.confirm(`Chắc chắn muốn xóa Type có id: ${refProductTypeID.current} ?`);
    if (result) {
      deleteType(parseInt(refProductTypeID.current))
        .then(() => {
          updateApiType(); // Cập nhật dữ liệu từ server
          setListColumnDisplay(listCategory_Type); // Loại bỏ tài khoản đã xóa khỏi danh sách hiện tại
        })
        .catch((error) => console.error("Error deleting Type:", error));
      setUpdate(!update);
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
            <td>
              <input type="text" ref={refCategoryID} onChange={handleCategoryIDChange} />
            </td>
            <td>
              <input type="text" ref={refCategoryName} onChange={handleCategoryNameChange} />
            </td>
            <td>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200px" }} />}
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
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listColumnDisplay.map((Category) => {
                return (
                  <tr>
                    {Value(Category.CategoryID).map((item) => (
                      <td>{item}</td>
                    ))}
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
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listColumnDisplay.map((Type) => {
                return (
                  <tr>
                    {Value(Type.ProductTypeID).map((item) => (
                      <td>{item}</td>
                    ))}
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
