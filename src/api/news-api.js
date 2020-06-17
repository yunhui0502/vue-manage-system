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
export default {
  getMessageContent: getMessageContent,
  getMessageContentType: getMessageContentType,
  updateIsUse: updateIsUse,
  getTemplateParam: getTemplateParam,
  addTemplateMessage: addTemplateMessage,
};
