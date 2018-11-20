import React from 'react';
import { Spin } from 'antd';

function Preloader(){
  return (
    <div className="preloadSpinner">
      <Spin size="large"/>
    </div>
  )
}

export default Preloader;