import Axios from "axios";

function getProductList(bossId) { 
  let params = {
    params: {
      bossId: bossId
    }
  }
  return Axios.get("/api/product/listProductAndCategoryName", params);
}

export default {
  getProductList: getProductList
}