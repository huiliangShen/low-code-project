import React from 'react'
import CommonLayout from '@common/layout/commonLayout'
import EditorLayout from '@common/layout/editorLayout'
// import RouteGo from '@common/routeGo'
import {RouteConfigDeclaration} from '@src/pageModel/common'

export const commonConfig: RouteConfigDeclaration[] = [
    {
        path: '/',
        component: CommonLayout,
        hidden: true,
        children: [
            {
                path: '/home/index',
                name: '首页',
                component: React.lazy(() => import('@src/pages/home')),
                hidden: false,
                isDynamic: true,
                key: '1',
                exact: true,
                icon: 'icon-shouye'
            }
        ]
    }
]

export const editorConfig: RouteConfigDeclaration[] = [
    {
        path: '/editor',
        component: EditorLayout,
        hidden: true,
        children: [
            {
                path: '/editor/home',
                name: '编辑器',
                component: React.lazy(() => import('@src/pages/editor')),
                key: '11',
                exact: true,
                isDynamic: true
            },
            {
                path: '/editor/preview',
                name: '编辑器',
                component: React.lazy(() => import('@src/pages/preview')),
                key: '12',
                exact: true,
                isDynamic: true
            }
        ]
    }
]
