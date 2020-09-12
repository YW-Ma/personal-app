import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Tabs, Form, Checkbox, Row } from 'antd'
import InputItem from '../../components/InputItem'
import SubmitButton from '../../components/SubmitButton'
import { MailOutlined, LockTwoTone } from '@ant-design/icons';
import styles from './index.module.less'

const Register = () => {
    const handleFinish = (values) => {
        //会自动传入一个values，submit的时候调用onFinish
        console.log(values)
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
                    <InputItem
                        name="password"
                        prefix={
                            <LockTwoTone style={mainTheme} />
                        }
                        placeholder="密码"
                        size="large"
                        type="password"
                        rules={[{
                            required: true,
                            message: '请输入密码！'
                        }]}
                    />
                </Form>
            </div>
        </div>
    )
};

export default Register;