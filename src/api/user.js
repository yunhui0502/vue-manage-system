import Axios from 'axios';

let user = 'https://www.tjsichuang.cn:1443/second/user';
// =============================================商品模块
//入驻商家列表
function enterStoreList() {
    return Axios.get(user + '/StoreLogin/enterStoreList');
}
function ListSon() {
    return Axios.post(user + '/SonLogin/ListSon');
}
function colleges() {
    return Axios.get(user + '/SonLogin/colleges');
}
function addSon(params) {
    let fd = new FormData();
    fd.append('collegoryId', params.collegoryId);
    fd.append('file', params.file);
    fd.append('name', params.name);
    fd.append('password', params.password);
    fd.append('userId', params.userId);
    fd.append('username', params.username);
    return Axios.post(user + '/SonLogin/addSon', fd);
}
// 删除子站点
function deleteSon(params) {
    let fd = new FormData();
    fd.append('id', params.id);
    return Axios.post(user + '/SonLogin/deleteSon', fd);
}
// 删除子站点
function updateSon(params) {
    let fd = new FormData();
    fd.append('collegoryId', params.collegoryId);
    fd.append('name', params.name);
    fd.append('password', params.password);
    fd.append('sonId', params.sonId);
    fd.append('username', params.username);
    return Axios.post(user + '/SonLogin/updateSon', fd);
}
// 商家认证列表
function authenticationList() {
    return Axios.get(user + '/StoreLogin/authenticationList');
}
// 入驻商家认证处理
function authenticationDispose(params) {
    let fd = new FormData();
    fd.append('AuthenticationId', params.AuthenticationId);
    fd.append('StartAuthenticationState', params.StartAuthenticationState);
    fd.append('EndAuthenticationState', params.EndAuthenticationState);
    return Axios.post(user + '/StoreLogin/authenticationDispose', fd);
}
// 删除入驻商家
function enterStoreDelete(params) {
    let fd = new FormData();
    fd.append('storeId', params.storeId);
    return Axios.post(user + '/StoreLogin/enterStoreDelete', fd);
}
// 登录
function Login(params) {
    let fd = new FormData();
    fd.append('password', params.password);
    fd.append('username', params.username);
    return Axios.post(user + '/BossLogin/Login', fd);
}
export default {
    enterStoreList: enterStoreList,
    ListSon: ListSon,
    colleges: colleges,
    addSon:addSon,
    deleteSon: deleteSon,
    updateSon: updateSon,
    authenticationList:authenticationList,
    authenticationDispose:authenticationDispose,
    enterStoreDelete:enterStoreDelete,
    Login:Login
};
