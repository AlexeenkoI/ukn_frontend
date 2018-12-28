import React, { Component } from 'react'
import { Table, Drawer, Checkbox, Divider, Spin, Row, Button, Popconfirm, Input, Icon, Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import UserEdit from '../components/forms/UserEdit'
import { getUserList, getUser, updatedUser, deleteUser, clearForm, addCondition, clearSearchStr, setPage } from '../actions/UserListActions'

const Search = Input.Search;

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
    const { user, userList, getUserList } = this.props;
    getUserList(user.id, userList.searchData);
  }

  handleSubmit = (values) => {
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

  submitSearch = (str) => {
    const { user, userList, getUserList } = this.props;
    //addCond('searchString', str);
    getUserList(user.id, userList.searchData);
  }
  onPaginationChange = (page) => {
    const { user, addCond, userList, getUserList, setPage } = this.props
    let offset =  page.current === 1 ? 0 : userList.searchData.limit * (page.current-1);
    setPage(page.current)
    addCond('offset',offset);
    getUserList(user.id, userList.searchData);
  }
  onPageSizeChange = (current, pageSize) => {
    const { user, userList, addCond, getUserList } = this.props
    addCond('limit',pageSize);
    getUserList(user.id, userList.searchData);
  }

  render(){
    const { userList, addCond } = this.props;
    const columns = [
    {
      title : 'Активность',
      dataIndex : 'is_active',
      key : 'is_active',
      render : (text,record) => (
        <Checkbox checked={record.is_active} />
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
      render : (text,record) => {
        const titleString = "Вы уверены что хотите удалить пользователя " + record.name + "?";
        const menu = (
          <Menu>
            <Menu.Item key="0"><Link to={"/users/edit/" + record.id}>Редактировать</Link></Menu.Item>
            <Menu.Item key="1">
              <Popconfirm onConfirm={() => this.deleteAction(record.id)} title={titleString}>
                <a className="action-title">Удалить</a>
              </Popconfirm>
            </Menu.Item>
          </Menu>
        )
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <a>Действия <Icon type="down" /></a>
          </Dropdown>
        ) 
      }
    }]
    return(
      <div>
        {/*<Row>
          <Link to="/users/create"> <Button>Добавить пользователя</Button></Link>
        </Row>*/}
        <Row>
          <Search
            placeholder="Поиск..."
            value={userList.searchData.whereString}
            onChange={e => addCond('whereString',e.target.value)}
            onSearch={this.submitSearch}
            style={{ maxWidth: 400 }}
            suffix={userList.searchData.whereString.length > 0 ? <span key={userList.searchData.whereString} className="closePicker" onClick={e => addCond('whereString','')}><Icon type="close" theme="outlined" /></span> : ''}
            enterButton
          />
        </Row>
        <Table  
          rowKey="id" 
          columns={columns} 
          dataSource={this.props.userList.data}
          loading={this.props.userList.isLoading}
          onChange={this.onPaginationChange}
          pagination={{total:userList.count, pageSize : userList.searchData.limit, showSizeChanger : true, onShowSizeChange : this.onPageSizeChange, current : userList.page }}
          locale={{ emptyText : "Пользователей не найдено"}}
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
              <Spin/> :
              <UserEdit 
                onSubmit={this.handleSubmit} 
                initialValues={this.props.userList.currentUserData} 
                userRoles={this.props.user.userRoles} 
              />
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
    getUserList : (id, condition) => dispatch(getUserList(id, condition)),
    getCurrentUser : (authUserId, incUserId) => dispatch(getUser(authUserId, incUserId)),
    updatedUser : (authorizeId, formData) => dispatch(updatedUser(authorizeId, formData)),
    clearForm : () => dispatch(clearForm()),
    addCond : (type, value) => dispatch(addCondition(type, value)),
    resetSearch : () => dispatch(clearSearchStr()),
    deleteById : (id, deleteId) => dispatch(deleteUser(id, deleteId)),
    setPage : (page) => dispatch(setPage(page))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UsersList));
//export default UsersList;