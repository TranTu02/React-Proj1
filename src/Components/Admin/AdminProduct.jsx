import React, { useEffect, useRef, useState } from "react";
import style from "./Admin.module.css";
import { listCategory_Type, listProducts, listCategories, listBrand, updateApi } from "../Assets/data";
import axios from "axios";

export const AdminProduct = () => {
  const [listProductsDisplay, setListProductsDisplay] = useState(listProducts);
  useEffect(() => {
    updateApi();
    setListProductsDisplay(listProducts);
  }, [listProducts]);
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

  const nextID = listProducts.length !== 0 ? listProducts[listProducts.length - 1].ProductID + 1 : 1;
  const newProduct = (isAdd) => ({
    ProductID: isAdd ? nextID : parseInt(refProductID.current.value),
    ProductName: refProductName.current.value,
    BrandID: parseInt(selectedBrand),
    CategoryID: selectedCategory,
    ProductTypeID: parseInt(selectedType),
    Image: selectedImage,
    Price: parseInt(refPrice.current.value),
    Description: refDescription.current.value,
    Stock: parseInt(refStock.current.value),
    Date: new Date().toISOString(),
    Overview: refOverview.current.value,
    CalculationUnit: refCalculationUnit.current.value,
    Weight: parseInt(refWeight.current.value),
  });

  // Hàm xóa sản phẩm
  const deleteProduct = async (productID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${productID}`);
      console.log(response.data.message); // Thông báo từ server sau khi xóa thành công
      // Sau khi xóa thành công, bạn có thể cập nhật lại danh sách sản phẩm hoặc làm các công việc khác
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Hàm cập nhật sản phẩm
  const updateProduct = async (productID, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${productID}`, updatedData);
      console.log(response.data); // Thông tin sản phẩm đã được cập nhật
      // Sau khi cập nhật thành công, bạn có thể cập nhật lại danh sách sản phẩm hoặc làm các công việc khác
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const postProduct = async (product) => {
    try {
      const response = await axios.post("http://localhost:3000/api/products", product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Phản hồi từ server:", response.data);
      setListProductsDisplay([...listProductsDisplay, response.data]);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.response || error);
    }
  };

  const handleAddProduct = () => {
    const product = newProduct(true);
    console.log(product);
    postProduct(product);
    updateApi();
    setListProductsDisplay(listProducts);
  };
  const handleUpdateProduct = () => {
    var result = window.confirm("Chắc chắn muốn sửa sản phẩn có id: " + refProductID.current.value + " ?");
    if (result) {
      // Sử dụng hàm cập nhật sản phẩm
      const updatedData = newProduct(false); // Dữ liệu sản phẩm mới
      updateProduct(updatedData.ProductID, updatedData);
      updateApi();
      setListProductsDisplay(listProducts);
    }
  };
  const handleDeleteProduct = () => {
    var result = window.confirm("Chắc chắn muốn xóa sản phẩn có id: " + refProductID.current.value + " ?");
    if (result) {
      deleteProduct(newProduct(false).ProductID);
      updateApi();
      setListProductsDisplay(listProducts);
    }
  };
  const productTitle = () => {
    const keys = Object.keys(listProducts[0] || {});
    return keys.slice(1, -1); // Bỏ qua phần tử đầu và cuối
  };

  const productValue = (id) => {
    const prd = listProducts.find((obj) => obj.ProductID === id);
    if (!prd) return [];
    const values = Object.keys(prd).map((key) => {
      if (key === "Date") {
        return new Date(prd[key]).toLocaleString();
      } else if (key === "Image") {
        return <img src={prd[key]} alt="Product" style={{ maxWidth: "100%", maxHeight: "100px" }} />;
      } else {
        return prd[key];
      }
    });
    return values.slice(1, -1); // Bỏ qua phần tử đầu và cuối
  };
  const handleIDChange = (event) => {
    refProductID.current.value = event.target.value;
  };
  const handleNameChange = (event) => {
    refProductName.current.value = event.target.value;
  };
  const handlePriceChange = (event) => {
    refPrice.current.value = event.target.value;
  };
  const handleDesChange = (event) => {
    refDescription.current.value = event.target.value;
  };
  const handleStockChange = (event) => {
    refStock.current.value = event.target.value;
  };
  const handleOverviewChange = (event) => {
    refOverview.current.value = event.target.value;
  };
  const handleCUChange = (event) => {
    refCalculationUnit.current.value = event.target.value;
  };
  const handleWeightChange = (event) => {
    refWeight.current.value = event.target.value;
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

  const handleFind = () => {
    const id = refProductID.current.value.trim();
    const name = refProductName.current.value.trim();
    if (id) {
      setListProductsDisplay([listProducts.find((obj) => obj.ProductID === parseInt(id))]);
    } else if (name) {
      setListProductsDisplay(listProducts.filter((product) => product.ProductName.toLowerCase().includes(name.toLowerCase())));
    } else {
      setListProductsDisplay(listProducts);
    }
  };

  return (
    <div className={style.ProductManage}>
      <h2>Quản lý sản phẩm</h2>
      <h3>Form</h3>
      <table>
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea rows={2} onChange={handleIDChange} ref={refProductID}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refProductName} onChange={handleNameChange}></textarea>
            </td>
            <td>
              <select value={selectedBrand} onChange={handleBrandChange}>
                <option>Default</option>
                {listBrand().map((brand) => (
                  <option key={brand.BrandID} value={brand.BrandID}>
                    {brand.BrandName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value={"none"}>Default</option>
                {listCategories.map((category) => (
                  <option key={category.CategoryID} value={category.CategoryName}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select value={selectedType} onChange={handleTypeChange}>
                <option>Default</option>
                {selectedCategory === "none" ? (
                  <></>
                ) : (
                  listCategory_Type
                    .filter((obj) => obj.CategoryID === listCategories.find((obj) => obj.CategoryName === selectedCategory).CategoryID)
                    .map((type) => (
                      <option key={type.ProductTypeID} value={type.ProductTypeID}>
                        {type.ProductType}
                      </option>
                    ))
                )}
              </select>
            </td>
            <td>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "150px" }} />}
            </td>
            <td>
              {" "}
              <textarea rows={2} ref={refPrice} onChange={handlePriceChange}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refDescription} onChange={handleDesChange}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refStock} onChange={handleStockChange}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refOverview} onChange={handleOverviewChange}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refCalculationUnit} onChange={handleCUChange}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refWeight} onChange={handleWeightChange}></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={style.Action}>
        <button onClick={handleAddProduct}>Thêm</button>
        <button onClick={handleUpdateProduct}>Sửa</button>
        <button onClick={handleDeleteProduct}>Xóa</button>
        <button onClick={handleFind}>Tìm</button>
      </div>
      <h3>Danh sách sản phẩm</h3>
      <table className={style.TableContainer}>
        <thead className={style.TableHead}>
          <tr>
            {productTitle().map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listProductsDisplay.map((product) => (
            <tr key={product.ProductID}>
              {productValue(product.ProductID).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
