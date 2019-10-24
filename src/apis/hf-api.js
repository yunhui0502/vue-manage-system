import Axios from "axios";
// =====================商品模块
// 获取商品列表

// 添加商品
// http://192.168.1.233:9095/product/addproduct?hfName=衣服1&categoryId=1&brandId=1&productDesc=代步&bossId=1&lastModifier=swd
function addProduct(params) {
  let fd = new FormData();
  fd.append('bossId', 1);
  fd.append('brandId', params.brandId);
  fd.append('hfName', params.hfName);
  return Axios.post("/api/product/addproduct", fd, { responseType: 'arraybuffer' });
}


// 按条件查询商品
function search(id, cateId, name) {
  let params = {
    params: {
      bossId: id,
      categoryId: cateId,
      productName: name
    }
  }
  return Axios.get("/api/product/categoryId", params);
}



export default {
  getProductList: getProductList,

}
