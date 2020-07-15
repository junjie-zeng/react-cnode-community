import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'

// 工具函数
import {composeWithDevTools} from 'redux-devtools-extension';
// reducers
import reducers  from './reducers'

//向外暴露store对象
const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
export default store;