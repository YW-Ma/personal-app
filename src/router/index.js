import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Router = () => (
    <Switch>
        {/* Switch相当于js中的switch function */}
        <Route exact path="/" component={Home}/>  
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        {/* Route负责匹配一个路径和渲染此路径的组件。 */}
    </Switch>
);
export default Router;
// 把Router导出，这样在App中可以用它。