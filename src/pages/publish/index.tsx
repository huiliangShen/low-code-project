import React, {useState} from 'react'
import styles from '@src/pages/preview/index.scss'
import {Card, Col, Row, Form, Input, Button, message, Space} from 'antd'
// import {SendOutlined} from '@ant-design/icons'
import {deploy} from '@api/business'
import {IRouterFC} from '@model/common'
import PropTypes from 'prop-types'

const Publish: React.FC<IRouterFC> = ({history}) => {
    const [form] = Form.useForm()
    const [show, setShow] = useState<boolean>(false)

    function combineFile(name: string) {
        const xml = sessionStorage.getItem('xml')
        const blob = new Blob([xml])
        return new File([blob], `${name}.bpmn`)
    }

    const onSubmit = () => {
        form.validateFields()
            .then((res: any) => {
                const formData = new FormData()
                formData.set('deploymentName', res.deploymentName)
                formData.set('file', combineFile(res.deploymentName))
                deploy(formData)
                    .then((res: any) => {
                        if (res.statusCode === 200) {
                            setShow(true)
                            sessionStorage.setItem('id', res.data.id)
                            message.success('发布成功')
                        }
                    })
            })
            .catch((err) => console.log(err))
    }

    return <div className={styles.previewWrap}>
        <Row>
            <Col span={12} offset={6}>
                <Card>
                    <Form form={form}>
                        <Form.Item label={'发布任务名称'} name={'deploymentName'}
                                   rules={[{required: true, message: '请填写发布任务名称'}]}>
                            <Input placeholder={'请填写发布任务名称'} disabled={show}/>
                        </Form.Item>
                        <Form.Item>
                            <div style={{textAlign: 'right'}}>
                                <Space>
                                    <Button type={'primary'} onClick={onSubmit} disabled={show}>发布</Button>
                                    <Button onClick={() => history.push('/home/index')}>返回</Button>
                                </Space>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
               {/* <Card style={{marginTop: 20}}>
                    <Form>
                        <Form.Item label={'应用地址'}>
                            <Row>
                                <Col span={22}>
                                    <Input value={show ? 'http://localhost:8001/editor/preview' : '尚未发布'} disabled/>
                                </Col>
                                <Col span={2}>
                                    <Button icon={<SendOutlined/>} onClick={() => {
                                        window.open('http://localhost:8001/editor/preview')
                                    }}/>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card> */}
            </Col>
        </Row>
    </div>
}

export default Publish

Publish.propTypes = {
    history: PropTypes.any
}
