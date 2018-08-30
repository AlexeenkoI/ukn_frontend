import React, { Component } from 'react'
import Preloader from './Preloader'
import { Table, Input, Button, Icon } from 'antd';


const data = [{
    key: '1',
    statement:'12',
    date:'12.12.12',
    customer_name: 'John Brown',
    object_addr: 'spoon str 12-32',
    photo_need: 'yes',
    //app_number:'12345',
    //has_info:'yes',
    work_type:'схема',
    emloye:'User1',
    price:'12200',
    comments:'asd',
    deadline:'13.12.14'
  },{
    key: '2',
    statement:'13',
    date:'13.13.13',
    customer_name: 'John Brown2',
    object_addr: 'spoon str 22-32',
    photo_need: 'yes',
    //app_number:'33333',
    //has_info:'yes',
    work_type:'МП',
    emloye:'User2',
    price:'12200',
    comments:'asd',
    deadline:'12.13.14'
  }];


class WorkSheet extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
          };
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
          dataIndex: 'statement',
          key: 'statement',
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
          onFilter: (value, record) => record.statement.toLowerCase().includes(value.toLowerCase()),
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
          dataIndex: 'date',
          key: 'date',
        }, {
          title: 'ФИО Заказчика',
          dataIndex: 'customer_name',
          key: 'customer_name',

        },{
          title: 'Адрес объекта',
          dataIndex: 'object_addr',
          key: 'object_addr'
        },{
          title: 'Наличие сьемки',
          dataIndex: 'photo_need',
          key: 'photo_need'
        },{
          title: 'Вид кадастровых работ',
          dataIndex: 'work_type',
          key: 'work_type'
        },{
          title: 'Исполнитель',
          dataIndex: 'emloye',
          key: 'emloye'
        },{
          title: 'Стоимость',
          dataIndex: 'price',
          key: 'price'
        },{
          title: 'Примечание',
          dataIndex: 'comments',
          key: 'comments',
          render : (data)=>{
            return <span className="test">{data}</span>
          }
        },{
          title: 'Исполнить до',
          dataIndex: 'deadline',
          key: 'deadline'
        }];
        return this.state.isLoading ? (<div><Preloader/></div>):
        ( <Table columns={columns} 
          dataSource={data}
          loading={false}
          onChange={this.onPaginationChange}
          pagination={{defaultPageSize:1,pageSize:1}} />);
      }
    }


export default WorkSheet;