import React, { Component } from 'react'
import Preloader from './Preloader'
import { Table, Button, Modal } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { getContracts , setFilters, getContract, updateContract, applyFilters, getFilterData, setPage } from '../actions/WorkSheetActions'
import { getUserList } from '../actions/UserListActions'
import { getCustomersList } from '../actions/CustomersActions'
import Filters from './Filters';


class WorkSheet extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchText : '',
      isModalOn : false
    };
    //this.handleClick = this.handleModalClick.bind(this);
  }

  componentWillMount(){
    //if(!this.props.contracts.isLoaded){
    const { user, users, getUsers, customers, getCustomers } = this.props;
    if(users.isLoading){
      getUsers(user.id);
    }
    if(!customers.loaded){
      getCustomers(user.id)
    }
  
    if(!this.props.contracts.isLoaded){
        //Устанавливаем фильтр на текущего пользователя
    this.props.setFilters('contractor',this.props.user.id);
    //Устанавливаем фильтр по умолчанию на статус заявок - В работе
    this.props.setFilters('status', 2);
      console.log('loading filters...');
      //this.props.getFilterData(this.props.user.id);
      
      
    }
    this.props.applyFilters(this.props.user.id,this.props.contracts.filters);
    //}
  }

  handleSearch = (type,selectedKeys) => () => {
    this.props.applyFilter(this.props.user.id,this.props.contracts.filters, type, selectedKeys[0]);
  }
  
  handleReset = clearFilters => () => {
    clearFilters();
    this.props.resetFilter(this.props.user.id,this.props.contracts.filters);

  }
  onPaginationChange = (page) =>{
    const { contracts, setPage } = this.props;
    console.log('pagination listener, page:');
    console.log(page);
    let offset =  page.current === 1 ? 0 : contracts.filters.limit * (page.current-1);
    setPage(page.current)
    this.props.setFilters('offset', offset);
    this.props.applyFilters(this.props.user.id, this.props.contracts.filters);
  }
  onPageSizeChange = (current, pageSize) => {
    console.log('page size changed');
    console.log(current);
    console.log(pageSize);
    this.props.setFilters('limit',pageSize);
    this.props.applyFilters(this.props.user.id, this.props.contracts.filters);
  }

  onCalendarChange = (date, string)=>{
    console.log(date);
    console.log(string);
  }

  onRecordClick = (recoordId) => {
    const { user, getContract } = this.props;
    console.log('record clicked: ' + recoordId);
    this.setState(state => ({
      isModalOn: !state.isModalOn
    }));
    getContract(user.id, recoordId);
  }

  closeModalClick = () => {
    this.setState(state => ({
      isModalOn: false
    }));
  }

  onContractFormSubmit = (values) => {
    const { user, updateContract, contracts } = this.props;
    console.log('form submitted.');
    console.log(values);
    updateContract(user.id, values, contracts.filters);
    this.closeModalClick();
  }

  render(){
    const { user, users, customers, settings } = this.props;
      const columns = [{
        title: '№ Договора',
        dataIndex: 'contract_number',
        key: 'contract_number',
      }, {
        title: 'Дата заключения',
        dataIndex: 'date_started',
        key: 'date_started',
      }, {
        title: 'ФИО Заказчика',
        dataIndex: 'customer',
        key: 'customer',

      },{
        title: 'Адрес объекта',
        dataIndex: 'address',
        key: 'address'
      },{
        title: 'Вид кадастровых работ',
        dataIndex: 'type_of_work',
        key: 'type_of_work',
        render : (_, record) => {
          const type = settings.work_types.find(item => {
            return item.id === record.type_of_work;
          });
          return type.work_type || "Не указано" ;
        }
      },{
        title: 'Исполнитель',
        dataIndex: 'name',
        key: 'contractor'
      },
      {
        title: 'Примечание',
        dataIndex: 'comment',
        key: 'comment',
        render : (text, record)=>{
          return (<Link to={"contracts/edit/" + record.id}>Информация</Link>)
        }
      },{
        title: 'Исполнить до',
        dataIndex: 'date_deadline',
        key: 'date_deadline',
      }];
      return !this.props.contracts.isLoaded ? 
        <Preloader/>
         :
        (<div>
          {user.id <= 2 &&
            <div>
              <Link to="/contracts/create"><Button>Создать заявление</Button></Link>
            </div>
          }
          <Filters
            user={this.props.user} 
            filterData={this.props.contracts.filterData}
            filters={this.props.contracts.filters}
            loadingState={this.props.contracts.isFetching}
            isLoaded={this.props.contracts.isLoaded}
            settings={settings}
            users={users.data}
            customers={customers.data}
            />
          <Table  
            rowKey="id" 
            columns={columns} 
            dataSource={this.props.contracts.data}
            loading={this.props.contracts.isFetching}
            onChange={this.onPaginationChange}
            pagination={{total:this.props.contracts.count, pageSize : this.props.contracts.filters.limit, showSizeChanger : true, onShowSizeChange : this.onPageSizeChange, current : this.props.contracts.page }}
            locale={{ emptyText : "Заявок не найдено"}}
          />
          <Modal
            footer={false}
            visible={this.state.isModalOn}
            onCancel={this.closeModalClick}
            title="Информация о заявке"
          >
          </Modal>
        </div>
      );
    }
}

    const mapStateToProps = store =>{
      return {
        user : store.user,
        contracts : store.contracts,
        users : store.userList,
        settings : store.settings.data,
        customers : store.customersList
      }
    }

    const mapDispatchToProps = dispatch =>({
      getContracts : (id,limit,offset,filterData) => dispatch(getContracts(id,limit,offset,filterData)),
      setFilters : (name, filter) => dispatch(setFilters(name, filter)),
      getContract : (userId, id) => dispatch(getContract(userId,id)),
      updateContract : (userId, formData, filterData) => dispatch(updateContract(userId,formData,filterData)),
      applyFilters : (id, filters) => dispatch(applyFilters(id, filters)),
      getFilterData : (id) => dispatch(getFilterData(id)),
      getUsers : (id) => dispatch(getUserList(id)),
      getCustomers : (id) => dispatch(getCustomersList(id)),
      setPage : (page) => dispatch(setPage(page))
      //resetFilter : (id, filters) => dispatch(reserFlilters(id,filters))
    })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkSheet));

//export default WorkSheet;