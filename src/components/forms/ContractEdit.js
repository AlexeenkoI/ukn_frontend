import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { Form, Icon, Input, Button, Select, Row, Col, Upload, DatePicker } from 'antd'
import FieldWrapper from './FieldWrapper'
import { getContract, updateContract} from '../../actions/WorkSheetActions'
import { getUserList } from '../../actions/UserListActions'
import Preloader from '../Preloader'
import moment from 'moment'

const defaultGrid = {
  xs : 12,
  sm : 24, 
  md : 20,
  lg : 12,  
  xl : 8,
}


const AInput = FieldWrapper(Input);
const ASelect = FieldWrapper(Select);
const ATextArea = FieldWrapper(Input.TextArea);
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
      <DatePicker {...input} {...rest} value={input.value === '' ? null : moment(input.value) } format="YYYY-MM-DD" />
    </FormItem>
  );
};


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
    const { match, user, getOne, userList, getUsers } = this.props;
    console.log(this.props);
    if(typeof match !== 'undefined'){
      getOne(user.id, match.params.id);
    }

    if(!userList.isLoading){
      getUsers(user.id);
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
    delete values.date_started;
    values.date_deadline = moment(values.date_deadline).format("X")
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
      //setTimeout(()=>{
      //  //data.onSuccess();
      //  data.onError();
      //},1000);


  }

  render() {
    const {handleSubmit, pristine,submitting, user, contractFetching, settings , grid, userList} = this.props;
    const disabler = user.role > 1 ? true : false;
    if(this.state.needRedirect) return <Redirect to="/contracts"/>

    if(contractFetching) return <Preloader/>

    return (
      <Row>
        <Col {...grid}>
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
            <Field 
              label="Исполнитель" 
              name="contractor" 
              component={ASelect}
              //mode="multiple"
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} 
            >
              <Select.Option key="0" value={0}>
                  Не указан
              </Select.Option>
              { userList.data.map( contractor =>
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

            <Field label="Комментарии" name="comment" component={ATextArea} rows={4} placeholder="Комментарии" />
            <Field 
              label="Стоимость" 
              name="price" 
              component={AInput} 
              placeholder="Полная стоимость" 
              addonAfter="руб" />
             <Field label="Оплачено/Внесено" name="paid" component={AInput} placeholder="Оплачено" addonAfter="руб" />
            <Row className="add-info-row">
              <Col span={12}>
                <div>Файлы :</div>
                <Upload 
                  action={this.props.uploadAction} 
                  onChange={this.uploadFiles}  
                  //customRequest={this.cReq} 
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
        </Col>
      </Row>
    )
  }
}


const validate = values => {
  const errors = {};
  console.log(values);
  if(!values.customer_id){
    errors.customer_id = "Вы должны выбрать клиента."
  }
  if(!values.status){
    errors.status = "Присвойте заявлению статус."
  }
  if(!values.date_deadline){
    errors.date_deadline = "Выберите дату окончания работ."
  }
  if(!values.contractor || values.contractor === []){
    errors.contractor = "Выберите исполнителя."
  }
  if(!values.type_of_work){
    errors.type_of_work = "Выберите тип работ"
  }
  if(!values.price){
    errors.price = "Поле стоимость должно быть заполнено."
  }
  if(/^[1-90-9]+$/.test(values.price) === false){
    errors.price = "Поле должно быть заполнено числами."
  }
  if(/^[1-90-9]+$/.test(values.paid) === false){
    errors.paid = "Поле должно быть заполнено числами."
  }
  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    user : state.user,
    userStatus : state.user,
    contractFetching : state.contracts.contractLoading,
    uploadAction : '/api/upload',
    userList : state.userList,
    contractStatuses : state.contracts.filterData.types,
    settings : state.settings.data,
    grid : ownProps.gridSettings || defaultGrid,
    initialValues: state.contracts.currentContract,
  }
}

const mapDispatchToProps = dispatch =>({
  getOne : (uId, contractId) => dispatch(getContract(uId, contractId)),
  insertOne : (uId, formData, filterData) => dispatch(updateContract(uId,formData,filterData)),
  getUsers : (uid) => dispatch(getUserList(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form:'ContractEdit',
  validate,
  enableReinitialize : true,
  destroyOnUnmount: true
})(ContractEdit))

