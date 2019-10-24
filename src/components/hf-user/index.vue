<!-- <template>
  <div>
    <div class="login">
      <div class="login2">系 统 登 陆</div>
      <div>
        <input type="text" placeholder="账号" v-model="authType"/>
        <input type="text" placeholder="密码" v-model="passwd"/>
      </div>
      <div class="btn" @click="Login()">登录</div>

    </div>
  </div>
</template>

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
    height: 250px;
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

<script>
import axios from 'axios';
import api from '@/apis/user-api.js';
import {
  mapGetters
} from 'vuex';
export default {
  name: 'testIndex',
  methods: {
    handleUpload(raw) {
      this.files.push(raw.file);
    },
 handlePush() {
      axios.post('/api/user/login', fd, { responseType: 'arraybuffer' }).then(res => {
        console.log(res);
      });
    },
   Login() {
       api.Login().then(res => {
            console.log(res.data)
         });
       }
   },
  computed: {
    ...mapGetters(['taxno', 'username'])
  },
  data() {
    return {
      files: [],
      fileIds: []
    }
  },
  init() {

  }
}
</script>
 -->