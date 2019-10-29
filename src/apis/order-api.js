import Axios from "axios";
// 查看订单列表
function checkOrderList(id) {
  let params = {
    params: {
       id:id
    }
  }
  return Axios.get("/order/order/query", params);
}

// 创建订单
function create() {
  let params = {
    params: {
       userId: 1,
       userAddressId: 1,
       googsId : 3,
       logisticsOrderName: 1,
       respId: 3,
       logisticsOrdersId: 1,
       logisticsCompany: 1,
       hfDesc: 1,
       orderDetailStatus: 1,
       hfTax: 1,
       purchasePrice: 1,
       purchaseQuantity: 1,
       distribution: 1,
       payStatusorderType: 1,
       amount: 1,
       hfMemo: 1,
       hfRemark: 1,
       payMethodName: 1
    }
  }
  return Axios.get("/order/order/creat", params);
}
// 创建订单
function createorder(id) {
  let params = {
    params: {
      orderId: id,
      bossId: 1,
      Amount: 1
    }
  }
  return Axios.get("/ordersubmit/payment/pay", params);
}

export default {
  checkOrderList: checkOrderList,
  createorder:createorder,
  create:create
};
