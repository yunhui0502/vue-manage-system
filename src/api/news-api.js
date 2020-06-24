/* eslint-disable require-jsdoc */
import Axios from './index';

function getMessageContent(params) {
  return Axios.get('/api/api/user/user/getMessageContent', {params});
}
function updateIsUse(params) {
  return Axios.get('/api/api/user/user/updateIsUse', {params});
}
function getMessageContentType() {
  return Axios.get('/api/api/user/user/getMessageContentType');
}
function getTemplateParam(params) {
  let fd = new FormData();
  fd.append('type', params.type);
  return Axios.get('/api/api/user/user/getTemplateParam', {params});
}
function addTemplateMessage(params) {
  let fd = new FormData();
  fd.append('type', params.type);
  fd.append('bossId', params.bossId);
  fd.append('content', params.content);
  fd.append('contentType', params.contentType);
  fd.append('messageType', params.messageType);

  if (params.subject !== '') {
    fd.append('subject', params.subject);
  }
  return Axios.post('/api/api/user/user/addTemplateMessage', fd);
}
function addAnnouncement(params) {
  let fd = new FormData();
  fd.append('content', params.content);
  fd.append('userId ', params.userId);
  return Axios.post('/api/api/product/home/addAnnouncement', fd);
}
function getAnnouncement() {
  return Axios.get('/api/api/product/home/getAnnouncement');
}
function getMessageInstanceList(params) {
  return Axios.get('/api/api/user/user/getMessageInstanceList', {params});
}
function updateMessageInstance(params) {
  return Axios.get('/api/api/user/user/updateMessageInstance', {params});
}
function getRefuse(id) {
  return Axios.get('/api/api/user/user/getRefuse?id=' + id);
}
export default {
  getMessageContent: getMessageContent,
  getMessageContentType: getMessageContentType,
  updateIsUse: updateIsUse,
  getTemplateParam: getTemplateParam,
  addTemplateMessage: addTemplateMessage,
  addAnnouncement: addAnnouncement,
  getAnnouncement: getAnnouncement,
  getMessageInstanceList: getMessageInstanceList,
  updateMessageInstance: updateMessageInstance,
  getRefuse: getRefuse,
};
