import React from 'react';
import {BrowserRouter, NavLink} from 'react-router-dom';
import {Menu} from 'antd';
// import 'antd/dist/antd.less' 按需加载后不需要全局引入了
import Router from './router';
//等同于 
// import { default as Router } from './router';
import styles from './App.module.less'

function App() {
  return (
    <div className={styles.background}>
      <BrowserRouter>
        <Menu theme = 'dark'>
          <Menu.Item><NavLink to = "/">Home</NavLink></Menu.Item>
          <Menu.Item><NavLink to = "/login">Login</NavLink></Menu.Item>
          <Menu.Item><NavLink to = "/Register">Register</NavLink></Menu.Item>
        </Menu>
        <Router></Router>
      </BrowserRouter>
    </div>
  );
}

export default App;