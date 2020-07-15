import React from 'react';
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config'
import routes from './routes/index'
function App() {
  return (
    <div >
      {renderRoutes(routes)}
    </div>
  );
}

export default App;
