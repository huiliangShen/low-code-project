const Mock = require('mockjs')

function getCodeList(req, res) {
    return res.json(Mock.mock({
        'result': {
            'list|20': [
                {
                    'id': '@id',
                    'rule': '@url',
                    'example': '@url',
                    'description': '@cparagraph',
                    'created_at': '@datetime'
                }
            ],
            'count|50-100': 50
        },
        'code': 0,
        'message': ''
    }))
}

function save(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': ''
    }))
}

module.exports = {
    getCodeList,
    save
}
