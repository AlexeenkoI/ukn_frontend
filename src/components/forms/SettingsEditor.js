import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Col, Icon, Button } from 'antd'
import { updateValue, createRow, clearRow, insertSetting, updateSetting } from '../../actions/SettingsActions'

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

export class SettingsEditor extends Component {

    componentWillMount(){
      const { match } = this.props;
      console.log(match.params.type);
    }

    componentWillUnmount(){
      const { clearRow } = this.props;
      //Освобождаем стор для создания полей
      clearRow();
    }

  render() {
    const { user, settings, match, setFieldValue, createRow, performInsert, performUpdate } = this.props;
    const values = settings.data[match.params.type];
    console.log(settings.newData);
    return (
      <Fragment>
        <div>
          {settings.description[match.params.type].name}
        </div>
        <Col span={4}>
          {values.map( (item, pos) =>
            Object.keys(item).map((field, index) =>
              field === 'id' ? 
              (<Input type="hidden" key={index} name={field} value={values[pos][field]} />)
                :
              (<FormItem {...formItemLayout} key={index}>
                  <Input 
                    style={{width:"50%", marginRight : "10px"}} 
                    type="text"  
                    name={field} 
                    value={values[pos][field]} 
                    onChange={(e) => setFieldValue(match.params.type, pos, field, e.target.value)}
                  />
                  <Button 
                    onClick={() => performUpdate(user.id, match.params.type, values[pos])}
                    loading={settings.settingsUpdating}
                    icon="edit"
                  >
                    Изменить
                  </Button>
                </FormItem>
              ),   
            )
          )}
          <FormItem {...formItemLayout}>
          { Object.keys(values[0]).map( (field, index) =>
            field !== 'id' &&
            (<Input type="text" key={index} style={{width: "50%", marginRight : "10px"}} name={field} value={settings.newData[field]} onChange={(e) => createRow(match.params.type, field, e.target.value)} />)
          )}
              <Button 
                type="primary" 
                disabled={Object.keys(settings.newData).length === 0 ? true : false} 
                onClick={() => performInsert(user.id, match.params.type, settings.newData)}
                loading={settings.settingsUpdating}
                icon="check"
              >
                Добавить
              </Button>
          </FormItem>
        </Col>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  settings : state.settings
})

const mapDispatchToProps =  (dispatch) => ({
  setFieldValue : (itemType, itemPos, itemField, value) => dispatch(updateValue(itemType, itemPos, itemField, value)),
  createRow : (itemType, itemField, value) => dispatch(createRow(itemType, itemField, value)),
  clearRow : () => dispatch(clearRow()),
  performInsert : (userId, settingType, values) => dispatch(insertSetting(userId, settingType, values)),
  performUpdate : (userId, settingType, settings) => dispatch(updateSetting(userId, settingType, settings))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditor)
