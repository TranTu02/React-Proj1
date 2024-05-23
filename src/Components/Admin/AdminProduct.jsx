import React, { useEffect, useRef, useState } from "react";
import style from "./Admin.module.css";
import { initializeData, listCategory_Type, listProducts, listCategories, listBrand, update } from "../Assets/data";
import axios from "axios";

export const AdminProduct = () => {
  update(listProducts.sort((a, b) => b.ProductID - a.ProductID));
  const [listProductsDisplay, setListProductsDisplay] = useState(listProducts);
  useEffect(() => {
    setListProductsDisplay(listProducts);
  }, [listProducts]);
  let nextID = listProducts.length !== 0 ? listProducts[0].ProductID + 1 : 1;
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const refProductID = useRef("");
  const refProductName = useRef("");
  const refPrice = useRef("");
  const refDescription = useRef("");
  const refStock = useRef("");
  const refOverview = useRef("");
  const refCalculationUnit = useRef("");
  const refWeight = useRef("");
  const handleGetInfor = (Product) => {
    refProductID.current.value = Product.ProductID;
    refProductName.current.value = Product.ProductName;
    refPrice.current.value = Product.Price;
    refDescription.current.value = Product.Description;
    refStock.current.value = Product.Stock;
    refOverview.current.value = Product.Overview;
    refCalculationUnit.current.value = Product.CalculationUnit;
    refWeight.current.value = Product.Weight;
    setSelectedCategory(listCategories.find((obj) => obj.CategoryID === Product.CategoryID).CategoryID);
    setSelectedType(listCategory_Type.find((obj) => obj.ProductTypeID === Product.ProductTypeID).ProductTypeID);
    setSelectedBrand(listBrand.find((obj) => obj.BrandID === Product.BrandID) === undefined ? 1 : listBrand.find((obj) => obj.BrandID === Product.BrandID).BrandID);
    setSelectedImage(Product.Image);
  };

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
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.response || error);
    }
  };

  const handleAddProduct = () => {
    const product = newProduct(true);
    for (const key in product) {
      if (product[key] === "" || product[key] === undefined) {
        alert("Nhập đủ thông tin");
        return false;
      }
    }
    var result = window.confirm("Chắc chắn muốn thêm sản phẩm có id: " + nextID + " ?");

    if (result) {
      postProduct(product);
      update(listProducts, listProducts.push(product));
    }
  };
  const handleUpdateProduct = () => {
    const updatedData = newProduct(false); // Dữ liệu sản phẩm mới
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin");
        return false;
      }
    }
    var result = window.confirm("Chắc chắn muốn sửa sản phẩm có id: " + refProductID.current.value + " ?");
    if (result) {
      // Sử dụng hàm cập nhật sản phẩm
      updateProduct(updatedData.ProductID, updatedData);
      const index = listProducts.findIndex((obj) => obj.ProductID === updatedData.ProductID);
      update([...listProducts.slice(0, index), updatedData, ...listProducts.slice(index + 1)]);
    }
  };
  const handleDeleteProduct = () => {
    if (refProductID.current.value === "") {
      alert("Nhập ProductID");
      return false;
    }
    var result = window.confirm("Chắc chắn muốn xóa sản phẩm có id: " + refProductID.current.value + " ?");
    if (result) {
      deleteProduct(newProduct(false).ProductID);
      const index = listProducts.findIndex((obj) => obj.ProductID === newProduct(false).ProductID);
      update([...listProducts.slice(0, index), ...listProducts.slice(index + 1)]);
    }
  };
  const productTitle = () => {
    const keys = Object.keys(listProducts[0] || {});
    return keys.slice(1, -1); // Bỏ qua phần tử đầu và cuối
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
            <th>Giá gốc</th>
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
                {listBrand.map((brand) => (
                  <option key={brand.BrandID} value={brand.BrandID}>
                    {brand.BrandName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option>Default</option>
                {listCategories.length != 0 ? (
                  listCategories.map((category) => (
                    <option key={category.CategoryID} value={category.CategoryID}>
                      {category.CategoryName}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </td>
            <td>
              <select value={selectedType} onChange={handleTypeChange}>
                {listCategories.length != 0 ? (
                  listCategory_Type
                    .filter((obj) => obj.CategoryID === parseInt(selectedCategory))
                    .map((type) => (
                      <option key={type.ProductTypeID} value={type.ProductTypeID}>
                        {type.ProductType}
                      </option>
                    ))
                ) : (
                  <option value={0}>{"Default"}</option>
                )}
              </select>
            </td>
            <td>
              {" "}
              <textarea rows={2} ref={refPrice} onChange={handlePriceChange}></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <th>Minh họa</th>
          <th>Mô tả chi tiết</th>
          <th>Số lượng</th>
          <th>Tổng quan</th>
          <th>Đơn vị tính</th>
          <th>Khối lượng</th>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "200rem" }}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "180rem" }} />}
            </td>
            <td style={{ width: "500rem" }}>
              <textarea rows={10} ref={refDescription} onChange={handleDesChange}></textarea>
            </td>
            <td>
              <textarea rows={2} ref={refStock} onChange={handleStockChange}></textarea>
            </td>
            <td style={{ width: "300rem" }}>
              <textarea rows={10} ref={refOverview} onChange={handleOverviewChange}></textarea>
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
            <th>Mã SP</th>
            <th>Tên SP</th>
            <th>Thương hiệu</th>
            <th>Danh mục</th>
            <th>Loại </th>
            <th>Minh họa</th>
            <th>Giá gốc</th>
            <th>Mô tả chi tiết</th>
            <th>Số lượng</th>
            <th>Ngày sửa đổi</th>
            <th>Tổng quan</th>
            <th>Đơn vị</th>
            <th>Khối lượng</th>
          </tr>
        </thead>
        <tbody>
          {listProductsDisplay.map((product) => (
            <tr key={product.ProductID} onClick={() => handleGetInfor(product)}>
              <td>{product.ProductID}</td>
              <td>{product.ProductName}</td>
              <td>{product.BrandID}</td>
              <td>{product.CategoryID}</td>
              <td>{product.ProductTypeID}</td>
              <td>
                <img src={product.Image} width={"100rem"} height={"100rem"} />
              </td>
              <td>{product.Price}</td>
              <td class={style.descriptionCell}>{product.Description}</td>
              <td>{product.Stock}</td>
              <td>{`${new Date(product.Date).getDate()}/${new Date(product.Date).getMonth()}/${new Date(product.Date).getFullYear()}`}</td>
              <td class={style.descriptionCell}>{product.Overview}</td>
              <td>{product.CalculationUnit}</td>
              <td>{product.Weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
