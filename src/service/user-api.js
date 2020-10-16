/* eslint-disable require-jsdoc */
import product from '@/api/user.js';

async function enterStoreList(handleResult) {
    product.enterStoreList().then(res => handleResult(res));
}
async function ListSon(handleResult) {
    product.ListSon().then(res => handleResult(res));
}
async function colleges(handleResult) {
    product.colleges().then(res => handleResult(res));
}
async function addSon(params,handleResult) {
    product.addSon(params).then(res => handleResult(res));
}
async function deleteSon(params,handleResult) {
    product.deleteSon(params).then(res => handleResult(res));
}
async function updateSon(params,handleResult) {
    product.updateSon(params).then(res => handleResult(res));
}
async function authenticationList(handleResult) {
    product.authenticationList().then(res => handleResult(res));
}
async function authenticationDispose(params,handleResult) {
    product.authenticationDispose(params).then(res => handleResult(res));
}
async function enterStoreDelete(params,handleResult) {
    product.enterStoreDelete(params).then(res => handleResult(res));
}
async function Login(params,handleResult) {
    product.Login(params).then(res => handleResult(res));
}
export default {
    enterStoreList: enterStoreList,
    ListSon: ListSon,
    colleges: colleges,
    addSon: addSon,
    deleteSon: deleteSon,
    updateSon: updateSon,
    authenticationList:authenticationList,
    authenticationDispose:authenticationDispose,
    enterStoreDelete:enterStoreDelete,
    Login:Login
};
