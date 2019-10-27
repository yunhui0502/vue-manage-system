import Axios from "axios";


//用户更新
function update(params){
     let fd=new FormData();
     fd.append("address","天津");
     fd.append("birthDay",params.birthDay);
     fd.append("email",params.email);
     fd.append("fileInfo",params.fileInfo);

     fd.append("nickName",params.nickName);
     fd.append("realName",params.realName);

     fd.append("region",params.region);
     fd.append("requestId",params.requestId);
     fd.append("sex",params.sex);

     fd.append("timestamp",params.timestamp);
     fd.append("token",params.token);
     fd.append("userId",params.userId);
     fd.append("username",params.username);
     return Axios.post("/api/user/update",fd,{reponseType:'arraybuffer'});
}

//登录
function login(login) {
  let params = {
    token: ""
  };
  if (login.loginType == '用户名') {
    params['authKey'] = login.loginName;
    params['passwd'] = login.password;
    params['authType'] = '1';
  } else { 
    params['authType'] = '2';
    params['passwd'] = "";
    params['authKey'] = login.loginName;
  }
  console.log(params, login);
  return Axios.get("/user/user/login", { params: params });
}
//注册

function register(regi_ster){
    let params={
      params:{
        authType:regi_ster.authType,
        authKey:regi_ster.passwd,
        passwd:"admin",

      }
    }
    return Axios.get("/api/user/register",params)
}

export default {
  login:login,
 register:register,
  update:update,


}
