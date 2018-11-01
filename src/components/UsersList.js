import React, { Component, Fragment } from 'react'
import { Table, Drawer, Checkbox, Divider, Spin, Row, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import UserEdit from '../components/forms/UserEdit'
import { getUserList, getUser, updatedUser, deleteUser, clearForm } from '../actions/UserListActions'

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
            visible:false,
            needToRedirect : false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    toggleDrawer = incId =>{
        this.setState({
            visible: true
        })
        this.props.getCurrentUser(this.props.user.id, incId)
        //action to load data to form in drawer
    }

    closeDrawer = () =>{
        this.setState({
            visible : false
        })
    }

    componentWillMount(){
        console.log('mount user-list');
        this.props.getUserList(this.props.user.id);
    }

    handleSubmit = (values) => {
        console.log(values);
        this.props.updatedUser(this.props.user.id, values);
        this.closeDrawer();
    };
    deleteAction = (delId) => {
        this.props.deleteById(this.props.user.id, delId);
    }

    createAction = () => {
        this.props.clearForm();
        this.setState({
            visible: true
        });

    }

    render(){
        const columns = [
        {
            title : 'Активность',
            dataIndex : 'is_active',
            key : 'is_active',
            render : (text,record) => (
                <Checkbox checked={true} checked={record.is_active} />
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
                <div className="action-row">
                {/*<a className="action-title" onClick={() => this.toggleDrawer(record.id)}>Редактировать</a> */}
                    <Link to={"/users/edit/" + record.id}>Редактировать</Link>
                    <Popconfirm onConfirm={() => this.deleteAction(record.id)} title="Вы уверены что хотите удалить запись?">
                        <a className="action-title">Удалить</a>
                    </Popconfirm>
                </div>
                
            )
        }]
        return(
            <div>
                <Row>
                    {/*<Button onClick={this.createAction}>Добавить Пользователя</Button> */}
                   <Link to="/users/create"> <Button>Добавить пользователя</Button></Link>
                </Row>
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
                    onClose={this.closeDrawer}
                    visible={this.state.visible}
                    destroyOnClose={true}
                >

                <div>
                    <p>Изменение данных Пользователя</p>
                </div>
                <Divider/>
                    <div>
                        {this.props.userList.userIsLoading ? 
                            (<Spin/>) :
                            (<UserEdit 
                                onSubmit={this.handleSubmit} 
                                initialValues={this.props.userList.currentUserData} 
                                userRoles={this.props.user.userRoles} 
                            />)
                        }
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
    getCurrentUser : (authUserId, incUserId) => dispatch(getUser(authUserId, incUserId)),
    updatedUser : (authorizeId, formData) => dispatch(updatedUser(authorizeId, formData)),
    clearForm : () => dispatch(clearForm()),
    deleteById : (id, deleteId) => dispatch(deleteUser(id, deleteId))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UsersList));
//export default UsersList;