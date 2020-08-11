/* eslint-disable require-jsdoc */
import api from '@/api/jurisdiction-api.js';


async function selectAccountRole(params, handleResult) {
  api.selectAccountRole(params).then((res) => handleResult(res));
}
async function findAdminHasModel(id, handleResult) {
  api.findAdminHasModel(id).then((res) => handleResult(res));
}
async function findAdminHasJusInModel(params, handleResult) {
  api.findAdminHasJusInModel(params).then((res) => handleResult(res));
}
async function roleAddModel(params, handleResult) {
  api.roleAddModel(params).then((res) => handleResult(res));
}
async function roleDeleteModel(params, handleResult) {
  api.roleDeleteModel(params).then((res) => handleResult(res));
}
async function roleAddJurisdiction(params, handleResult) {
  api.roleAddJurisdiction(params).then((res) => handleResult(res));
}
async function roleDeleteJurisdiction(params, handleResult) {
  api.roleDeleteJurisdiction(params).then((res) => handleResult(res));
}
async function addRole(params, handleResult) {
  api.addRole(params).then((res) => handleResult(res));
}
async function selectRoleCode(handleResult) {
  api.selectRoleCode().then((res) => handleResult(res));
}
async function addUserRole(params, handleResult) {
  api.addUserRole(params).then((res) => handleResult(res));
}
async function deleteUserRole(params, handleResult) {
  api.deleteUserRole(params).then((res) => handleResult(res));
}
async function getListWaOrStore(type, handleResult) {
  api.getListWaOrStore(type).then((res) => handleResult(res));
}
async function findAdminHasModelAndJus(id, handleResult) {
  api.findAdminHasModelAndJus(id).then((res) => handleResult(res));
}
async function findRoleModelAndJ(params, handleResult) {
  api.findRoleModelAndJ(params).then((res) => handleResult(res));
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
