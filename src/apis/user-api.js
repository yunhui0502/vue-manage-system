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
function login(Logins){
  let params={
    params:{
      authType:Logins.authType,
      authKey:Logins.passwd,
      passwd:"admin",
      token:"1"
    }
  }
  return Axios.get("/api/user/login",params)
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
  register:register ,
  update:update,
}
