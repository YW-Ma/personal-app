import React from 'react'
import { Tabs, Form } from 'antd'
import styles from './index.module.less'
import InputItem from '../../components/InputItem'
import SubmitButton from '../../components/SubmitButton'
// module 是create react app的要求，它按照文件名来识别。
import { UserOutlined, LockTwoTone } from '@ant-design/icons';// 导入的icons

const { TabPane } = Tabs; // 把TabPane从Tabs中取出。也可以用Tabs.TabPane

const Login = () => {
    const [form] = Form.useForm();
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
                            />
                            <InputItem
                                name = "password"
                                prefix={
                                    <LockTwoTone style={mainTheme}/>
                                }
                                placeholder="密码" 
                                size="large"
                            />
                        </TabPane>
                        <TabPane tab="手机号登陆" key="2">
                            <InputItem
                                name = "phone_number"
                                prefix={
                                    <UserOutlined style={mainTheme}/>
                                }
                                placeholder="手机号" 
                                size="large"
                            />
                            <InputItem
                                name = "password"
                                prefix={
                                    <LockTwoTone style={mainTheme}/>
                                }
                                placeholder="密码" 
                                size="large"
                            />
                        </TabPane>
                    </Tabs>
                    <SubmitButton name="login">{"登陆"}</SubmitButton>
                </Form>
            </div>
        </div>
    )
};

export default Login;