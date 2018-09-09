import React, { Component } from 'react'
import Preloader from './Preloader'
import { Table, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';

import { getContracts , setFilters } from '../actions/WorkSheetActions'
import Filters from './Filters';


class WorkSheet extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
          };
    }

    componentWillMount(){
      if(!this.props.contracts.isLoaded){
        this.props.setFilters('contractor',this.props.user.id);
        this.props.getContracts(this.props.user.id,this.props.contracts.filters);
      }
    }

    handleSearch = (type,selectedKeys) => () => {
        //confirm();
        console.log('handle')
        console.log(selectedKeys);
        this.props.applyFilter(this.props.user.id,this.props.contracts.filters, type, selectedKeys[0]);
        //this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = clearFilters => () => {
        clearFilters();
        //this.setState({ searchText: '' });
        this.props.resetFilter(this.props.user.id,this.props.contracts.filters);

    }
    onPaginationChange = () =>{
      console.log('change listener');
    }

    onCalendarChange = (date, string)=>{
      console.log(date);
      console.log(string);
    }

    render(){
        const columns = [{
          title: '№ Договора',
          dataIndex: 'contract_number',
          key: 'contract_number',
          // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          //   <div className="custom-filter-dropdown">
          //     <Input
          //       ref={ele => this.searchInput = ele}
          //       placeholder="Поиск по номеру"
          //       value={selectedKeys[0]}
          //       onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          //       onPressEnter={this.handleSearch('contract_number',selectedKeys)}
          //     />
          //     <Button type="primary" onClick={this.handleSearch('contract_number',selectedKeys)}>Искать</Button>
          //     <Button onClick={this.handleReset(clearFilters)}>Сбросить</Button>
          //   </div>
          // ),
          // filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
         // onFilter: (value, record) => {
            //console.log(value);
            //this.props.setFilter({contract_number : value});
            //console.log(value);
            //return;
            //record.contract_number == value;
            //console.log(record.contract_number.toLowerCase().includes(value));
            //record.statement.toLowerCase().includes(value.toLowerCase())
          //},
          // onFilterDropdownVisibleChange: (visible) => {
          //   if (visible) {
          //     setTimeout(() => {
          //       this.searchInput.focus();
          //     });
          //   }
          // },
          render: (text) => {
            const { searchText } = this.state;
            return  text;
          },
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
        //{
        //  title: 'Стоимость',
        //  dataIndex: 'price',
        //  key: 'price'
        //},
        {
          title: 'Примечание',
          dataIndex: 'comment',
          key: 'comment',
          render : (data)=>{
            return <span className="test">{data}</span>
          }
        },{
          title: 'Исполнить до',
          dataIndex: 'date_deadline',
          key: 'date_deadline',
          // filterDropdown: () => (
          //   <div className="custom-filter-dropdown">
          //   <DatePicker onChange={this.onCalendarChange} locale={locale}/>
          //   </div>
          // ),
          // filterIcon: filtered => <Icon type="calendar" theme="outlined" />
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
      //resetFilter : (id, filters) => dispatch(reserFlilters(id,filters))
    })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkSheet));

//export default WorkSheet;