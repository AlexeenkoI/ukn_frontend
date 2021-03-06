import React, { Component } from 'react'
import Preloader from './Preloader'
import { Table, Button, Modal, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { getContracts , setFilters, getContract, updateContract, applyFilters, getFilterData, setPage, setLimit } from '../actions/WorkSheetActions'
import { getUserList } from '../actions/UserListActions'
import { getCustomersList } from '../actions/CustomersActions'
import { getSettings } from '../actions/SettingsActions'
import Filters from './Filters';
import moment from 'moment';


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
    const { user, users, getUsers, customers, getCustomers,settings, loadSettings } = this.props;
    if(users.isLoading){
      getUsers(user.id);
    }
    if(!customers.loaded){
      getCustomers(user.id)
    }
    if(!settings.settings_loaded){
      loadSettings();
    }

  
    if(!this.props.contracts.isLoaded){
        //Устанавливаем фильтр на текущего пользователя
    this.props.setFilters('contractor',[this.props.user.id]);
    //Устанавливаем фильтр по умолчанию на статус заявок - В работе
    this.props.setFilters('status', 2);
      //console.log('loading filters...');
      //this.props.getFilterData(this.props.user.id);
      
      
    }
    this.props.applyFilters(this.props.user.id,this.props.contracts);
    //}
  }
  componentDidUpdate(prevProps){
    //console.log('component updated');
    //console.log('prev  props')
    //console.log(prevProps.contracts);
    //console.log('current props');
    //console.log(this.props.contracts);
  }

  handleSearch = (type,selectedKeys) => () => {
    this.props.applyFilter(this.props.user.id,this.props.contracts, type, selectedKeys[0]);
  }
  
  handleReset = clearFilters => () => {
    clearFilters();
    this.props.resetFilter(this.props.user.id,this.props.contracts.filters);

  }
  onPaginationChange = (page) =>{
    const { contracts, setPage } = this.props;
    let offset =  page.current === 1 ? 0 : contracts.filters.limit * (page.current-1);
    setPage(page.current)
    this.props.applyFilters(this.props.user.id, this.props.contracts, page.current, page.pageSize);
  }
  onPageSizeChange = (current, pageSize) => {
    const { setLimit } = this.props;
    setLimit(pageSize);
    //this.props.setFilters('limit',pageSize);

   // this.props.applyFilters(this.props.user.id, this.props.contracts, current.current, pageSize);
    
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
        /*
        title: '№ Договора',
        dataIndex: 'id',
        key: 'id',
        */
        title: 'Номер контракта',
        dataIndex: 'contract_number',
        key: 'contract_number',
      }, {
        title: 'Дата заключения',
        dataIndex: 'date_started',
        key: 'date_started',
        render : (_, record) => {
          return moment(record.date_started).format('DD.MM.YYYY')
        }
      }, {
        title: 'ФИО Заказчика',
        dataIndex: 'customer',
        key: 'customer',
        render : (_, record) => {
          if(!customers.loaded){ 
            return <div><Icon type="loading" /> Загружаю... </div>
          }else{
            const customerData = customers.data.filter( customer => {
              return customer.id === record.customer_id
            })

            return `${customerData[0].firstname} ${customerData[0].name} ${customerData[0].secondname}`

          }
        }
      },{
        title: 'Адрес объекта',
        dataIndex: 'address',
        key: 'address'
      },{
        title: 'Вид кадастровых работ',
        dataIndex: 'type_of_work',
        key: 'type_of_work',
        render : (_, record) => {
          if(!settings.settings_loaded) return 'Загружаю...';
          const type = settings.data.work_types.find(item => {
            return item.id === record.type_of_work;
          });
          return type ? type.work_type : "Не указано" ;
        }
      },{
        title: 'Исполнители',
        dataIndex: 'name',
        key: 'contractor',
        render : (_, record) => {
          let res;
          if(record.users.length > 1){
            const menu = (
              <Menu>
              {record.users.map( user => <Menu.Item key={user.id}>{user.name}</Menu.Item>)}
              </Menu>
            )
            //res = record.users.map( user => <div key={user.id}>{user.name}</div>)
            //return (
            //  <Dropdown overlay={menu}>
            //  Исполнители <Icon type="down" />
            //  </Dropdown>
            //)
            return (
              <Dropdown overlay={menu}>
              <a>
               Исполнители<Icon type="down" />
              </a>
            </Dropdown>
            )
          }else {
            res = record.users[0] ? record.users[0].name : "Не назначены";
            return res;
          }
          
        }
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
        render : (_, record) => {
          if(record.date_deadline)
            return moment(record.date_deadline).format('DD.MM.YYYY');
          return 'Не указано';
        }
      }];
      return !this.props.contracts.isLoaded ? 
        <Preloader/>
         :
        (<div>
          <Filters
            user={this.props.user} 
            filterData={this.props.contracts.filterData}
            filters={this.props.contracts.filters}
            applyData={this.props.contracts}
            loadingState={this.props.contracts.isFetching}
            isLoaded={this.props.contracts.isLoaded}
            settings={settings.data}
            users={users.data}
            customers={customers.data}
            />
          <Table  
            rowKey="id" 
            columns={columns} 
            dataSource={this.props.contracts.data}
            loading={this.props.contracts.isFetching}
            onChange={this.onPaginationChange}
            rowClassName={(record, index) => {
              if(record.date_deadline){
                const deadLinePassed = moment(record.date_deadline).format('DD.MM.YYYY') > moment().format('DD.MM.YYYY') ? false : true;
                if(record.status < 3){
                  return moment().isBefore(record.date_deadline ,moment()) ? 'row normal' : 'row warn';
                }
                if(record.status > 2){
                  return 'row finished';
                }
              }
            }}
            pagination={{total:this.props.contracts.total, pageSize : this.props.contracts.limit, showSizeChanger : true, onShowSizeChange : this.onPageSizeChange, current : this.props.contracts.page }}
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
        settings : store.settings,
        customers : store.customersList
      }
    }

    const mapDispatchToProps = dispatch =>({
      getContracts : (id,limit,offset,filterData) => dispatch(getContracts(id,limit,offset,filterData)),
      setFilters : (name, filter) => dispatch(setFilters(name, filter)),
      getContract : (userId, id) => dispatch(getContract(userId,id)),
      updateContract : (userId, formData, filterData) => dispatch(updateContract(userId,formData,filterData)),
      applyFilters : (id, filters, page, limit) => dispatch(applyFilters(id, filters, page, limit)),
      getFilterData : (id) => dispatch(getFilterData(id)),
      getUsers : (id) => dispatch(getUserList(id)),
      getCustomers : (id) => dispatch(getCustomersList(id)),
      setPage : (page) => dispatch(setPage(page)),
      setLimit : (limit) => dispatch(setLimit(limit)),
      loadSettings : () => dispatch(getSettings())
      //resetFilter : (id, filters) => dispatch(reserFlilters(id,filters))
    })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkSheet));

//export default WorkSheet;