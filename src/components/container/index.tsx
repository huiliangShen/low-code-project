import React from 'react'
import styles from './index.scss'
import BreadHeader from '@components/breadHeader'
import {Col, Row} from 'antd'
import PropsTypes from 'prop-types'

export interface IContainer {
    operationNode?: React.ReactNode,
    children?: React.ReactNode,
    searchNode?: React.ReactNode
    operationRender?: React.ReactNode
    renderHeader?: React.ReactNode
    renderOperation?: boolean
    renderContent?: boolean
}

const Container: React.FC<IContainer> = (props) => {
    const {renderHeader, renderOperation = true, renderContent = true} = props
    return (
        <div className={styles.mainCardBody}>
            <div className={styles.mainCardBodyHeader}>
                {!renderHeader && <BreadHeader/>}
                {renderHeader}
            </div>
            {renderContent && <div className={styles.mainCardBodyContent}>
                {renderOperation && <div className={styles.mainCardBodyContentOperation}>
                    {(props.operationNode || props.searchNode) && <Row justify={'space-between'}>
                        <Col>
                            {props.operationNode || ''}
                        </Col>
                        <Col>
                            {props.searchNode || ''}
                        </Col>
                    </Row>}
                    {props.operationRender}
                </div>}
                {props.children}
            </div>}
        </div>
    )
}

export default Container

Container.propTypes = {
    children: PropsTypes.element,
    operationNode: PropsTypes.element,
    operationRender: PropsTypes.element,
    searchNode: PropsTypes.element,
    renderOperation: PropsTypes.bool,
    renderContent: PropsTypes.bool,
    renderHeader: PropsTypes.element
}
