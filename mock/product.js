const Mock = require('mockjs')

function getProductList(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': '',
        'result': {
            'list|20': [
                {
                    'id': '@id',
                    'name': '@cname',
                    'code': '@increase',
                    'link_number|0-100': 0,
                    'chain_number|0-10': 0,
                    'company_name': '@name',
                    'created_at': '@date',
                    'chains|1-3': [
                        {
                            'title': '@name',
                            'video|0-3': ['https://v-cdn.zjol.com.cn/280443.mp4'],
                            'img|0-3': ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1576106,4261121531&fm=26&gp=0.jpg']
                        }
                    ]
                }
            ]
        },
        'count|20-100': 20
    }))
}

function getProductDetail(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': '',
        'result': {
            'id': '@id',
            'name': '@cname',
            'code': '@increase',
            'phone': '1888888888',
            'link_number|0-100': 0,
            'chain_number|0-10': 0,
            'company_name': '@name',
            'created_at': '@date',
            'chains|1-3': [
                {
                    'name': '@last',
                    'title': '@name',
                    'video|0-3': ['https://v-cdn.zjol.com.cn/280443.mp4'],
                    'img|0-3': ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1576106,4261121531&fm=26&gp=0.jpg']
                }
            ]
        },
        'count|20-100': 20
    }))
}

module.exports = {
    getProductList,
    getProductDetail
}
