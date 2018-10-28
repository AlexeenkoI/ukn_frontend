import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Input, Button, Icon, Modal, Spin, Dropdown, Menu, Popconfirm } from 'antd';
import { getCustomersList, getCurrentCustomer, updateCustomer, deleteCustomer, insertCustomer, search, resetSearch } from '../actions/CustomersActions';
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
    const { user, customers,  onSearch, getCustomers } = this.props;
    console.log('submit search');
    console.log(str);
    onSearch(str);
    getCustomers(user.id, customers.searchString);
  }

  handleFormSubmit = (values) => {
      const { user, customers, updateOne } = this.props;
      console.log('handle');
      console.log(values);
      updateOne(user.id, values, customers.searchString);
      this.closeModal();
  }
  deleteAction = (deleteId) => {
    const { user, customers, deleteOne } = this.props;
    console.log('delete ' + deleteId);
    deleteOne(user.id, deleteId, customers.searchString)
  }

  render() {
    const { customers } = this.props;
    const columns = [{
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Фамилия',
        dataIndex: 'firstname',
        key: 'firstname',
    },
    {
        title: 'Отчество',
        dataIndex: 'secondname',
        key: 'secondname',
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Действия',
        render : (text, record) => {
            const titleString = "Вы уверены что хотите удалить клиента " + record.name + "?";
            const menu = (
                <Menu>
                    <Menu.Item key="0"><a onClick={()=>this.openDetail(record.id)}>Подробнее</a></Menu.Item>
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
            <Search
                placeholder="Поиск..."
                value={customers.searchString}
                onChange={e => this.props.onSearch(e.target.value)}
                onSearch={this.submitSearch}
                style={{ maxWidth: 400 }}
                suffix={customers.searchString.length > 0 ? <span key={customers.searchString} className="closePicker"><Icon type="close" theme="outlined" onClick={this.clearSearchString}/></span> : ''}
                enterButton
            />

            <Table  
                rowKey="phone" 
                columns={columns}
                dataSource={customers.data}
                loading = {customers.loading}
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
    onSearch : (str) => dispatch(search(str)),
    clearSearch  : (str) => dispatch(resetSearch(str))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList)
