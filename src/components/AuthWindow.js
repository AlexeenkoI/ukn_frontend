import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {tryToLogin} from '../actions/LoginActions';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span:3 },
    wrapperCol: { span:12,offset: 6 },
  };

class AuthWindow extends Component{
    constructor(props){
        super(props);
        this.props = props;
        this.handleSubmit.bind(this);
    }

    componentWillMount(){
        document.body.style.backgroundColor = "#E0F2F1";
        if(this.getCookie("autoLogin")){
         
         //this.handleSubmit();
          //this.props.form.validateFields((err, values) => {
          //  if (!err) {
          //    this.props.loginAction(values.userName, values.password, values.remember);
          //  }
          //});
        }
    }
    componentDidMount(){
      
    }
     getCookie(name) {
        var matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            this.props.loginAction(values.userName, values.password, values.remember);
          }
        });
      }


    render(){
        const { getFieldDecorator } = this.props.form;

        return(
        
        <div className="auth_block">
            <div className="app_logo fadeInDown animated"></div>
            <div className="auth_inner fadeIn animated">   
                <span className="subheader">Вход в офис</span>
                <Form id="app_login" onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Пожалуйста введите логин' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Пожалуйста введите пароль' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                      })(
                        <Checkbox>Автоматический вход</Checkbox>
                      )}
                      <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.userData.isFetching}>
                        Войти
                      </Button>
                    </FormItem>
                    {this.props.userData.errMsg ?  '' : '' }
                </Form>
            </div>
        </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(AuthWindow);

const mapStateToProps = store =>{
  //console.log(store);
  return {
    userData : store.user
  }
}

const mapDispatchToProps = dispatch =>({
  loginAction : (login, password, isRemember) => dispatch(tryToLogin(login,password,isRemember))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm));