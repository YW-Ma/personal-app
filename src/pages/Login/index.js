import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Tabs, Form, Checkbox, Row } from 'antd'
import styles from './index.module.less'
import InputItem from '../../components/InputItem'
import SubmitButton from '../../components/SubmitButton'
// module 是create react app的要求，它按照文件名来识别。
import { 
    UserOutlined, LockTwoTone, MobileTwoTone, MailTwoTone,
    AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined, QqCircleFilled
} from '@ant-design/icons';// 导入的icons

const { TabPane } = Tabs; // 把TabPane从Tabs中取出。也可以用Tabs.TabPane

const Login = () => {
    const [form] = Form.useForm();
    const [autoLogin, setAutoLogin] = useState(false);
    const handleFinish = (values) => {
        //会自动传入一个values，submit的时候调用onFinish
        console.log(values)
    }
    const mainTheme = {
        color:"#1890ff"
    }
    return (
        // 背景容器
        <div className={styles.loginContainer}> 
            {/* tab存放在这里里面，规定高宽和位置 */}
            <div className={styles.login}>
                <Form
                    form = {form}
                    onFinish = {handleFinish}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="账号密码登陆" key="1">
                            <InputItem
                                name = "username"
                                prefix={
                                    <UserOutlined style={mainTheme}/>
                                }
                                placeholder="用户名" 
                                size="large"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: '请输入用户名！'
                                        }
                                    ]
                                }
                            />
                            <InputItem
                                name = "password"
                                prefix={
                                    <LockTwoTone style={mainTheme}/>
                                }
                                placeholder="密码" 
                                size="large"
                                type="password"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: '请输入密码！'
                                        }
                                    ]
                                }
                            />
                        </TabPane>
                        <TabPane tab="手机号登陆" key="2">
                            <InputItem
                                name = "mobile"
                                prefix={
                                    <MobileTwoTone style={mainTheme}/>
                                }
                                placeholder="手机号" 
                                size="large"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: '请输入手机号！'
                                        }
                                    ]
                                }
                            />
                            <InputItem
                                name = "captcha"
                                prefix={
                                    <MailTwoTone style={mainTheme}/>
                                }
                                placeholder="验证码" 
                                size="large"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: '请输入验证码！'
                                        }
                                    ]
                                }
                            />
                        </TabPane>
                    </Tabs>
                    <Row justify="space-between">
                        <Checkbox
                            checked = {autoLogin}
                            onChange = {(e)=>setAutoLogin(e.target.checked)}
                        >
                            自动登录
                        </Checkbox>
                        <a href="#!">忘记密码</a>
                    </Row>
                    <SubmitButton name="login">{"登陆"}</SubmitButton>
                </Form>
                <div className={styles.other}>
                    其他登录方式
                    <AlipayCircleOutlined className={styles.icon}/>
                    <TaobaoCircleOutlined className={styles.icon}/>
                    <WeiboCircleOutlined className={styles.icon}/>
                    <QqCircleFilled className={styles.icon}/>
                    <Link to="/register" className={styles.register}>
                        注册账户
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;