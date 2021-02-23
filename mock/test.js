const Mock = require('mockjs')

function getUserList(req, res) {
    return res.json(Mock.mock({
        'data|10': [
            {
                'id': '@id',
                'date': '@date',
                'name': '@cname'
            }
        ],
        'code': 0,
        'message': ''
    }))
}

function setUser(req, res) {
    return res.json(Mock.mock({
        'code|0-1': 0,
        'message': ''
    }))
}

module.exports = {
    getUserList,
    setUser
}
