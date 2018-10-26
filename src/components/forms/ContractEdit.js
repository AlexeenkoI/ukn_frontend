import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Divider, Collapse, Upload } from 'antd'
import FieldWrapper from './FieldWrapper'

const AInput = FieldWrapper(Input);
const ACheckbox = FieldWrapper(Checkbox);
const ASelect = FieldWrapper(Select);
const ATextArea = FieldWrapper(Input.TextArea);
const AUpload = FieldWrapper(Upload);



export class ContractEdit extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  uploadFiles = (files) => {
    const status = files.file.status;
    if(status === 'uploading'){
      console.log('uploading');
      console.log(files);
    }
    if(status === 'error'){
      console.log('error uploading');
      console.log(files);
    }
    if(status === 'done'){
      console.log('success upload');
      console.log(files);
    }
    if(status === 'removed'){
      console.log('status remove');
      console.log(files);
    }

  }

  removeFiles = (file) => {
    console.log('remove file');
    console.log(file);
  }

  cReq = (data) => {
      data.custom_id = 2;
      console.log(data);
      setTimeout(()=>{
        //data.onSuccess();
        data.onError();
      },1000);

  }

  render() {
    const {handleSubmit, pristine,submitting, reset, userStatus} = this.props;
    const disabler = userStatus.role > 1 ? true : false;
    return (
      <Form onSubmit={handleSubmit}> 
        <Field type="hidden" component="input" name="id"/>
        <Field label="Номер договора" name="contract_number" component={AInput} disabled={disabler} placeholder="Фамилия" />
        <Field label="Адрес" name="address" component={AInput} placeholder="" disabled={disabler} />
        <Field label="Статус" component={ASelect} name="status">
          {this.props.contractStatuses.map( status => 
            <Select.Option value={status.id} key={status.id}>
            {status.type}
          </Select.Option>
          )}
        </Field>
        <Field label="Комментарии" name="comment" component={ATextArea} rows={4} placeholder="Комментарии" />
        <Row className="add-info-row">
          <Col span={12}>
            <div>Файлы :</div>
            <Upload 
              action={this.props.uploadAction} 
              onChange={this.uploadFiles}  
              customRequest={this.cReq} 
              multiple={true} 
              data={{id: 2}}
            >
              <Button>
                <Icon type="upload" /> Загрузить
              </Button>
            </Upload>
          </Col>
          <Col span={12}>
            Еще что-то
          </Col>
        </Row>
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
      uploadAction : '/',
      contractStatuses : ownProps.statuses,
      //initialValues: ownProps.contractData,
      initialValues : {
        id : ownProps.contractData.id,
        contract_number : ownProps.contractData.contract_number,
        address : ownProps.contractData.address,
        status : ownProps.contractData.status,

      }
  }
}

function mapDispatchToProps(dispatch){

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
