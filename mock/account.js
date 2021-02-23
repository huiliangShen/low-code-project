const Mock = require('mockjs')

function getAccountList(req, res) {
    return res.json(Mock.mock({
        'result': {
            'list|20': [
                {
                    'created_at': '@datetime',
                    'id': '@id',
                    'ip': '10.10.20.200',
                    // 是否删除，1：删除
                    'is_delete|0-1': 0,
                    /**
                     * 最后登录时间
                     */
                    'login_time': '@datetime',
                    'mobile': '18888888888',
                    'password': '666666',
                    'remark': '@cparagraph',
                    /**
                     * 0：正常，1：停用
                     */
                    'status|0-1': 0,
                    'true_name': '@cname',
                    'updated_at': '@datetime',
                    /**
                     * 0：普通用户，1：超管
                     */
                    'user_type|0-1': 0,
                    'username': '@name',
                    /**
                     * value值
                     */
                    'value': '111',
                    'role_name': '@first'
                }
            ],
            'count|50-100': 50
        },
        'code': 0,
        'message': ''
    }))
}

function getRoleList(req, res) {
    return res.json(Mock.mock({
        'result': {
            'list|20': [
                {
                    'id': '@id',
                    'remark': '@sentence(5)',
                    'name': '@cname',
                    'create_at': '@datetime',
                    'is_enable|0-1': 0
                }
            ],
            'count|50-100': 50
        },
        'code': 0,
        'message': ''
    }))
}

function getRoles(req, res) {
    return res.json(Mock.mock({
        'result|20': [
            {
                'id': '@id',
                'description': '@sentence(5)',
                'name': '@cname',
                'create_at': '@datetime',
                'is_enable|0-1': 0
            }
        ],
        'code': 0,
        'message': ''
    }))
}

function getRolesById(req, res) {
    return res.json(Mock.mock({
        'result|5': [
            {
                'id': '@id',
                'name': '@cname',
                'children|3': [
                    {
                        'id': '@id',
                        'name': '@cname',
                        'children|5': [
                            {
                                'id': '@id',
                                'name': '@cname',
                            }
                        ]
                    }
                ]
            }
        ],
        'code': 0,
        'message': ''
    }))
}

function removeAccount(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': ''
    }))
}

function stopUser(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': ''
    }))
}

function updatePassword(req, res) {
    return res.json(Mock.mock({
        'code': 0,
        'message': ''
    }))
}

module.exports = {
    getAccountList,
    removeAccount,
    getRoleList,
    getRoles,
    getRolesById,
    stopUser,
    updatePassword
}
