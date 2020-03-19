/* eslint-disable require-jsdoc */
import Axios from 'axios';
// 添加后台管理员
function addUser(params) {
  let fd = new FormData();
  fd.append('name', params.name);
  fd.append('phone', params.phone);
  return Axios.post('/api/api/user/hf-auth/addAdminUser', fd);
}

// 删除台管理员
function deleteUser(userId) {
  return Axios.get('/api/api/user/hf-auth/deleteAdminUser?userId=' + userId);
}
function uploadPicture(file, userId) {
  let fd = new FormData();
  fd.append('file', file);
  fd.append('userId', userId);
  return Axios.post('/api/api/user/user/upload_avatar', fd);
}
// 查询台管理员
function checkUser(params) {
  return Axios.get('/api/api/user/hf-auth/findAdminUser');
}
function updatePerson(params) {
  let fd = new FormData();
  console.log(params)
  fd.append('nickName', params.nickName);
  fd.append('invitationCode', params.invitationCode);
  fd.append('userId', params.userId);
  fd.append('phone', params.phone);
  return Axios.post('/api/api/user/hf-auth/update', fd);
}
export default {
  uploadPicture: uploadPicture,
  addUser: addUser,
  checkUser: checkUser,
  deleteUser: deleteUser,
  updatePerson:updatePerson
};
