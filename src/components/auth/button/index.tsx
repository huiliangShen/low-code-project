import React from 'react'
import {Button} from 'antd'
import {useSelector} from 'react-redux'
import {RootState} from '@src/store'
import PropTypes from 'prop-types'
import {TOKEN_NAME} from '@src/config'

const AuthButton: React.FC<any> = ({children, ...props}) => {
    const {userData} = useSelector((state: RootState) => state.app)
    const auth_list = userData?.auth_list
    const isAuths = !!auth_list && (auth_list === 'all' || auth_list.split(',').includes(props.authCode))

    if (!isAuths && props.authCode) {
        return null
    }

    return <Button {...props}>{children}</Button>
}

export default AuthButton

AuthButton.propTypes = {
    authCode: PropTypes.any,
    children: PropTypes.any
}

export function judgePower(code: any) {
    const powers = getUserPowers()
    if (!code || powers === 'all') {
        return true
    }
    return [code.toString()].every((p: string) => powers.includes(p))
}

export function getUserPowers() {
    let loginInfo: any = localStorage.getItem(TOKEN_NAME)
    loginInfo = loginInfo ? JSON.parse(loginInfo) : null

    if (loginInfo) {
        return !loginInfo.auth_list
            ? []
            : loginInfo.auth_list === 'all'
                ? 'all'
                : loginInfo.auth_list.split(',')
    } else {
        return []
    }
}
