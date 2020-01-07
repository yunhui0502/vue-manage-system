
import Axios from 'axios'
// 查看订单状态
function getProductList () {
  return Axios.get('/foo//order/query')
}
// 编辑商品
function update (params) {
  let fd = new FormData()
  fd.append('goodsId', params.goodsId)
  fd.append('id', params.id)
  fd.append('repertory', params.repertory)
  fd.append('startTime', params.startTime)
  fd.append('stopTime', params.stopTime)
  return Axios.post('http://192.168.1.175:9910/kill/update', fd, { responseType: 'arraybuffer' })
}
export default {
  getProductList: getProductList,
  update: update
}
