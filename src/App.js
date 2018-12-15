import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';

import MainOffice from './components/MainOffice';
import './App.css';
import './styles/animate.css';

/**
 * Здесь подключается Локальный провайдер Ru-ru для Antd
 */

class App extends Component {
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
