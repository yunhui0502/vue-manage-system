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
     return Axios.post("/user/user/update",fd,{reponseType:'arraybuffer'});
}
//收货地址

 function address(address_action){
     let params={
       params:{
            contact:address_action.contact,
            hfAddressDetail:address_action.hfAddressDetail,
            hfCity:address_action.hfCity,
            hfConty:address_action.hfConty,
            hfProvince:address_action.hfProvince,
            hfDesc:address_action.hfDesc,
            id:address_action.id,
            isFaultAddress:address_action.isFaultAddress,
            phoneNumber:address_action.phoneNumber,
            userId:address_action.userId
       }
     }
     return Axios.get("/api/user/address/addAddress",params)
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
        //删除
        function remove(remove){
          let params={
            params:{
                id:remove
            }
          }
          return Axios.get("/user/user/address/deleteAddress",params)
        }
      //用户地址列表

       function list(list){
         let params={
           params:{
              token:list.token,
              userId:list.userId
           }
         }
         return Axios.get("/user/user/address/queryAddress",params)

       }



export default {
  login:login,
  register:register,
  update:update,
  address:address,
  remove:remove,
  list:list

}
