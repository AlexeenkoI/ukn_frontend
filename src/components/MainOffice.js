import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import openSocket from 'socket.io-client';

import AuthWindow from './AuthWindow'
import WorkSheet from './WorkSheet'
import LeftMenu from './LeftMenu'
import UsersList from './UsersList'

import 'antd/dist/antd.css';
import { Layout, Icon } from 'antd'

const { Header, Content } = Layout;
const socket = openSocket('http://localhost:3002');

class MainOffice extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogged : false,
            collapsed : false
        }
    }

    tryToLogin = (data) => {
        console.log("recieving in mainOffice ");
        console.log(data);
        this.setState({
            isLogged:true
        }
        );
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    componentWillMount(){
        socket.on('testEvent',(res)=>{
            console.log('hey hey im socket event');
            console.dir(res);
            //dispatch(initialItems(res))
        })
    }

    componentWillUnmount() {
        socket.disconnect();
        console.log("Disconnecting Socket as component will unmount");
    }


    render(){
        return(
            this.props.currentUser.loggedIn ?
            (<Layout className="mainContainer">
                <LeftMenu collapsed={this.state.collapsed}/>
                <Layout>
                  <Header className="header" style={{ background: '#fff', padding: 0 }}>
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                      style={{ fontSize: 20, marginLeft:15,cursor:"pointer"}}
                    />
                  </Header>
                  <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <Switch>
                        <Route exact path="/" component={WorkSheet}/>
                        <Route exact path="/users-list" component={UsersList}/>
                    </Switch>
                  </Content>
                </Layout>
              </Layout>) :
            <AuthWindow login={this.tryToLogin}/>
        )
    }
}

const mapStateToProps = store =>{
    return {
        currentUser : store.user,
        contracts : store.contracts
    }
}

export default withRouter(connect(mapStateToProps)(MainOffice));
