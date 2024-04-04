import React from 'react';
import SlideShow from './SlideShow';
import '../Assets/add1.jpg';
import '../Assets/add2.png';

function App() {
  const images = [
    {src: require('../Assets/add1.jpg')},
    {src: require('../Assets/add2.png')}
  ];

  return (
    <div >
        <SlideShow images={images} />
    </div>
  );
}

export default App;
