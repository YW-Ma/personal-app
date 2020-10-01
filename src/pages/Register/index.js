import React, { useState }from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Popover,
  Progress,
} from 'antd'; // 【3】 引入popover，包裹icon
import styles from './index.module.less';

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();  // 数据绑定用的form
  const [visible, setVisible] = useState(false); //【5】 visible
  const [popover, setPopover] = useState(false); //【7】 用于触发重新渲染的state
  const onFinish = (values) => {  // 表单提交的回调
    console.log(values);
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
  // 【5】 在这里写渲染的content的内容。
  // 返回一个Progress，strokeWidth是6px，percent用value.length的函数定义（大于10则100，小于10则length*10），showInfo要false。

  const passwordPopover = () => {
    const value = form.getFieldValue('password');
    return value && value.length && (  // 有值的时候才访问.length 才返回进度条。
      <div>
        <Progress                     // 【6】但是输入的时候，进度条没有跟着走，要触发一下重新渲染。改变state就重新渲染了。
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={true}
        />
        <div>
          请至少输入6位密码。
        </div>
      </div>
    );
  }

  return (                        // Register组件的内容
    <div className={styles.registerContainer}>
      <div className={styles.Register}>
        <Form                     // 包裹在Form内。
          form={form}             // 绑定form，以根据form的值更新UI
          name="register"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
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
            <Input />
          </Form.Item>
          {/*【4】 popover 包裹，placement在右侧，visible用state控制，overlayStyel设定宽度，content是渲染的提示，也要用visible控制（visibel && xxx）false就没了。。 */}
          {/* content是主要编写的，写成function。里面写个div。进度条提示强度、div文字提供说明。 */}
          <Popover
            placement="right"
            visible={visible}
            content={visible && passwordPopover}
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,         // 必须输入
                  message: "Please input your password!"
                },
                // 【2】 这边也需要一个validator，它进行重新校验。不然修改password以迎合confirm的时候会依然说不匹配。
                {
                  validator: (rule, value) => { // 【5】 这里要修改visible这个state，以前不写state的时候渲染不出来，是因为没有重新渲染机制。
                    const promise = Promise;    
                    setPopover(!popover);       // 【8】 为了每次输入一个密符都重新渲染，要在这里不断修改state（popover那个）
                    if (!value) {
                      setVisible(false);
                      return promise.reject("");
                    }
                    if (value.length < 6) {
                      setVisible(true);
                      return promise.reject("");
                    }
                    if (value && !visible) {
                      setVisible(true);
                    }
                    if (value && form.getFieldValue('confirm')) {
                      // 如果password和confirm都有值，那么就重新验证confirm。 
                      form.validateFields(['confirm']);
                    }
                    return promise.resolve() // 自己则无论如何都返回一个fulfilled的promise，不然也会报错。
                  }
                }
              ]}
              hasFeedback                 // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。
            >
              {/* 使用Input.Password，用户就可以选择是否显示密码明文 */}
              <Input.Password />
            </Form.Item>
          </Popover>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            rules={[
              {
                required: true,           // 必须输入
                message: "Please confirm your password!"
              },
              // 【1】 添加第一个validator
              ({ getFieldValue }) => ({    // ((form: FormInstance) => RuleConfig);  function动态获取form数据。
                // Validator： (rule, value) => Promise
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve(); // 如果没输入confirm，或者confirm和password一致，就返回一个fulfilled的promise
                  }

                  return Promise.reject("The two passwords that you entered do not match!") // 否则返回一个rejected的promise，并带上错误信息。
                }
              }),
            ]}
            hasFeedback                 // 在输入框右侧，可以显示一个绿色勾勾 或者 红色叉叉 作为反馈。 它的效果和validator返回的promise状态有关。
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
            >
            </Input>
          </Form.Item>

          <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={20}>
              {/* gutter 的单位是像素 */}
              <Col span={8}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Please input the captcha you got!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>


          {/* 同意协议checkbox，注意偏移8个格子 */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
            wrapperCol={{ span: 16, offset: 8 }}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>

          {/* Register按钮，也要偏移8个格子 */}
          <Form.Item
            wrapperCol={{ span: 16, offset: 8 }}
          >
            <Button type="primary" htmlType="submit">
              Register
        </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}

export default Register;