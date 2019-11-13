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

//查询订单
function query(id){
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
// 获取订单状态
function getstatus() {

  return Axios.get("/order/order/status");
}
// 修改订单状态
function updateSytatus(params) {
   let fd = new FormData();
  fd.append('orderId', params.orderId);
  fd.append('id', params.id);

  // fd.append('hfName', params.hfName);
  return Axios.post("/order/order/updatestatus", fd, { responseType: 'arraybuffer' });;
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
//查看订单详情
function orderDetail(id) {
  let params = {
    params: {
      id: 192,

    }
  }
  return Axios.get("/order/order/queryDetail", params);
}
export default {
  orderDetail:orderDetail,
  checkOrderList: checkOrderList,
  createorder:createorder,
  create:create,
  getstatus:getstatus,
  updateSytatus:updateSytatus,
  query:query
};
