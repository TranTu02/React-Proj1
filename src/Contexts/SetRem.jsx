import React, { useEffect } from "react";
import { initializeData } from "../Components/Assets/data";
import style from "./Rem.module.css";

const SetRem = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const setRemValue = () => {
        const screenWidth = window.innerWidth;
        var remValue = (1 / 1920) * screenWidth;
        if (remValue < 0.8) remValue = 0.7;
        document.documentElement.style.fontSize = remValue + "px";
      };

      // Gọi hàm setRemValue một lần khi trang được tải lên
      setRemValue();

      // Gọi hàm setRemValue mỗi khi kích thước màn hình thay đổi
      window.addEventListener("resize", setRemValue);

      // Cleanup: loại bỏ event listener khi component bị unmounted
      return () => {
        window.removeEventListener("resize", setRemValue);
      };
    }
  }, []);

  return <div className={style.overlay}></div>;
};

export default SetRem;
