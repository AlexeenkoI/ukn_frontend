import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Divider } from 'antd'

const FormItem = Form.Item;

const labelLayout = {
    xs : {span : 4},
    sm : {span : 4}
}

class UsersForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            changePwd : false
        }
        this.changePwdBttnClick = this.changePwdBttnClick.bind(this);
    }


    changePwdBttnClick = () =>{
        console.log('click')
        this.setState({
            changePwd : !this.state.changePwd
        })
    }

    render(){
        return(
            <div>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                            <div style={{textAlign:'center'}}>Личные данные</div>
                        <Col>
                            <FormItem label="Имя" labelCol={labelLayout}>
                                <Input placeholder="Имя" style={{width:'50%'}}/>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="Фамилия" labelCol={labelLayout}>
                                <Input placeholder="Фамилия" style={{width:'50%'}}/>
                            </FormItem>
                        </Col>
                        <Divider/>
                        <Col>
                            <div style={{textAlign:'center'}}>Учетные данные:</div>
                            <FormItem label="Логин" labelCol={labelLayout}>
                                <Input placeholder="Логин" style={{width:'50%'}}/>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="Пароль" labelCol={labelLayout}>
                                <Input placeholder="Новый пароль" style={{width:'50%'}}/>
                            </FormItem> 

                            <Button onClick={this.changePwdBttnClick} type="primary">Сохранить изменения</Button>
                            <Button type="danger">Отмена</Button>
                        </Col>
                    </Form>
                </Row>
            </div>
        )
    }
}
export default UsersForm