import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import openSocket from 'socket.io-client';

import AuthWindow from './AuthWindow'
import WorkSheet from './WorkSheet'
import LeftMenu from './LeftMenu'
import UsersList from './UsersList'
import LoggedUser from './small/LoggedUser'
import Notificator from './small/Notificator'
import CustomersList from './CustomersList'
import CreateContractForm from './forms/CreateContractForm'
import CustomerEdit from './forms/CustomerEdit'
import NotMatch from './NotMatch';
import HomePage from './HomePage';
import TopCrumbs from './TopCrumbs';

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
        const { currentUser } = this.props;

        if(currentUser.loggedIn == false){
            return (
                <Fragment>
                    { this.props.location.pathname !=="/login" && <Redirect to="/login"/>}
                    <Route path="/login" component={AuthWindow}></Route>
                </Fragment>
            )
        }
        
        return(
            
            <Layout className="mainContainer">
                <LeftMenu collapsed={this.state.collapsed}/>
                <Layout>
                  <Header className="header" style={{ background: '#fff', padding: 0 }}>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
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
                        <Col style={{marginRight:'15px'}}>
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
                    <div style={{padding:'15px'}}>
                        <TopCrumbs/>
                    </div>
                    <Switch>
                        {/* Пока главной страницы нет, редиректим с главной на /contracts а с /login на главную */}
                        <Redirect from ="/login" to="/"/>
                        <Redirect exact from="/" to="/contracts" />
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/contracts" component={WorkSheet} />
                        <Route path="/contracts/create" component={CreateContractForm} />
                        <Route exact path="/users" component={UsersList}/>
                        <Route exact path="/customers" component={CustomersList}/>
                        <Route exact path="/customers/edit/:id" component={CustomerEdit} />
                        <Route component={NotMatch} />
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
                
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
