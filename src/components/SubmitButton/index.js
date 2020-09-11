import React from 'react';
import { Form, Button } from 'antd';
import styles from './index.module.less';

const SubmitButton = (props) => {
    const { children, name } = props;
    // 使用组件时，将Button名写在children的位置传入。
    return(
        <Form.Item name={name}>
            <Button className={styles.submit} type="primary" size="large" htmlType="submit">
                {children}
            </Button>
        </Form.Item>
    )
}

export default SubmitButton;