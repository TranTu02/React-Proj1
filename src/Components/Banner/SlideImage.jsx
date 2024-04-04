import React from 'react';
import style from './SlideShow.module.css'; // Import CSS file for styling

const SlideImage = ({ src, styleImg }) => {
  return (
    <img className={style.ImgBanner} src={src} style={styleImg}  />
  );
}

export default SlideImage;
