import React from 'react';
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config'
import { Route, Switch } from 'react-router-dom';
// import routes from './routes/index'

import Home from './container/Home'
import Msg from './container/Msg'
import Classify from './container/Classify'
import My from './container/My'
import NavFooter from './components/Nav-footer'
function App() {
  return (
    <div >
      {/* {renderRoutes(routes)} */}
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/msg' component={Msg}></Route>
        <Route path='/classify' component={Classify}></Route>
        <Route path='/my' component={My}></Route>
      </Switch>
      <NavFooter/>
    </div>
  );
}

export default App;
