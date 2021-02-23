const Mock = require('mockjs')
const {Random} = Mock

function getConfigList(req, res) {
    return res.json(Mock.mock({
        'result': {
            'list|20': [
                {
                    'id': '@id',
                    'name': '@cname',
                    'status|1-3': 1,
                    'created_at': '@datetime'
                }
            ],
            'count|50-100': 50
        },
        'code': 0,
        'message': ''
    }))
}

function getConfigDetail(req, res) {
    return res.json(Mock.mock({
        'result': {
            'id': '@id',
            'name': '@cname',
            'brand_name': '@name',
            'state|0-2': 0,
            'created_at': '@datetime',
            'logo': Random.image('120x120', '#894FC4', '#FFF'),
            'header_bg': Random.image('120x120', '#894FC4', '#FFF')
        },
        'code': 0,
        'message': ''
    }))
}

function configAudit(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': ''
    }))
}

module.exports = {
    getConfigList,
    getConfigDetail,
    configAudit
}
