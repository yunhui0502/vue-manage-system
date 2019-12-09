<template>
  <div class="container">
    <!-- 卡片 element-ui 组件 -->
    <div class="container1">
      <el-card class="th-card">
        <div class="block">
          <el-avatar shape="square" :size="150" :src="squareUrl"></el-avatar>
          <p>后台名称</p>
          <p>商家后台管理系统</p>
        </div>
      </el-card>
      <el-card class="my-card">
        <div class="form">
          <el-form ref="loginForm" :rules="loginRules" status-icon>
            <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入密码"
                style="width:236px;margin-right:10px"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="width:402px: #000;">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 定义一个校验函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '13911111111',
        code: '123456'
      },
      // 表单校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { len: 16, message: '验证码长度16位', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 0;
  margin: 0;
  background: url(../../assets/images/bj.png) no-repeat center / cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .th-card {
    position: relative;
    background: url(../../assets/images/bj2.png) no-repeat center / cover;
    width: 800px;
    height: 700px;
    .block {
      text-align: center;
      height: 150px;
      width: 150px;
      position: absolute;
      left: 0;
      right: 0;
      top: -260px;
      bottom: 0;
      margin: auto;
    }
  }
  .my-card {
    position: relative;
    width: 800px;
    height: 700px;
    .form {
      width: 400px;
      height: 400px;
       position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
    }
     img{
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
  .container1 {
    display: flex;
    width: 1600px;
    height: 700px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
