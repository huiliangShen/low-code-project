/* eslint-disable */
import React, {Fragment} from 'react'
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import {renderRoutes} from '../routers'
import {commonConfig, editorConfig} from '../routers/routerConfig'
import { Spin} from 'antd'
import {useSelector} from 'react-redux'
import {RootState} from '@src/store'
// import Login from '@src/pages/login'
// import NotFound from '@src/pages/404'

const App: () => any = () => {
    const {loading} = useSelector((state: RootState) => state.app)
    // const dispatch = useDispatch()

    /*  const onClick = ({key}: any) => {
          dispatch(handleChangeLanguage(key))
      } */

    /*  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
         console.log(e.target.value)
         dispatch(handleChangeColor(e.target.value))
     } */

    /*    const getColor = (color: ColorResult): void => {
            const {rgb} = color
            console.log(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
            dispatch(handleChangeColor(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`))
        }

        const menu = (
            <Menu onClick={onClick}>
                <Menu.Item key="zh">中文</Menu.Item>
                <Menu.Item key="en">English</Menu.Item>
            </Menu>
        ) */

    return (
        <Fragment>
            <Spin size="large" spinning={loading} wrapperClassName={'app-wrap'} tip={'loading...'}>
                {/* <OtherRouterMap/> */}
                <BrowserRouter basename={'/'}>
                    <Switch>
                        <Route exact path={'/'} render={() => {
                            return <Redirect to={'/home/index'} push/>
                        }}/>
                        {/* <Route path={'/login'} render={() => {
                            return <Login/>
                        }}/> */}
                        {/* {renderRoutes(commonConfig)} */}
                        {renderRoutes(editorConfig)}
                    </Switch>
                </BrowserRouter>
            </Spin>
        </Fragment>

    )
}

export default App
