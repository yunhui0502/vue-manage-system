import Axios from "axios";
// =====================商品模块
// 获取商品列表
function getProductList(Id) {
  let params = {
    params: {
      bossId: Id
    }
  }
  return Axios.get("/api/product/listProductAndCategoryName", params);
}
// 获取类目
function category() {
  // let params ={params: {bossId:Id}}
  return Axios.get("/api/product/category");
}
// 编辑商品
function bianProduct() {
  let params ={params:{
              brandId: 1,
              categoryId: 1,
              createTime: "2019-10-20T23:56:02",
              id: 57,
              isDeleted: 0,
              lastModifier: "1",
              modifyTime: "2019-10-22T08:44:38",
              productCategoryName: "出行类",
              productDesc: "1",
              productName: "2"
  }}
  return Axios.post("/api/product/updateProductId", params);
}

// 添加商品
// http://192.168.1.233:9095/product/addproduct?hfName=衣服1&categoryId=1&brandId=1&productDesc=代步&bossId=1&lastModifier=swd
  function addProduct(bossid,brandid,categoryid,hfname,lastModifier,productdesc ) {
    let params = {
      params: {
        bossId: bossid,
        brandId:brandid,
        categoryId:categoryid,
        hfName:hfname,
        lastModifier:lastModifier,
        productDesc:productdesc

      }
    }
    return Axios.post("/api/product/addproduct", params);
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
// 删除商品
function deleteProduct(id) {

  let params = {
    params: {
      productId:id
    }
  }
  return Axios.get("/api/product/deleteSelectProductId", params);
}
function singledeleteProduct(id) {

  let params = {
    params: {
      productId:id
    }
  }
  return Axios.get("/api/product/deleteProductId", params);
}
// =====================店铺模块
// 获取店铺列表
function getStoreList(Id) {
  let params = {
    params: {
      bossId: Id
    }
  }
  return Axios.get("/api/stone/byBossId", params);
}

export default {
  getProductList: getProductList,
  getStoreList: getStoreList,
  category: category,
  search: search,
  addProduct: addProduct,
  deleteProduct:deleteProduct,
  singledeleteProduct:singledeleteProduct,
  bianProduct:bianProduct
}
