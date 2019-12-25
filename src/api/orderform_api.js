
import Axios from 'axios'
// 查看订单状态
function getProductList () {
  return Axios.get('/foo//order/query')
}

export default {
  getProductList: getProductList
}
