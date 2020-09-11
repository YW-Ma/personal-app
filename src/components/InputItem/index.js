import React from 'react';
import {Input, Form} from 'antd';

const InputItem = (props) => {
    const {name, ...rest} = props;
    return (
        <Form.Item name={name}>
            <Input {...rest}/>
        </Form.Item>    
        // 扩展运算符是三个英文句号，...rest在接收参数时是接收剩余参数，
        // 在Input内是扩展rest成为一个一个变量。
        // 利用扩展运算符，可以代替 
        // <Input placeholder={placeholder} size={size} prefix={prefix}/>
    )
};

export default InputItem;