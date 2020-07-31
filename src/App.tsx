import React from 'react';
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config'
import { Route, Switch,withRouter } from 'react-router-dom';
// import routes from './routes/index'

import Home from './container/Home'
import Msg from './container/Msg'
import Classify from './container/Classify'
import My from './container/My'
import NavFooter from './components/Nav-footer'
import ContentDetail from './container/contentDetail'
class App extends React.Component<any>{
  navList = [
    {
      path: '/home',
      text: '首页',
      icon: 'iconfont icon-shouye'
    },
    {
      path: '/classify',
      text: '分类',
      icon: 'iconfont icon-fenlei'
    },
    {
      path: '/msg',
      text: '消息',
      icon: 'iconfont icon-dkw_xiaoxi'
    },
    {
      path: '/my',
      text: '我的',
      icon: 'iconfont icon-wo'
    }
  ]


  // function App() {
  render() {
    const {navList} = this
    const path = this.props.location.pathname;
    //得到当前的nav,可能没有
    const currentNav = navList.find(nav => nav.path == path);
    // console.log(currentNav)
    // console.log(this.props)
    return (
      <div >
        {/* {renderRoutes(routes)} */}
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/msg' component={Msg}></Route>
          <Route path='/classify' component={Classify}></Route>
          <Route path='/my' component={My}></Route>
          <Route path='/detail/:id' component={ContentDetail}></Route>
        </Switch>
        {currentNav ? <NavFooter navList = {navList}/> : null}
        
      </div>
    );
  }
}

// export default withRouter(App);
export default App;
