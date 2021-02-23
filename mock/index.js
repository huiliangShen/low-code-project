const delay = require('mocker-api/lib/delay')
const {login, getGraphCode} = require('./login')
const {getConfigList, configAudit, getConfigDetail} = require('./config')
const {getProductList, getProductDetail} = require('./product')
const {getBusinessList, getBusinessDetail, audit} = require('./business')
const {getCodeList, save} = require('./qrcode')
const {getAccountList, removeAccount, getRoleList, getRoles, getRolesById, stopUser, updatePassword} = require('./account')

const proxy = {
    'POST /api/login': login,
    'GET /api/graph/code': getGraphCode,
    'GET /api/product/list': getProductList,
    'GET /api/product/detail': getProductDetail,
    'GET /api/config/list': getConfigList,
    'POST /api/config/detail': getConfigDetail,
    'POST /api/config/audit': configAudit,
   // 'GET /api/platform/store/user/list': getBusinessList,
   // 'GET /api/platform/store/user/detail': getBusinessDetail,
    'POST /api/business/audit': audit,
    'GET /api/qrcode/list': getCodeList,
    'POST /api/qrcode/save': save,
    'GET /api/user/list': getAccountList,
    // 'GET /api/platform/user/role/list': getRoleList,
    'GET /api/account/getRoles': getRoles,
    'GET /api/account/getRolesById': getRolesById,
    // 'GET /api/platform/menu/list': getRolesById,
    'POST /api/user/delete': removeAccount,
    // 'POST /api/platform/user/role/delete': removeAccount,
    'POST /api/user/stop': stopUser,
    // 'POST /api/user/modify/password': updatePassword,
}
module.exports = delay(proxy, 300)
