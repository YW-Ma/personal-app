import React from 'react'
import { Tabs } from 'antd'
import styles from './index.module.less'
// module 是create react app的要求，它按照文件名来识别。

const { TabPane } = Tabs; // 把TabPane从Tabs中取出。

const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="账号密码登陆" key="1">
                    Content 1
                </TabPane>
                <TabPane tab="手机号登陆" key="2">
                    Content 2
                </TabPane>
            </Tabs>
        </div>
    )
};

export default Login;