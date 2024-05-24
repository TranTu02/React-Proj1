// Import thư viện và module cần thiết
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Product = require("./productModel"); // Import model Product
const Account = require("./accountModel"); // Import model Account
const Category = require("./categoryModel");
const Type = require("./typeModel");
const PresentEvent = require("./presentEventModel");
const PresentProduct = require("./presentProductModel");
const SaleEvent = require("./saleEventModel");
const DiscountProduct = require("./discountProductModel");
const Photo = require("./photoModel");
const Banner = require("./bannerModel");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
const username = "yourUsername";
const password = "yourPassword";
const dbname = "EMart"; // Thay thế bằng tên cơ sở dữ liệu của bạn
const uri = `mongodb+srv://${username}:${password}@cluster0.bvm4vho.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Error connecting to database:", error));

//Chỉ số ID của các thuộc tính
const LastIndex = require("./lastIndexModel");

app.get("/api/lastindex", async (req, res) => {
  try {
    const index = await LastIndex.find();
    res.json(index);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/api/lastindex/productid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedIndex = await LastIndex.findOneAndUpdate({ ProductID: id }, { $set: { ProductID: id + 1 } }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.put("/api/lastindex/productid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedIndex = await LastIndex.findOneAndUpdate({ ProductID: id }, { $set: { ProductID: id + 1 } }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint để lấy tất cả sản phẩm
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để thêm sản phẩm mới
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint để xóa sản phẩm theo ProductID
app.delete("/api/products/:ProductID", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ ProductID: req.params.ProductID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để cập nhật sản phẩm theo ProductID
app.put("/api/products/:ProductID", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ ProductID: req.params.ProductID }, req.body, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint để thêm tài khoản mới
app.post("/api/accounts", async (req, res) => {
  const account = new Account(req.body);

  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint để lấy tất cả tài khoản
app.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để xóa tài khoản theo AccountID
app.delete("/api/accounts/:AccountID", async (req, res) => {
  try {
    const deletedAccount = await Account.findOneAndDelete({ AccountID: req.params.AccountID });
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để cập nhật tài khoản theo AccountID
app.put("/api/accounts/:AccountID", async (req, res) => {
  try {
    const updatedAccount = await Account.findOneAndUpdate({ AccountID: req.params.AccountID }, req.body, { new: true, runValidators: true });
    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const Brand = require("./brandModel");
// Endpoint để lấy tất cả nhãn hiệu
app.get("/api/brands", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để thêm nhãn hiệu mới
app.post("/api/brands", async (req, res) => {
  const brand = new Brand(req.body);

  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint để xóa thương hiệu
app.delete("/api/brands/:BrandID", async (req, res) => {
  try {
    const brand = await Brand.findOneAndDelete({ BrandID: req.params.BrandID });
    if (!brand) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint để cập nhật thương hiệu
app.put("/api/brands/:BrandID", async (req, res) => {
  try {
    const brand = await Brand.findOneAndUpdate({ BrandID: req.params.BrandID }, req.body, { new: true, runValidators: true });

    if (!brand) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lấy tất cả danh mục
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm danh mục mới
app.post("/api/categories", async (req, res) => {
  const category = new Category({
    CategoryID: req.body.CategoryID,
    CategoryName: req.body.CategoryName,
    CategoryIllustration: req.body.CategoryIllustration,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật danh mục theo ID
app.put("/api/categories/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCategory = await Category.findOneAndUpdate({ CategoryID: id }, req.body, { new: true, runValidators: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa danh mục theo ID
app.delete("/api/categories/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Category.findOneAndDelete({ CategoryID: id });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy tất cả loại sp
app.get("/api/types", async (req, res) => {
  try {
    const types = await Type.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm loại sản phẩm mới
app.post("/api/types", async (req, res) => {
  const types = new Type({
    ProductTypeID: req.body.ProductTypeID,
    CategoryID: req.body.CategoryID,
    ProductType: req.body.ProductType,
  });

  try {
    const newType = await types.save();
    res.status(201).json(newType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật loại sản phẩm
app.put("/api/types/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateType = await Type.findOneAndUpdate({ ProductTypeID: id }, req.body, { new: true, runValidators: true });
    if (!updateType) {
      return res.status(404).json({ message: "Type not found" });
    }
    res.json(updateType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa danh loại sp theo ID
app.delete("/api/types/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Type.findOneAndDelete({ ProductTypeID: id });
    res.json({ message: "Type deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy tất cả sự kiện quà tặng
app.get("/api/presentevents", async (req, res) => {
  try {
    const presents = await PresentEvent.find();
    res.json(presents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm sự kiện quà tặng
app.post("/api/presentevents", async (req, res) => {
  try {
    // Tạo một đối tượng PresentEvent mới từ dữ liệu gửi từ client
    const newPresentEvent = new PresentEvent({
      PresentID: req.body.PresentID,
      ProductID: req.body.ProductID,
      Quantity: req.body.Quantity,
      Start: req.body.Start,
      End: req.body.End,
    });

    // Lưu đối tượng PresentEvent vào cơ sở dữ liệu
    const result = await newPresentEvent.save();

    // Trả về kết quả mới tạo cho client
    res.status(201).json(result);
  } catch (err) {
    // Xử lý lỗi nếu có
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật sự kiện quà tặng
app.put("/api/presentevents/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatePresent = await PresentEvent.findOneAndUpdate({ PresentID: id }, req.body, { new: true, runValidators: true });
    if (!updatePresent) {
      return res.status(404).json({ message: "Present event not found" });
    }
    res.json(updatePresent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa danh loại sự kiện quà tặng
app.delete("/api/presentevents/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PresentEvent.findOneAndDelete({ PresentID: id });
    res.json({ message: "Type deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy tất cả sự kiện quà tặng
app.get("/api/presentproducts", async (req, res) => {
  try {
    const presents = await PresentProduct.find();
    res.json(presents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm sự kiện quà tặng
app.post("/api/presentproducts", async (req, res) => {
  try {
    // Tạo một đối tượng PresentEvent mới từ dữ liệu gửi từ client
    const newPresentProduct = new PresentProduct({
      ProductID: req.body.ProductID,
      Require: req.body.Require,
      PresentID: req.body.PresentID,
    });

    // Lưu đối tượng PresentEvent vào cơ sở dữ liệu
    const result = await newPresentProduct.save();

    // Trả về kết quả mới tạo cho client
    res.status(201).json(result);
  } catch (err) {
    // Xử lý lỗi nếu có
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật sự kiện quà tặng
app.put("/api/presentproducts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatePresent = await PresentProduct.findOneAndUpdate({ ProductID: id }, req.body, { new: true, runValidators: true });
    if (!updatePresent) {
      return res.status(404).json({ message: "Present event not found" });
    }
    res.json(updatePresent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa quà tặng
app.delete("/api/presentproducts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PresentProduct.findOneAndDelete({ ProductID: id });
    res.json({ message: "present product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all sale events
app.get("/api/saleevents", async (req, res) => {
  try {
    const saleEvents = await SaleEvent.find();
    res.json(saleEvents);
  } catch (error) {
    console.error("Error fetching sale events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new sale event
app.post("/api/saleevents", async (req, res) => {
  try {
    const newSaleEvent = await SaleEvent.create(req.body);
    res.status(201).json(newSaleEvent);
  } catch (error) {
    console.error("Error creating sale event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT (update) a sale event by ID
app.put("/api/saleevents/:id", async (req, res) => {
  try {
    const updatedSaleEvent = await SaleEvent.findOneAndUpdate({ DiscountID: req.params.id }, req.body, { new: true, runValidators: true });
    if (!updatedSaleEvent) {
      return res.status(404).json({ error: "Sale event not found" });
    }
    res.json(updatedSaleEvent);
  } catch (error) {
    console.error("Error updating sale event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a sale event by ID
app.delete("/api/saleevents/:id", async (req, res) => {
  try {
    const deletedSaleEvent = await SaleEvent.findOneAndDelete({ DiscountID: req.params.id });
    if (!deletedSaleEvent) {
      return res.status(404).json({ error: "Sale event not found" });
    }
    res.json(deletedSaleEvent);
  } catch (error) {
    console.error("Error deleting sale event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all DiscountProducts
app.get("/api/discountproducts", async (req, res) => {
  try {
    const discountProducts = await DiscountProduct.find();
    res.json(discountProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route để cập nhật DiscountProduct dựa trên ProductID và DiscountID
app.put("/api/discountproducts/:discountID/:productID", async (req, res) => {
  const { discountID, productID } = req.params;
  try {
    const updatedDiscountProduct = await DiscountProduct.findOneAndUpdate({ DiscountID: discountID, ProductID: productID }, req.body, { new: true, runValidators: true });
    res.json(updatedDiscountProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route để xóa DiscountProduct dựa trên ProductID và DiscountID
app.delete("/api/discountproducts/:discountID/:productID", async (req, res) => {
  const { discountID, productID } = req.params;
  try {
    await DiscountProduct.findOneAndDelete({ DiscountID: discountID, ProductID: productID });
    res.json({ message: "DiscountProduct deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new DiscountProduct
app.post("/api/discountproducts", async (req, res) => {
  try {
    const newDiscountProduct = await DiscountProduct.create(req.body);
    res.status(201).json(newDiscountProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lấy tất cả hình ảnh
app.get("/api/photos", async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm  hình ảnh
app.post("/api/photos", async (req, res) => {
  const photos = new Photo({
    PhotoID: req.body.PhotoID,
    ProductID: req.body.ProductID,
    ImgSrc: req.body.ImgSrc,
  });

  try {
    const newPhoto = await photos.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật
app.put("/api/photos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatePhoto = await Photo.findOneAndUpdate({ PhotoID: id }, req.body, { new: true, runValidators: true });
    if (!updatePhoto) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatePhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa
app.delete("/api/photos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Photo.findOneAndDelete({ PhotoID: id });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy tất cả banner
app.get("/api/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm  banner
app.post("/api/banners", async (req, res) => {
  const banners = new Banner({
    BannerID: req.body.BannerID,
    ImgSrc: req.body.ImgSrc,
    CategoryID: req.body.CategoryID,
    BrandID: req.body.BrandID,
    ProductTypeID: req.body.ProductTypeID,
    Other: req.body.Other,
    Order: req.body.Order,
  });

  try {
    const newBanner = await banners.save();
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật
app.put("/api/banners/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateBanner = await Banner.findOneAndUpdate({ BannerID: id }, req.body, { new: true, runValidators: true });
    if (!updateBanner) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updateBanner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa
app.delete("/api/banners/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Banner.findOneAndDelete({ BannerID: id });
    res.json({ message: "banner deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const Stock = require("./stockModule");

app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm
app.post("/api/stocks", async (req, res) => {
  const stocks = new Stock({
    StockID: req.body.StockID,
    ProductID: req.body.ProductID,
    Quantity: req.body.Quantity,
    Remaining: req.body.Remaining,
    Date: req.body.Date,
    ExpirationDate: req.body.ExpirationDate,
    Cost: req.body.Cost,
    SupplierTaxCode: req.body.SupplierTaxCode,
  });

  try {
    await Product.findOneAndUpdate({ ProductID: req.body.ProductID }, { $inc: { Stock: req.body.Quantity } });
    const newItem = await stocks.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật
app.put("/api/stocks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const oldStock = await Stock.findOne({ StockID: req.body.StockID });
    const changeStock = req.body.Quantity - oldStock.Quantity;
    await Product.findOneAndUpdate({ ProductID: req.body.ProductID }, { $inc: { Stock: changeStock } });
    const updateItem = await Stock.findOneAndUpdate({ StockID: id }, req.body, { new: true, runValidators: true });
    if (!updateItem) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updateItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa
app.delete("/api/stocks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const oldStock = await Stock.findOne({ StockID: id });
    await Product.findOneAndUpdate({ ProductID: oldStock.ProductID }, { $inc: { Stock: -oldStock.Quantity } });
    await Stock.findOneAndDelete({ StockID: id });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const Bill = require("./billMoldel");
// Get
app.get("/api/bills", async (req, res) => {
  try {
    const Bills = await Bill.find();
    res.json(Bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm
app.post("/api/bills", async (req, res) => {
  const bill = new Bill({
    BillID: req.body.BillID,
    Name: req.body.Name,
    PhoneNumber: req.body.PhoneNumber,
    Location: req.body.Location,
    Address: req.body.Address,
    Date: req.body.Date,
    Time: req.body.Time,
    Payment: req.body.Payment,
    Note: req.body.Note,
    CompanyName: req.body.CompanyName,
    Email: req.body.Email,
    TaxCode: req.body.TaxCode,
    CompanyAddress: req.body.CompanyAddress,
    totalCart: req.body.totalCart,
    totalPresent: req.body.totalPresent,
    ShipCost: req.body.ShipCost,
    totalReduce: req.body.totalReduce,
    totalCost: req.body.totalCost,
    Status: req.body.Status,
  });

  try {
    const newItem = await bill.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật
app.put("/api/bills/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateItem = await Bill.findOneAndUpdate({ BillID: id }, req.body, { new: true, runValidators: true });
    if (!updateItem) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(updateItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa
app.delete("/api/bills/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Bill.findOneAndDelete({ BillID: id });
    res.json({ message: " deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const DetailBill = require("./detailBillModel");

app.get("/api/detailbill", async (req, res) => {
  try {
    const stocks = await DetailBill.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm
app.post("/api/detailbill", async (req, res) => {
  const stocks = new DetailBill({
    BillID: req.body.BillID,
    ProductID: req.body.ProductID,
    Quantity: req.body.Quantity,
  });

  try {
    await Product.findOneAndUpdate({ ProductID: req.body.ProductID }, { $inc: { Stock: -req.body.Quantity } });
    const newItem = await stocks.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//
app.put("/api/detailbill/:billID/:productID", async (req, res) => {
  const { billID, productID } = req.params;
  try {
    const oldStock = await DetailBill.findOne({ BillID: billID, ProductID: productID });
    const changeStock = req.body.Quantity - oldStock.Quantity;
    await Product.findOneAndUpdate({ ProductID: productID }, { $inc: { Stock: -changeStock } });
    const updated = await DetailBill.findOneAndUpdate({ BillID: billID, ProductID: productID }, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//
app.delete("/api/detailbill/:billID/:productID", async (req, res) => {
  const { billID, productID } = req.params;
  try {
    const oldStock = await DetailBill.findOne({ BillID: billID, ProductID: productID });
    await Product.findOneAndUpdate({ ProductID: productID }, { $inc: { Stock: oldStock.Quantity } });
    await DetailBill.findOneAndDelete({ BillID: billID, ProductID: productID });
    res.json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
