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
async function UserList(params,handleResult) {
    product.UserList(params).then(res => handleResult(res));
}
async function sonTransactionAmount(handleResult) {
    product.sonTransactionAmount().then(res => handleResult(res));
}
async function AddBasics(params,handleResult) {
    product.AddBasics(params).then(res => handleResult(res));
}
async function select(handleResult) {
    product.select().then(res => handleResult(res));
}
async function deleted(params,handleResult) {
    product.deleted(params).then(res => handleResult(res));
}
async function addMessage(params,handleResult) {
    product.addMessage(params).then(res => handleResult(res));
}
async function selectMiniMessage(handleResult) {
    product.selectMiniMessage().then(res => handleResult(res));
}
async function deletedMessage(params,handleResult) {
    product.deletedMessage(params).then(res => handleResult(res));
}
async function updateMessage(params,handleResult) {
    product.updateMessage(params).then(res => handleResult(res));
}
async function selectBoss(params,handleResult) {
    product.selectBoss(params).then(res => handleResult(res));
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
    Login:Login,
    UserList:UserList,
    sonTransactionAmount:sonTransactionAmount,
    AddBasics:AddBasics,
    select:select,
    deleted:deleted,
    addMessage:addMessage,
    selectMiniMessage:selectMiniMessage,
    deletedMessage:deletedMessage,
    updateMessage:updateMessage,
    selectBoss:selectBoss
};
