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

      <div v-for="(item,index) in detailRequestList" :key="index">
        <div>店铺名称:{{item.stoneName}}</div>
        <div v-for="(item1,index1) in item.hfOrderDetailList" :key="index1">
          <span style="margin-left: 20px;">商品名称: {{item1.hfDesc.goodsName}}</span>
          <!-- <span style="margin-left: 20px;">物品名称:{{item1.hfDesc.goodName}}</span> -->
          <span style="margin-left: 40px;">购买数量: {{item1.quantity}}</span>
          <el-table :data="item1.hfDesc.hfGoodsSpecs" stripe style="width: 100%">
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
        </div>
      </div>
      <div
        style="display:fkex;align-items:center;margin-top:20px;"
        v-if="takingType==='delivery'&&detail.orderStatus==='process'&&detail.orderType==='nomalOrder'"
      >
        <span>物流单号：</span>
        <el-input v-model="order.logisticsOrdersId" placeholder="请输入物流单号" style="width:200px;"></el-input>
        <!-- <span style="margin-left:20px;">物流公司名：</span>
        <el-input v-model="order.logisticsCompany" placeholder="请输入物流单号" style="width:200px;"></el-input>-->
      </div>
      <div
        style="line-height:30px; display:fkex;align-items:center;margin-top:20px;font-size:12px;"
        v-if="takingType==='delivery'&&detail.orderStatus==='transport'&&detail.orderType==='nomalOrder'"
      >
        <span style="margin-bottom:10px;">物流单号：{{wuliuinfor.logisticCode}}</span>
        <span style="margin-left:20px;margin-bottom:10px;">物流公司名：{{wuliuinfor.company}}</span>
        <!-- <span style="margin-left:20px;">物流信息</span> -->
        <div>物流信息:</div>
        <div v-for="(item,index) in wuliuinfor.traces" :key="index">
          <div>
            <span>{{item.AcceptStation}}</span>
            <span>{{item.AcceptTime}}</span>
          </div>
        </div>
      </div>
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
      detailRequestList: [],
      wuliuinfor: {},
      order: {
        id: '',
        logisticsOrdersId: '',
        logisticsCompany: '',
        googsId: '',
      },
      input: '',
      content: {},
      takingType: '',
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
      updata2: {
        targetOrderStatus: 'transport',
        id: '',
        orderCode: '',
        originOrderStatus: 'process',
      },
      id: '',
      detail: {},
    };
  },
  methods: {
    que: function() {
      this.order.id = this.$route.query.id;
      if (
        this.takingType === 'delivery' &&
        this.detail.orderStatus === 'process' &&
        this.detail.orderType === 'nomalOrder'
      ) {
        if (this.order.logisticsOrdersId === '') {
          this.$message.error('请填写物流单号');
        } else {
          orderCenterService.writeWuLiu(this.order, (res) => {
            if (res.data.status === constants.SUCCESS_CODE) {
              // this.$message({
              //   message: '提交成功',
              //   type: 'success',
              // });
              console.log(this.updata2);
              orderCenterService.upDataOrderStatus(this.updata2, (res) => {
                // console.log(this.updata1, res);
                if (res.data.status === constants.SUCCESS_CODE) {
                  this.$message({
                    message: '已确认',
                    type: 'success',
                  });
                  this.drawer = false;
                  this.getdetail();
                } else {
                  this.$message.error('取消失败');
                }
                return false;
              });
            } else {
              this.$message.error('提交失败');
            }
            // this.takingType = res.data.data[0].takingType;
          });
        }
      } else {
        orderCenterService.writeWuLiu1(this.order, (res) => {
          if (res.data.status === constants.SUCCESS_CODE) {
            // this.$message({
            //   message: '提交成功',
            //   type: 'success',
            // });
            orderCenterService.upDataOrderStatus(this.updata2, (res) => {
              if (res.data.status === constants.SUCCESS_CODE) {
                this.$message({
                  message: '已确认',
                  type: 'success',
                });
                this.drawer = false;
                this.getdetail();
              } else {
                this.$message.error('取消失败');
              }
              return false;
            });
          } else {
            this.$message.error('提交失败');
          }
          // this.takingType = res.data.data[0].takingType;
        });
      }
    },
    getdetail: function() {
      orderCenterService.getOrderDetail(this.id, (res) => {
        this.detail = res.data.data;
        console.log(res);
        this.detail.orderDesc = JSON.parse(this.detail.orderDesc);
        this.hfGoodsSpecs = this.detail.orderDesc.hfGoodsSpecs;
        this.goodsName = this.detail.orderDesc.goodsName;
        this.updata.orderCode = this.detail.orderCode;
        this.updata1.orderCode = this.detail.orderCode;
        this.updata2.orderCode = this.detail.orderCode;
        this.detail.userId = this.content.id;
        this.updata1.originOrderStatus = this.detail.orderStatus;
        orderCenterService.getOrderDetail1(this.detail, (res) => {
          console.log(res);
          this.takingType = res.data.data[0].takingType;
          this.order.googsId = res.data.data[0].goodsId;
          this.detailRequestList = res.data.data[0].detailRequestList;
          for (var i = 0;i < this.detailRequestList.length;i++) {
            for (var j = 0;j < this.detailRequestList[i].hfOrderDetailList.length;j++) {
              this.detailRequestList[i].hfOrderDetailList[j].hfDesc = JSON.parse(this.detailRequestList[i].hfOrderDetailList[j].hfDesc) ;
            }
          }
          console.log('1', this.detailRequestList);
        });
        // if (this.takingType === 'delivery' && this.detail.orderStatus === 'transport' && this.detail.orderType === 'nomalOrder') {
        orderCenterService.getWuLiu(this.id, (res) => {
          this.wuliuinfor = res.data.data;
          console.log('6', this.wuliuinfor);
          // eslint-disable-next-line no-eval
          // this.wuliuinfor = JSON.parse(this.wuliuinfor);
          // console.log('7', this.wuliuinfor);
          // var obj = '{LogisticCode:'75338825465751',ShipperCode:'ZTO'}';
          // console.log('7', obj);
          // this.takingType = res.data.data[0].takingType;
          // this.order.googsId = res.data.data[0].goodsId;
        });
        // }
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
    this.updata2.id = this.$route.query.id;
    this.zhuang = this.$route.query.zhuang;
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    console.log(this.id);
    this.getdetail();
    // this.getdetail1();
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
