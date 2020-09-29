import React from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
} from 'antd';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const Register = () => {
  const [form] = Form.useForm();  // 数据绑定用的form

  const onFinish = (values) =>{   // 表单提交的回调

  };

  const prefixSelector = (        // 下拉选择框，要用嵌套的Form.Item包裹
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="01">+01</Option>
      </Select>
    </Form.Item>
  );

  return (                        // Register组件的内容
    <Form                         // 包裹在Form内。
      {...formItemLayout}
      form={form}           // 绑定form，以根据form的值更新UI
      name="register"       
      onFinish={onFinish}   
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >
      {/* 五个输入框的位置（尚未详细写出） */}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",          // E-mail 格式类型
            message: "The input is not valid E-mail",
          },
          {
            required: true,         // 必须输入
            message: "Please input your E-mail"
          }
        ]}
      >
        {/* 这个Form.Item包裹一个Input组件 */}
        <Input/>
      </Form.Item>
                  
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,         // 必须输入
            message: "Please input your password!"
          }
        ]}
        hasFeedback                 // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。
      >
        {/* 使用Input.Password，用户就可以选择是否显示密码明文 */}
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        rules={[
          {
            required: true,           // 必须输入
            message: "Please confirm your password!"
          },
          
          
          ({ getFieldValue }) =>({    // ((form: FormInstance) => RuleConfig);  function动态获取form数据。
            // Validator： (rule, value) => Promise
            validator(rule, value) {
              if(!value || getFieldValue('password') === value) {
                return Promise.resolve(); // 如果没输入confirm，或者confirm和password一致，就返回一个fulfilled的promise
              }

              return Promise.reject("The two passwords that you entered do not match!") // 否则返回一个rejected的promise，并带上错误信息。
            }
          }),
        ]}
        hasFeedback                 // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。
      >
        {/* 使用Input.Password，用户就可以选择是否显示密码明文 */}
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        >
        </Input>
      </Form.Item>
      
      <Form.Item/>

      {/* checkbox与提交Button的位置 */}
      <Form.Item/>
      <Form.Item/>
    </Form>
  )
}

export default Register;