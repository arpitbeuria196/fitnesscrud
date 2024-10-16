import React from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import { backGroundImgMainC } from '../utils/Constants';

const Browse = () => {
  return (
    <div>
      <Header/>
      <img src= {backGroundImgMainC} className='absolute -z-10 '/>
      <MainContainer/>
    </div>
  )
}

export default Browse
