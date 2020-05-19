<template>
  <el-container class="my-container">
    <el-aside width="200px">
      <el-col :span="12">
        <div class="my-h5">
          <h5 align="center">后台管理系统</h5>
        </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#3B3B53"
          text-color="#fff"
          router
        >
          <el-menu-item :disabled="homePage" index="/">
            <!-- <img src="../img/icon_home5@2x.png" alt=""> -->
            <i class="iconfont icon-shouye"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item :disabled="dataStatistics" index="/hf-statistics">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item :disabled="product" index="/hf-product">
            <i class="iconfont icon-tongji"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item :disabled="activity" index="/hf-eventsManage">
            <i class="iconfont icon-liwu"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
          <el-menu-item :disabled="discountCoupon" index="/hf-quan">
            <i class="iconfont icon-wodeyouhuijuan"></i>
            <span slot="title">优惠券</span>
          </el-menu-item>
          <el-menu-item :disabled="order" index="/hf-orderCenter">
            <i class="iconfont icon-dingdan"></i>
            <span slot="title">订单中心</span>
          </el-menu-item>
          <el-menu-item :disabled="stone" index="/hf-store">
            <i class="iconfont icon-dianpu"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>
          <el-submenu :disabled="warehouse" index="/cang">
            <template slot="title">
              <i class="iconfont icon-dianpu"></i>
              <span slot="title">仓库管理</span>
            </template>
            <el-menu-item index="/cang">仓库</el-menu-item>
            <el-menu-item index="/rucang">进货单</el-menu-item>
            <el-menu-item index="/dan">出货单</el-menu-item>
            <el-menu-item index="/record">历史记录</el-menu-item>
          </el-submenu>
          <el-menu-item :disabled="user" index="/hf-userCenter">
            <i class="iconfont icon-icon-safe-bluefuben"></i>
            <span slot="title">用户中心</span>
          </el-menu-item>
          <el-menu-item :disabled="vip" index="/hf-vip">
            <i class="iconfont icon-huiyuanguanli2"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item :disabled="picture" index="/hf-file">
            <i class="iconfont icon-PhotoOutline"></i>
            <span slot="title">图片管理</span>
          </el-menu-item>
          <el-menu-item :disabled="set" index="/set">
            <i class="iconfont icon-weibiaoti2fuzhi16"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <el-container class="header-right">
          <el-container class="header-user-con">
            <el-dropdown trigger="click">
              <span>
                <i
                  class="el-icon-search"
                  style="margin-right: 10px;color: #CCCCCC;cursor: pointer;font-size: 30px;"
                ></i>
              </span>
              <span style="cursor: pointer;">
                <img src="../../img/8.png" />
              </span>
              <el-dropdown-menu slot="dropdown" style="width:300px;">
                <el-dropdown-item>
                  <img style="width: 40px;height: 40px;float: left;" src="../../img/6.jpg" />
                  <div style="float:left;margin-top:-5px;margin-left: 10px;">用户的名字</div>
                  <br />
                  <div style="float: left;margin-left: 10px;margin-top: -20px;">请输入你要添加的内容</div>
                  <div style="float: right;margin-top: -40px;">明晚14:20</div>
                </el-dropdown-item>
                <br />
                <el-dropdown-item divided>
                  <img style="width: 40px;height: 40px;float: left;" src="../../img/6.jpg" />
                  <div style="float:left;margin-top:-5px;margin-left: 10px;">用户的名字</div>
                  <br />
                  <div style="float: left;margin-left: 10px;margin-top: -20px;">请输入你要添加的内容</div>
                  <div style="float: right;margin-top: -40px;">明晚14:20</div>
                </el-dropdown-item>
                <br />
                <el-dropdown-item divided>
                  <img style="width: 40px;height: 40px;float: left;" src="../../img/6.jpg" />
                  <div style="float:left;margin-top:-5px;margin-left: 10px;">用户的名字</div>
                  <br />
                  <div style="float: left;margin-left: 10px;margin-top: -20px;">请输入你要添加的内容</div>
                  <div style="float: right;margin-top: -40px;">明晚14:20</div>
                </el-dropdown-item>
                <br />
                <el-dropdown-item divided>
                  <img style="width: 40px;height: 40px;float: left;" src="../../img/6.jpg" />
                  <div style="float:left;margin-top:-5px;margin-left: 10px;">用户的名字</div>
                  <br />
                  <div style="float: left;margin-left: 10px;margin-top: -20px;">请输入你要添加的内容</div>
                  <div style="float: right;margin-top: -40px;">明晚14:20</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="user-name" trigger="click" style="margin-top:20px;">
              <span class="el-dropdown-link" style="float: left;">
                {{content.realName}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <div class="block">
                <el-avatar
                  :size="34"
                  :src="'https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=' + content.fileId"
                ></el-avatar>
              </div>

              <el-dropdown-menu slot="dropdown" style="margin-left:-100px;">
                <a target="_blank">
                  <el-dropdown-item>{{content.realName}}</el-dropdown-item>
                  <el-dropdown-item>{{content.phone}}</el-dropdown-item>
                </a>
                <a href="http://39.100.237.144:8080/production-sub-path/loogin" target="_blank">
                  <el-dropdown-item>官网</el-dropdown-item>
                </a>
                <el-dropdown-item command="loginout">
                  <div @click="handover">切换账号</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-container>
        </el-container>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import store from '@/store';
export default {
  name: 'home',
  data() {
    return {
      isShow: false,
      content: {},
      homePage: false, // 首页
      dataStatistics: false, // 数据统计
      product: false, // 商品管理
      activity: false, // 活动管理
      discountCoupon: false, // 优惠券
      order: false, // 订单中心
      stone: false, // 店铺管理
      user: false, // 用户中心
      vip: false, // 会员管理
      warehouse: false, // 仓库管理
      picture: false, // 图片管理
      set: false, // 设置
    };
  },
  methods: {
    goUpdte: function() {
      this.$router.push('/update');
    },
    orderform() {
      this.$router.push('/orderform');
    },
    handover() {
      console.log('切换');
      store.delUser();
      this.$router.push('/login');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // eslint-disable-next-line complexity
    Privilege() {
      console.log(1);
      if (this.content.modelCode.homePage !== 'homePage') {
        this.homePage = true;
        console.log('首页', this.homePage);
      } if (this.content.modelCode.dataStatistics !== 'dataStatistics') {
        this.dataStatistics = true;
        console.log('数据统计', this.dataStatistics);
      }
      if (this.content.modelCode.set !== 'set') {
        this.set = true;
        console.log('设置', this.set);
      }
      if (this.content.modelCode.picture !== 'picture') {
        this.picture = true;
        console.log('图片管理', this.picture);
      }
      if (this.content.modelCode.warehouse !== 'warehouse') {
        this.warehouse = true;
        console.log('仓库管理', this.warehouse);
      }
      if (this.content.modelCode.vip !== 'vip') {
        this.vip = true;
        console.log('会员管理', this.vip);
      }
      if (this.content.modelCode.user !== 'user') {
        this.user = true;
        console.log('用户中心', this.user);
      }
      if (this.content.modelCode.stone !== 'stone') {
        this.stone = true;
        console.log('店铺管理', this.stone);
      }
      if (this.content.modelCode.discountCoupon !== 'discountCoupon') {
        this.discountCoupon = true;
        console.log('优惠卷', this.discountCoupon);
      }
      if (this.content.modelCode.activity !== 'activity') {
        this.activity = true;
        console.log('活动管理', this.activity);
      }
      if (this.content.modelCode.product !== 'product') {
        this.product = true;
        console.log('商品管理', this.product);
      }
    },
  },

  mounted() {
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    console.log('用户', this.content);
    // console.log('用户', this.content.modelCode.homePage);
    this.Privilege();
  },
};
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
    background: #3b3b53;
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
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      // color: rgba(255, 255, 255, 1);
      margin-right: 6px;
    }
    span {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      // color: rgba(255, 255, 255, 1);
    }
  }
}
// 头部
.el-header {
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  font-size: 22px;
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header-right {
    float: right;
    padding-right: 50px;
  }
  .header-user-con {
    // display: flex;
    height: 70px;
    align-items: center;
    line-height: 35px;
  }
}
.user-name {
  margin-left: 10px;
}
.block {
  float: right;
  margin-left: 10px;
  margin-bottom: 9px;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
