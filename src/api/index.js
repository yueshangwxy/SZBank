import { homePage } from './homePage/homePage'
import { searchPage } from './searchPage/searchPage'
import { myShopCar } from './myShopCar/myShopCar'
import { myProcess } from './myProcess/myProcess'
import { dataServicePlatform } from './dataServicePlatform/dataServicePlatform'
import { assetOperation } from './assetOperation/assetOperation'
import { basicDataMnt } from './basicDataMnt/basicDataMnt'
import { myCollection } from './myCollection/myCollection'
import { portalHome } from './portalHome/portalHome'

const api = {
    ...homePage,
    ...searchPage,
    ...myShopCar,
    ...myProcess,
    ...dataServicePlatform,
    ...assetOperation,
    ...basicDataMnt,
    ...myCollection,
    ...portalHome
}
export default api