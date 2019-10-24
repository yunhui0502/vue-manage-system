<template>
  <div style="width: 100%;height: 100%;background:black;position: absolute;">
    <div class="login">
      <div class="login2" style="color: #ffffff;">系 统 登 陆</div>
      <div>
        <input type="text" placeholder="账号" v-model="Login1.authType" />
        <input type="text" placeholder="密码" v-model="Login1.passwd" />
      </div>
      <div class="btn" @click="Login()">用户登录</div>

    </div>
  </div>
</template>



<script>
  import axios from 'axios';
  import api from '@/apis/user-api.js';
  import {
    mapGetters
  } from 'vuex';
  export default {
    name: 'testIndex',
    data(){
      return {
        Login1: {
          authType:"admin",
          passwd: "123456"
        }
      }
    },
    methods: {
      Login() {
        console.log(this.Login1)
        api.login(this.Login1).then(res => {
        console.log(res);
        this.$router.push("/")

        });
      }
    },
    computed: {
      ...mapGetters(['taxno', 'username'])
    },
    init() {

    }
  }
</script>
<style>
  .btn {
    width: 80%;
    height: 30px;
    background: #20A0FF;
    margin: 0 auto;
    margin: 0 auto;
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 5px;
  }

  .login {
    width: 400px;
    height:250px;
    border: 1px solid #cccccc;
    margin: 0 auto;
    margin-top: 230px;
  }

  .login2 {
    margin-left: 150px;
    margin-top: 30px;
    font-weight: bold;
  }

  input {
    width: 80%;
    height: 30px;
    margin: 0 auto;
    display: block;
    margin-top: 20px;
    text-indent: 5px;
    /* border-radius:0.1px; */
  }
</style>
