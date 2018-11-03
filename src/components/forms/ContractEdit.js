import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Divider, Collapse, Upload } from 'antd'
import FieldWrapper from './FieldWrapper'
import { getContract, updateContract} from '../../actions/WorkSheetActions'
import Preloader from '../Preloader'

const AInput = FieldWrapper(Input);
const ACheckbox = FieldWrapper(Checkbox);
const ASelect = FieldWrapper(Select);
const ATextArea = FieldWrapper(Input.TextArea);
const AUpload = FieldWrapper(Upload);



class ContractEdit extends Component {
  constructor(props){
    super(props);
    //console.log(this.props);
    this.state = {
      needRedirect : false
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount = () =>{
    const { match, user, getOne } = this.props;
    console.log(this.props);
    if(typeof match != 'undefined'){
        getOne(user.id, match.params.id);
    }
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

  onSubmit = values => {
    const { user, insertOne } = this.props;
    console.log(values);
    delete values.name;
    insertOne(user.id, values);
    this.setState({
      needRedirect : true
    })
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
    const {handleSubmit, pristine,submitting, reset, user, contractFetching, settings} = this.props;
    const disabler = user.role > 1 ? true : false;
    if(this.state.needRedirect) return(<Redirect to="/contracts"/>)

    if(contractFetching) return(<Preloader/>)

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}> 
        <Field type="hidden" component="input" name="id"/>
        <Field label="Номер договора" name="contract_number" component={AInput} disabled={disabler} placeholder="Фамилия" />
        <Field label="Адрес" name="address" component={ATextArea} placeholder="" disabled={disabler} />
        <Field label="Статус" component={ASelect} name="status">
          {settings.status_types.map( status => 
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
        <Button loading={submitting} htmlType="submit" type="primary" disabled={pristine || submitting }>Изменить</Button>

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
      user : state.user,
      userStatus : state.user,
      contractFetching : state.contracts.contractLoading,
      uploadAction : '/',
      contractStatuses : state.contracts.filterData.types,
      settings : state.settings,
      initialValues: state.contracts.currentContract,
      //initialValues : {
      //  id : ownProps.contractData.id,
      //  contract_number : ownProps.contractData.contract_number,
      //  address : ownProps.contractData.address,
      //  status : ownProps.contractData.status,
//
      //}
  }
}

const mapDispatchToProps = dispatch =>({
  getOne : (uId, contractId) => dispatch(getContract(uId, contractId)),
  insertOne : (uId, formData, filterData) => dispatch(updateContract(uId,formData,filterData))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form:'ContractEdit',
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
