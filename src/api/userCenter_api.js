import Axios from 'axios';
// 添加后台管理员
function addUser(params) {
  let fd = new FormData();
  fd.append('name', params.name);
  fd.append('phone', params.phone);
  return Axios.post('/log/user/update', fd);
}
export default {
  addUser: addUser,

};
