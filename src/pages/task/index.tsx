import React, {useEffect, useState} from 'react'
import {Card, Button, Input, Form, Space} from 'antd'
import Container from '@components/container'
import {Drawer} from '@common/drawer'
import CTable from '@components/container/cTable'

export interface IData {
    key: string
    name: string
    age: number
    address: string
}

export interface IFormData {
    name: string
    val: any
}

const FormDatas: IFormData[] = [
    {
        name: '金额',
        val: 200
    },
    {
        name: '数量',
        val: 100
    }
]

const Task = () => {
    const [, setList] = useState<any>([])
    const [drawLoading, setDrawLoading] = useState<boolean>(false)
    const [taskShow, setTaskShow] = useState<boolean>(false)

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
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <Button type={'link'} onClick={showDetail}>审批</Button>
            )
        }
    ]

    const showDetail = () => {
        setTaskShow(true)
    }

    const handleAudit = (audit: boolean) => {
        console.log(audit)
        setDrawLoading(false)
        setTaskShow(false)
    }

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        // const res = await test({page: 1}).then(res => res.data)
        setList([])
    }

   /* const OperationNode = () => (
        <Button type={'primary'}>测试</Button>
    ) */

    const SearchNode = () => (
        <Input.Search placeholder={'查询'}
                      allowClear
                      enterButton="查询"/>
    )

    return (
        <Card bodyStyle={{padding: 0}}>
            <Container searchNode={<SearchNode/>}>
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
            <Drawer loading={drawLoading}
                    toggleShow={() => setTaskShow(false)}
                    close={() => setTaskShow(false)}
                    show={taskShow}
                    footer={<Space>
                        <Button type={'primary'} onClick={() => handleAudit(true)}>审批</Button>
                        <Button onClick={() => handleAudit(false)}>驳回</Button>
                    </Space>}>
                <div style={{padding: 20}}>
                    <Form layout={'vertical'}>
                        {
                            FormDatas.map((item) => (
                                <Form.Item label={item.name} key={item.name}>
                                    <Input value={item.val} disabled/>
                                </Form.Item>
                            ))
                        }
                    </Form>
                </div>
            </Drawer>
        </Card>
    )
}

export default Task
