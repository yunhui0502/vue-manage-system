import Axios from "axios";
// =====================商品模块
// 获取商品列表
function getProductList(Id) {
  let params ={params: {bossId:Id}}
  return Axios.get("/api/product/listProductAndCategoryName", params);
}




// =====================店铺模块
// 获取店铺列表
function getStoreList(Id) {
  let params ={params: {bossId:Id}}
  return Axios.get("/api/stone/byBossId", params);
}

export default {
  getProductList: getProductList,
  getStoreList:getStoreList
}
