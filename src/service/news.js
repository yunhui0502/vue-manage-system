/* eslint-disable require-jsdoc */
import news from '@/api/news-api.js';
// 查询消息内容
async function getMessageContent(params, handleResult) {
  news.getMessageContent(params).then((res) => handleResult(res));
}
async function getMessageContentType(handleResult) {
  news.getMessageContentType().then((res) => handleResult(res));
}
async function updateIsUse(params, handleResult) {
  news.updateIsUse(params).then((res) => handleResult(res));
}
async function getTemplateParam(params, handleResult) {
  news.getTemplateParam(params).then((res) => handleResult(res));
}
async function addTemplateMessage(params, handleResult) {
  news.addTemplateMessage(params).then((res) => handleResult(res));
}
async function addAnnouncement(params, handleResult) {
  news.addAnnouncement(params).then((res) => handleResult(res));
}
async function getAnnouncement(handleResult) {
  news.getAnnouncement().then((res) => handleResult(res));
}
export default {
  getMessageContent: getMessageContent,
  getMessageContentType: getMessageContentType,
  updateIsUse: updateIsUse,
  getTemplateParam: getTemplateParam,
  addTemplateMessage: addTemplateMessage,
  addAnnouncement: addAnnouncement,
  getAnnouncement: getAnnouncement,
};

