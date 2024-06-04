import { useEffect } from "react";

import axios from "axios";
// import img from "./camera.png";
// import logo1 from "./Aqua.jpg";
// import logo3 from "./CocaCola.jpg";
// import logo2 from "./Hura.jpg";
// import logo4 from "./Others.png";
// import logo5 from "./R.jpg";
// import logo6 from "./Vinamilk.jpg";

export const update = (newlist) => {
  listProducts = newlist;
};
export const updateListAccounts = (newlist) => {
  listAccount = newlist;
};

export const updateListSaleEvent = (newlist) => {
  listSaleEvents = newlist;
};

export const updateListDiscountProduct = (newlist) => {
  listDiscountProduct = newlist;
};

export const updateListCategory = (newlist) => {
  listCategories = newlist;
};

export const updateListProductType = (newlist) => {
  listCategory_Type = newlist;
};
export const updateListPresentEvent = (newlist) => {
  listPresentEvents = newlist;
};
export const updateListPresentProduct = (newlist) => {
  listPresentProduct = newlist;
};

export const updateListPhoto = (newlist) => {
  listPhoto = newlist;
};

export const updateListBanner = (newlist) => {
  listBanner = newlist;
};

export const updateListStock = (newlist) => {
  listStock = newlist;
};

export const updateListBill = (newlist) => {
  listBill = newlist;
};
export const updateListDetailBill = (newlist) => {
  listDetailBill = newlist;
};
export const updateListBrand = (newlist) => {
  listBrand = newlist;
};

export const updateApi = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/products");
    // Xử lý khi có kết quả trả về thành công
    const products = response.data; // Mảng sản phẩm từ phản hồi
    return products;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listProducts = [];

