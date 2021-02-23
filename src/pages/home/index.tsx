import React, {useEffect, useState} from 'react'
import {Row, Col, Card, Statistic, Calendar, Skeleton} from 'antd'
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import styles from './index.scss'

const HEADERS: Array<{ id: number, name: string, percent: number, color: string }> = [
    {
        id: 1,
        name: '利润率',
        percent: 88.28,
        color: '#cf1322'
    },
    {
        id: 2,
        name: '出售率',
        percent: 99.3,
        color: '#cf1322'
    },
    {
        id: 3,
        name: '同比损失率',
        percent: 9.3,
        color: '#3f8600'
    },
    {
        id: 4,
        name: '环比损失率',
        percent: 9.3,
        color: '#3f8600'
    }
]

const Home = () => {
    const [headers, setHeaders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setData()
        return () => {
            setHeaders([])
        }
    }, [])

    const setData = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setHeaders([...HEADERS])
        }, 50)
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Skeleton loading={loading} active>
                    <TransitionGroup className={styles.header}>
                        {
                            headers.map((item, i) => (
                                <CSSTransition key={item.id} timeout={600} classNames={'header-item'}
                                               style={{transitionDelay: `${i * 50}ms`}}>
                                    <Col span={6} key={item.id}>
                                        <Card>
                                            <Statistic
                                                title={item.name}
                                                value={item.percent}
                                                precision={2}
                                                valueStyle={{color: item.color}}
                                                prefix={item.percent > 50 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                                                suffix="%"
                                            />
                                        </Card>
                                    </Col>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </Skeleton>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Calendar/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home
