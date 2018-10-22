import React, { Component } from 'react'
import Preloader from './Preloader'
import { Table, Input, Button, Icon, Modal, Spin } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';

import { getContracts , setFilters, getContract, updateContract } from '../actions/WorkSheetActions'
import Filters from './Filters';
import ContractEdit from './forms/ContractEdit';


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
      if(!this.props.contracts.isLoaded){
        this.props.setFilters('contractor',this.props.user.id);
        this.props.getContracts(this.props.user.id,this.props.contracts.filters);
      }
    }

    handleSearch = (type,selectedKeys) => () => {
        this.props.applyFilter(this.props.user.id,this.props.contracts.filters, type, selectedKeys[0]);
    }
    
    handleReset = clearFilters => () => {
        clearFilters();
        this.props.resetFilter(this.props.user.id,this.props.contracts.filters);

    }
    onPaginationChange = () =>{
      console.log('change listener');
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
      console.log('form submitted.');
      console.log(values);
      return false;
    }

    render(){


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
          key: 'type_of_work'
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
            return <a onClick={() => {this.onRecordClick(record.id)}}>Информация</a>
          }
        },{
          title: 'Исполнить до',
          dataIndex: 'date_deadline',
          key: 'date_deadline',
        }];
        return !this.props.contracts.isLoaded ? 
        ( <div>
            <Preloader/>
          </div>) :
        ( <div>
          <Filters
           user={this.props.user} 
           filterData={this.props.contracts.filterData}
           filters={this.props.contracts.filters}
           loadingState={this.props.contracts.isFetching}
           />
          <Table  rowKey="id" columns={columns} 
            dataSource={this.props.contracts.data}
            loading={this.props.contracts.isFetching}
            onChange={this.onPaginationChange}
            pagination={{defaultPageSize:10,pageSize:10}} />
          <Modal
          footer={false}
          visible={this.state.isModalOn}
          onCancel={this.closeModalClick}
          title="Информация о заявке"
          >
            {this.props.contracts.contractLoading ? 
              (<Spin/>):
              (<ContractEdit
                contractData = {this.props.contracts.currentContract}
                onSubmit = {this.onContractFormSubmit}
                //isLoading = {this.contracts.contractLoading}
                statuses = {this.props.contracts.filterData.types}
              />)
            }
            
          </Modal>
          </div>
        );
      }
    }

    const mapStateToProps = store =>{
      return {
        user : store.user,
        contracts : store.contracts
      }
    }

    const mapDispatchToProps = dispatch =>({
      getContracts : (id,limit,offset,filterData) => dispatch(getContracts(id,limit,offset,filterData)),
      setFilters : (name, filter) => dispatch(setFilters(name, filter)),
      getContract : (userId, id) => dispatch(getContract(userId,id)),
      updateContract : (userId, formData) => dispatch(updateContract(userId,formData))
      //resetFilter : (id, filters) => dispatch(reserFlilters(id,filters))
    })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkSheet));

//export default WorkSheet;