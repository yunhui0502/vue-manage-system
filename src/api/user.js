import Axios from 'axios';
import Qs from 'qs'
let user = 'https://swcloud.tjsichuang.cn:1444/second/user';
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
    fd.append('service', params.service);
    fd.append('weChat', params.WeChat);
    return Axios.post(user + '/SonLogin/addSon', fd);
}
// 删除子站点
function deleteSon(params) {
    let fd = new FormData();
    fd.append('id', params.id);
    return Axios.post(user + '/SonLogin/deleteSon', fd);
}
// 修改子站点
function updateSon(params) {
    let fd = new FormData();
    if(params.collegoryId != -1) {
        fd.append('collegoryId', params.collegoryId);
    }
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
// 学生认证列表
function UserList(IsAuthentication) {
    return Axios.get(user + '/MiniLoginController/UserList?IsAuthentication='+IsAuthentication );
}
// 每个子站点交易金额
function sonTransactionAmount() {
    return Axios.get(user + '/SonLogin/sonTransactionAmount');
}
// 添加商家基础信息
function AddBasics(params) {
    console.log(params)
    let fd = new FormData();
    if (params.newUserIntegral!='') {
        fd.append('newUserIntegral', params.newUserIntegral);
    }
    if (params.service!='') {
        fd.append('service', params.service);
    }
    if (params.slideshow.length != 0) {
        fd.append('slideshow', params.slideshow);
    }
    if (params.sonWithdrawalCommission!='') {
        fd.append('sonWithdrawalCommission', params.sonWithdrawalCommission);
    }
    if (params.storeWithdrawalCommission!='') {
        fd.append('storeWithdrawalCommission', params.storeWithdrawalCommission);
    }
    if (params.userWithdrawalCommission!='') {
        fd.append('userWithdrawalCommission', params.userWithdrawalCommission);
    }
    if (params.weChat!='') {
        fd.append('weChat', params.weChat);
    }
    return Axios.post(user + '/BossLogin/AddBasics', fd);
}
// 添加商家基础信息
function AddBasicsimg(params) {
    Qs.stringify({ slideshow: params }, { arrayFormat: 'repeat' })//使用qs的{ arrayFormat: 'repeat'}
    return Axios.post(user + '/BossLogin/AddBasics', params);
}
// 查询轮播图
function select() {
    return Axios.get(user + '/BossLogin/select?type=homepage');
}
// 删除首页轮播图
function deleted(params) {
    let fd = new FormData();
    fd.append('file', params.file);
    fd.append('type', params.type);
    return Axios.post(user + '/BossLogin/deleted', fd);
}
// 保存消息
function addMessage(params) {
    let fd = new FormData();
    fd.append('file', params.file);
    fd.append('headline', params.headline);
    fd.append('secondDesc', params.secondDesc);
    return Axios.post(user + '/Message/addMessage', fd);
}
// 删除消息
function deletedMessage(params) {
    let fd = new FormData();
    fd.append('id', params.id);
    return Axios.post(user + '/Message/deletedMessage', fd);
}
// 查询小程序消息
function selectMiniMessage() {
    return Axios.get(user + '/Message/selectMiniMessage');
}
// 消息修改
function updateMessage(params) {
    let fd = new FormData();
    if (params.file){
     fd.append('file', params.file );
    }
    fd.append('headline', params.headline);
    fd.append('id', params.id);
    fd.append('secondDesc', params.secondDesc);
    return Axios.post(user + '/Message/updateMessage', fd);
}

// 商家查询
function selectBoss() {
    return Axios.get(user + '/BossLogin/selectBoss');
}
// 发送公告消息
function announcement(params) {
    let fd = new FormData();
    fd.append('message', params.message);
    return Axios.post(user + '/Message/announcement', fd);
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
    selectBoss:selectBoss,
    announcement:announcement,
    AddBasicsimg:AddBasicsimg
};
