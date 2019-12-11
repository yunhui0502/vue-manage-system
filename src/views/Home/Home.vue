<template>
  <el-container class="my-container">
    <el-aside width="200px">
      <el-col :span="12">
        <div class="my-h5">
          <h5 align="center">后台管理系统</h5>
        </div>
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#3B3B53"
          text-color="#fff"
          router
        >
          <el-menu-item index="/">
            <i class="iconfont icon-home" style="font-size: 28px;"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <i class="el-icon-document-copy"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="/commodity">
            <i class="iconfont icon-tongji"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-submenu index="/orderform">
            <template slot="title">
              <i class="iconfont icon-weibiaoti-"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/orderform">全部订单</el-menu-item>
              <el-menu-item index="1-2">退款维权</el-menu-item>
              <el-menu-item index="1-3">快速打单</el-menu-item>
              <el-menu-item index="1-4">评价管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="iconfont icon-huodong" style="font-size: 27px;"></i>
            <span slot="title">活动</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont icon-fenleiguanli"></i>
            <span slot="title">类目管理</span>
          </el-menu-item>
           <el-menu-item index="7">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="iconfont icon-huiyuan"></i>
            <span slot="title">会员设置</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="iconfont icon-xiaoxi"></i>
            <span slot="title">消息</span>
          </el-menu-item>
          <el-submenu index="9">
            <template slot="title">
              <i class="iconfont icon-zichan"></i>
              <span>资产</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="10">
            <i class="iconfont icon-weibiaoti2fuzhi02"></i>
            <span slot="title">优惠卷</span>
          </el-menu-item>
          <el-menu-item index="11">
            <i class="iconfont icon-set"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown" >
          <span class="el-dropdown-link">
            <img class="avatar" :src="photo" alt />
            <span class="name">用户昵称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- vue基础知识  插槽 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    orderform () {
      this.$router.push('/orderform')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang='less'>
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  h5 {
    font-size: 18px;
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .el-aside {
    background: #3B3B53;
    my-h5 {
      width: 200px;
      height: 36px;
    }
    .el-col {
      width: 100%;
    }
  }
  .el-menu {
    width: 100%;
    border-right: none;
    float: left;
    i {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-right: 6px;
    }
    span {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        display: inline-block;
      }
      .name {
        color: #333;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
