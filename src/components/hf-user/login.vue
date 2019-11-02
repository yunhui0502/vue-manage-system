<template>
<div class="login_wrapper">
  <div class="login">
    <el-form :model="formLogin">
      <el-form-item>
        <h2 class="title">汉服商城后台管理系统</h2>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="formLogin.password" placeholder="密码"></el-input>
      </el-form-item>

      <el-form-item label="登录方式">
        <el-radio-group v-model="formLogin.loginType">
          <el-radio label="用户名"></el-radio>
          <el-radio label="手机号"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登 录</el-button>
        <span v-show="this.errorInfo.isShowError" class='error'>
          {{this.errorInfo.text}}
        </span>
      </el-form-item>
    </el-form>
  </div>

</div>
</template>

<script>
import userApi from '@/apis/user-api';
export default {
  name: 'login',
  data() {
    return {
      formLogin: { //表单对象
        loginName: '123456789',
        password: '123',
        loginType: '用户名'
      },
      errorInfo: {
        text: '登陆失败,请重试',
        isShowError: false //显示错误提示
      }

    }
  },
  mounted() {
    document.onkeydown = (event) => {
      var router = this.$route.path;
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13 && this.$route.path == '/login') { // enter 键
        this.login();
      }
    };
  },
  methods: {
    login() {
      //调用后端登陆接口
      userApi.login(this.formLogin)
        .then((response) => {
          // console.log(this.formLogin)
          console.log('success:', response);
          if (response && response.data) {
            if (response.data.status == 200) {
              let data = response.data.data;
              localStorage.setItem('userId', data.userId);
              localStorage.setItem('token', data.token);
              this.$router.push("/product");
            } else {
              alert('登录错误');
            }
          } else {
            alert("登录异常");
          }

        })
        .catch((err) => {
          console.log('error:', err);
          this.errorInfo.isShowError = true;
          this.errorInfo.text = '系统接口异常';
        });
    }
  }
}
</script>

<style lang="scss">
$input_width:300px;

.login_wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login {
    width: 500px;
    height: 350px;
    margin-top: -150px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      text-align: center;
      color: #505458;
    }

    .el-form-item__content {
      width: $input_width;
    }

    .el-button {
      width: $input_width;
    }

    .el-form {
      margin: 30px 80px auto 80px;

      .error {
        display: block;
        text-align: center;
        color: red;
      }
    }
  }
}

.recover {
  position: absolute;
  bottom: 0px;
  cursor: pointer;
  color: #E6A23C;
  // display: none;
}

.bei {
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  color: #505458;
}
</style>
