import React from "react";
import SlideShow from "./SlideShow";
import { listBanner } from "../Assets/data";

function App() {
  let listBannerDisplay = listBanner.sort((a, b) => b.Order - a.Order).slice(0, 5);
  return (
    <div>
      <SlideShow images={listBannerDisplay} />
    </div>
  );
}

export default App;
