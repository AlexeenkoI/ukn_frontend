import React, { Component } from 'react'
import Preloader from './Preloader'
import { Table, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { getContracts } from '../actions/WorkSheetActions'


class WorkSheet extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
          };
    }

    componentWillMount(){

      this.props.getContracts(this.props.user.id,null,null,{contractor:this.props.user.id});
    }

    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    onPaginationChange = () =>{
      console.log('change listener');
    }

    render(){
        const columns = [{
          title: '№ Договора',
          dataIndex: 'contract_number',
          key: 'contract_number',
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Поиск по номеру"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Искать</Button>
              <Button onClick={this.handleReset(clearFilters)}>Сбросить</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
          onFilter: (value, record) => {
            //console.log(value);
            console.log(value);
            //record.contract_number == value;
            //console.log(record.contract_number.toLowerCase().includes(value));
            //record.statement.toLowerCase().includes(value.toLowerCase())
          },
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
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
          dataIndex: 'contractor',
          key: 'contractor'
        },{
          title: 'Стоимость',
          dataIndex: 'price',
          key: 'price'
        },{
          title: 'Примечание',
          dataIndex: 'comment',
          key: 'comment',
          render : (data)=>{
            return <span className="test">{data}</span>
          }
        },{
          title: 'Исполнить до',
          dataIndex: 'date_deadline',
          key: 'date_deadline'
        }];
        return this.props.contracts.isFetching ? (<div><Preloader/></div>):
        ( <Table  rowKey="id" columns={columns} 
          dataSource={this.props.contracts.data}
          loading={false}
          onChange={this.onPaginationChange}
          pagination={{defaultPageSize:10,pageSize:10}} />);
      }
    }

    const mapStateToProps = store =>{
      return {
        user : store.user,
        contracts : store.contracts
      }
    }

    const mapDispatchToProps = dispatch =>({
      getContracts : (id,limit,offset,filterData) => dispatch(getContracts(id,limit,offset,filterData))
    })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WorkSheet));

//export default WorkSheet;