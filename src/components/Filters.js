import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col, Form, Button, Input, DatePicker, Select, Icon, Collapse  } from 'antd';
import { setFilters , applyFilters, resetFilters, getFilterData, setPage } from '../actions/WorkSheetActions'
import moment from 'moment'


const FormItem = Form.Item;


class Filters extends Component{
  constructor(props){
    super(props);
    this.handeSubmit = this.handeSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleContractorChange = this.handleContractorChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.clearSearchString = this.clearSearchString.bind(this)
    this.handleDateFrom = this.handleDateFrom.bind(this)
    this.handleDateTo = this.handleDateTo.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
  }
  componentWillMount(){
      
      //this.props.getFilterData(this.props.user.id);
  }

  handeSubmit = (e) =>{
    e.preventDefault();
    this.props.applyFilters(this.props.user.id,this.props.applyData);
  }
  handleInputChange = (e, parameter) => {
    this.props.setFilters('whereString',e.target.value);
  }
  handleContractorChange = (value) => {
    //this.props.setFilters('contractor',value);
    //this.props.setFilters('contractor', {id : value});
    this.props.setFilters('contractor', [value]);
  }

  handleStatusChange = (value) => {
    this.props.setFilters('status',value);
  }

  handleCustomerChange = value => {
    value = value > 0 ? value : '';
    this.props.setFilters('customer_id',value);
  }

  clearSearchString = () => {
    this.props.setFilters('whereString','');
  }

  handleDateFrom = (date, value) => {
    //console.log(date);
    //console.log(moment(date).format("X"));
    const setDate  = date === null ? '' : date;
    this.props.setFilters('date_started',setDate);
  }

  handleDateTo = (date, value) => {
    const setDate  = date === null ? '' : date;
    this.props.setFilters('date_deadline',setDate);
  }

  resetFilters = () => {
    this.props.resetFilters(this.props.user.id,this.props.applyData);
    this.props.setPage(1);
    //this.props.applyFilters('contractor',this.props.user.id);
  }
  render(){
    return(
      <Collapse bordered={false}>
        <Collapse.Panel header="Поиск">
          <Form onSubmit={this.handeSubmit} layout="vertical">
            <Row gutter={12}>
              <Col span={2}>
                <FormItem label="Исполнитель">
                  <Select 
                    showSearch
                    style={{ width: '100%' }}
                    defaultValue={this.props.user.id}
                    value={this.props.filters.contractor[0] }
                    placeholder="Исполнитель"
                    onChange={this.handleContractorChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Select.Option key={0} value={null}>Все</Select.Option>
                    {this.props.users.map(usr => <Select.Option key={usr.id} value={usr.id}>{usr.name}</Select.Option>)}
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="Поиск">
                  <Input placeholder="Номер договора, Адрес, ФИО"
                    value={this.props.filters.whereString}
                    onChange={ e => this.handleInputChange(e, 'searchString')}
                    suffix={this.props.filters.whereString.length > 0 ? <span className="closePicker"><Icon type="close" theme="outlined" onClick={this.clearSearchString}/></span> : ''}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={2} >
                <FormItem label="Статус">
                  <Select 
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Статус"
                    value={this.props.filters.status}
                    onChange={this.handleStatusChange}
                  >
                    {this.props.filterData ? this.props.settings.status_types.map(item => <Select.Option key={item.id} value={item.id}>{item.type}</Select.Option>) : ''}
                  </Select>
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="Период">
                  <DatePicker 
                    style={{width:'40%'}} 
                    placeholder="C" 
                    value={this.props.filters.date_started === '' ? null : moment(this.props.filters.date_started, 'YYYY-MM-DD') } 
                    format="YYYY-MM-DD" 
                    onChange={this.handleDateFrom}
                  />
                  -
                  <DatePicker 
                    style={{width:'40%'}} 
                    placeholder="По" 
                    value={this.props.filters.date_deadline === '' ? null :moment(this.props.filters.date_deadline, 'YYYY-MM-DD') } 
                    format="YYYY-MM-DD" 
                    onChange={this.handleDateTo}
                  />
                </FormItem>
              </Col>
              <Col span={2}>
                <FormItem label="Заказчик">
                  <Select
                    showSearch
                    style={{width:'100%'}}
                    placeholder="Заказчик"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={this.handleCustomerChange}
                    defaultActiveFirstOption={true}
                  >
                    <Select.Option key={0} value={0}>Не выбран</Select.Option>
                      {this.props.customers.map(customer => <Select.Option key={customer.id} value={customer.id}>{`${customer.name} ${customer.firstname} ${customer.secondname}`}</Select.Option>)}
                    </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label='&nbsp;'>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.props.loadingState}
                    icon="search"
                  >
                    Искать
                  </Button>
                  <Button
                    type="danger"
                    onClick={this.resetFilters}
                  >
                    Сбросить
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Collapse.Panel>
      </Collapse>
    )
  }
}
//const FiltersForm = Form.create()(Filters);


const mapDispatchToProps = dispatch =>({
  setFilters : (name, filter) => dispatch(setFilters(name, filter)),
  applyFilters : (id, filters) => dispatch(applyFilters(id, filters)),
  resetFilters : (id, filters) => dispatch(resetFilters(id, filters)),
  getFilterData : (id) => dispatch(getFilterData(id)),
  setPage : (page) => dispatch(setPage(page))
})

//export default Filters
export default withRouter(connect(null,mapDispatchToProps)(Filters));