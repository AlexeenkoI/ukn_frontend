import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Divider, Collapse, Upload } from 'antd'
import FieldWrapper from './FieldWrapper'

const AInput = FieldWrapper(Input);
const ACheckbox = FieldWrapper(Checkbox);

class CustomerEdit extends Component {
    render() {
        const { handleSubmit, pristine,submitting, reset } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Field type="hidden" component="input" name="id"/>
                <Field label="Имя" name="name" component={AInput} placeholder="Имя" hasFeedback />
                <Field label="Фамилия" name="firstname" component={AInput} placeholder="Фамилия" />
                <Field label="Отчество" name="secondname" component={AInput} placeholder="Фамилия" />
                <Field label="Почта" type="email" name="email" component={AInput} placeholder="Фамилия" />
                <Field label="Телефон" name="phone" component={AInput} placeholder="Фамилия" />
                <Button htmlType="submit" type="primary" disabled={pristine || submitting }>Изменить</Button>
            </Form>
        );
    }
}

const validate = values => {
    const errors = {};
  
    return errors;
  }
  
  function mapStateToProps(state, ownProps) {
    return {
        userStatus : '',
        contractStatuses : ownProps.statuses,
        initialValues : ownProps.customerData
        
    }
  }
  
  function mapDispatchToProps(dispatch){
  
  }
  
  export default connect(mapStateToProps)(reduxForm({
    form:'CustomerForm',
    validate,
    enableReinitialize : true,
    destroyOnUnmount: true
  })(CustomerEdit))
