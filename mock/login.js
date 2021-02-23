const Mock = require('mockjs')

const {Random} = Mock

function login(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': '',
        'result': 'Token-adqwdasdqwdqw'
    }))
}

function getGraphCode(req, res) {
    console.log(res)
    res.setHeader('imagetoken', Random.guid())
    return res.json(Random.image('150x50', 'Hello Mock.js!'))
}

module.exports = {
    login,
    getGraphCode
}
