import React, { useRef, useState } from "react";
import style from "./Admin.module.css";
import { listBill, listDetailBill, listCategories, listBrand, listStock, listProducts, ListProductsDetail, listDiscountProduct, listSaleEvents } from "../Assets/data"; // Import dữ liệu từ tệp data

import BarChart from "./BarChart"; // Import thành phần biểu đồ

export const AdminStatistical = () => {
  let formatter = new Intl.NumberFormat("en-US");
  const [displayChart, setDisplayChart] = useState(true);
  let revenueMonth = [];
  let monthPrev = [];
  let dataTemplate = [];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDatasheet, setSelectedDataSheet] = useState("product");
  const refM = useRef("");
  const refY = useRef("");
  const refEM = useRef("");
  const refEY = useRef("");
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };
  const handleDatasheetChange = (event) => {
    setSelectedDataSheet(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const handleMChange = (event) => {
    refM.current.value = event.target.value;
  };
  const handleYChange = (event) => {
    refY.current.value = event.target.value;
  };
  const handleEMChange = (event) => {
    refEM.current.value = event.target.value;
  };
  const handleEYChange = (event) => {
    refEY.current.value = event.target.value;
  };

  const getPreviousMonths = () => {
    const month = parseInt(refM.current.value === undefined ? 0 : refM.current.value.trim());
    const year = parseInt(refY.current.value === undefined ? 0 : refY.current.value.trim());
    const monthE = parseInt(refEM.current.value === undefined ? 0 : refEM.current.value.trim());
    const yearE = parseInt(refEY.current.value === undefined ? 0 : refEY.current.value.trim());

    const totalMonth = monthE + (yearE - year) * 12 - month;

    const currentDate = new Date();
    const months = [];

    // Lấy tháng và năm hiện tại
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    if (totalMonth > 0) {
      currentMonth = monthE;
      currentYear = yearE;
    }

    let monthFor = totalMonth > 0 ? totalMonth : 12;
    // Lặp qua tháng trước đó
    for (let i = 0; i < monthFor; i++) {
      months.push({
        month: currentMonth,
        year: currentYear,
      });
      currentMonth--;

      if (currentMonth === 0) {
        currentMonth = 12;
        currentYear--;
      }
    }

    return months;
  };
  const months = getPreviousMonths();

  if (selectedDatasheet === "product") {
    dataTemplate = [];
    listProducts.map((obj) => dataTemplate.push({ ProductID: obj.ProductID, Revenue: 0, StockCost: 0, Sold: 0, StockQuantity: 0, Inventory: 0 }));
  } else if (selectedDatasheet === "category") {
    dataTemplate = [];
    listCategories.map((obj) => dataTemplate.push({ CategoryID: obj.CategoryID, Revenue: 0, StockCost: 0, Sold: 0, StockQuantity: 0, Inventory: 0 }));
  } else {
    dataTemplate = [];
    listBrand.map((obj) => dataTemplate.push({ BrandID: obj.BrandID, Revenue: 0, StockCost: 0, Sold: 0, StockQuantity: 0, Inventory: 0 }));
  }
  months.forEach((month) => {
    let totalMonth = 0;
    listBill.forEach((obj) => {
      const billDate = obj.Date.split("-");
      // Lay nhung bill trong thoi gian duoc chon
      if (parseInt(billDate[1]) === month.month && parseInt(billDate[0]) === month.year) {
        // loc dieu kien cho du lieu bieu do
        if (selectedBrand === "" && selectedCategory === "") {
          totalMonth += obj.totalCost;
        } else if (selectedBrand !== "" && selectedCategory === "") {
          const filltered = listDetailBill.filter((dtb) => dtb.BillID === obj.BillID && listProducts.find((prd) => prd.ProductID === dtb.ProductID).BrandID === parseInt(selectedBrand));
          filltered.forEach((item) => {
            let prd = ListProductsDetail().find((prd) => prd.ProductID === item.ProductID);
            if (prd.Reduce !== undefined) {
              totalMonth += prd.Price * (1 - prd.Reduce) * item.Quantity;
            } else {
              totalMonth += prd.Price * item.Quantity;
            }
          });
        } else if (selectedBrand === "" && selectedCategory !== "") {
          const filltered = listDetailBill.filter((dtb) => dtb.BillID === obj.BillID && listProducts.find((prd) => prd.ProductID === dtb.ProductID).CategoryID === parseInt(selectedCategory));
          filltered.forEach((item) => {
            let prd = ListProductsDetail().find((prd) => prd.ProductID === item.ProductID);
            if (prd.Reduce !== undefined) {
              totalMonth += prd.Price * (1 - prd.Reduce) * item.Quantity;
            } else {
              totalMonth += prd.Price * item.Quantity;
            }
          });
        } else {
          const filltered = listDetailBill.filter(
            (dtb) =>
              dtb.BillID === obj.BillID &&
              listProducts.find((prd) => prd.ProductID === dtb.ProductID).CategoryID === parseInt(selectedCategory) &&
              listProducts.find((prd) => prd.ProductID === dtb.ProductID).BrandID === parseInt(selectedBrand)
          );
          filltered.forEach((item) => {
            let prd = ListProductsDetail().find((prd) => prd.ProductID === item.ProductID);
            if (prd.Reduce !== undefined) {
              totalMonth += prd.Price * (1 - prd.Reduce) * item.Quantity;
            } else {
              totalMonth += prd.Price * item.Quantity;
            }
          });
        }
      }
    });
    revenueMonth.unshift(totalMonth);
    monthPrev.unshift(month.month + "/" + month.year);
  });
  const data = [];
  for (let i = 0; i < revenueMonth.length; i++) {
    data.push({ month: monthPrev[i], revenue: revenueMonth[i] });
  }

  let quantityMonth = [];
  months.forEach((month) => {
    let totalMonth = 0;
    listBill.forEach((obj) => {
      const billDate = obj.Date.split("-");
      if (parseInt(billDate[1]) === month.month && parseInt(billDate[0]) === month.year) {
        listDetailBill.forEach((bill) => {
          if (obj.BillID === bill.BillID) {
            totalMonth += bill.Quantity;
          }
        });
      }
    });
    quantityMonth.unshift(totalMonth);
  });

  const data2 = [];
  for (let i = 0; i < quantityMonth.length; i++) {
    data2.push({ month: monthPrev[i], revenue: quantityMonth[i] });
  }

  let stockMonth = [];
  let stockCostMonth = [];
  let stockQuantityMonth = [];
  let totalIventory = 0;
  let monthAsc = [];
  months.forEach((month) => monthAsc.unshift(month));
  monthAsc.forEach((month) => {
    let totalCost = 0;
    let totalQuantity = 0;
    listBill.forEach((obj) => {
      const billDate = obj.Date.split("-");
      if (parseInt(billDate[1]) === month.month && parseInt(billDate[0]) === month.year) {
        listDetailBill.forEach((bill) => {
          const currDate = new Date(month.year, month.month - 1, parseInt(billDate[2]));
          const listSale = listSaleEvents.filter((obj) => new Date(obj.End) >= currDate && new Date(obj.Start <= currDate));
          let reduce = 0;
          listSale.forEach((sale) => {
            if (listDiscountProduct.find((discount) => discount.ProductID === bill.ProductID && discount.DiscountID === sale.DiscountID) !== undefined)
              reduce = listDiscountProduct.find((discount) => discount.ProductID === bill.ProductID && discount.DiscountID === sale.DiscountID).Reduce;
          });
          //Du lieu cho bang
          if (selectedDatasheet === "product") {
            dataTemplate.find((obj) => obj.ProductID === bill.ProductID).Sold += bill.Quantity;
            dataTemplate.find((obj) => obj.ProductID === bill.ProductID).Inventory -= bill.Quantity;
            dataTemplate.find((obj) => obj.ProductID === bill.ProductID).Revenue += bill.Quantity * listProducts.find((prd) => prd.ProductID === bill.ProductID).Price * (1 - reduce);
          } else if (selectedDatasheet === "category" && listProducts.find((prd) => prd.ProductID === bill.ProductID).CategoryID !== undefined) {
            dataTemplate.find((obj) => obj.CategoryID === listProducts.find((prd) => prd.ProductID === bill.ProductID).CategoryID).Sold += bill.Quantity;
            dataTemplate.find((obj) => obj.CategoryID === listProducts.find((prd) => prd.ProductID === bill.ProductID).CategoryID).Inventory -= bill.Quantity;
            dataTemplate.find((obj) => obj.CategoryID === listProducts.find((prd) => prd.ProductID === bill.ProductID).CategoryID).Revenue +=
              bill.Quantity * listProducts.find((prd) => prd.ProductID === bill.ProductID).Price * (1 - reduce);
          } else if (listProducts.find((prd) => prd.ProductID === bill.ProductID) !== undefined) {
            dataTemplate.find((obj) => obj.BrandID === listProducts.find((prd) => prd.ProductID === bill.ProductID).BrandID).Sold += bill.Quantity;
            dataTemplate.find((obj) => obj.BrandID === listProducts.find((prd) => prd.ProductID === bill.ProductID).BrandID).Inventory -= bill.Quantity;
            dataTemplate.find((obj) => obj.BrandID === listProducts.find((prd) => prd.ProductID === bill.ProductID).BrandID).Revenue +=
              bill.Quantity * listProducts.find((prd) => prd.ProductID === bill.ProductID).Price * (1 - reduce);
          }
          //du lieu cho bieu do
          if (obj.BillID === bill.BillID) {
            totalIventory = totalIventory - bill.Quantity;
          }
        });
      }
    });
    listStock.forEach((stock) => {
      const stockDate = stock.Date.toString().split("-");
      if (parseInt(stockDate[1]) === month.month && parseInt(stockDate[0]) === month.year) {
        //Du lieu cho bang
        if (selectedDatasheet === "product") {
          dataTemplate.find((obj) => obj.ProductID === stock.ProductID).StockQuantity += stock.Quantity;
          dataTemplate.find((obj) => obj.ProductID === stock.ProductID).StockCost += stock.Cost;
        } else if (selectedDatasheet === "category" && listProducts.find((prd) => prd.ProductID === stock.ProductID).CategoryID !== undefined) {
          dataTemplate.find((obj) => obj.CategoryID === listProducts.find((prd) => prd.ProductID === stock.ProductID).CategoryID).StockQuantity += stock.Quantity;
          dataTemplate.find((obj) => obj.CategoryID === listProducts.find((prd) => prd.ProductID === stock.ProductID).CategoryID).StockCost += stock.Cost;
        } else if (listProducts.find((prd) => prd.ProductID === stock.ProductID) !== undefined) {
          dataTemplate.find((obj) => obj.BrandID === listProducts.find((prd) => prd.ProductID === stock.ProductID).BrandID).StockQuantity += stock.Quantity;
          dataTemplate.find((obj) => obj.BrandID === listProducts.find((prd) => prd.ProductID === stock.ProductID).BrandID).StockCost += stock.Cost;
        }
        // Du lieu cho bieu do
        totalIventory += stock.Quantity;
        totalCost += stock.Cost;
        totalQuantity += stock.Quantity;
      }
    });
    stockCostMonth.push(totalCost);
    stockQuantityMonth.push(totalQuantity);
    stockMonth.push(totalIventory);
  });
  const data3 = [];
  for (let i = 0; i < stockMonth.length; i++) {
    data3.push({ month: monthPrev[i], revenue: stockMonth[i] });
  }

  const dataSheet = () => {
    let rows = [];
    for (let i = 0; i < months.length; i++) {
      rows.unshift({
        month: monthAsc[i].month,
        year: monthAsc[i].year,
        revenue: data[i].revenue,
        stockCost: stockCostMonth[i],
        sold: data2[i].revenue,
        stockQuantity: stockQuantityMonth[i],
        inventory: data3[i].revenue,
      });
    }
    return rows;
  };
  const dataFilter = () => {
    let rows = [];
    for (let i = 0; i < dataTemplate.length; i++) {
      const tagName = dataTemplate[i].ProductID !== undefined ? dataTemplate[i].ProductID : dataTemplate[i].CategoryID !== undefined ? dataTemplate[i].CategoryID : dataTemplate[i].BrandID;
      rows.unshift({
        tag: tagName,
        revenue: dataTemplate[i].Revenue,
        stockCost: dataTemplate[i].StockCost,
        sold: dataTemplate[i].Sold,
        stockQuantity: dataTemplate[i].StockQuantity,
        inventory: dataTemplate[i].StockQuantity - dataTemplate[i].Sold,
      });
    }
    return rows;
  };
  const handleChart = () => {
    switch (selectedType) {
      case "sold":
        setDisplayChart(
          <>
            <h3>Số sản phẩm bán được hàng tháng</h3>
            <BarChart data={data2} />
          </>
        );
        break;
      case "revenue":
        setDisplayChart(
          <>
            <h3>Doanh số hàng tháng</h3>
            <BarChart data={data} />
          </>
        );
        break;
      case "inventory":
        setDisplayChart(
          <>
            <h3>Tồn kho hàng tháng</h3>
            <BarChart data={data3} />
          </>
        );
        break;
      default:
        setDisplayChart(
          <>
            <h3>Doanh số hàng tháng</h3>
            <BarChart data={data} />
            <h3>Số sản phẩm bán được hàng tháng</h3>
            <BarChart data={data2} />
            <h3>Tồn kho hàng tháng</h3>
            <BarChart data={data3} />
          </>
        );
    }
  };
  const [dataSort, setDataSort] = useState();
  const filterTag = useRef("");
  const handleLowest = () => {
    filterTag.current = selectedDatasheet;
    if (selectedType === "sold") {
      setDataSort(dataFilter().sort((a, b) => a.sold - b.sold));
    } else if (selectedType === "inventory") {
      setDataSort(dataFilter().sort((a, b) => a.inventory - b.inventory));
    } else {
      setDataSort(dataFilter().sort((a, b) => a.revenue - b.revenue));
    }
    setDisplayChart(false);
  };
  const handleHighest = () => {
    filterTag.current = selectedDatasheet;
    if (selectedType === "sold") {
      setDataSort(dataFilter().sort((a, b) => b.sold - a.sold));
    } else if (selectedType === "inventory") {
      setDataSort(dataFilter().sort((a, b) => b.inventory - a.inventory));
    } else {
      setDataSort(dataFilter().sort((a, b) => b.revenue - a.revenue));
    }
    setDisplayChart(false);
  };
  return (
    <div className={style.ProductManage}>
      <h2>Thống kê</h2>
      <table>
        <thead>
          <th>Start</th>
          <th>End</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Type (Chart, Datasheet)</th>
          <th>Filter (Datasheet only)</th>
        </thead>
        <tbody>
          <td>
            <div className={style.Date}>
              <h4>Tháng</h4>
              <input type="text" ref={refM} onChange={handleMChange} />
            </div>
            <div className={style.Date}>
              <h4>Năm</h4>
              <input type="text" ref={refY} onChange={handleYChange} />
            </div>
          </td>
          <td>
            <div className={style.Date}>
              <h4>Tháng</h4>
              <input type="text" ref={refEM} onChange={handleEMChange} />
            </div>
            <div className={style.Date}>
              <h4>Năm</h4>
              <input type="text" ref={refEY} onChange={handleEYChange} />
            </div>
          </td>
          <td>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value={""}>Default</option>
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
            <select value={selectedBrand} onChange={handleBrandChange}>
              <option value={""}>Default</option>
              {listBrand.map((brand) => (
                <option key={brand.BrandID} value={brand.BrandID}>
                  {brand.BrandName}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select value={selectedType} onChange={handleTypeChange}>
              <option value={"all"}>All</option>
              <option value={"sold"}>Sold</option>
              <option value={"inventory"}>Inventory</option>
              <option value={"revenue"}>Revenue</option>
            </select>
          </td>
          <td>
            <select value={selectedDatasheet} onChange={handleDatasheetChange}>
              <option value={"product"}>Product</option>
              <option value={"category"}>Category</option>
              <option value={"brand"}>Brand</option>
            </select>
          </td>
        </tbody>
      </table>
      <div className={style.Action}>
        <button onClick={handleChart}>Xuất biểu đồ</button>
        <button onClick={handleLowest}>Bảng tăng dần</button>
        <button onClick={handleHighest}>Bảng giảm dần</button>
      </div>
      {displayChart}

      <h3>Bảng dữ liệu</h3>
      {displayChart !== false ? (
        <table>
          <thead>
            <th>Tháng</th>
            <th>Năm</th>
            <th>Doanh số</th>
            <th>Giá trị nhập</th>
            <th>Số lượng bán</th>
            <th>Số lượng nhập</th>
            <th>Tồn kho</th>
          </thead>
          <tbody>
            {dataSheet().map((item) => (
              <tr>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>{formatter.format(item.revenue)}</td>
                <td>{formatter.format(item.stockCost)}</td>
                <td>{item.sold}</td>
                <td>{item.stockQuantity}</td>
                <td>{item.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <th style={{ width: "150rem" }}>{filterTag.current === "product" ? "Mã sản phẩm" : filterTag.current === "category" ? "Mã danh mục" : "Mã thương hiệu"}</th>
            <th>Doanh số</th>
            <th>Giá trị nhập</th>
            <th>Số lượng bán</th>
            <th>Số lượng nhập</th>
            <th>Tồn kho</th>
          </thead>
          <tbody>
            {dataSort.map((item) => (
              <tr>
                <td>{item.tag}</td>
                <td>{formatter.format(item.revenue)}</td>
                <td>{formatter.format(item.stockCost)}</td>
                <td>{item.sold}</td>
                <td>{item.stockQuantity}</td>
                <td>{item.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
