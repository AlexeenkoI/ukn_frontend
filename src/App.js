import React, { Component } from 'react';

import MainOffice from './components/MainOffice';
import './App.css';
import './styles/animate.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {users: []}
    this.fetchClick = this.fetchClick.bind(this);
  }
  
  
  componentDidMount() {
    //fetch('/users')
    //  .then(res => res.json())
    //  .then(res =>{ this.setState({ users:res })});
  }

  fetchClick(){
    //console.log('click');
    //fetch('/users')
    //.then(res => res.json())
    //.then(res =>{ this.setState({ users:res }) });
  }
  
  render() {
    return (
        <MainOffice/>
    );
  }
}

export default App;


// ukn_backend npm start
//ukn_frontend npm start
