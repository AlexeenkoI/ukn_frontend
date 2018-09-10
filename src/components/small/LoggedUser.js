import React, { Component } from 'react'
import { Avatar, Menu, Dropdown, Icon, Modal } from 'antd'


class LoggedUser extends Component{
    constructor(props){
        super(props);
        this.state = {isModalOn: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(state => ({
            isModalOn: !state.isModalOn
        }));
      }

    render(){
        const dropDownMenu = (
        <Menu>
            <Menu.Item>
                <span onClick={this.handleClick}><Icon type="setting"/> Настройки</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={this.props.logOut}><Icon type="logout" /> Выход</span>
            </Menu.Item>
        </Menu>

        )

        return(
            <div>
                <Avatar icon="user" size={30} shape="circle" />
                <span style={{padding:'10px'}}>{`${this.props.user.name} ${this.props.user.surename}`}</span>
                <Dropdown overlay={dropDownMenu}  trigger={['click']}>
                <a className="ant-dropdown-link">
                  действия <Icon type="down" />
                </a>
                </Dropdown>
                <Modal
                 footer={false}
                 visible={this.state.isModalOn}
                 onCancel={this.handleClick}
                 >
                    test content...
                </Modal>
            </div>
        )
    }
}

export default LoggedUser;