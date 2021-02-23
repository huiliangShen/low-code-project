import React from 'react'
import {IRouterFC} from '@model/common'
import {renderRoutes} from '@src/routers'
import {Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

const RouteGo: React.FC<IRouterFC> = ({routes}) => {
    console.log('itemn', routes)

    return (
        <div>
            <Switch>
                {/* {item.isRedirect && <Route exact path={item.path} render={() => {
                    return <Redirect to={routes[0].path}/>
                }}/>} */}
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            </Switch>
        </div>
    )
}

export default RouteGo

RouteGo.propTypes = {
    routes: PropTypes.array,
    item: PropTypes.any
}
