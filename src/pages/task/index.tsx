import React, {useEffect, useState} from 'react'
import {Card, Button, Input, Form, Space, message} from 'antd'
import {getList as getListBusiness, verify} from '@src/api/business'
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
    const [list, setList] = useState<any>([])
    const [id, setId] = useState<string>(null)
    const [drawLoading, setDrawLoading] = useState<boolean>(false)
    const [taskShow, setTaskShow] = useState<boolean>(false)

    const columns = [
        {
            title: 'processDefinitionId',
            dataIndex: 'processDefinitionId',
            key: 'processDefinitionId'
        },
        {
            title: 'processInstanceId',
            dataIndex: 'processInstanceId',
            key: 'processInstanceId'
        },
        {
            title: '处理人',
            dataIndex: 'assignee',
            key: 'assignee'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: any) => (
                <Button type={'link'} onClick={() => showDetail(record)}>审批</Button>
            )
        }
    ]

    const showDetail = (obj: any) => {
        setId(obj.id)
        setTaskShow(true)
    }

    const handleAudit = (audit: boolean) => {
        console.log(audit)
        setDrawLoading(true)
        verify({taskId: id, approved: audit})
            .then(res => {
                setDrawLoading(false)
                if (res.statusCode === 200) {
                    message.success('操作成功')
                    setTaskShow(false)
                    getList()
                }
            })
            .catch(() => setDrawLoading(false))
    }

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        getListBusiness({userId: 2001})
            .then((res: any) => {
                setList(res.data)
            })
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
                <CTable<IData> rowKey={'key'} dataSource={list} loading={false} columns={columns} pagination={null}/>
            </Container>
            <Drawer loading={drawLoading}
                    toggleShow={() => setTaskShow(false)}
                    close={() => setTaskShow(false)}
                    name={'审批'}
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
