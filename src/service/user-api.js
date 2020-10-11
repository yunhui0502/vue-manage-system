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
export default {
    enterStoreList: enterStoreList,
    ListSon: ListSon,
    colleges: colleges,
    addSon: addSon,
    deleteSon: deleteSon,
    updateSon: updateSon
};
