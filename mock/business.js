const Mock = require('mockjs')

const {Random} = Mock

function getBusinessList(req, res) {
    return res.json(Mock.mock({
        'result': {
            'list|20': [
                {
                    'id': '@id',
                    'company_name': '@cname',
                    'mobile': '@natural',
                    'review_status|0-2': 0,
                    'created_at': '@datetime'
                }
            ],
            'count|50-100': 50
        },
        'code': 0,
        'message': ''
    }))
}

function getBusinessDetail(req, res) {
    return res.json(Mock.mock({
        'result': {
            'id': '@id',
            'name': '@cname',
            'phone': '@natural',
            'state|0-2': 0,
            'created_at': '@datetime',
            'credit_code': '@natural',
            'business_license_img': Random.image('120x170', '#894FC4', '#FFF'),
            'id_card_front': Random.image('120x72', '#894FC4', '#FFF'),
            'id_card_back': Random.image('120x72', '#894FC4', '#FFF')
        },
        'code': 0,
        'message': ''
    }))
}

function audit(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': ''
    }))
}

module.exports = {
    getBusinessList,
    audit,
    getBusinessDetail
}
