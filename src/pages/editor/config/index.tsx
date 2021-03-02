import React, {useState} from 'react'
import {Form, Input, Empty, Checkbox, Radio, InputNumber, Button, message} from 'antd'
import styles from '../index.scss'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@src/store'
import {handleUpdateForm} from '@store/models/editor/actions'
import PropTypes from 'prop-types'
import {CloseOutlined} from '@ant-design/icons'

const {Item} = Form

const EditorConfig = () => {
    const {formData, activeIndex} = useSelector((state: RootState) => state.editor)
    const selectedFormData = formData[activeIndex]
    const dispatch = useDispatch()
    if (!selectedFormData) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }

    const name = () => {
        switch (selectedFormData.type) {
            case 1:
                return '输入框'
            case 2:
                return '多选组'
            case 3:
                return '时间控件'
            case 5:
                return '多行文本'
        }
    }

    const handleChange = (e: any, type: number, key: string) => {
        console.log(e)
        const data = JSON.parse(JSON.stringify(selectedFormData))
        const val = type === 1 ? e.target.value : type === 2 ? e.target.checked : e
        if (Object.keys(data).find(v => v === key)) {
            data[key] = val
        } else {
            data.formConfigData[key] = val
        }
        const newFromDara = formData.map(e => e)
        newFromDara.splice(activeIndex, 1, data)
        dispatch(handleUpdateForm(newFromDara))
    }

    return <div className={styles.editorConfigWrap}>
        <h2>{name()}</h2>
        <Form layout={'vertical'}>
            <Item label={'标题'}>
                <Input placeholder={'请输入...'} onChange={e => handleChange(e, 1, 'label')}
                       value={selectedFormData.label}/>
            </Item>
            <Item label={'提示'}>
                <Input placeholder={'请输入...'} onChange={e => handleChange(e, 1, 'placeholder')}
                       value={selectedFormData.formConfigData.placeholder}/>
            </Item>
            <Item label={'宽度'}>
                <Radio.Group buttonStyle="solid" value={selectedFormData.colSpan}
                             onChange={e => handleChange(e, 1, 'colSpan')}>
                    <Radio.Button value={6}>25%</Radio.Button>
                    <Radio.Button value={12}>50%</Radio.Button>
                    <Radio.Button value={18}>75%</Radio.Button>
                    <Radio.Button value={24}>100%</Radio.Button>
                </Radio.Group>
            </Item>
            <Item label={'name'}>
                <Input placeholder={'请输入...'} onChange={e => handleChange(e, 1, 'name')}
                       value={selectedFormData.name}/>
            </Item>
            <Item label={''}>
                <Checkbox onChange={e => handleChange(e, 2, 'require')}
                          checked={selectedFormData.require}>是否必填项</Checkbox>
            </Item>
            {selectedFormData.type === 2 && <Item label={'选项'}>
                <OptionsChange options={selectedFormData.formConfigData.options} onChange={(list) => handleChange(list, 3, 'options')}/>
            </Item>}
            {selectedFormData.type === 5 && <Item label={'行数'}>
                <InputNumber min={2} step={1} placeholder={'行数'} value={selectedFormData.formConfigData.rows || 2}
                             onChange={e => handleChange(e, 3, 'rows')}/>
            </Item>}
        </Form>
    </div>
}

const OptionsChange: React.FC<{ options: string[], onChange: (data: string[]) => void }> = ({options, onChange}) => {
    const [data, setData] = useState<string[]>(options)

    const handleUpdateOption = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value
        const newData = data.slice(0, data.length)
        newData.splice(i, 1, str)
        setData(newData)
        onChange(newData)
    }

    const handleRemove = (index: number) => {
        if (data.length === 1) {
            message.warn('至少需要一项')
            return false
        }
        const newData = data.filter((e, i) => i !== index)
        setData(newData)
        onChange(newData)
    }

    return <div className="editorConfigOptions">
        {
            data.map((item, i) => (
                <div className="editorConfigOptionsItem" style={{padding: '0 0 5px'}} key={i}>
                    <Input value={item} addonAfter={<CloseOutlined onClick={() => handleRemove(i)}/>}
                           onChange={(e) => handleUpdateOption(i, e)}/>
                </div>
            ))
        }
        <div className="editorConfigOptionsAdd">
            <Button block type={'primary'} onClick={() => {
                const newData = [...data, '未命名']
                setData(newData)
                onChange(newData)
            }}>新增</Button>
        </div>
    </div>
}

OptionsChange.propTypes = {
    options: PropTypes.any,
    onChange: PropTypes.func
}

export default EditorConfig
