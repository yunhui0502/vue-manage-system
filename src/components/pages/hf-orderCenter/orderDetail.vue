<template>
  <div style="padding-bottom:130px ;">
    <div>
      <span style="font-weight: bold;">订单详情</span>
      <span style="margin-left:10px;">订单号:{{detail.orderCode}}</span>
    </div>
    <el-card class="box-card">
      <span>支付人:{{detail.nickName}}</span>
      <span style="margin-left: 20px;" v-if="detail.paymentName === 'balance'">支付方式:余额支付</span>
      <span style="margin-left: 20px;" v-if="detail.paymentName === 'BalancePayment'">支付方式:余额支付</span>
      <span style="margin-left: 20px;" v-if="detail.paymentName === 'wechart'">支付方式:微信支付</span>
      <span style="margin-left: 20px;">支付金额:{{detail.amount}}</span>
      <span style="margin-left: 20px;">支付时间:{{detail.modifyTime}}</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'payment'">订单状态:待支付</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'transport'">订单状态:运送中</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'process'">订单状态:处理中</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'complete'">订单状态:已完成</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'cancel'">订单状态:已取消</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'evaluate'">订单状态:待评价</span>
      <span style="margin-left: 20px;" v-if="detail.orderStatus === 'controversial'">订单状态:交易纠纷</span>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单扩展信息</span>
      </div>
      <span style="margin-left: 20px;">商品名称:{{detail.goodName}}</span>
      <span style="margin-left: 20px;">物品名称:{{goodsName}}</span>
      <span style="margin-left: 20px;">购买数量:{{detail.purchaseQuantity}}</span>
      <el-table :data="hfGoodsSpecs" stripe style="width: 100%">
        <el-table-column
          align="center"
          prop="hfName"
          label="规格名"
          :show-overflow-tooltip="true"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="hfValue"
          label="规格值"
          :show-overflow-tooltip="true"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="specType"
          label="规格值类型"
          :show-overflow-tooltip="true"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="specUnit"
          label="规格单位"
          :show-overflow-tooltip="true"
          width="180"
        ></el-table-column>
      </el-table>
    </el-card>
    <div style="margin-top: 200px; display: flex;justify-content: space-around;padding:0 10%;">
      <div
        v-if="detail.orderStatus==='payment'"
        @click="pay"
        style="background: #409EFF;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;"
      >去支付</div>
      <div
        v-if="detail.orderStatus==='payment'"
        style="background: #40e5ff;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;"
      >提醒用户</div>
      <div
        v-if="detail.orderStatus==='payment' || detail.orderStatus==='process'"
        @click="cancle()"
        style="background: #ff4040;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;"
      >取消订单</div>
      <div>
        <div
          v-if="detail.orderStatus==='process'"
          @click="que()"
          style="background:#00bcd4;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;width:66px;"
        >确认订单</div>
        <div v-if="xian">
          <div>
          <div style="display:flex;align-items:center;margin-top:20px;">
            <el-input v-model="input" placeholder="请输入物流单号" style="width:200px;"></el-input>
            <div
              v-if="detail.orderStatus==='process'"
              style="margin-left:10px; background:#00bcd4;color: #fff;font-size:12px; padding:6px 10px;border-radius:4px;height:16px;width:140px;"
            >提交物流单号(可不填写)</div>
          </div>
        </div>
           <div
          v-if="detail.orderStatus==='process'"
          @click="que()"
          style="background:#00bcd4;color: #fff;float:right; text-align:center;margin-top:20px; padding:6px 10px ;border-radius:4px;height:23px;width:46px;"
        >确认</div>
        </div>
      </div>
      <div>联系用户：{{detail.phone}}</div>
    </div>
  </div>
</template>

<script>
import orderCenterService from '@/service/orderCenter.js';
import constants from '@/store/constants.js';
export default {
  data() {
    return {
      xian: false,
      zhuang: '',
      goodsName: '',
      hfGoodsSpecs: [],
      updata: {
        targetOrderStatus: 'process',
        id: '',
        orderCode: '',
        originOrderStatus: 'payment',
      },
      updata1: {
        targetOrderStatus: 'cancel',
        id: '',
        orderCode: '',
        originOrderStatus: 'payment',
      },
      id: '',
      detail: '',
    };
  },
  methods: {
    que: function() {
      this.xian = true;
    },
    getdetail: function() {
      orderCenterService.getOrderDetail(this.id, (res) => {
        console.log(res);
        this.detail = res.data.data;
        this.detail.orderDesc = JSON.parse(this.detail.orderDesc);
        this.hfGoodsSpecs = this.detail.orderDesc.hfGoodsSpecs;
        this.goodsName = this.detail.orderDesc.goodsName;
        this.updata.orderCode = this.detail.orderCode;
        this.updata1.orderCode = this.detail.orderCode;
        this.updata1.originOrderStatus = this.detail.orderStatus;
      });
    },
    pay: function() {
      orderCenterService.upDataOrderStatus(this.updata, (res) => {
        // console.log(this.updata, res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '支付成功',
            type: 'success',
          });
          this.drawer = false;
          this.getdetail();
        } else {
          this.$message.error('支付失败');
        }
        return false;
      });
    },
    cancle: function() {
      orderCenterService.upDataOrderStatus(this.updata1, (res) => {
        // console.log(this.updata1, res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '已取消',
            type: 'success',
          });
          this.drawer = false;
          this.getdetail();
        } else {
          this.$message.error('取消失败');
        }
        return false;
      });
    },
  },

  mounted() {
    this.id = this.$route.query.id;
    this.updata.id = this.$route.query.id;
    this.updata1.id = this.$route.query.id;
    this.zhuang = this.$route.query.zhuang;
    // console.log(this.id, this.zhuang);
    this.getdetail();
  },
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 30px;
}
</style>
