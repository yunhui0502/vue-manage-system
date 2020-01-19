
import Axios from 'axios'
// 获取用户
function categoryId () {
  return Axios.get('/log/user/selectList')
}
// 添加核销员
function insertCancel (params) {
  return Axios.get('/ver/cancel/insertCancel?RealName=' + params.RealName + '&UserId=' + params.UserId + '&site=' + params.site)
}
// 编辑
function update (params) {
  let fd = new FormData()
  fd.append('userStatus', params.userStatus)
  fd.append('realName', params.realName)
  // fd.append('birthDay', params.birthDay)
  fd.append('phone', params.phone)
  fd.append('requestId', params.requestId)
  fd.append('sex', params.sex)
  fd.append('token', params.token)
  fd.append('userId', params.userId)
  return Axios.post('/log/user/update', fd)
}

// 修改核销员信息
function updateCancel (params) {
  let fd = new FormData()
  fd.append('RealName', params.realName)
  fd.append('userId', params.userId)
  fd.append('cancel2', params.cancel2)
  fd.append('site', params.site)
  return Axios.post('/ver/cancel/updateCancel', fd)
}
export default {
  categoryId: categoryId,
  insertCancel: insertCancel,
  update: update,
  updateCancel: updateCancel
}
