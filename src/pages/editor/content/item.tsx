import React, {FC, useRef} from 'react'
import {useDrag, useDrop, DropTargetMonitor} from 'react-dnd'
import {ItemTypes} from './index'
import {XYCoord} from 'dnd-core'
import PropTypes from 'prop-types'
import {Checkbox, Col, DatePicker, Input, Form, Button} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import styles from '../index.scss'
import {IFormItem} from '@model/common'

export interface CardProps {
    id: any
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
    handleRemove: () => void
    handleSelectItem: (id: any) => void
    isActive?: boolean
    item: IFormItem
}

interface DragItem {
    index: number
    id: string
    type: string
}

const {TextArea} = Input

export const EditorItem: FC<CardProps> = ({id, index = 24, item, isActive, moveCard, handleSelectItem, handleRemove}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        }
    })

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const child = () => {
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
                    return <TextArea style={{width: '100%'}} {...item.formConfigData}/>
            }
        }
        return (
            <Form.Item label={item.label} rules={(item.require && [{required: item.require}]) || []} name={item.name}>
                {render()}
            </Form.Item>
        )
    }

    return (
        <Col span={item.colSpan || 24} ref={ref} style={{opacity}}
             className={`${styles.editorItem} ${isActive ? styles.active : ''}`}>
            {child()}
            <div className={styles.editorItemControl} onClick={() => handleSelectItem(index)}>
                <Button icon={<CloseOutlined/>} size={'small'} className={styles.editorItemRemoveControl}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleRemove()
                        }}/>
            </div>
        </Col>
    )
}

export default EditorItem

EditorItem.propTypes = {
    id: PropTypes.any,
    index: PropTypes.number,
    moveCard: PropTypes.func,
    handleSelectItem: PropTypes.func,
    handleRemove: PropTypes.func,
    isActive: PropTypes.bool,
    item: PropTypes.any
}
