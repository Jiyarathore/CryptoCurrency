import React from 'react';
import "./SliderPage.css";
import Carousel from './Carousel';

function SliderPage() {
  return (
    <div className='slide'>
    <div className='heading'>CryptoVerse</div>
    <div className='info'>Get all info regarding your favorite Crypto Currency</div>
    <Carousel/>
</div>
  )
}

export default SliderPage