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
//修改订单
   function update(params){
     let fd = new FormData();
      fd.append('amount',params.amount)
      fd.append('createTime',params.createTime )
      fd.append('distribution',params.distribution)
      fd.append('googsId',params.googsId)
      fd.append('hfDesc ',params.hfDesc)
      fd.append('hfRemark',params.hfRemark)
      fd.append('hfTax',params.hfTax)
      fd.append('id',params.id)
      fd.append('logisticsCompany',params.logisticsCompany)
      fd.append('logisticsOrderName',params.logisticsOrderName)
      fd.append('logisticsOrdersId',params.logisticsOrdersId)
      fd.append('orderDetailId ',params.orderDetailId)
      fd.append('orderDetailStatus',params.orderDetailStatus)
      fd.append('orderType ',params.orderType )
      fd.append('ordersId',params.ordersId)
      fd.append('payMethodName ',params.payMethodName )
      fd.append('payStatus ',params.payStatus)
      fd.append('purchasePrice  ',params.purchasePrice  )
      fd.append('purchaseQuantity  ',params.purchaseQuantity  )
      fd.append('respId ',params.respId )
      fd.append('userAddressId ',params.userAddressId )
      fd.append('userId ',params.userId )
     return Axios.get("/order/order/update",fd, { responseType: 'arraybuffer' });
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
//根据条件查询订单

  function queryorder(){
    let params = {
      params: {
       creatTime:"1",
       hfName:"1",
       orderDetailStatus:"1",
       orderId:"1",
       payMethodType:"0"
      }
    }
    return Axios.get("/order/order/queryorder", params);
  }
//快速打单
function print(id){
  let params = {
    params: {
       id:256
    }
  }
  return Axios.get("/order/order/print", params);
}


export default {
  orderDetail:orderDetail,
  checkOrderList: checkOrderList,
  createorder:createorder,
  create:create,
  getstatus:getstatus,
  updateSytatus:updateSytatus,
  query:query,
  queryorder:queryorder,
  print:print,
  update:update
};
