import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col, Form, Button, Input, DatePicker, Select, Icon, Collapse  } from 'antd';
import { setFilters , applyFilters, resetFilters, getFilterData } from '../actions/WorkSheetActions'
import moment from 'moment'


const FormItem = Form.Item;


class Filters extends Component{
    constructor(props){
        super(props);
        this.handeSubmit.bind(this);
        this.handleInputChange.bind(this);
        this.handleContractorChange.bind(this);
        this.handleStatusChange.bind(this);
        this.clearSearchString.bind(this)
        this.handleDateFrom.bind(this)
        this.handleDateTo.bind(this)
        this.resetFilters.bind(this)
    }
    componentWillMount(){
        
        //this.props.getFilterData(this.props.user.id);
    }

    handeSubmit = (e) =>{
        e.preventDefault();
        this.props.applyFilters(this.props.user.id,this.props.filters);
    }
    handleInputChange = (e, parameter) => {
        this.props.setFilters('whereString',e.target.value);
    }
    handleContractorChange = (value) => {
        this.props.setFilters('contractor',value);
    }

    handleStatusChange = (value) => {
        this.props.setFilters('status',value);
    }

    clearSearchString = () => {
        this.props.setFilters('whereString','');
    }

    handleDateFrom = (date, value) => {
        console.log(date);
        console.log(moment(date).format("X"));
        this.props.setFilters('date_started',moment(date).format("X"));
    }

    handleDateTo = (date, value) => {
        this.props.setFilters('date_deadline',moment(date).format("X"));
    }

    resetFilters = () => {
        this.props.resetFilters(this.props.user.id,this.props.filters);
        //this.props.applyFilters('contractor',this.props.user.id);
    }
    render(){
        return(
            <Collapse bordered={false}>
                <Collapse.Panel
                 header='Поиск'
                 
                 >
            <Form onSubmit={this.handeSubmit} layout="vertical">
            <Row gutter={12}>
                    <Col span={2}>
                    <FormItem
                        label="Исполнитель"
                    >
                        <Select 
                        showSearch
                        style={{ width: '100%' }}
                        defaultValue={this.props.user.id}
                        value={this.props.filters.contractor}
                        placeholder="Исполнитель"
                        onChange={this.handleContractorChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                       {this.props.users.map(usr => <Select.Option key={usr.id} value={usr.id}>{usr.name}</Select.Option>)}
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                    <FormItem
                    label="Поиск"
                    >
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
                        <FormItem
                            label="Статус"
                        >
                            <Select 
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Статус"
                                value = {this.props.filters.status}
                                onChange={this.handleStatusChange}
                            >
                                {this.props.filterData ? this.props.settings.status_types.map(item => <Select.Option key={item.id} value={item.id}>{item.type}</Select.Option>) : ''}
                            </Select>
                    
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem
                            label="Период"
                        >
                            <DatePicker style={{width:'40%'}} placeholder="C" onChange={this.handleDateFrom}/>
                            -
                            <DatePicker style={{width:'40%'}} placeholder="По" onChange={this.handleDateTo}/>
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <FormItem
                            label="Заказчик"
                        >
                            <Select
                                showSearch
                                style={{width:'100%'}}
                                placeholder="Заказчик"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            {this.props.customers.map(customer => <Select.Option key={customer.id} value={customer.id}>{`${customer.name} ${customer.firstname} ${customer.secondname}`}</Select.Option>)}
                            </Select>
                        </FormItem>
                    </Col>

                    <Col span={6}>

                    <FormItem
                        label='&nbsp;'
                    >
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
    getFilterData : (id) => dispatch(getFilterData(id))
})

//export default Filters
export default withRouter(connect(null,mapDispatchToProps)(Filters));