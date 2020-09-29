import React, { useState } from 'react'
import { Form } from 'antd'
import InputItem from '../../components/InputItem'
import SubmitButton from '../../components/SubmitButton'
import { MailOutlined, LockTwoTone } from '@ant-design/icons';
import styles from './index.module.less'

const Register = () => {
    const handleFinish = (values) => {
        console.log(values)  //会自动传入一个values，submit的时候调用onFinish
    }
    const promise = Promise;
    const checkConfirm = (_, value) => { // (rule, value) => Promise
        if (value && value !== form.getFieldValue('password')) { // 如果填了确认密码，但是确认密码和密码不一样。
            return promise.reject('两次输入的密码不一致！'); // 注意，老师先检查了value是否存在！
        }
        return promise.resolve(); // 成功的时候 或者什么都没输入的时候
    }
    const [form] = Form.useForm();
    const mainTheme = {
        color: "#1890ff"
    }

    return (
        // 背景容器
        <div className={styles.registerContainer}>
            <div className={styles.register}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                >
                    {/* 邮箱 */}
                    <InputItem
                        name="mail"
                        prefix={
                            <MailOutlined style={mainTheme} />
                        }
                        placeholder="邮箱"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱！'
                            },
                            {
                                type: 'email', // 校验邮箱格式
                                message: '请填写正确的邮箱格式',
                            }
                        ]}
                    />
                    {/* 密码 */}
                    <InputItem
                        name="password"
                        prefix={
                            <LockTwoTone style={mainTheme} />
                        }
                        placeholder="至少六位密码，区分大小写"
                        size="large"
                        type="password"
                        rules={[{
                            required: true,
                            message: '请设置密码！'
                        }]}
                    />
                    {/* 确认密码： 注意要实现和密码的联动 */}
                    <InputItem
                        name="confirm"
                        prefix={
                            <LockTwoTone style={mainTheme} />
                        }
                        placeholder="确认密码"
                        size="large"
                        type="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入确认密码！'
                            },
                            {
                                validator: checkConfirm,
                            }
                        ]}
                    />
                </Form>
            </div>
        </div>
    )
};

export default Register;