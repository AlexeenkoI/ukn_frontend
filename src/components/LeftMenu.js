import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import {NavLink} from 'react-router-dom'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class LeftMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed : false
        }
    }

    render(){
        return(
          <Sider
            trigger={null}
            collapsible
            collapsed={this.props.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
              <NavLink to="/" activeClassName="active"><Icon type="user" />
                <span>Заявления</span></NavLink>
              </Menu.Item>
              <Menu.Item key="2">
              <NavLink to="/users-list" activeClassName="active">
                <Icon type="video-camera" />
                <span>Сотрудники</span></NavLink>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Заявления(Админ)</span></span>}>
              <Menu.Item key="5" >Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            </Menu>
          </Sider>
        )
    }
}

export default LeftMenu;