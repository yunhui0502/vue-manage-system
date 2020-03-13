import Axios from 'axios';
// 添加后台管理员
function addUser(params) {
  let fd = new FormData();
  fd.append('name', params.name);
  fd.append('phone', params.phone);
  return Axios.post('/api/api/user/hf-auth/addAdminUser', fd);
}
// 查询台管理员
function checkUser(params) {
  return Axios.get('/api/api/user/hf-auth/findAdminUser');
}
// 删除台管理员
function deleteUser(userId) {
  return Axios.get('/api/api/user/hf-auth/deleteAdminUser?userId='+userId);
}
export default {
  addUser: addUser,
	checkUser:checkUser,
	deleteUser:deleteUser
};
