<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="getlistByType"  style="margin-bottom:30px;">
     <el-tab-pane  :label="item.orderDesc" v-for="item  in orderType" :key="item.orderDesc"  :name="item.orderDesc">
    </el-tab-pane>
  </el-tabs>
    <el-tabs type="border-card" @tab-click="getStatus">
      <el-tab-pane :label="item.hfName" v-for="item  in statusData" :key="item.hfName">
        <el-table :data="orderData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
          <el-table-column
            align="center"
            prop="orderCode"
            label="订单号"
            :show-overflow-tooltip="true"
            width="180"
          ></el-table-column>
           <el-table-column align="center" prop="nickName" label="支付人"></el-table-column>
           <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
          <el-table-column align="center" label="订单类型"  prop="orderType">
           <template slot-scope="scope">
             <span v-if="scope.row.orderType === 'balancePayment'">
              余额支付订单
             </span>
              <span v-if="scope.row.orderType ==='shoppingOrder'">
               到店支付订单
             </span>
              <span v-if="scope.row.orderType ==='nomalOrder'">
               普通订单
             </span>
             <span v-if="scope.row.orderType ==='rechargeOrder'">
               充值订单
             </span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="支付方式">
            <template slot-scope="scope">
             <span v-if="scope.row.paymentName === 'BalancePayment'">
               余额支付
             </span>
              <span v-if="scope.row.paymentName ==='balance'">
               余额支付
             </span>
              <span v-if="scope.row.paymentName ==='wechart'">
               微信支付
             </span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="订单状态" >
            <template>
              <span>{{zhuang}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="amount" label="支付金额"></el-table-column>
          <el-table-column align="center" prop="modifyTime" label="修改时间" width="180"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button @click="checkDetail(scope.row)" type="text" size="small">详情</el-button> -->
              <el-button @click="goDetail(scope.row)" type="text" size="small">订单处理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="float:right;"
          background
          layout="prev, pager, next"
          :total="orderData.length"
          :page-size="pagesize"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-drawer :visible.sync="drawer">
      <span style="margin-left:20px;font-size:14px;color:#666;">修改订单状态</span>
      <el-select
        v-model="updata.value"
        @change="updateStatus"
        placeholder="请选择"
        style="margin-left:20px;"
      >
        <el-option
          v-for="item in statusData"
          :key="item.hfName"
          :label="item.hfName"
          :value="item.hfName"
        ></el-option>
      </el-select>
    </el-drawer>
  </div>
</template>

<script>
import orderCenterService from '@/service/orderCenter.js';
import userCenterService from '@/service/userCenter.js';
import constants from '@/store/constants.js';
export default {
  data() {
    return {
      activeName: '',
      zhuang: '待支付',
      currentPage: 1, // 初始页
      pagesize: 10, // 每页的数据
      type: {
        orderType: '',
        orderStatus: '',
      },
      orderTypeValue: '',
      orderType: [],
      id: '',
      value: '',
      updata: {
        targetOrderStatus: '',
        id: '',
        orderCode: '',
        originOrderStatus: '',
      },
      optionvalue: '',
      options: [
      ],
      drawer: false,
      dialogVisible: false,
      userId: '',
      imageUrl: '',
      pictureVisible: false,
      addUserForm: {
        name: '杨莹',
        phone: '15022209253',
      },
      statusData: [],
      addUserVisible: false,
      orderData: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getlistByType: function(tab) {
      // console.log(tab);
      this.orderTypeValue = tab.label;
      for (var i = 0; i < this.orderType.length; i++) {
        if (this.orderType[i].orderDesc === this.orderTypeValue) {
          this.type.orderType = this.orderType[i].orderType;
          orderCenterService.getOrderByType(this.type, (res) => {
            console.log(res);
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              // eslint-disable-next-line no-magic-numbers
              data[i].amount = (data[i].amount / 100).toFixed(2);
              // eslint-disable-next-line no-magic-numbers
            }
            this.orderData = data;
          });
        }
      }
    },
    getOrderByType: function() {
      orderCenterService.getOrderType((res) => {
        // console.log(res);
        this.orderType = res.data.data;
      });
    },
    getOrderType: function() {
      orderCenterService.getOrderType((res) => {
        // console.log(res);
        this.orderType = res.data.data;
        this.activeName = this.orderType[0].orderDesc;
        this.type.orderType = this.orderType[0].orderType;
        this.type.orderStatus = res.data.data[0].hfDesc;
        this.getStatus1();
      });
    },
    updateStatus: function(aaa) {
      // console.log(aaa);
      for (var i = 0; i < this.statusData.length; i++) {
        if (this.statusData[i].hfName === aaa) {
          this.updata.targetOrderStatus = this.statusData[i].hfDesc;
          orderCenterService.upDataOrderStatus(this.updata, (res) => {
            // console.log(this.updata, res);
            if (res.data.status === constants.SUCCESS_CODE) {
              this.$message({
                message: '修改成功',
                type: 'success',
              });
              this.drawer = false;
            } else {
              this.$message.error('修改失败');
            }
            return false;
          });
        }
      }
    },
    getStatus: function(tab, event) {
      // console.log(tab.label);
      this.zhuang = tab.label;
      for (var i = 0; i < this.statusData.length; i++) {
        if (this.statusData[i].hfName === tab.label) {
          console.log(this.statusData[i].hfDesc);
          this.type.orderStatus = this.statusData[i].hfDesc;
          // console.log(this.type.orderStatus);
          // console.log(this.type);
          orderCenterService.getOrderByType(this.type, (res) => {
            console.log(res);
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              // eslint-disable-next-line no-magic-numbers
              data[i].amount = (data[i].amount / 100).toFixed(2);
              // eslint-disable-next-line no-magic-numbers
            }
            this.orderData = data;
            // console.log(this.statusData[i].hfDesc);
            return false;
          });
        }
      }
      this.orderData = [];
    },
    getStatus1: function(tab, event) {
      this.type.orderStatus = this.statusData[0].hfDesc;
      // console.log(this.type);
      orderCenterService.getOrderByType(this.type, (res) => {
<<<<<<< HEAD
        console.log(res);
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-magic-numbers
          data[i].amount = (data[i].amount / 100).toFixed(2);
          // eslint-disable-next-line no-magic-numbers
        }
        this.orderData = data;
=======
        // console.log(res);
        this.orderData = res.data.data;
>>>>>>> 2aa1fb551a00f515b690caf3db0341a5fa689a76
      });
    },
    addUser: function() {
      this.addUserVisible = true;
    },
    handleChange(file, fileList) {
      // console.log(file);
      userCenterService.uploadPicture(file, this.userId, (res) => {
        // console.log(res);
      });
    },
    addUserSubmit: function() {
      userCenterService.addUser(this.addUserForm, (res) => {
        // console.log(res);
        if (res.data.data === '该用户已经存在') {
          this.$message.error('该用户已经存在');
        } else {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.addUserVisible = false;
          // this.checkUser();
        }
      });
    },
    checkUser: function() {
      orderCenterService.checkStatus((res) => {
        // console.log(res.data.data);
        this.statusData = res.data.data;
        this.getOrderType();
      });
    },
    upload: function(row, id) {
      this.userId = row.id;
      this.pictureVisible = true;
      // console.log(row);
    },
    checkDetail: function(row) {
      this.drawer = true;
      this.updata.id = row.id;
      this.updata.originOrderStatus = row.orderStatus;
      this.updata.orderCode = row.orderCode;
      // console.log(row);
    },
    goDetail: function(row) {
      this.id = row.id;
      // console.log(this.zhuang);
      this.$router.push({
        path: '/orderDetail',
        query: {
          id: row.id,
        },
      });
    },

  },
  mounted() {
    this.checkUser();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

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
</style>
