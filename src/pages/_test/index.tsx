import React, {useEffect, useState} from 'react'
import {Card, Button, Input} from 'antd'
import Container from '@components/container'
import CTable from '@components/container/cTable'
// import {test} from '@api/_test'
// import styles from './index.scss'

export interface IData {
    key: string
    name: string
    age: number
    address: string
}

const Test = () => {
    const [, setList] = useState<any>([])

    const dataSource: IData[] = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }
    ]

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }
    ]

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        // const res = await test({page: 1}).then(res => res.data)
        setList([])
    }

    const OperationNode = () => (
        <Button type={'primary'}>测试</Button>
    )

    const SearchNode = () => (
        <Input.Search placeholder={'查询'}
                      allowClear
                      enterButton="查询"/>
    )

    return (
        <Card bodyStyle={{padding: 0}}>
                <Container operationNode={<OperationNode />} searchNode={<SearchNode />}>
                <CTable<IData> rowKey={'key'} dataSource={dataSource} loading={false} columns={columns} pagination={{
                    showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共${total}条`,
                    total: 100,
                    defaultPageSize: 20,
                    defaultCurrent: 1,
                    onChange: (page, pageSize) => {
                        console.log(page, pageSize)
                    }
                }}/>
            </Container>
            {/* <div className={styles.mainCardBody}>
                <div className={styles.mainCardBodyHeader}>
                   <BreadHeader />
                </div>
                <div className={styles.mainCardBodyContent}>
                    <Alert message="Informational Notes" type="info" showIcon/>
                    <div className={styles.mainCardBodyContentOperation}>
                        <Row justify={'space-between'}>
                            <Col>
                                <Button type={'primary'}>测试</Button>
                            </Col>
                            <Col>
                                <Input.Search placeholder={'查询'}
                                              allowClear
                                              enterButton="查询"/>
                            </Col>
                        </Row>
                    </div>
                    <Table rowKey={'id'} dataSource={dataSource} rowSelection={null} loading={false} columns={columns} size="middle" pagination={{
                        showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共${total}条`,
                        total: 100,
                        defaultPageSize: 20,
                        defaultCurrent: 1,
                        onChange: (page, pageSize) => {
                            console.log(page, pageSize)
                        }
                    }}/>
                </div>
            </div> */}
        </Card>
    )
}

export default Test
