import React from 'react';
import { Spin } from 'antd';

const Preloader = () =>{
    return (
        <div className="preloadSpinner">
            <Spin size="large"/>
        </div>
    )
}

export default Preloader;