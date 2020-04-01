/* eslint-disable require-jsdoc */
import Axios from 'axios';

function addLevel(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('name', params.name);
  fd.append('levelDescribe', params.levelDescribe);
  return Axios.post('/api/api/user/hf-auth/addUserMemberLevel', fd);
}
function checkLevel() {
  return Axios.get('/api/api/user/hf-auth/findUserMemberLevel');
}
function addvip(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('levelId', params.levelId);
  fd.append('userId', params.userId);
  return Axios.post('/api/api/user/hf-auth/addUserMember', fd);
}
function findvip() {
  return Axios.get('/api/api/user/hf-auth/findUserMember');
}
function editLevel(params) {
  let fd = new FormData();
  fd.append('levelDescribe', params.levelDescribe);
  fd.append('name', params.name);
  fd.append('id', params.id);
  return Axios.post('/api/api/user/hf-auth/updateUserMemberLevel', fd);
}
function adddes(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('expireTime', params.expireTime);
  fd.append('startTime', params.startTime);
  fd.append('prerogative', params.prerogative);
  fd.append('levelDescribe', params.levelDescribe);
  fd.append('levelId', params.levelId);
  return Axios.post('/api/api/user/hf-auth/addMemberLevelDescribe', fd);
}
function finddes(levelId) {
  return Axios.get('/api/api/user/hf-auth/findMemberLevelDescribe?levelId=' + levelId);
}
function deletevip(id) {
  return Axios.get('/api/api/user/hf-auth/deleteUserMember?id=' + id);
}

export default {
  addLevel: addLevel,
  checkLevel: checkLevel,
  addvip: addvip,
  findvip: findvip,
  editLevel: editLevel,
  adddes: adddes,
  finddes: finddes,
  deletevip: deletevip,
};
