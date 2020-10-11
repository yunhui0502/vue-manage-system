import Axios from 'axios';

let user = 'http://39.100.237.144:7004/user';
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
export default {
    enterStoreList: enterStoreList,
    ListSon: ListSon,
    colleges: colleges,
    addSon:addSon,
    deleteSon: deleteSon,
    updateSon: updateSon
};
