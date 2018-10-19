import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col, Divider,Collapse } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { connect, destroy } from 'react-redux'
const FormItem = Form.Item;

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
        console.log(this.props);
    }

    handleSubmit = values =>{
        console.log(values);
        return false
    }

    render(){
        const {handleSubmit, pristine,submitting, reset} = this.props;
        const submit = (values) => console.log(values);

        return(
            <Form onSubmit={handleSubmit}>
                <Field type="hidden" component="input" name="id"/>
                <Field label="Активнвость" name="is_active" component={ACheckbox} type="checkbox" />
                <Field label="Имя" name="name" component={AInput} placeholder="Имя" hasFeedback />
                <Field label="Фамилия" name="surename" component={AInput} placeholder="Фамилия" />
                <Field label="Логин" name="login" component={AInput} placeholder="" />
                {this.props.userStatus == 1 &&
                    <Field label="Статус" component={ASelect} name="role">
                        {this.props.userRoles.map(role =>
                            <Select.Option value={role.id} key={role.id}>
                              {role.role_name}
                            </Select.Option>
                          )}
                    </Field>
                }
                {this.props.userStatus == 1 &&
                (<Collapse bordered={false}>
                    <Collapse.Panel
                    header='Изменить пароль'
                    >
                        <Field label="Пароль" name="password" component={AInput} type="password"  />
                        <Field label="Повторите Пароль" name="re_password" component={AInput} type="password"  />
                    </Collapse.Panel>
                </Collapse>)
                }
                <Button htmlType="submit" type="primary" disabled={pristine || submitting }>Отправить</Button>
            </Form>
        )
    }
}


const validate = values => {
    const errors = {};
    if(values.password != values.re_password){
        errors.re_password="Пароли должны совпадать.";
    }
  
    return errors;
  }

function mapStateToProps(state, ownProps) {
    return {
        userStatus: state.user.role,
        role : ownProps.userRoles,
        initialValues: {
            id: ownProps.initialValues.id ? ownProps.initialValues.id : 0, 
            is_active: ownProps.initialValues.is_active,
            name : ownProps.initialValues.name,
            surename : ownProps.initialValues.surename,
            login : ownProps.initialValues.login,
            role : state.user.role
        }
    }
}

export default connect(mapStateToProps)(reduxForm({
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

