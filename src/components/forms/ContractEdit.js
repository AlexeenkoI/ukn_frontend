import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Divider, Collapse } from 'antd'
import FieldWrapper from './FieldWrapper'
import TextArea from 'antd/lib/input/TextArea';

const AInput = FieldWrapper(Input);
const ACheckbox = FieldWrapper(Checkbox);
const ASelect = FieldWrapper(Select);
const ATextArea = FieldWrapper(Input.TextArea);



export class ContractEdit extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  render() {
    const {handleSubmit, pristine,submitting, reset, userStatus} = this.props;
    const disabler = userStatus.role > 1 ? true : false;
    return (
      <Form onSubmit={handleSubmit}> 
        <Field type="hidden" component="input" name="id"/>
        <Field label="Номер договора" name="contract_number" component={AInput} disabled={disabler} placeholder="Фамилия" />
        <Field label="Адрес" name="address" component={AInput} placeholder="" disabled={disabler} />
        <Field label="Статус" component={ASelect} name="type_of_work">
          {this.props.contractStatuses.map( status => 
            <Select.Option value={status.id} key={status.id}>
            {status.type}
          </Select.Option>
          )}
        </Field>
        <Field label="Комментарии" name="login" component={ATextArea} rows={4} placeholder="Комментарии" />
        <Button htmlType="submit" type="primary" disabled={pristine || submitting }>Изменить</Button>

      </Form>
    )
  }
}


const validate = values => {
  const errors = {};

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
      userStatus : state.user,
      contractStatuses : ownProps.statuses,
      initialValues: ownProps.contractData
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'ContractForm',
  validate,
  enableReinitialize : true,
  destroyOnUnmount: true
})(ContractEdit))

//export default connect(mapStateToProps, mapDispatchToProps)(ContractEdit)
//export default ContractEdit = reduxForm({
//    form: 'ContractForm',
//    //validate, // a unique identifier for this form
//
//},mapStateToProps)(ContractEdit)
