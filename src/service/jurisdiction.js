/* eslint-disable require-jsdoc */
import api from '@/api/jurisdiction-api.js';


async function selectRole(handleResult) {
  api.selectRole().then((res) => handleResult(res));
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
async function roleDeleteJurisdiction(params, handleResult) {
  api.roleDeleteJurisdiction(params).then((res) => handleResult(res));
}

export default {
  selectRole: selectRole,
  findAdminHasModel: findAdminHasModel,
  findAdminHasJusInModel: findAdminHasJusInModel,
  roleAddModel: roleAddModel,
  roleDeleteJurisdiction: roleDeleteJurisdiction,
};

