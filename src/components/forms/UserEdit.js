import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Select, Row, Col, Collapse } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, updatedUser, insertUser} from '../../actions/UserListActions'
import Preloader from '../Preloader'
const FormItem = Form.Item;

const defaultGrid = {
    xs : 12,
    sm : 24, 
    md : 20,
    lg : 12,  
    xl : 8,
}

/**
 *  Redux field with antd https://codesandbox.io/s/jzyl70wpk
 */

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  };

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <Component {...input} {...rest} children={children} />
      </FormItem>
    );
  };

  const AInput = makeField(Input);
  const ACheckbox = makeField(Checkbox);
  const ASelect = makeField(Select);

/**
 * Форма редактирования пользователя
 * Поля меняются в зависимости от уровня доступа
 * 1 - Администратор
 * 2 - Менеджер
 * 3 - Исполнитель
 */
class UserEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            needToRedirect : false
        }
    }

    componentWillMount(){
        const { match, user, getOne } = this.props;
        if(typeof match !== 'undefined'){
            getOne(user.id, match.params.id);
        }
    }

    handleSubmit = values =>{
        const { user, updateOne, createOne } = this.props;
        delete values.re_password;
        delete values.status_text;
        if(values.is_active === true){
            values.is_active = 1;
        }else{
            values.is_active = 0;
        }
        if(values.id > 0){
            updateOne(user.id, values);
        }else{
            createOne(user.id, values);
        }
        this.setState({
            needToRedirect : true
        })
    }

    render(){
        const { user, handleSubmit, pristine, submitting, userFetch, settings, grid, initialValues } = this.props;
        if(this.state.needToRedirect) return(<Redirect to="/users"/>)
        if(userFetch)
            return(<Preloader/>)
        
        return(
            <Row type="flex" justify="left">
                <Col {...grid} >
                    <Form onSubmit={handleSubmit(this.handleSubmit)}>
                        <Field type="hidden" component="input" name="id"/>
                        {user.id !== initialValues.id &&
                            <Field label="Активнвость" name="is_active" component={ACheckbox}  type="checkbox" />
                        }
                        <Field label="Имя" name="name" component={AInput} placeholder="Имя" hasFeedback />
                        <Field label="Фамилия" name="surename" component={AInput} placeholder="Фамилия" />
                        <Field label="Логин" name="login" component={AInput} placeholder="" />
                        {this.props.userStatus === 1 &&
                            <Field 
                                label="Статус" 
                                component={ASelect}  
                                name="role"
                            >
                                {settings.roles.map(role =>
                                    <Select.Option value={role.id} key={role.id}>
                                        {role.role}
                                    </Select.Option>
                                )}
                            </Field>
                        }
                        {this.props.userStatus === 1 &&
                        (<Collapse bordered={false}>
                            <Collapse.Panel
                            style={{border:0}}
                            header='Изменить пароль'
                            >
                                <Field label="Пароль" name="password" component={AInput} type="password"  />
                                <Field label="Повторите Пароль" name="re_password" component={AInput} type="password"  />
                            </Collapse.Panel>
                        </Collapse>)
                        }
                        <Button htmlType="submit" type="primary" disabled={pristine || submitting }>Отправить</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}


const validate = values => {
    const errors = {};
    if(values.password !== values.re_password){
        errors.re_password="Пароли должны совпадать.";
    }
    if(!values.name){
        errors.name = "Необходимо указать имя пользователя."
    }
    if(/^[а-яёА-ЯЁ]+$/.test(values.name) === false){
        errors.name = "Имя пользователя обязательно и  должно содержать только кириллицу"
    }
    if(!values.login){
        errors.login = "Необходимо указать Логин"
    }
    if(/^[a-zA-Z1-9]+$/.test(values.login) === false){
        errors.login = "В логине могут использоваться только латинские буквы и цифры"
    }

    if(!values.role){
        errors.role = "Необходимо выбрать роль пользователя";
    }
  
    return errors;
  }

function mapStateToProps(state, ownProps) {
    return {
        user : state.user,
        userStatus: state.user.role,
        role : ownProps.userRoles,
        settings : state.settings.data,
        userFetch : state.userList.userIsLoading,
        initialValues : state.userList.currentUserData,
        grid : ownProps.gridSettings  || defaultGrid
        //initialValues: {
        //    id: ownProps.initialValues.id ? ownProps.initialValues.id : 0, 
        //    is_active: ownProps.initialValues.is_active,
        //    name : ownProps.initialValues.name,
        //    surename : ownProps.initialValues.surename,
        //    login : ownProps.initialValues.login,
        //    role : ownProps.initialValues.role
        //}
    }
}

const mapDispatchToProps = dispatch =>({
    getOne : (uId, id) => dispatch(getUser(uId,id)),
    createOne : (uId, formData) => dispatch(insertUser(uId, formData)),
    updateOne : (uId, formData)=> dispatch(updatedUser(uId, formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form:'UserForm',
  validate,
  enableReinitialize : true,
  destroyOnUnmount: true
})(UserEdit))

//export default UserEdit = reduxForm({
//    form: 'UserForm',
//    validate, // a unique identifier for this form
//
//  },mapStateToProps)(UserEdit)

  //export default UserEdit = connect(
  //  state => ({
  //    initialValues: state.userList.currentUserData // pull initial values from account reducer
  //  })
  //)(UserEdit);

