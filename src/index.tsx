import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Entry from 'app/components/entry';
import 'app/common/reset.less';

/* 引入业务组件 */
import Home from 'app/busi/Home/index';

ReactDom.render(
    <Router>
        <Entry>
            <Switch>
                <Route path='/' exact component={Home}></Route>
            </Switch>
        </Entry>
    </Router>,
    document.getElementById('root') as HTMLElement
)