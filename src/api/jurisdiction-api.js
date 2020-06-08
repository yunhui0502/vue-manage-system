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
function roleDeleteJurisdiction (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('JurisdictionIds', params.JurisdictionIds);
  fd.append('roleId', params.roleId);
  return Axios.post('/api/api/user/jurisdiction/roleDeleteJurisdiction', fd);
}
export default {
  selectRole: selectRole,
  findAdminHasModel: findAdminHasModel,
  findAdminHasJusInModel: findAdminHasJusInModel,
  roleAddModel: roleAddModel,
  roleDeleteJurisdiction: roleDeleteJurisdiction,
};
