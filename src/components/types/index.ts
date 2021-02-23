import React from 'react'
import {ITabData} from '@apiModel/source'

export interface IDrawer {
    canClickMask?: boolean
    name?: string
    children: React.ReactNode
    footer?: React.ReactNode
    close: () => void
    toggleShow: () => void
    loading: boolean
    show: boolean
}

export interface IPublishData {
    isOnline: number
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    weeks?: number[]
}

export interface IMyTabs {
    list: Array<ITabData>
    selected?: number
    selectItem: (i: number) => void
}

export interface IStateText {
    text: string
    underline?: boolean
    color?: string
    click?: () => void
}
