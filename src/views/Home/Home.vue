<template>
  <el-container class="my-container">
    <el-aside width="200px">
      <el-col :span="12">
        <h5>后台管理系统</h5>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#002033"
          text-color="#fff"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-submenu index="/orderform">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理></span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">全部订单</el-menu-item>
              <el-menu-item index="1-2">退款维权</el-menu-item>
              <el-menu-item index="1-3">快速打单</el-menu-item>
              <el-menu-item index="1-4">评价管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">商户管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">类目管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-setting"></i>
            <span slot="title">消息</span>
          </el-menu-item>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-location"></i>
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
            <i class="el-icon-setting"></i>
            <span slot="title">优惠卷</span>
          </el-menu-item>
          <el-menu-item index="11">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown" @command="clickItem">
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
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  h5 {
    font-size: 9px;
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .el-aside {
    background: #002033;
  }
  .el-menu {
    border-right: none;
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
