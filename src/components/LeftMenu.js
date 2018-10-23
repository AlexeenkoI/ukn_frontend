import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { hashHistory } from 'react-router'
import { NavLink, withRouter } from 'react-router-dom'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class LeftMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed : false,
        }
    }

    render(){
        return(
          <Sider
            trigger={null}
            collapsible
            collapsed={this.props.collapsed}
          >
            <div className="logo" >
              <img src="/images/ukn_logo2.png" />
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[this.props.history.location.pathname]}>
              <Menu.Item key="/">
                <NavLink exact={true} to="/" activeClassName="active">
                  <Icon type="file-text" />
                  <span>Заявления</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/users-list">
                <NavLink exact={true} to="/users-list" activeClassName="active">
                  <Icon type="team" />
                  <span>Сотрудники</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/customers-list">
              <NavLink to="/customers-list"  activeClassName="active">
                <Icon type="solution" theme="outlined" />
                <span>Клиенты</span>
              </NavLink>
            </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="setting"/><span>Настройки</span></span>}>
                <Menu.Item key="sub1_2">
                  <Icon type="exception"/>
                  Статусы
                </Menu.Item>
                <Menu.Item key="sub1_3">
                  <Icon type="file-unknown"/>
                  Виды заявлений
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        )
    }
}

export default withRouter(LeftMenu);