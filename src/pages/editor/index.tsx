import React from 'react'
import styles from './index.scss'
import {Row, Col} from 'antd'
import EditorContent from './content'
import EditorConfig from './config'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {IFormItem} from '@src/pageModel/common'
import {uuid} from '@lib/index'
import {handleEditorAddItem} from '@store/models/editor/actions'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@src/store'

const formItems: Array<{ id: number, type: number, name: string }> = [
    {
        id: 1,
        type: 1,
        name: '单行文本'
    },
    {
        id: 2,
        type: 2,
        name: '多项选择'
    },
    {
        id: 3,
        type: 3,
        name: '日期'
    },
    {
        id: 5,
        type: 5,
        name: '多行文本'
    }
]

const Editor = () => {
    const {activeIndex} = useSelector((state: RootState) => state.editor)
    const dispatch = useDispatch()
    const style: React.CSSProperties = {
        width: activeIndex === -1 ? 0 : '295px',
        visibility: activeIndex === -1 ? 'hidden' : 'visible',
        overflow: 'hidden'
    }

    const handleAddItem = (type: number) => {
        const uid = uuid(10, 16)
        const data: IFormItem = {
            id: uid,
            colon: false,
            colSpan: 24,
            label: '',
            require: false,
            name: `name-${uid}`,
            formConfigData: {
                placeholder: '请填写内容',
                rows: type === 5 ? 2 : -1,
                options: type === 2 ? ['未命名1', '未命名2'] : []
            },
            type
        }
        switch (type) {
            case 1:
                data.label = '文本'
                break
            case 2:
                data.label = '多选'
                break
            case 3:
                data.label = '时间'
                break
            case 5:
                data.label = '多行文本'
                break
        }
        dispatch(handleEditorAddItem(data))
    }

    return <div className={styles.editorWrap}>
        <DndProvider backend={HTML5Backend}>
            <div className={styles.editorTool}>
                <div className="editorToolGrid">
                    <h2>基础字段</h2>
                    <Row>
                        {
                            formItems.map((item) => (
                                <Col span={12} key={item.id}>
                                    <div className={styles.editorToolItem}
                                         onClick={() => handleAddItem(item.type)}>{item.name}</div>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </div>
            <div className={styles.editorContent}>
                <EditorContent/>
            </div>
            <div className={styles.editorConfig} style={style}>
                <EditorConfig/>
            </div>
        </DndProvider>
    </div>
}

export default Editor
