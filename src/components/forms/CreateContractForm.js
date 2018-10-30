import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Modal, Checkbox, Select, Row, Col, Divider, Collapse, Steps, DatePicker } from 'antd';
import FieldWrapper from './FieldWrapper'
import CustomerEdit from '../forms/CustomerEdit'
import moment from 'moment'

import { getCustomersList, insertCustomer} from '../../actions/CustomersActions'
import { getUserList } from '../../actions/UserListActions'
import  { createContract } from '../../actions/WorkSheetActions'

const Step = Steps.Step;
const AInput = FieldWrapper(Input);
const ASelect = FieldWrapper(Select);
const ATextArea = FieldWrapper(Input.TextArea);
const ADate = FieldWrapper(DatePicker)
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
      xl: { span: 24 },
      xs: { span: 24 },
      sm: { span: 24 }
    },
    wrapperCol: {
      xl: { span: 24 },
      xs: { span: 24 },
      sm: { span: 24 }
    }
  };
const DateWrapper = ({ input, meta, children, hasFeedback, label, value, format, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <DatePicker {...input} {...rest} value={input.value == '' ? null : moment(input.value) } />
      </FormItem>
    );
  };

class CreateContractForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            step : 0,
            showCustomersForm : false,
            needToRedirect : false
        }
    }

    componentWillMount = () =>{
        const { user, getCustomers, getUsers } = this.props;
        getCustomers(user.id);
        getUsers(user.id)
    }

    increaseStep = () => {
        this.setState({
            step : this.state.step + 1
        })
    }
    decreaseStep = () => {
        this.setState({
            step : this.state.step - 1 > 0 ? this.state.step - 1 : 0
        })
    }

    toggleCreateCustomersForm = () => {
        this.setState({
            showCustomersForm : false
        })
    }

    onFormSubmit = (values) => {
        const { user, createOne } = this.props;
        console.log('from submitted');
        console.log(values);
        createOne(user.id, values);
        this.setState({
            needToRedirect:true
        })
    }

    openForm = () => {
        this.setState({
            showCustomersForm : true
        })
    }
    render() {
        const { handleSubmit, pristine,submitting, reset, workTypes, customers, contractors } = this.props;
        if(this.state.needToRedirect) return( <Redirect to="/contracts"/>)
        return (
            <Fragment>
                <Row type="flex" justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col xs={12} sm={24} md={20} lg={24} xl={12}>
                        <Steps current={this.state.step}>
                            <Step title="Вид работ" description="Описание, тип" icon={<Icon type="exception" theme="outlined" />} />
                            <Step title="Данные о заявителе" description="" icon={<Icon type="idcard"  />} />
                            <Step title="Срок сдачи" description="Срок сдачи и исполнитель" icon={<Icon type="calendar" />} />
                        </Steps>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(this.onFormSubmit)}>
                <Row type="flex" justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                   
                    <Col xs={12} sm={24} md={20} lg={12} xl={6} >

                        <Field label="Адрес" name="address" component={ATextArea} placeholder="Адрес" />
                        <Field 
                            label="Вид работ" 
                            component={ASelect} 
                            name="type_of_work"
                            showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {workTypes.map( type =>{
                                <Select.Option value={type.id} key={type.id}>
                                    {type.work_type}
                                </Select.Option>
                            })}
                        </Field>
                        <Field label="Дополнительная информация" name="comment" component={ATextArea} />
                        { this.state.step > 1 &&
                            <Fragment>
                                    <Field 
                                    label="Исполнитель" 
                                    name="contractor" 
                                    component={ASelect}
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} 
                                    >
                                    <Select.Option key="0" value={0}>
                                        Не указан
                                    </Select.Option>
                                    { contractors.map( contractor =>
                                        <Select.Option key={contractor.id} value={contractor.id}>
                                            {contractor.name}
                                        </Select.Option>
                                    )}
                                </Field>
                                <Field 
                                    label="Исполнить до" 
                                    name="date_deadline" 
                                    component={DateWrapper}
                                    disabledDate={(current)=>{
                                        return current && current.valueOf() < Date.now();
                                    }}
                                />
                                <Field 
                                    label="Статус заявления" 
                                    name="status" 
                                    component={ASelect}
                                    defaultActiveFirstOption
                                    
                                >
                                {/* TO DO лист статусов заявок */}
                                <Select.Option key={1} value={1}>
                                Создан
                                </Select.Option>
                                <Select.Option key={2} value={2}>
                                В работе
                                </Select.Option>
                                <Select.Option key={3} value={3}>
                                Выполнен
                                </Select.Option>
                                <Select.Option key={4} value={4}>
                                Завершен
                                </Select.Option>
                                </Field>
                            </Fragment>
                        
                        }
                        {this.state.step > 0 && <Button style={{marginRight:'10px'}} type="primary" onClick={this.decreaseStep}><Icon type="left" /> Назад</Button>}
                        {this.state.step < 2 && <Button type="primary" onClick={this.increaseStep}>Далее <Icon type="right" /></Button>}
                        {this.state.step == 2  && (
                            
                            <Button style={{display:"block", marginTop : "25px"}} htmlType="submit" type="primary" disabled={pristine || submitting }>Создать</Button>
                        )} 

                    </Col>
                    <Col xs={12} sm={24} md={20} lg={12} xl={6}>
                        { this.state.step > 0 &&
                            <Fragment>
                                <Field 
                                    label="Клиент" 
                                    name="customer_id" 
                                    component={ASelect}
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    defaultActiveFirstOption={true}
                                    defaultValue={0}
                                >
                                <Select.Option key={0} value={0}>
                                    Не указан
                                </Select.Option>
                                {customers.map(customer => 
                                    <Select.Option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </Select.Option>
                                )}
                                {/* TO DO лист заявителей заявок */}
                                </Field>
                                <Button type="primary" onClick={this.openForm}><Icon type="user-add" theme="outlined" />Добавить заявителя</Button>
                            </Fragment>
                        }
                    </Col>
                    
                </Row>
                </Form>
                <Modal
                    footer={false}
                    visible={this.state.showCustomersForm}
                    onCancel={this.toggleCreateCustomersForm}
                    title="Добавить клиента"
                    destroyOnClose={true}
                >
                    <CustomerEdit  />
                </Modal>
            </Fragment>
        );
    }
}

const validate = values => {
    const errors = {};
  
    return errors;
  }
  
  function mapStateToProps(state, ownProps) {
    return {
        user : state.user,
        customers : state.customersList.data,
        contractors : state.userList.data,
        st : state.customersList,
        workTypes : [{}],
        //userStatus : state.user,
        //uploadAction : '/',
        //contractStatuses : ownProps.statuses,
        //initialValues: ownProps.contractData,
        initialValues : {
            customer_id : state.customersList.lastInsertId || 0,
            contractor : 0,
            status : 1
        }
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    getCustomers : (uId) => dispatch(getCustomersList(uId)),
    insertOne : (uid, formData) => dispatch(insertCustomer(uid, formData)),
    getUsers : (uid) => dispatch(getUserList(uid)),
    createOne : (uId, formData) => dispatch(createContract(uId,formData))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form:'CreateContractForm',
    validate,
    enableReinitialize : true,
    destroyOnUnmount: true
  })(CreateContractForm))

//export default connect(
//    mapStateToProps,
//)(CreateCustomerForm);