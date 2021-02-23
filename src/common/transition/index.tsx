/* eslint-disable */
import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'
import './index.module.scss'

const CommonTransition: React.FC = ({children}) => {
    return (
        /* <TransitionGroup> */
            <CSSTransition
                key={location.pathname}
                classNames={'page-fade'}
                timeout={500}
            >
                {children}
            </CSSTransition>
       /* </TransitionGroup> */
    )
}

export default CommonTransition

CommonTransition.propTypes = {
    children: PropTypes.any
}
