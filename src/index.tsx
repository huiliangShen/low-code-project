import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import {HashRouter, Switch} from 'react-router-dom'
import store from './store'
import Entry from './entry'

import './reset.scss'
// 逼不得已引入less
// import 'antd/dist/antd.less'
// import './theme.less'
import 'antd/dist/antd.less'
import './assets/fonts/iconfont.css'
import './index.scss'
// import './i18n'
// import '../mock'

/* eslint-disable */

/* if (process.env.NODE_ENV === 'development') {

} */
/* function render(props = {}) {
    const {container} = props as any
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        container ? container.querySelector('#root1') : document.getElementById('root1')
    )
    // 这里是挂载到自己的html中，基座会拿到这个挂载后的html，将其插入进去
}

if (typeof window !== 'undefined' && (window as any).__POWERED_BY_QIANKUN__) { // 动态添加public_path
    (window as any).__webpack_public_path__ = typeof window !== 'undefined' && (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

/!**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 *!/
export async function bootstrap() {
    console.log('react app bootstraped');
}

/!**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 *!/
export async function mount(props: any) {
    render(props)
}

/!**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 *!/
export async function unmount(props: any) {
    ReactDOM.unmountComponentAtNode(props.container ? props.container.querySelector('#root1') : document.getElementById('root1'));
}

/!**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 *!/
/!* export async function update(props) {
  console.log('update props', props);
}
 *!/
if (!(typeof window !== 'undefined' && (window as any).__POWERED_BY_QIANKUN__)) {
    render()
} */
ReactDOM.render(
    <Provider store={store}>
        <Entry/>
    </Provider>,
    document.getElementById('app')
)
