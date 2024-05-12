import React, { useRef, useState } from "react";
import style from "./Admin.module.css";
import { listBanner, listCategories, listPhoto, listBrand, listCategory_Type } from "../Assets/data";
export const AdminPhoto = () => {
  const [active, setActive] = useState(true);
  const [listColumnDisplay, setListColumnDisplay] = useState(active ? listPhoto : listBanner);
  const handleSetActive = (value) => {
    setActive(value);
    setListColumnDisplay(value ? listPhoto : listBanner);
  };
  const Title = () => {
    let arr = [];
    for (const key in active ? listPhoto[0] : listBanner[0]) {
      arr.push(key);
    }
    return arr;
  };
  const Value = (id) => {
    let arr = [];
    let item = listColumnDisplay.find((obj) => (active ? obj.PhotoID === id : obj.BannerID === id));
    for (const key in item) {
      {
        arr.push(item[key]);
      }
    }
    return arr;
  };
  const refPhotoID = useRef("");
  const refProductID = useRef("");
  const refBannerID = useRef("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(listCategories[0].CategoryName);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedOther, setSelectedOther] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

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
    refPhotoID.current = event.target.value;
  };
  const handleProductIDChange = (event) => {
    refProductID.current = event.target.value;
  };
  const handleBannerIDChange = (event) => {
    refBannerID.current = event.target.value;
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

  const handleFindImg = () => {
    const photoID = refPhotoID.current.value === "" ? "" : refPhotoID.current.trim();
    const productID = refProductID.current.value === "" ? "" : refProductID.current.trim();
    if (photoID !== "") {
      setListColumnDisplay(listPhoto.filter((obj) => obj.PhotoID === parseInt(photoID)) || []);
    } else if (productID !== "") {
      setListColumnDisplay(listPhoto.filter((obj) => obj.ProductID === parseInt(productID)) || []);
    } else {
      setListColumnDisplay(listPhoto);
    }
  };
  const handleFindBanner = () => {
    const id = refBannerID.current.value === "" ? "" : refBannerID.current.trim();
    const order = parseInt(selectedOrder);
    if (id !== "") {
      setListColumnDisplay(listBanner.filter((obj) => obj.BannerID === parseInt(id)) || []);
    } else if (order !== 0) {
      setListColumnDisplay(listBanner.filter((obj) => obj.Order === order) || []);
    } else {
      setListColumnDisplay(listBanner);
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
        <thead>
          {Title().map((obj) => {
            return <th>{obj}</th>;
          })}
        </thead>
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
                {listBrand().map((brand) => (
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
                      .filter((obj) => obj.CategoryID === listCategories.find((obj) => obj.CategoryName === selectedCategory).CategoryID)
                      .map((type) => {
                        return (
                          <option key={type.ProductTypeID} value={type.ProductType}>
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
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button onClick={active ? handleFindImg : handleFindBanner}>Tìm</button>
      </div>
      {active ? (
        <>
          <h3>Danh sách minh họa</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listColumnDisplay.map((photo) => {
                return (
                  <tr>
                    {Value(photo.PhotoID).map((item) => (
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
          <h3>Danh sách biểu ngữ</h3>
          <table className={style.TableContainer}>
            <thead className={style.TableHead}>
              {Title().map((obj) => {
                return <th>{obj}</th>;
              })}
            </thead>
            <tbody>
              {listColumnDisplay.map((photo) => {
                return (
                  <tr>
                    {Value(photo.BannerID).map((item) => (
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
