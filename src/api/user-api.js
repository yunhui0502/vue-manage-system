
import Axios from 'axios'
// 获取用户
function categoryId () {
  return Axios.get('http://192.168.1.104:8082/user/userList')
}

export default {
  categoryId: categoryId
}
