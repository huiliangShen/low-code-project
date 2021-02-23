import React from 'react'
import styles from './index.scss'
import {Card, Form, Row, Col, Empty, Input, Checkbox, DatePicker, Button} from 'antd'
import {IFormItem} from '@model/common'

const Preview = () => {
    const data = sessionStorage.getItem('formData')
    const [form] = Form.useForm()
    if (!data) {
        return <div className={styles.previewWrap}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/></div>
    }

    const formData = JSON.parse(data) as Array<IFormItem<any>>

    const child = (item: IFormItem<any>) => {
        console.log(item)
        const require = item.formConfigData.require && [{required: true}]
        const render = () => {
            switch (item.type) {
                case 1:
                    return <Input {...item.formConfigData}/>
                case 2:
                    return <Checkbox {...item.formConfigData}>123</Checkbox>
                case 3:
                    return <DatePicker style={{width: '100%'}} {...item.formConfigData}/>
            }
        }
        return (
            <Form.Item label={item.formConfigData.label} rules={require} name={item.formConfigData.name}>
                {render()}
            </Form.Item>
        )
    }

    return (
        <div className={styles.previewWrap}>
            <Row>
                <Col span={12} offset={6}>
                    <Card bodyStyle={{minHeight: '300px'}}>
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
                                <Button htmlType="submit" type="primary">
                                    Submit
                                </Button>
                                <Button htmlType="button" style={{margin: '0 8px'}} onClick={() => form.resetFields()}>
                                    Reset
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
