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
        <div style="margin-top:20px; display:flex;align-items:center;justify-content:space-around;">
               <div
 v-if="item.detailStatus==='payment' || item.detailStatus==='process'"
        @click="cancle(item,index)"
        style="background: #ff4040;color: #fff;padding:6px 10px ;width:90px;text-align:center; border-radius:4px;height:23px;"
      >取消订单</div>
           <div
        v-if="item.detailStatus==='payment'"
        @click="pay(item, index)"
        style="width:90px;text-align:center;background: #409EFF;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;"
      >去支付</div>
          <div
          v-if="item.takingType==='selfPickUp'&&item.detailStatus==='process'&&detail.orderType==='nomalOrder'"
          @click="que(item,index)"
          style="background:#00bcd4;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;width:66px;"
        >确认订单</div>
        </div>

        <div
          style="display:fkex;align-items:center;margin-top:20px;"
          v-if="item.takingType==='delivery'&&item.detailStatus==='process'&&detail.orderType==='nomalOrder'"
        >
         <!-- <div
          style="display:fkex;align-items:center;margin-top:20px;"
        > -->
          <span>物流单号：</span>
          <el-input v-model="item.logisticsOrdersId" placeholder="请输入物流单号" style="width:200px;"></el-input>
          <!-- <el-input v-model="order.logisticsOrdersId" placeholder="请输入物流单号" style="width:200px;"></el-input> -->
          <el-button @click="que(item,index)" style="margin-left:10px;">提交</el-button>
        </div>
        <el-button
          v-if="item.takingType==='delivery'&&(detail.orderStatus==='process'||detail.orderStatus==='transport')&&detail.orderType==='nomalOrder'"
          @click="cha(item,index)"
          style="margin-left:10px;"
        >查询物流信息</el-button>
        <div  v-if="item.takingType==='delivery'&&(detail.orderStatus==='process'||detail.orderStatus==='transport')&&detail.orderType==='nomalOrder'&&item.wuliu!=0" style="line-height:30px; display:fkex;align-items:center;margin-top:20px;font-size:12px;"
        >
          <span style="margin-bottom:10px;">物流单号：{{item.wuliu.logisticCode}}</span>
          <span style="margin-left:20px;margin-bottom:10px;">物流公司名：{{item.wuliu.company}}</span>
          <!-- <span style="margin-left:20px;">物流信息</span> -->
          <!-- <div>物流信息:</div> -->
          <div v-for="(item1,index) in item.wuliu.traces" :key="index">
            <div>
              <span>{{item1.AcceptStation}}</span>
              <span>{{item1.AcceptTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div
        style="display:fkex;align-items:center;margin-top:20px;"
        v-if="takingType==='delivery'&&detail.orderStatus==='process'&&detail.orderType==='nomalOrder'"
      >
        <span>物流单号：</span>
        <el-input v-model="order.logisticsOrdersId" placeholder="请输入物流单号" style="width:200px;"></el-input>
      </div>-->

    </el-card>

    <div style="margin-top: 200px; display: flex;justify-content: space-around;padding:0 10%;">

      <!-- <div
        v-if="detail.orderStatus==='payment'"
        style="background: #40e5ff;color: #fff;padding:6px 10px ;border-radius:4px;height:23px;"
      >提醒用户</div> -->
      <div>
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
      orderliu: {
        stoneId: '',
        id: '',
      },
      detailRequestList: [],
      wuliuinfor: {},
      order: {
        stoneId: '',
        id: '',
        logisticsOrdersId: '',
        logisticsCompany: '',
        googsId: [],
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
        stoneId: '',
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
    cha: function(item, index) {
      // console.log(this.detailRequestList);
      this.orderliu.id = this.id;
      this.orderliu.stoneId = item.stoneId;
      // console.log(index);
      // console.log(this.orderliu);
      orderCenterService.getWuLiu(this.orderliu, (res) => {
        // this.detailRequestList[index].show = true;
        // console.log(this.detailRequestList);
        if (item.wuliu === '0') {
          console.log(1);
          this.detailRequestList[index].wuliu = res.data.data;

        } else {
          console.log(2);
          this.detailRequestList[index].wuliu = '0';
        }
        console.log(this.detailRequestList);
        // console.log('6', this.wuliuinfor);
        // eslint-disable-next-line no-eval
        // this.wuliuinfor = JSON.parse(this.wuliuinfor);
        // console.log('7', this.wuliuinfor);
        // var obj = '{LogisticCode:'75338825465751',ShipperCode:'ZTO'}';
        // console.log('7', obj);
        // this.takingType = res.data.data[0].takingType;
        // this.order.googsId = res.data.data[0].goodsId;
      });
    },

    que: function(item, index) {
      // console.log(item);
      this.order.id = this.$route.query.id;
      if (
        this.detail.orderStatus === 'process' &&
        this.detail.orderType === 'nomalOrder' && item.takingType === 'delivery') {
        // if (this.order.logisticsOrdersId === '') {
        //   this.$message.error('请填写物流单号');
        // }
        if (!item.logisticsOrdersId) {
          this.$message.error('请填写物流单号');
        } else {
          // console.log(item);
          let arr = [];
          for (var i = 0; i < item.hfOrderDetailList.length; i++) {
            arr.push(item.hfOrderDetailList[i].goodsId);
          }
          this.order.logisticsOrdersId = item.logisticsOrdersId;
          this.order.stoneId = item.stoneId;
          this.updata2.stoneId = item.stoneId;
          this.order.googsId = arr;
          orderCenterService.writeWuLiu(this.order, (res) => {
            // console.log(res);
            if (res.data.status === constants.SUCCESS_CODE) {
              // this.$message({
              //   message: '提交成功',
              //   type: 'success',
              // });

              // console.log(this.updata2);
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
      } else {
        this.updata2.stoneId = item.stoneId;
        // console.log(this.updata2);
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

      }
    },
    getdetail: function() {
      orderCenterService.getOrderDetail(this.id, (res) => {
        this.detail = res.data.data;
        // console.log(res);
        this.detail.orderDesc = JSON.parse(this.detail.orderDesc);
        this.hfGoodsSpecs = this.detail.orderDesc.hfGoodsSpecs;
        this.goodsName = this.detail.orderDesc.goodsName;
        this.updata.orderCode = this.detail.orderCode;
        this.updata1.orderCode = this.detail.orderCode;
        this.updata2.orderCode = this.detail.orderCode;
        this.detail.userId = this.content.id;
        this.updata1.originOrderStatus = this.detail.orderStatus;
        orderCenterService.getOrderDetail1(this.detail, (res) => {
          // console.log(res);
          this.detail = res.data.data[0];
          console.log(this.detail);
          this.takingType = res.data.data[0].takingType;
          this.order.googsId = res.data.data[0].goodsId;
          this.detailRequestList = res.data.data[0].detailRequestList;
          for (var i = 0; i < this.detailRequestList.length; i++) {
            // this.detailRequestList[i].wuliu = 1;
            for (var j = 0;j < this.detailRequestList[i].hfOrderDetailList.length;j++) {
              this.detailRequestList[i].hfOrderDetailList[j].hfDesc = JSON.parse(this.detailRequestList[i].hfOrderDetailList[j].hfDesc);
              // this.detailRequestList[i].show = false;
            }
          }
          // console.log('1', this.detailRequestList);
        });
        // if (this.takingType === 'delivery' && this.detail.orderStatus === 'transport' && this.detail.orderType === 'nomalOrder') {

        // }
      });
    },
    pay: function(item, index) {
      this.updata.stoneId = item.stoneId;
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
    cancle: function(item, index) {
      this.updata1.stoneId = item.stoneId;
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
    // console.log(this.id);
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
