import React, { useState, useRef } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listCategories, listBanner, listBrand } from "../Assets/data";
export const AdminCategory = () => {
  const [active, setActive] = useState(true);
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listCategories : listCategory_Type);
  const handleSetActive = (value) => {
    setActive(value);
    setListColumnDisplay(value ? listCategories : listCategory_Type);
  };
  const Title = () => {
    let arr = [];
    for (const key in active ? listCategories[0] : listCategory_Type[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    let item = listColumnDisplay.find((obj) => (active ? obj.CategoryID === id : obj.ProductTypeID === id));
    for (const key in item) {
      {
        arr.push(item[key]);
      }
    }
    return arr;
  };
  const refCategoryID = useRef("");
  const refCategoryName = useRef("");
  const refProductTypeID = useRef("");
  const refProductType = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);

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
  const handleCategoryIDChange = (event) => {
    refCategoryID.current = event.target.value;
  };
  const handleCategoryNameChange = (event) => {
    refCategoryName.current = event.target.value;
  };
  const handleProductTypeIDChange = (event) => {
    refProductTypeID.current = event.target.value;
  };
  const handleProductTypeChange = (event) => {
    refProductType.current = event.target.value;
  };

  const handleFindCategory = () => {
    const CategoryID = refCategoryID.current.value === "" ? "" : refCategoryID.current.trim();
    const CategoryName = refCategoryName.current.value === "" ? "" : refCategoryName.current.trim();
    if (CategoryID !== "") {
      setListColumnDisplay(listCategories.filter((obj) => obj.CategoryID.toLowerCase().includes(CategoryID.toLowerCase())) || []);
    } else if (CategoryName !== "") {
      setListColumnDisplay(listCategories.filter((obj) => obj.CategoryName.toLowerCase().includes(CategoryName.toLowerCase())) || []);
    } else {
      setListColumnDisplay(listCategories);
    }
  };
  const handleFindType = () => {
    const CategoryID = refCategoryID.current.value === "" ? "" : refCategoryID.current.trim();
    const TypeID = refProductTypeID.current.value === "" ? "" : refProductTypeID.current.trim();
    if (TypeID !== "") {
      setListColumnDisplay(listCategory_Type.filter((obj) => obj.ProductTypeID === parseInt(TypeID)) || []);
    } else if (CategoryID !== 0) {
      setListColumnDisplay(listCategory_Type.filter((obj) => obj.CategoryID.toLowerCase().includes(CategoryID.toLowerCase())) || []);
    } else {
      setListColumnDisplay(listCategory_Type);
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
        <thead>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
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
              <input type="text" ref={refCategoryID} onChange={handleCategoryIDChange} />
            </td>
            <td>
              <input type="text" ref={refProductTypeID} onChange={handleProductTypeIDChange} />
            </td>
            <td>
              <input type="text" ref={refProductType} onChange={handleProductTypeChange} />
            </td>
          </tbody>
        )}
      </table>

      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
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
              {listColumnDisplay.map((Category) => {
                return (
                  <tr>
                    {Value(Category.ProductTypeID).map((item) => (
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
