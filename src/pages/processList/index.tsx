import React, {useEffect, useState} from 'react'
import {Button, Card, Input} from 'antd'
import {getProcessList} from '@src/api/business'
import Container from '@components/container'
import CTable from '@components/container/cTable'
import {IRouterFC} from '@model/common'
import PropTypes from 'prop-types'

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

const ProcessList: React.FC<IRouterFC> = ({history}) => {
    const [list, setList] = useState<any>([])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'deploymentId',
            dataIndex: 'deploymentId',
            key: 'deploymentId'
        },
        {
            title: 'resource',
            dataIndex: 'resource',
            key: 'resource'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render(text: any, record: any) {
                return <Button onClick={() => handleStart(record.id)}>启动</Button>
            }
        }
    ]

    const handleStart = (id: number) => {
        history.push('/editor/preview/' + id)
    }

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        getProcessList()
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
        </Card>
    )
}

export default ProcessList

ProcessList.propTypes = {
    history: PropTypes.any
}
