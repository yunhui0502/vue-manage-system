<template>
  <div class="box">
    <h2>概况</h2>
    <!-- 顶部 -->
    <div class="top-box">
      <div class="member-box member-image">
        <div class="member">会员数</div>
        <div class="quantity">26485</div>
        <div class="dateline">
          <span>日会员数：48687</span>
          <span>月会员数：486876</span>
        </div>
      </div>

      <div class="member-box visit-image">
        <div class="member">访问量</div>
        <div class="quantity">264888463</div>
        <div class="dateline">
          <span>日访问数：48687</span>
          <span>月访问数：486876</span>
        </div>
      </div>

      <div class="member-box order-image">
        <div class="member">订单量</div>
        <div class="quantity">894687</div>
        <div class="dateline">
          <span>日订单量：48687</span>
          <span>月订单量：486876</span>
        </div>
      </div>

      <div class="member-box member-image">
        <div class="member">总收入</div>
        <div class="quantity">8448648.89</div>
        <div class="dateline">
          <span>日收入：48687646.00</span>
          <span>月收入：48687646.00</span>
        </div>
      </div>
    </div>
    <!-- 用户 -->
    <div>
      <!-- 左 -->
      <div class="left-box">
        <div class="user-box">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户</span>
            </div>
            <div class="text item"></div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>产品概况</span>
            </div>
            <div class="text item"></div>
          </el-card>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>营销活动</span>
          </div>
          <div class="text item"></div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单详情</span>
          </div>
          <div class="text item"></div>
        </el-card>
      </div>
      <!-- 右 -->
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.left-box {
  width: 74.8%;

  .user-box {
    display: flex;
    justify-content: space-between;
    .box-card {
      width: 48%;
      height: 370px;
    }
  }
}
// 顶部样式
.box {
  padding: 0 50px;
}
.member-image {
  background-image: url(../img/21.png);
  background-size: 100% 100%;
}
.visit-image {
  background-image: url(../img/22.png);
  background-size: 100% 100%;
}
.order-image {
  background-image: url(../img/cc.png);
  background-size: 100% 100%;
}

.top-box {
  display: flex;
  justify-content: space-between;
}
.member-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 22%;
  height: 166px;
  padding: 0 17px;

  .member {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
  .quantity {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
  }
  .dateline {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
