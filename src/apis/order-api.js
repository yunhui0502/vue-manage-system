import Axios from "axios";
// 查看订单列表
function checkOrderList(id) {
  let params = {
    params: {
       userId:id
    }
  }
  return Axios.get("/order/order/query", params);
}


export default {
  checkOrderList: checkOrderList
};