import React, {useState} from 'react'
import styles from './index.scss'
import {Card, Form, Row, Col, Empty, Input, Checkbox, DatePicker, Button, message} from 'antd'
import {IFormItem} from '@model/common'
import {startProcess} from '@api/business'
import {ERROR_CODE} from '@api/config'
import {useParams} from 'react-router-dom'

const Preview = () => {
    const [loading, setLoading] = useState(false)
    const data = sessionStorage.getItem('formData')
    const {id} = useParams()
    // console.log('id', id)
    const [form] = Form.useForm()
    if (!data) {
        return <div className={styles.previewWrap}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/></div>
    }

    const formData = JSON.parse(data) as Array<IFormItem>

    const child = (item: IFormItem) => {
        console.log(item)
        const require = item.require && [{required: true}]
        const render = () => {
            switch (item.type) {
                case 1:
                    return <Input {...item.formConfigData}/>
                case 2:
                    return <Checkbox.Group style={{width: '100%'}}>
                        {
                            item.formConfigData?.options && item.formConfigData.options?.map((item, i) => (
                                <Checkbox value={item} key={i}>{item}</Checkbox>
                            ))
                        }
                    </Checkbox.Group>
                case 3:
                    return <DatePicker style={{width: '100%'}} {...item.formConfigData}/>
                case 5:
                    return <Input.TextArea style={{width: '100%'}} {...item.formConfigData}/>
            }
        }
        return (
            <Form.Item label={item.label} rules={require} name={item.name}>
                {render()}
            </Form.Item>
        )
    }

    const handleSubmit = () => {
        form.validateFields()
            .then(res => {
                let val: any = null
                // {'amount': {'value': 555, 'type': 'long'}}
                Object.keys(res).forEach((key) => {
                    console.log(key)
                    val = `{"id": "${id}", "variables": {"${key}": {"value": ${res[key]}, "type": "long"}}}`
                })
                console.log(JSON.parse(val))
                setLoading(true)
                startProcess(JSON.parse(val))
                    .then(res => {
                        setLoading(false)
                        if (res.statusCode === ERROR_CODE) {
                            message.success('提交成功')
                            form.resetFields()
                        }
                    })
                    .catch(() => setLoading(false))
            })
            .catch((e) => console.error(e))
    }

    return (
        <div className={styles.previewWrap}>
            <Row>
                <Col span={12} offset={6}>
                    <Card>
                        <Form layout={'vertical'} form={form}>
                            <Row>
                                {
                                    formData.map(e => (
                                        <Col span={e.colSpan || 24} key={e.id}>
                                            {child(e)}
                                        </Col>
                                    ))
                                }
                            </Row>
                            <Form.Item style={{textAlign: 'right'}}>
                                <Button htmlType="submit" type="primary" onClick={() => handleSubmit()}
                                        loading={loading}>
                                    提交
                                </Button>
                                <Button htmlType="button" style={{margin: '0 8px'}} onClick={() => form.resetFields()}
                                        loading={loading}>
                                    重置
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Preview
