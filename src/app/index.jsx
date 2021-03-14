import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import Entry from 'app/shared/Entry';

/* 错误页面 */
const Error = () => {
    return <div>404</div>
}

/* 引入业务组件 */
import Home from 'app/busi/Home';

ReactDom.render(
    <Router>
        <Entry>
            <Switch> //当匹配到路径时 不在向下匹配 不做switch的话 可能会同时进入多个页面
                <Route path='/' exact component={Home}></Route>

                <Route component={Error}></Route>
            </Switch>
        </Entry>
    </Router>,
    document.getElementById('root')
)