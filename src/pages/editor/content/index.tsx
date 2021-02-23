import {Card, Form, Row} from 'antd'
import React, {FC, useCallback} from 'react'
import EditorItem from './item'
import update from 'immutability-helper'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '@src/store'
import {handleUpdateForm, handleSelectItem as handleSelectFormItem, handleRemove} from '@store/models/editor/actions'

export const ItemTypes = {
    CARD: 'list'
}

const EditorContent: FC = () => {
    const {formData, selectedFormData} = useSelector((state: RootState) => state.editor)
    const dispatch = useDispatch()
    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard = formData[dragIndex]
            dispatch(handleUpdateForm(
                update(formData, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard]
                    ]
                })
            ))
        },
        [formData]
    )

    const handleSelectItem = (index: number) => {
        dispatch(handleSelectFormItem(index, formData[index]))
    }

    const handleRemoveItem = (index: number) => {
        console.log(index)
        if (formData[index] === selectedFormData) {
            dispatch(handleSelectFormItem(-1, null))
        }
        dispatch(handleRemove(index))
    }

    return (
        <Card bodyStyle={{minHeight: '500px'}}>
            <Form layout={'vertical'}>
                <Row>
                    {formData.map((card, i) => (
                        <EditorItem handleRemove={() => handleRemoveItem(i)} handleSelectItem={handleSelectItem}
                                    moveCard={moveCard} isActive={selectedFormData && selectedFormData.id === card.id}
                                    item={card} index={i} id={card.id} key={card.id}/>
                    ))}
                </Row>
            </Form>
        </Card>
    )
}

export default EditorContent
