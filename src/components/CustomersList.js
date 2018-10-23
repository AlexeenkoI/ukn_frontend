import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Input, Button, Icon, Modal, Spin } from 'antd';
import { getCustomersList, getCurrentCustomer, updateCustomer, deleteCustomer, insertCustomer } from '../actions/CustomersActions';

const Search = Input.Search;
const columns = [{
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
},
{
    title: 'Фамилия',
    dataIndex: 'first_name',
    key: 'first_name',
},
{
    title: 'Отчество',
    dataIndex: 'second_name',
    key: 'second_name',
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
}]

const data = [{
    name : 'asd',
    first_name : 'asd',
    second_name : 'asd',
    email : 'asd@asd.ru',
    phone : '1231231'

}]

export class CustomersList extends Component {


  render() {
    return (
        <Fragment>
            <Search
                placeholder="Поиск"
                onSearch={value => console.log(value)}
                style={{ maxWidth: 400 }}
                enterButton
            />

            <Table  
            rowKey="phone" 
            columns={columns}
            dataSource={data}
            />
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
    updateOne : (userId, formData) => dispatch(updateCustomer(userId,formData)),
    deleteOne : (userId, deleteId) => dispatch(deleteCustomer(userId, deleteId)),
    insertOne : (userId, formData) => dispatch(insertCustomer(userId,formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList)
