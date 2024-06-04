import React, { useEffect, useRef, useState } from "react";
import style from "./Admin.module.css";
import { listBanner, listPhoto, listBrand, listCategory_Type, listCategories, updateListPhoto, updateListBanner } from "../Assets/data";
import axios from "axios";
export const AdminPhoto = () => {
  updateListPhoto(listPhoto.sort((a, b) => b.PhotoID - a.PhotoID));
  updateListBanner(listBanner.sort((a, b) => b.BannerID - a.BannerID));

  const [active, setActive] = useState(true);
  const [listRowDisplay, setListRowDisplay] = useState(active ? listPhoto : listBanner);
  const handleSetActive = (value) => {
    setActive(value);
    setListRowDisplay(value ? listPhoto : listBanner);
  };
  useEffect(() => {
    setListRowDisplay(active ? listPhoto : listBanner);
  }, [listPhoto, listBanner]);

  const refPhotoID = useRef("");
  const refProductID = useRef("");
  const refBannerID = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedBrand, setSelectedBrand] = useState("Brand");
  const [selectedType, setSelectedType] = useState("Type");
  const [selectedOther, setSelectedOther] = useState("Other");
  const [selectedOrder, setSelectedOrder] = useState(0);
  const getInfor = (item) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (active) {
      refPhotoID.current.value = item.PhotoID;
      refProductID.current.value = item.ProductID;
      setSelectedImage(item.ImgSrc);
    } else {
      refBannerID.current.value = item.BannerID;
      setSelectedImage(item.ImgSrc);
      setSelectedCategory(item.CategoryID);
      setSelectedBrand(item.BrandID);
      setSelectedType(item.ProductTypeID);
      setSelectedOther(item.Other);
      setSelectedOrder(item.Order);
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
  const handlePhotoIDChange = (event) => {
    refPhotoID.current.value = event.target.value;
  };
  const handleProductIDChange = (event) => {
    refProductID.current.value = event.target.value;
  };
  const handleBannerIDChange = (event) => {
    refBannerID.current.value = event.target.value;
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
  const handleOtherChange = (event) => {
    setSelectedOther(event.target.value);
  };
  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  // API Photo
  const deletePhoto = async (itemid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/photos/${itemid}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updatePhoto = async (itemid, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/photos/${itemid}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postPhoto = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/photos", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  //

  var nextID = listPhoto.length !== 0 ? listPhoto[0].PhotoID + 1 : 1;
  const handleAddPhoto = () => {
    const Photo = {
      PhotoID: nextID,
      ProductID: parseInt(refProductID.current.value),
      ImgSrc: selectedImage,
    };
    for (const key in Photo) {
      if (Photo[key] === "" || Photo[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm id: ${nextID} ?`);
    if (result) {
      postPhoto(Photo)
        .then(() => {
          updateListPhoto([...listPhoto, Photo]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdatePhoto = () => {
    const updatedData = {
      PhotoID: parseInt(refPhotoID.current.value),
      ProductID: parseInt(refProductID.current.value),
      ImgSrc: selectedImage,
    };
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa id: ${refPhotoID.current.value} ?`);
    if (result) {
      updatePhoto(parseInt(refPhotoID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listPhoto.map((obj) => {
              if (obj.PhotoID === updatedData.PhotoID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListPhoto(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeletePhoto = () => {
    if (refPhotoID.current.value === "") {
      alert("Nhập PhotoID");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn hình ảnh xóa có id: ${refPhotoID.current.value} ?`);
    if (result) {
      deletePhoto(parseInt(refPhotoID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listPhoto.map((obj) => {
              if (obj.PhotoID !== parseInt(refPhotoID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListPhoto(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };

  const handleFindImg = () => {
    const photoID = refPhotoID.current.value === "" ? "" : refPhotoID.current.value.trim();
    const productID = refProductID.current.value === "" ? "" : refProductID.current.value.trim();
    if (photoID !== "") {
      setListRowDisplay(listPhoto.filter((obj) => obj.PhotoID === parseInt(photoID)) || []);
    } else if (productID !== "") {
      setListRowDisplay(listPhoto.filter((obj) => obj.ProductID === parseInt(productID)) || []);
    } else {
      setListRowDisplay(listPhoto);
    }
  };

  // API Banner
  const deleteBanner = async (itemid) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/banners/${itemid}`);
      console.log(response.data.message); // Success message from server after deletion
      // After successful deletion, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error deleting Type:", error);
    }
  };

  const updateBanner = async (itemid, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/banners/${itemid}`, updatedData);
      console.log(response.data); // Updated Type information
      // After successful update, update the list of Categories or perform other tasks
    } catch (error) {
      console.error("Error updating Type:", error);
    }
  };

  const postBanner = async (item) => {
    try {
      const response = await axios.post("http://localhost:3000/api/banners", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error sending data:", error.response || error);
    }
  };
  //

  var nextIDB = listBanner.length !== 0 ? listBanner[0].BannerID + 1 : 1;
  const handleAddBanner = () => {
    const Banner = {
      BannerID: nextIDB,
      ImgSrc: selectedImage,
      CategoryID: selectedCategory,
      BrandID: selectedBrand,
      ProductTypeID: selectedType,
      Other: selectedOther,
      Order: selectedOrder,
    };
    for (const key in Banner) {
      if (Banner[key] === "" || Banner[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn thêm id: ${nextIDB} ?`);
    if (result) {
      postBanner(Banner)
        .then(() => {
          updateListBanner([...listBanner, Banner]);
        })
        .catch((error) => console.error("Error adding Present event:", error));
    }
  };

  const handleUpdateBanner = () => {
    const updatedData = {
      BannerID: parseInt(refBannerID.current.value),
      ImgSrc: selectedImage,
      CategoryID: selectedCategory,
      BrandID: selectedBrand,
      ProductTypeID: selectedType,
      Other: selectedOther,
      Order: selectedOrder,
    };
    for (const key in updatedData) {
      if (updatedData[key] === "" || updatedData[key] === undefined) {
        alert("Nhập đủ thông tin!");
        return false;
      }
    }
    const result = window.confirm(`Chắc chắn muốn sửa id: ${refBannerID.current.value} ?`);
    if (result) {
      updateBanner(parseInt(refBannerID.current.value), updatedData)
        .then(() => {
          const newList = () => {
            let list = [];
            listBanner.map((obj) => {
              if (obj.BannerID === updatedData.BannerID) {
                list.push(updatedData);
              } else {
                list.push(obj);
              }
            });
            return list;
          };
          updateListBanner(newList());
        })
        .catch((error) => console.error("Error updating Present event:", error));
    }
  };

  const handleDeleteBanner = () => {
    if (refBannerID.current.value === "") {
      alert("Nhập BannerID");
      return false;
    }
    const result = window.confirm(`Chắc chắn muốn biểu ngữ xóa có id: ${refBannerID.current.value} ?`);
    if (result) {
      deleteBanner(parseInt(refBannerID.current.value))
        .then(() => {
          const newList = () => {
            let list = [];
            listBanner.map((obj) => {
              if (obj.BannerID !== parseInt(refBannerID.current.value)) {
                list.push(obj);
              }
            });
            return list;
          };
          updateListBanner(newList());
        })
        .catch((error) => console.error("Error deleting Present:", error));
    }
  };
  const handleFindBanner = () => {
    const id = refBannerID.current.value === "" ? "" : refBannerID.current.value.trim();
    const order = parseInt(selectedOrder);
    if (id !== "") {
      setListRowDisplay(listBanner.filter((obj) => obj.BannerID === parseInt(id)) || []);
    } else if (order !== 0) {
      setListRowDisplay(listBanner.filter((obj) => obj.Order === order) || []);
    } else {
      setListRowDisplay(listBanner);
    }
  };
  return (
    <div className={style.ProductManage}>
      <div className={style.Action}>
        <h2 onClick={() => handleSetActive(true)} className={active ? style.Active : ""}>
          Quản lý sản hình ảnh
        </h2>
        <h2 onClick={() => handleSetActive(false)} className={!active ? style.Active : ""}>
          Quản lý biểu ngữ
        </h2>
      </div>
      <h3>Form</h3>
      <table>
        {active ? (
          <thead>
            <th>Mã ảnh minh họa</th>
            <th>Mã sản phẩm</th>
            <th>Hình ảnh</th>
          </thead>
        ) : (
          <thead>
            <th>Mã biểu ngữ</th>
            <th>Ảnh</th>
            <th>Danh mục</th>
            <th>Thương hiệu</th>
            <th>Loại sản phẩm</th>
            <th>Khác</th>
            <th>Ưu tiên</th>
          </thead>
        )}
        {active ? (
          <tbody>
            <td>
              <input type="text" ref={refPhotoID} onChange={handlePhotoIDChange} />
            </td>
            <td>
              <input type="text" ref={refProductID} onChange={handleProductIDChange} />
            </td>
            <td>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200px" }} />}
            </td>
          </tbody>
        ) : (
          <tbody>
            <td>
              <input type="text" ref={refBannerID} onChange={handleBannerIDChange} />
            </td>
            <td>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200px" }} />}
            </td>
            <td>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value={"Category"}>Default</option>
                {listCategories.map((category) => (
                  <option key={category.CategoryID} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>{" "}
            </td>
            <td>
              <select value={selectedBrand} onChange={handleBrandChange}>
                <option value={"Brand"}>Default</option>
                {listBrand.map((brand) => (
                  <option key={brand.BrandID} value={brand.BrandID}>
                    {brand.BrandName}
                  </option>
                ))}
              </select>{" "}
            </td>
            <td>
              <select value={selectedType} onChange={handleTypeChange}>
                <option value={"Type"}>Default</option>
                {selectedCategory === "Category"
                  ? listCategory_Type.map((type) => {
                      return (
                        <option key={type.ProductTypeID} value={type.ProductTypeID}>
                          {type.ProductType}
                        </option>
                      );
                    })
                  : listCategory_Type
                      .filter((obj) => obj.CategoryID === parseInt(selectedCategory))
                      .map((type) => {
                        return (
                          <option key={type.ProductTypeID} value={type.ProductTypeID}>
                            {type.ProductType}
                          </option>
                        );
                      })}
              </select>{" "}
            </td>
            <td>
              <select value={selectedOther} onChange={handleOtherChange}>
                <option value={"Others"}>Default</option>
                <option value={"Sale"}>Sale</option>
                <option value={"AllProducts"}>AllProducts</option>
              </select>{" "}
            </td>
            <td>
              <select value={selectedOrder} onChange={handleOrderChange}>
                {" "}
                <option value={0}>Default</option>
                {[1, 2, 3, 4, 5].map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>{" "}
            </td>
          </tbody>
        )}
      </table>

      <div className={style.Action}>
        <button onClick={active ? handleAddPhoto : handleAddBanner}>Thêm</button>
        <button onClick={active ? handleUpdatePhoto : handleUpdateBanner}>Sửa</button>
        <button onClick={active ? handleDeletePhoto : handleDeleteBanner}>Xóa</button>
        <button onClick={active ? handleFindImg : handleFindBanner}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách minh họa</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>Mã ảnh minh họa</th>
              <th>Mã sản phẩm</th>
              <th>Hình ảnh</th>
            </thead>
            <tbody>
              {listRowDisplay.map((photo) => {
                return (
                  <tr onClick={() => getInfor(photo)}>
                    <td>{photo.PhotoID}</td>
                    <td>{photo.ProductID}</td>
                    <td>
                      {" "}
                      <img src={photo.ImgSrc} alt="Image" style={{ maxWidth: "100%", maxHeight: "80px" }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3>Danh sách biểu ngữ</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              <th>Mã biểu ngữ</th>
              <th>Ảnh</th>
              <th>Danh mục</th>
              <th>Thương hiệu</th>
              <th>Loại sản phẩm</th>
              <th>Khác</th>
              <th>Ưu tiên</th>
            </thead>
            <tbody>
              {listRowDisplay.map((photo) => {
                return (
                  <tr onClick={() => getInfor(photo)}>
                    <td>{photo.BannerID}</td>
                    <td>
                      {" "}
                      <img src={photo.ImgSrc} alt="Image" style={{ maxWidth: "100%", maxHeight: "80px" }} />
                    </td>
                    <td>{photo.CategoryID}</td>
                    <td>{photo.BrandID}</td>
                    <td>{photo.ProductTypeID}</td>
                    <td>{photo.Other}</td>
                    <td>{photo.Order}</td>
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
