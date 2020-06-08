/* eslint-disable require-jsdoc */
import Axios from './index';

function selectRole () {
  return Axios.get('/api/api/user/jurisdiction/selectRole');
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
// 取消模块
function roleDeleteModel (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('modelId', params.modelId);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/roleDeleteModel', fd);
}
export default {
  selectRole: selectRole,
  findAdminHasModel: findAdminHasModel,
  findAdminHasJusInModel: findAdminHasJusInModel,
  roleAddModel: roleAddModel,
  roleDeleteModel: roleDeleteModel,
};
