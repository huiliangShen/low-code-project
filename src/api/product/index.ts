import {HTTP} from '@src/lib/request'
import {IProductData, IProductQuery} from '@apiModel/product'
import {IList} from '@apiModel/index'

export function getProductList(data: IProductQuery) {
    return HTTP<IList<IProductData>>({url: '/api/platform/trace/list', method: 'post', data})
}

export function getProductDetail(data: {id: number}) {
    return HTTP<IProductData>({url: '/api/platform/trace/detail', method: 'post', data})
}
