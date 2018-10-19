import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import openSocket from 'socket.io-client';

import AuthWindow from './AuthWindow'
import WorkSheet from './WorkSheet'
import LeftMenu from './LeftMenu'
import UsersList from './UsersList'
import LoggedUser from './small/LoggedUser'
import Notificator from './small/Notificator'

import { logout } from '../actions/LoginActions'
import { recieveContractNotification } from '../actions/NotificationsActions'
import { getUser, updatedUser } from '../actions/UserListActions'

import 'antd/dist/antd.css';
import { Layout, Icon, Row, Col } from 'antd'

const { Header, Content } = Layout;
const socket = openSocket('http://localhost:3002');


/**
 * Точка входа и роутинга в основные компоненты
 */
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
        socket.on('updateContracts',(res)=>{
            console.log('hey hey im socket event');
            console.log(res);
            this.props.recieveContractNotification(res);
            //dispatch(initialItems(res))
        })
    }

    componentWillUnmount() {
        socket.disconnect();
        console.log("Disconnecting Socket as component will unmount");
    }

    handleProfileSubmit = values => {
        this.props.changeProfileData(this.props.currentUser.id, values);
    }


    render(){
        return(
            this.props.currentUser.loggedIn ?
            (<Layout className="mainContainer">
                <LeftMenu collapsed={this.state.collapsed}/>
                <Layout>
                  <Header className="header" style={{ background: '#fff', padding: 0 }}>
                  <Row type="flex" align="middle">
                  <Col span={3}>
                    <div>
                        <span className="badge-info ant-badge">
                            <Icon
                              className="trigger"
                              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                              onClick={this.toggle}
                              style={{ fontSize: 22, marginLeft:15,cursor:"pointer"}}
                            />
                        </span>
                        <Notificator notifications={this.props.notifications.contractsNotifications}/>
                    </div>
                    </Col>
                        <Col span={3} offset={18}>
                            <LoggedUser
                             user={this.props.currentUser}
                             logOut={this.props.logout}
                             loadProfile={this.props.getProfileData}
                             onSubmit={this.handleProfileSubmit}
                             ownProfile = {this.props.userProfile}
                             isLoading = {this.props.isLoadingProfile}
                             />
                        </Col>
                        </Row>
                  </Header>
                  <Content style={{ margin: '24px 16px 16px 24px', padding: 24, background: '#fff' }}>
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
        contracts : store.contracts,
        notifications : store.notifications,
        isLoadingProfile : store.userList.userIsLoading,
        userProfile : store.userList.currentUserData
    }
}

const mapDispatchToProps = dispatch => ({
    logout : () => dispatch(logout()),
    recieveContractNotification : (data) => dispatch(recieveContractNotification(data)),
    getProfileData : (userId, profileId) => dispatch(getUser(userId, profileId)),
    changeProfileData : (userId, formData) => dispatch(updatedUser(userId, formData))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainOffice));
