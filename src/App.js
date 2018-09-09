import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';

import MainOffice from './components/MainOffice';
import './App.css';
import './styles/animate.css';

class App extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <LocaleProvider locale={ru_RU}>
        <MainOffice/>
      </LocaleProvider>
    );
  }
}

export default App;


// ukn_backend npm start
//ukn_frontend npm start
