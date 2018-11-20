import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Input, Icon, Modal, Dropdown, Menu, Popconfirm } from 'antd';
import { getCustomersList, getCurrentCustomer, updateCustomer, deleteCustomer, insertCustomer, setSearch, setPage } from '../actions/CustomersActions';
import CustomerEdit from '../components/forms/CustomerEdit'
const Search = Input.Search;


export class CustomersList extends Component {

  constructor(props){
    super(props);
    this.state={
        openModal : false
    }
    this.openDetail = this.openDetail.bind(this);
  }

  componentWillMount = () =>{
    const { user, getCustomers } = this.props;
    getCustomers(user.id);
  }

  openDetail = (customerId) => {
    const { user, getCustomer } = this.props;
    this.setState(state => ({
      openModal: true
    }));
    console.log('customer_id ->' + customerId);
    getCustomer(user.id, customerId);
  }
  closeModal = () => {
    this.setState(state => ({
      openModal: false
    }));
  }

  clearSearchString = () => {
    this.props.clearSearch();
  }

  submitSearch = (str) => {
    const { user, customers, getCustomers } = this.props;
    getCustomers(user.id, customers.searchData);
  }

  handleFormSubmit = (values) => {
    const { user, customers, updateOne } = this.props;
    updateOne(user.id, values, customers.searchData.searchString);
    this.closeModal();
  }
  deleteAction = (deleteId) => {
    const { user, customers, deleteOne } = this.props;
    deleteOne(user.id, deleteId, customers.searchData.searchString)
  }

  onPaginationChange = (page) => {
    const { user, customers, setCondition, setPage, getCustomers} = this.props;
    let offset =  page.current === 1 ? 0 : customers.searchData.limit * (page.current-1);
    setPage(page.current);
    setCondition('offset', offset);
    getCustomers(user.id, customers.searchData);
  }
  onPageSizeChange = (current, pageSize) => {
    const { user, customers, setCondition, getCustomers} = this.props;
    setCondition('limit', pageSize);
    getCustomers(user.id, customers.searchData)
  }

  render() {
    const { customers, setCondition } = this.props;
    const columns = [{
      title: 'Имя',
      dataIndex: 'name',
      //key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'firstname',
      //key: 'firstname',
    },
    {
      title: 'Отчество',
      dataIndex: 'secondname',
      //key: 'secondname',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      //key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      //key: 'phone',
    },
    {
      title: 'Действия',
      render : (text, record) => {
        const titleString = "Вы уверены что хотите удалить клиента " + record.name + "?";
        const menu = (
          <Menu>
            <Menu.Item key="0"><Link to={"/customers/edit/"+ record.id }>{ /*<a onClick={()=>this.openDetail(record.id)}>Подробнее</a> */}Подробнее</Link></Menu.Item>
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
    return (
      <Fragment>
        <Link to="/customers/createcustomer">Создать клиента</Link>
        <Search
          placeholder="Поиск..."
          value={customers.searchData.whereString}
          onChange={e => setCondition('whereString', e.target.value)}
          onSearch={this.submitSearch}
          style={{ maxWidth: 400 }}
          suffix={customers.searchData.whereString.length > 0 ? <span key={customers.searchData.whereString} className="closePicker"><Icon type="close" theme="outlined" onClick={e => setCondition('whereString', '')}/></span> : ''}
          enterButton
        />
        <Table  
          rowKey="id" 
          columns={columns}
          dataSource={customers.data}
          loading = {customers.loading}
          onChange={this.onPaginationChange}
          pagination={{total:customers.count, pageSize : customers.searchData.limit, showSizeChanger : true, onShowSizeChange : this.onPageSizeChange, current : customers.page }}
          locale={{ emptyText : "Клиентов не найдено"}}
        />
        <Modal
          footer={false}
          visible={this.state.openModal}
          onCancel={this.closeModal}
          title="Информация о клиенте"
        >
          <CustomerEdit
            onSubmit={this.handleFormSubmit}
            customerData={customers.currentCustomer}
          />
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  customers  : state.customersList
})

const mapDispatchToProps = dispatch => ({
  getCustomers : (userId, searchStr) => dispatch(getCustomersList(userId,searchStr)),
  getCustomer : (userId, customerId) => dispatch(getCurrentCustomer(userId,customerId)),
  updateOne : (userId, formData, searchStr) => dispatch(updateCustomer(userId, formData, searchStr)),
  deleteOne : (userId, deleteId, str) => dispatch(deleteCustomer(userId, deleteId , str)),
  insertOne : (userId, formData) => dispatch(insertCustomer(userId,formData)),
  setCondition : (type, value) => dispatch(setSearch(type, value)),
  setPage : (page) => dispatch(setPage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList)
