import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink, withRouter, Link } from 'react-router-dom'

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
          <Link to ="/">
           <img src="/images/ukn_logo2.png" alt="ukn_logo" />
          </Link>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[this.props.history.location.pathname]}>
          <SubMenu key="/contracts" title={<span><Icon type="file-text"/><span>Заявления</span></span>}>
            <Menu.Item key="/contracts">
              <NavLink exact={true} to="/contracts" activeClassName="active">
                <Icon type="file-text" />
                <span>Все заявления</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/contracts/create">
              <NavLink exact={true} to="/contracts/create" activeClassName="active">
                <Icon type="file-add" />
                <span>Создать заявление</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="/users" title={<span><Icon type="team"/><span>Сотрудники</span></span>}>
            <Menu.Item key="/users/create">
              <NavLink exact={true} to="/users/create" activeClassName="active">
                <Icon type="user-add" />
                <span>Добавить</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/users">
              <NavLink exact={true} to="/users" activeClassName="active">
                <Icon type="team" />
                <span>Все Сотрудники</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="/customers" title={<span><Icon type="solution"/><span>Клиенты</span></span>}>
            <Menu.Item key="/customers/createcustomer">
              <NavLink to="/customers/createcustomer"  activeClassName="active">
                <Icon type="usergroup-add" />
                <span>Добавить</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/customers">
              <NavLink to="/customers"  activeClassName="active">
                <Icon type="solution" theme="outlined" />
                <span>Все клиенты</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub1" title={<span><Icon type="setting"/><span>Настройки</span></span>}>
            <Menu.Item>
              <NavLink to="/settings"  activeClassName="active">
                <Icon type="setting" theme="outlined" />
                <span>Все</span>
              </NavLink>
            </Menu.Item>
            {/*<Menu.Item key="sub1_2">
              <Icon type="exception"/>
              Статусы
            </Menu.Item>
            <Menu.Item key="sub1_3">
              <Icon type="file-unknown"/>
              Виды заявлений
            </Menu.Item>*/}
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(LeftMenu);