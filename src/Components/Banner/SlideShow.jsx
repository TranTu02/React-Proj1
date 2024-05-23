import React, { useState, useEffect } from "react";
import SlideImage from "./SlideImage";
import style from "./SlideShow.module.css"; // Import CSS file for styling

const SlideShow = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(prevIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentSlide, images.length]);

  return (
    <div className={style.Banner}>
      <div className={style.SlideShowContainer}>
        <div className={style.Prev} onClick={prevSlide}>
          &#10094;
        </div>
        <div className={style.Next} onClick={nextSlide}>
          &#10095;
        </div>
        {images.map((image, index) => (
          <SlideImage
            className={style.ImgBanner}
            key={index}
            src={image.ImgSrc}
            Other={image.Other}
            CategoryID={image.CategoryID}
            BrandID={image.BrandID}
            ProductTypeID={image.ProductTypeID}
            styleImg={{ display: index === currentSlide ? "block" : "none" }}
          />
        ))}
        <div className={style.BtnSlideContainer}>
          {images.map((image, index) => (
            <div className={style.BtnSlide} key={index} onClick={() => setCurrentSlide(index)} style={{ backgroundColor: index === currentSlide ? "#000000" : "#FFFFFF" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
