/* eslint-disable require-jsdoc */
import Axios from 'axios';

function addLevel(name) {
  let fd = new FormData();
  fd.append('name', name);
  return Axios.post('/api/api/user/hf-auth/addUserMemberLevel', fd);
}
function checkLevel() {
  return Axios.get('/api/api/user/hf-auth/findUserMemberLevel');
}


export default {
  addLevel: addLevel,
  checkLevel: checkLevel,
};
