import Axios from "axios";

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
  register:register
}
