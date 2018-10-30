import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Divider, Collapse, Upload } from 'antd'
import FieldWrapper from './FieldWrapper'
import {insertCustomer, getCurrentCustomer, clearInsert} from '../../actions/CustomersActions'

const AInput = FieldWrapper(Input);
const ACheckbox = FieldWrapper(Checkbox);

class CustomerEdit extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        const { match, user, getOne } = this.props;
        if(typeof match != 'undefined'){
            getOne(user.id, match.params.id);
        }

    }

    componentWillUnmount(){
        const { clearAll } = this.props
        clearAll();
    }

    submitForm = (values) => {
        const { user, insertOne } = this.props;
        insertOne(user.id, values);
    }

    render() {
        const { handleSubmit, pristine,submitting, reset, fetching, newForm, match } = this.props;
        return (
            <Row>
                <Col >
                    <Form onSubmit={handleSubmit(this.submitForm)}>
                        <Field type="hidden" component="input" name="id"/>
                        <Field label="Имя" name="name" component={AInput} placeholder="Имя" hasFeedback />
                        <Field label="Фамилия" name="firstname" component={AInput} placeholder="Фамилия" />
                        <Field label="Отчество" name="secondname" component={AInput} placeholder="Фамилия" />
                        <Field label="Почта" type="email" name="email" component={AInput} placeholder="Фамилия" />
                        <Field label="Телефон" name="phone" component={AInput} placeholder="Фамилия" />
                        <Button loading={fetching} htmlType="submit" type="primary" disabled={pristine || submitting }>{typeof match != 'undefined' ? "Изменить" : "Создать"}</Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const validate = values => {
    const errors = {};
  
    return errors;
  }
  
  function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        userStatus : '',
        newForm : state.customersList.currentCustomer.id,
        fetching : state.customersList.updating,
        contractStatuses : ownProps.statuses,
        initialValues : state.customersList.currentCustomer
        
    }
  }
  
  const mapDispatchToProps = dispatch =>({
   insertOne : (uid, formData) => dispatch(insertCustomer(uid, formData)),
   getOne : (uid, id) => dispatch(getCurrentCustomer(uid, id)),
   clearAll : () => dispatch(clearInsert())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form:'CustomerForm',
    validate,
    enableReinitialize : true,
    destroyOnUnmount: true
  })(CustomerEdit))
