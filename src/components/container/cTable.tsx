import React from 'react'
import {Table} from 'antd'
import PropsTypes from 'prop-types'
import {ColumnsType, Key, SorterResult, TableCurrentDataSource, TablePaginationConfig} from 'antd/lib/table/interface'

export interface ICTable<T> {
    dataSource: Array<T>
    rowSelection?: any
    loading: boolean
    columns: ColumnsType<T>
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, Key[] | null>, sorter: SorterResult<T> | SorterResult<T>[], extra: TableCurrentDataSource<T>) => void
    pagination?: false | TablePaginationConfig
    rowKey?: string | any
}

export default function CTable<T extends {}>(props: ICTable<T>) {
    /* {
         showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共${total}条`,
             total: 100,
         defaultPageSize: 20,
         defaultCurrent: 1,
         onChange: (page, pageSize) => {
         console.log(page, pageSize)
     }
     } */
    return (
        <Table<T> rowKey={props.rowKey} dataSource={props.dataSource} rowSelection={props.rowSelection}
                  onChange={props.onChange}
                  loading={props.loading} columns={props.columns} size="middle" pagination={props.pagination}/>
    )
}

CTable.propTypes = {
    dataSource: PropsTypes.array,
    rowSelection: PropsTypes.any,
    loading: PropsTypes.bool,
    columns: PropsTypes.any,
    onChange: PropsTypes.func,
    pagination: PropsTypes.any,
    rowKey: PropsTypes.any
}
