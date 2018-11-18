import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Row, Col } from 'antd'
import FieldWrapper from './FieldWrapper'
import {insertCustomer, updateCustomer, getCurrentCustomer, clearInsert} from '../../actions/CustomersActions'

const AInput = FieldWrapper(Input);

const defaultGrid = {
    xs : 12,
    sm : 24, 
    md : 20,
    lg : 12,  
    xl : 8,
  }

class CustomerEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            needRedirect : false
        }
    }
    componentWillMount(){
        const { match, user, getOne } = this.props;
        //console.log(Object.keys(match.params).length);
        if(typeof match !== 'undefined' && Object.keys(match.params).length !== 0){
            getOne(user.id, match.params.id);
        }

    }

    componentWillUnmount(){
        const { clearAll, noRedirect } = this.props
        if(!noRedirect)
            clearAll();
    }

    submitForm = (values) => {
        const { user, insertOne, updateOne, callback } = this.props;
        if(values.id > 0){
            updateOne(user.id, values);
        }else{
            insertOne(user.id, values);
        }
        this.setState({
            needRedirect : true
          })
        if(callback){
            callback();
        }
    }

    render() {
        const { handleSubmit, pristine,submitting, fetching, match, noRedirect, grid } = this.props;
        if(this.state.needRedirect &&(!noRedirect)) return(<Redirect to="/customers"/>)
        return (
            <Row>
                <Col {...grid} >
                    <Form onSubmit={handleSubmit(this.submitForm)}>
                        <Field type="hidden" component="input" name="id"/>
                        <Field label="Имя" name="name" component={AInput} placeholder="Имя" hasFeedback />
                        <Field label="Фамилия" name="firstname" component={AInput} placeholder="Фамилия" />
                        <Field label="Отчество" name="secondname" component={AInput} placeholder="Отчество" />
                        <Field label="Почта" type="email" name="email" component={AInput} placeholder="Почта" />
                        <Field addonBefore="+7" label="Телефон" name="phone" component={AInput} placeholder="Теелфон" />
                        <Button loading={fetching} htmlType="submit" type="primary" disabled={pristine || submitting }>{(typeof match !== 'undefined' && Object.keys(match.params).length !== 0) ? "Изменить" : "Создать"}</Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Необходимо указать имя."
    }
    if(/^[а-яёА-ЯЁ]+$/.test(values.name) === false){
        errors.name = "Имя обязательно и  должно содержать только кириллицу."
    }
    if(!values.firstname){
        errors.firstname = "Необходимо указать фамилию."
    }
    if(/^[а-яёА-ЯЁ]+$/.test(values.firstname) === false){
        errors.firstname = "Фамилия обязательна и  должна содержать только кириллицу."
    }
    if(!values.phone){
        errors.phone = "Телефон обязателен к заполнению"
    }
    if(/^[1-90-9]+$/.test(values.phone) === false){
        errors.phone = "Телефон должен состоять только из цифр."
    }
  
    return errors;
  }
  
  function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        userStatus : '',
        noRedirect : ownProps.noRedirect || false,
        newForm : state.customersList.currentCustomer.id || 0,
        fetching : state.customersList.updating,
        contractStatuses : ownProps.statuses,
        grid : ownProps.gridSettings || defaultGrid,
        initialValues : state.customersList.currentCustomer,
        callback : ownProps.onAdd || false
        
    }
  }
  
  const mapDispatchToProps = dispatch =>({
   insertOne : (uid, formData) => dispatch(insertCustomer(uid, formData)),
   updateOne : (uid, formData) => dispatch(updateCustomer(uid, formData)),
   getOne : (uid, id) => dispatch(getCurrentCustomer(uid, id)),
   clearAll : () => dispatch(clearInsert())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form:'CustomerForm',
    validate,
    enableReinitialize : true,
    destroyOnUnmount: true
  })(CustomerEdit))
