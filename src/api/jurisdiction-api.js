/* eslint-disable require-jsdoc */
import Axios from './index';

function selectAccountRole (params) {
  console.log(params);
  return Axios.get('/api/api/user/jurisdiction/selectAccountRole', {params});
}
function findAdminHasModel (params) {
  console.log(params);
  return Axios.get('/api/api/user/jurisdiction/findAdminHasModel', {params});
}
function findAdminHasJusInModel (params) {
  console.log(params);
  return Axios.get('/api/api/user/jurisdiction/findAdminHasJusInModel', {params});
}
function roleAddModel (params) {
  console.log(params);
  return Axios.get('/api/api/user/jurisdiction/roleAddModel', {params});
}
// 下拉框
function selectRoleCode () {
  return Axios.get('/api/api/user/jurisdiction/selectRoleCode');
}
// 取消模块
function roleDeleteModel (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('modelId', params.modelId);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/roleDeleteModel', fd);
}

// 绑定模块下的小权限
function roleAddJurisdiction (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('JurisdictionIds', params.JurisdictionIds);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/roleAddJurisdiction', fd);
}
// 取消绑定模块下的小权限
function roleDeleteJurisdiction (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('JurisdictionIds', params.JurisdictionIds);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/roleDeleteJurisdiction', fd);
}
// 添加角色
function addRole (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('roleCode', params.roleCode);
  fd.append('roleName', params.roleName);
  fd.append('userId', params.userId);
  fd.append('accountId', params.accountId);
  return Axios.post('/api/api/user/jurisdiction/addRole', fd);
}
// 给账号绑定角色
function addUserRole (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('id', params.id);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/addUserRole', fd);
}
// 给账号解除绑定角色
function deleteUserRole (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('id', params.id);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/deleteUserRole', fd);
}
function getListWaOrStore (type) {
  console.log(type);
  return Axios.get('/api/api/user/jurisdiction/getListWaOrStore?type=' + type);
}
function findAdminHasModelAndJus (params) {
  console.log(params);
  return Axios.get('/api/api/user/jurisdiction/findAdminHasModelAndJus', {params});
}
function findRoleModelAndJ (params) {
  console.log(params);
  return Axios.get('/api/api/user/jurisdiction/findRoleModelAndJ', {params});
}
export default {
  selectAccountRole: selectAccountRole,
  findAdminHasModel: findAdminHasModel,
  findAdminHasJusInModel: findAdminHasJusInModel,
  roleAddModel: roleAddModel,
  roleDeleteModel: roleDeleteModel,
  roleAddJurisdiction: roleAddJurisdiction,
  roleDeleteJurisdiction: roleDeleteJurisdiction,
  addRole: addRole,
  selectRoleCode: selectRoleCode,
  addUserRole: addUserRole,
  deleteUserRole: deleteUserRole,
  getListWaOrStore: getListWaOrStore,
  findAdminHasModelAndJus: findAdminHasModelAndJus,
  findRoleModelAndJ: findRoleModelAndJ,
};
