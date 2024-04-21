import Mock from 'mockjs'
import { param2Obj } from './utils'

import auth from './auth/auth'
import homePage  from './homePage/homePage'
import searchPage from './searchPage/searchPage'
import myShopCar from './myShopCar/myShopCar'
import myProcess from './myProcess/myProcess'
import dataServicePlatform from './dataServicePlatform/dataServicePlatform'
import assetOperation from './assetOperation/assetOperation'
import basicDataMnt from './basicDataMnt/basicDataMnt'
import myCollection from './myCollection/myCollection'
import portalHome from './portalHome/portalHome'
import dataLab from './dataLab/dataLab'

const mocks = [
  // auth
  ...auth,
  // homePage 首页
  ...homePage,
  // searchPage 搜索页
  ...searchPage,
  // 我的购物车
  ...myShopCar,
  // 我的流程
  ...myProcess,
  // 数据服务平台
  ...dataServicePlatform,
  // 资产运营
  ...assetOperation,
  // 基础数据管理
  ...basicDataMnt,
  // 我的收藏
  ...myCollection,
  // 门户
  ...portalHome,
  // 数据实验室
  ...dataLab,
]
// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}
module.exports = {
  mocks,
  mockXHR
}
