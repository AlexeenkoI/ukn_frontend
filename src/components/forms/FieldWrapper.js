import React, { Component } from 'react'
import { Form } from 'antd'

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
  /**
   * Wrapper for antd form Components
   * @param Component 
   */
  const FieldWrapper = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
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

  export default FieldWrapper