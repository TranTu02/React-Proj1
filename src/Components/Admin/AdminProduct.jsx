import React, { useRef, useState } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listProducts, listCategories, listBrand } from "../Assets/data";
export const AdminProduct = () => {
  const [listProductsDisplay, setListProductsDisplay] = useState(listProducts);
  const productTitle = () => {
    let arr = [];
    for (const key in listProductsDisplay[0]) {
      arr.push(key);
    }
    return arr;
  };

  const productValue = (id) => {
    let arr = [];
    const prd = listProducts.find((obj) => obj.ProductID === id);
    for (const key in prd) {
      if (key === "present" || key == "Require" || key === "Reduce") {
      } else if (key === "Date") {
        function formatDate(date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        arr.push(formatDate(prd[key]));
      } else {
        arr.push(prd[key]);
      }
    }
    return arr;
  };
  // State để lưu trữ giá trị được chọn
  const [selectedCategory, setSelectedCategory] = useState(listCategories[0].CategoryName);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const refProductID = useRef("");
  const refProductName = useRef("");
  const refPrice = useRef("");
  const refDescription = useRef("");
  const refStock = useRef("");
  const refOverview = useRef("");
  const refCalculationUnit = useRef("");
  const refWeight = useRef("");

  // Hàm xử lý sự kiện khi giá trị được chọn thay đổi
  const handleIDChange = (event) => {
    refProductID.current = event.target.value;
  };
  const handleNameChange = (event) => {
    refProductName.current = event.target.value;
  };
  const handlePriceChange = (event) => {
    refPrice.current = event.target.value;
  };
  const handleDesChange = (event) => {
    refDescription.current = event.target.value;
  };
  const handleStockChange = (event) => {
    refStock.current = event.target.value;
  };
  const handleOverviewChange = (event) => {
    refOverview.current = event.target.value;
  };
  const handleCUChange = (event) => {
    refCalculationUnit.current = event.target.value;
  };
  const handleWeightChange = (event) => {
    refWeight.current = event.target.value;
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
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

  const handleFind = () => {
    const id = refProductID.current.value === "" ? "" : refProductID.current.trim();
    const name = refProductName.current.value === "" ? "" : refProductName.current.trim();
    if (id !== "") {
      setListProductsDisplay([listProducts.find((obj) => obj.ProductID === parseInt(refProductID.current))]);
    } else if (name !== "") {
      const filteredByName = listProducts.filter((product) => product.ProductName.toLowerCase().includes(refProductName.current.toLowerCase()));
      setListProductsDisplay(filteredByName);
    } else {
      setListProductsDisplay(listProducts);
    }
  };
  return (
    <div className={style.ProductManage}>
      <h2>Quản lý hình ảnh</h2>
      <h3>Form</h3>
      <table>
        <thead>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Thương hiệu</th>
          <th>Danh mục</th>
          <th>Loại sản phẩm</th>
          <th>Minh họa</th>
          <th>Giá gốc</th>
          <th>Mô tả chi tiết</th>
          <th>Số lượng</th>
          <th>Tổng quan</th>
          <th>Đơn vị tính</th>
          <th>Khối lượng</th>
        </thead>

        <tbody>
          <td>
            <textarea rows={2} onChange={handleIDChange} ref={refProductID}>
              {refProductID.current}
            </textarea>
          </td>
          <td>
            <textarea rows={2} ref={refProductName} onChange={handleNameChange}>
              {refProductName.current}
            </textarea>
          </td>
          <td>
            <select value={selectedBrand} onChange={handleBrandChange}>
              {listBrand().map((brand) => (
                <option key={brand.BrandID} value={brand.BrandName}>
                  {brand.BrandName}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              {listCategories.map((category) => (
                <option key={category.CategoryID} value={category.CategoryName}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select value={selectedType} onChange={handleTypeChange}>
              {listCategory_Type
                .filter((obj) => obj.CategoryID === listCategories.find((obj) => obj.CategoryName === selectedCategory).CategoryID)
                .map((type) => {
                  return (
                    <option key={type.ProductTypeID} value={type.ProductType}>
                      {type.ProductType}
                    </option>
                  );
                })}
            </select>
          </td>
          <td>
            {" "}
            {/* Input cho phép người dùng chọn tệp ảnh */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* Hiển thị ảnh nếu đã chọn */}
            {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "150px" }} />}
          </td>
          <td>
            <textarea rows={2} ref={refPrice} onChange={handlePriceChange}>
              {refPrice.current}
            </textarea>
          </td>
          <td>
            <textarea rows={2} ref={refDescription} onChange={handleDesChange}>
              {refDescription.current}
            </textarea>
          </td>
          <td>
            <textarea rows={2} ref={refStock} onChange={handleStockChange}>
              {refStock.current}
            </textarea>
          </td>
          <td>
            <textarea rows={2} ref={refOverview} onChange={handleOverviewChange}>
              {refOverview.current}
            </textarea>
          </td>
          <td>
            <textarea rows={2} ref={refCalculationUnit} onChange={handleCUChange}>
              {refCalculationUnit.current}
            </textarea>
          </td>
          <td>
            <textarea rows={2} ref={refWeight} onChange={handleWeightChange}>
              {refWeight.current}
            </textarea>
          </td>
        </tbody>
      </table>
      <div className={style.Action}>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={handleFind}>Tìm</button>
      </div>
      <h3>Danh sách sản phẩm</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          {productTitle().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
        <tbody>
          {listProductsDisplay.map((product) => (
            <tr>
              {productValue(product.ProductID).map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
