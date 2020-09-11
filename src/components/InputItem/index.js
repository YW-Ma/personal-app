import React, { useState, useEffect }from 'react';
import {Input, Form, Button, Row, Col, message} from 'antd';
import styles from './index.module.less'

const InputItem = (props) => {
    const {name, rules, ...rest} = props;
    const [timing, setTiming] = useState(false); // 是否在倒计时
    const [count, setCount] = useState(props.countDown || 60); // 倒计时秒数，初值为外部传入的值或者60s
    const handleClickCaptcha = () => {
        // 模拟一个message发送
        message.success("成功发送验证码");
        // 开始进入倒计时
        setTiming(true);
    }

    useEffect(() => { 
        let interval = 0;   // 在开始计时后，会被赋值为interval ID。
        if (timing) {       // 开始计时的条件：如果timing改变后为true，（即从false变为true），则开始计时。
            // 计时器
            interval = window.setInterval(() => {
                setCount((preSecound)=>{        // set中的函数的参数，是当前的state
                    if (preSecound <= 1) {      // 倒计时结束的情况
                        setTiming(false);               // 1. setState，结束倒计时状态（timing）
                        clearInterval(interval);        // 2. 释放interval占的内存，这个interval是windows.setInterval返回的interval ID
                        return props.countDown || 60;   // 3. 恢复count的初值（count）
                    }
                    else{                       // 倒计时没结束的情况
                        return preSecound - 1;          // 1. 设置count的值为当前值减一
                    }
                })
            }, 1000)
        }
        return () => clearInterval(interval);   // 页面跳转等情况下，组件销毁，释放interval占的内存（不只是在倒计时结束时释放，在组件销毁时也要记得释放）
                                                // 用户收到了验证码，登陆了，跳转到了主页。此时计时器就没有用了（但是计时还没结束），需要清除计时任务。
    }, [timing])//监测timing的改变

    // 检测timing的改变，改变后立即执行倒计时，这需要useEffect。
    if (name==="captcha") {
        return (
            <Form.Item name={name} rules={rules}>
                <Row>
                    <Col span={16}>
                        <Input {...rest}/>
                    </Col>
                    <Col span={8}>
                        <Button 
                            className={styles.getCaptcha} 
                            size="large"
                            disabled={timing}
                            onClick={handleClickCaptcha}
                        >
                            {timing ? "xxx秒":"发送验证码"}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>    
        )
    }

    return (
        <Form.Item name={name} rules={rules}>
            <Input {...rest}/>
        </Form.Item>    
        // 扩展运算符是三个英文句号，...rest在接收参数时是接收剩余参数，
        // 在Input内是扩展rest成为一个一个变量。
        // 利用扩展运算符，可以代替 
        // <Input placeholder={placeholder} size={size} prefix={prefix}/>
    )
};

export default InputItem;