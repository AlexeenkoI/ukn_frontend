import React, { Component } from 'react'
import { Table, Drawer, Checkbox, Divider  } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import UsersForm from './usersList/UsersForm'
import { getUserList } from '../actions/UserListActions'

const data = [{
    id : 1,
    is_active : 1,
    name : 'Игорь',
    surename : 'Алексеенко',
    position : 'Инженер'
}]

class UsersList extends Component{
    constructor(props){
        super(props)
        this.state = {
            is_active : 1,
            visible:false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    toggleDrawer = () =>{
        this.setState({
            visible:!this.state.visible
        })
    }

    componentWillMount(){
        this.props.getUserList(this.props.user.id);
    }

    render(){
        const columns = [
        {
            title : 'Активность',
            dataIndex : 'is_active',
            key : 'is_active',
            render : (text,record) => (
                <Checkbox checked={true} checked={this.state.is_active} />
            )
        },
        {
            title : 'Имя',
            key : 'name',
            dataIndex : 'name',
        },
        {
            title : 'Фамилия',
            dataIndex : 'surename',
            key : 'surename'
        },
        {
            title : 'Должность',
            dataIndex : 'position',
            key : 'position'
        },
        {
            title : 'Действия',
            key : 'Action',
            render : (text,record) => (
                <a onClick={this.toggleDrawer}>Редактировать</a>
            )
        }]
        return(
            <div>
                <Table  
                    rowKey="id" 
                    columns={columns} 
                    dataSource={this.props.userList.data}
                    pagination={false}
                    loading={this.props.userList.isLoading}
                />
                <Drawer
                    width="640"
                    placement="right"
                    closable={true}
                    onClose={this.toggleDrawer}
                    visible={this.state.visible}
                >
                <div>
                    <p>Контент</p>
                </div>
                <Divider/>
                <div>
                    <UsersForm/>
                </div>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = store =>{
    return {
      user : store.user,
      userList : store.userList
    }
  }

const mapDispatchToProps = dispatch =>({
    getUserList : (id) => dispatch(getUserList(id)),
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UsersList));
//export default UsersList;