// Gọi hàm updateApi để lấy dữ liệu và gán cho listProducts
updateApi()
  .then((products) => {
    listProducts = products;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiBrand = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/brands");
    // Xử lý khi có kết quả trả về thành công
    const brands = response.data; // Mảng sản phẩm từ phản hồi
    return brands;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listBrand = [];

// Gọi hàm updateApi để lấy dữ liệu và gán cho listProducts
updateApiBrand()
  .then((brands) => {
    listBrand = brands;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiAccount = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/accounts");
    // Xử lý khi có kết quả trả về thành công
    const accounts = response.data; // Mảng sản phẩm từ phản hồi
    return accounts;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listAccount = [];

updateApiAccount()
  .then((accounts) => {
    listAccount = accounts;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiCategory = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    // Xử lý khi có kết quả trả về thành công
    const categories = response.data; // Mảng sản phẩm từ phản hồi
    return categories;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listCategories = [];

updateApiCategory()
  .then((categories) => {
    listCategories = categories;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });
export const updateApiType = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/types");
    // Xử lý khi có kết quả trả về thành công
    const types = response.data; // Mảng sản phẩm từ phản hồi
    return types;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listCategory_Type = [];

updateApiType()
  .then((types) => {
    listCategory_Type = types;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiPresentEvent = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/presentevents");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listPresentEvents = [];

updateApiPresentEvent()
  .then((presentevents) => {
    listPresentEvents = presentevents;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiPresentProduct = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/presentproducts");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listPresentProduct = [];

updateApiPresentProduct()
  .then((presentproduct) => {
    listPresentProduct = presentproduct;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiSaleEvent = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/saleevents");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listSaleEvents = [];

updateApiSaleEvent()
  .then((saleevents) => {
    listSaleEvents = saleevents;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiDiscountProduct = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/discountproducts");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listDiscountProduct = [];

updateApiDiscountProduct()
  .then((discountproducts) => {
    listDiscountProduct = discountproducts;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiPhoto = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/photos");
    // Xử lý khi có kết quả trả về thành công
    const photos = response.data; // Mảng sản phẩm từ phản hồi
    return photos;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listPhoto = [];

updateApiPhoto()
  .then((photos) => {
    listPhoto = photos;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiBanner = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/banners");
    // Xử lý khi có kết quả trả về thành công
    const banners = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return banners;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listBanner = [];

updateApiBanner()
  .then((banners) => {
    listBanner = banners;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });
export const updateApiStock = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/stocks");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listStock = [];

updateApiStock()
  .then((items) => {
    listStock = items;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiBill = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/bills");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listBill = [];

updateApiBill()
  .then((items) => {
    listBill = items;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const updateApiDetailBill = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/detailbill");
    // Xử lý khi có kết quả trả về thành công
    const presentevent = response.data; // Mảng sản phẩm từ phản hồi
    // console.log(presentevent);
    return presentevent;
  } catch (error) {
    // Xử lý khi có lỗi xảy ra
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error; // Để cho phép bên gọi xử lý lỗi nếu cần thiết
  }
};

export let listDetailBill = [];

updateApiDetailBill()
  .then((items) => {
    listDetailBill = items;
  })
  .catch((error) => {
    // Xử lý lỗi nếu cần
    console.error("Lỗi khi cập nhật dữ liệu:", error);
  });

export const initializeData = async () => {
  try {
    const [products, accounts, categories, types, presentEvents, presentProducts, saleEvents, discountProducts, photos, banners, stocks, bills, detailBills] = await Promise.all([
      updateApi(),
      updateApiAccount(),
      updateApiCategory(),
      updateApiType(),
      updateApiPresentEvent(),
      updateApiPresentProduct(),
      updateApiSaleEvent(),
      updateApiDiscountProduct(),
      updateApiPhoto(),
      updateApiBanner(),
      updateApiStock(),
      updateApiBill(),
      updateApiDetailBill(),
    ]);

    listProducts = products;
    listAccount = accounts;
    listCategories = categories;
    listCategory_Type = types;
    listPresentEvents = presentEvents;
    listPresentProduct = presentProducts;
    listSaleEvents = saleEvents;
    listDiscountProduct = discountProducts;
    listPhoto = photos;
    listBanner = banners;
    listStock = stocks;
    listBill = bills;
    listDetailBill = detailBills;
  } catch (error) {
    console.error("Lỗi khi khởi tạo dữ liệu:", error);
  }
};

// export let listBrand = [
//   {
//     BrandID: 1,
//     BrandName: "Các thương hiệu khác",
//     Logo: logo4,
//   },
//   {
//     BrandID: 2,
//     BrandName: "Coca Cola",
//     Logo: logo3,
//   },
//   {
//     BrandID: 3,
//     BrandName: "Hura",
//     Logo: logo2,
//   },
//   {
//     BrandID: 4,
//     BrandName: "Vinamilk",
//     Logo: logo6,
//   },
//   {
//     BrandID: 5,
//     BrandName: "Pepsi",
//     Logo: logo5,
//   },
//   {
//     BrandID: 6,
//     BrandName: "Mộc châu",
//     Logo: img,
//   },
//   {
//     BrandID: 7,
//     BrandName: "Neste",
//     Logo: img,
//   },
//   {
//     BrandID: 8,
//     BrandName: "Hải châu",
//     Logo: logo4,
//   },
//   {
//     BrandID: 8,
//     BrandName: "TH",
//     Logo: img,
//   },
// ];

export const listGroupProducts = [
  { GroupID: 1, ProductID: 1 },
  { GroupID: 1, ProductID: 2 },
  { GroupID: 1, ProductID: 3 },
  { GroupID: 2, ProductID: 80 },
  { GroupID: 2, ProductID: 81 },
  { GroupID: 2, ProductID: 82 },
  { GroupID: 2, ProductID: 83 },
];
/*
export const listBanner = [
  {
    BannerID: 1,
    ImgSrc: "#",
    CategoryID: "Category",
    BrandID: "Brand",
    ProductTypeID: "Type",
    Other: "AllProducts",
    Order: 1,
  },
  {
    BannerID: 2,
    ImgSrc: "#",
    CategoryID: "Category",
    BrandID: "Brand",
    ProductTypeID: "Type",
    Other: "Sale",
    Order: 0,
  },
  {
    BannerID: 3,
    ImgSrc: "#",
    CategoryID: "Category",
    BrandID: "1",
    ProductTypeID: "Type",
    Other: "Others",
    Order: 2,
  },
  {
    BannerID: 4,
    ImgSrc: "#",
    CategoryID: "C1",
    BrandID: "Brand",
    ProductTypeID: "Type",
    Other: "Others",
    Order: 3,
  },
];

export const listPhoto = [
  { PhotoID: 1, ProductID: 1, ImgSrc: 1 },
  { PhotoID: 2, ProductID: 1, ImgSrc: 2 },
  { PhotoID: 3, ProductID: 1, ImgSrc: 3 },
  { PhotoID: 4, ProductID: 1, ImgSrc: 4 },
  { PhotoID: 5, ProductID: 1, ImgSrc: 5 },
  { PhotoID: 6, ProductID: 1, ImgSrc: 6 },
  { PhotoID: 7, ProductID: 1, ImgSrc: 7 },
  { PhotoID: 8, ProductID: 1, ImgSrc: 8 },
  { PhotoID: 9, ProductID: 80, ImgSrc: 11 },
  { PhotoID: 10, ProductID: 80, ImgSrc: 12 },
  { PhotoID: 11, ProductID: 80, ImgSrc: 13 },
  { PhotoID: 12, ProductID: 80, ImgSrc: 14 },
  { PhotoID: 13, ProductID: 80, ImgSrc: 14 },
  { PhotoID: 14, ProductID: 2, ImgSrc: 14 },
];
*/
export const listComment = [
  {
    ProductID: 1,
    Title: "Title 1",
    Time: new Date("2024-4-1"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 1,
    Title: "Title 1",
    Time: new Date("2024-4-2"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 1,
    Title: "Title 1",
    Time: new Date("2024-4-3"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 2,
    Title: "Title 1",
    Time: new Date("2024-4-4"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 2,
    Title: "Title 1",
    Time: new Date("2024-4-5"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 3,
    Title: "Title 1",
    Time: new Date("2024-4-6"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 80,
    Title: "Title 1",
    Time: new Date("2024-3-1"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 80,
    Title: "Title 1",
    Time: new Date("2024-2-1"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 81,
    Title: "Title 1",
    Time: new Date("2024-1-1"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 82,
    Title: "Title 1",
    Time: new Date("2024-2-2"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
  {
    ProductID: 83,
    Title: "Title 1",
    Time: new Date("2024-4-4"),
    Comment: "Mình ăn bên Đài hoài thời còn học bển. Nói chung mua được ở đây rồi, ngon. sẽ mua hoài",
  },
];

export const listLocations = [
  { LocationID: 0, Location: "Xuân Thủy, Cầu Giấy, Hà Nội", Distance: 1 },
  { LocationID: 1, Location: "Nhổn, Nam Từ Liêm, Hà Nội", Distance: 7.7 },
  { LocationID: 2, Location: "Trung Hòa, Cầu Giấy, Hà Nội", Distance: 4 },
  { LocationID: 3, Location: "Hồ Tùng Mậu, Cầu Giấy, Hà Nội", Distance: 1.2 },
  { LocationID: 4, Location: "Lai Xá, Hoài Đức, Hà Nội", Distance: 9.2 },
];

export function ListHotSale() {
  var arrSales = [];
  var arrSaleEvents = [];
  var arrSaleProducts = [];
  const currentDate = new Date();
  listSaleEvents.map((item) => {
    if (currentDate < item.End) arrSaleEvents.push(item.DiscountID);
  });
  // arrSaleEvents.forEach(eventID => {
  //     listDiscountProduct.map(item =>  {
  //         if(item.DiscountID === eventID) {
  //             arrSales.push(item);
  //         }
  //     }
  //     )
  // });

  // arrSaleEvents.forEach(eventID => {
  //     const filteredObjects = listDiscountProduct.filter(obj => obj.DiscountID === eventID);
  //     arrSales = arrSales.concat(filteredObjects);
  // });

  arrSales = listDiscountProduct.filter((obj) => arrSaleEvents.includes(obj.DiscountID));
  arrSales.map((item) => {
    var index = listProducts.find((obj) => obj.ProductID === item.ProductID);
    var present = listPresentProduct.find((obj) => obj.ProductID === item.ProductID);
    arrSaleProducts.push({ ...index, ...present, ...item });
  });

  return arrSaleProducts;
}

export function ListProductsByCategory(CategoryID) {
  var arrID = [];
  var arrProducts = [];
  var categoryName = "";
  var categoryIllustration = "";
  var result = { Name: "", Illustation: "", Products: [] };
  arrID = listProducts.filter((obj) => obj.CategoryID === parseInt(CategoryID));
  arrID.map((item) => {
    var index = listProducts.find((obj) => obj.ProductID === item.ProductID);
    var present = listPresentProduct.find((obj) => obj.ProductID === item.ProductID);
    arrProducts.push({ ...index, ...present, ...item });
  });
  categoryName = listCategories.find((obj) => obj.CategoryID === parseInt(CategoryID)).CategoryName;
  categoryIllustration = listCategories.find((obj) => obj.CategoryID === parseInt(CategoryID)).CategoryIllustration;
  result.Name = categoryName;
  result.Illustation = categoryIllustration;
  result.Products = arrProducts;
  return result;
}

export function ListProductsDetail() {
  const FindIndex = (array, productId) => {
    return array.findIndex((item) => item.ProductID === productId);
  };
  var allProducts = listProducts;
  // Duyệt sản phẩm đang có khuyến mãi
  var arrSaleEvents = [];
  listSaleEvents.map((obj) => {
    if (new Date() < new Date(obj.End)) arrSaleEvents.push(obj.DiscountID);
  });

  // Duyệt sản phẩm có giảm giá
  var arrSaleProducts = listDiscountProduct.filter((obj) => arrSaleEvents.includes(obj.DiscountID));
  arrSaleProducts.map((obj) => {
    const index = FindIndex(allProducts, obj.ProductID);
    allProducts[index] = { ...allProducts[index], Reduce: obj.Reduce };
  });

  // Duyệt sản phẩm đang có quà tặng
  listPresentProduct.map((obj) => {
    if (listPresentEvents?.find((prev) => prev.PresentID === obj.PresentID)) {
      const index = FindIndex(allProducts, obj.ProductID);
      const present = listPresentEvents.find((pre) => pre.PresentID === obj.PresentID);
      allProducts[index] = {
        ...allProducts[index],
        Require: obj.Require,
        present,
      };
    }
  });

  return allProducts;
}

export function ListCartInfor(cartItems) {
  let totalCart = 0;
  let totalPresent = 0;
  let totalReduce = 0;
  let listItems = [];
  for (const key in cartItems) {
    if (cartItems[key] > 0) {
      let itemInfo = ListProductsDetail().find((product) => product.ProductID === Number(key));
      itemInfo = { ...itemInfo, Cart: cartItems[key] };
      listItems.push({
        ...listProducts.find((obj) => obj.ProductID === itemInfo.ProductID),
        Quantity: cartItems[key],
      });
      totalCart = totalCart + itemInfo.Price * cartItems[key];
      if (itemInfo.present !== undefined) {
        const quantityPresent = Math.floor(itemInfo.Cart / itemInfo.Require);
        if (quantityPresent > 0) {
          totalPresent = totalPresent + quantityPresent * listProducts.find((obj) => obj.ProductID === itemInfo.present.ProductID).Price;
          listItems.push({
            ...listProducts.find((obj) => obj.ProductID === itemInfo.present.ProductID),
            Quantity: quantityPresent,
          });
        }
      }
      if (itemInfo.Reduce > 0) {
        totalReduce = totalReduce + Math.floor(cartItems[key] * itemInfo.Reduce * itemInfo.Price);
      }
    }
  }
  return {
    totalCart: totalCart,
    totalPresent: totalPresent,
    totalReduce: totalReduce,
    listItems: listItems,
  };
}

export const listTypesByCategory = (CategoryID) => {
  let arrType = [];
  listCategory_Type.map((obj) => {
    if (obj.CategoryID === parseInt(CategoryID)) {
      arrType.push(obj);
    }
  });
  return arrType;
};

export const listProductsByBrand = (BrandID) => {
  let arrProduct = ListProductsDetail().filter((obj) => obj.BrandID === BrandID);
  return arrProduct;
};
