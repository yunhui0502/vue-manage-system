<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>优惠券</span>
        <el-button style="float: right;" size="small" type="primary" @click="drawer = true">添加优惠券</el-button>
      </div>
      <el-table stripe :data="list" style="width: 100%">
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column prop="discountCouponName" label="名称" align="center"></el-table-column>
        <el-table-column align="center" prop="discountCouponType" label="优惠类型">
           <template slot-scope="scope">
            <span v-if="scope.row.discountCouponType==='0'">折扣</span>
            <span v-if="scope.row.discountCouponType==='1'">满减</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="discountCouponDesc" label="描述"></el-table-column>
        <el-table-column align="center" label="适用范围">
          <template slot-scope="scope">
            <span v-if="scope.row.scope==='allUser'">所有用户</span>
            <span v-if="scope.row.scope==='vipUser'">vip用户</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否可以叠加">
          <template slot-scope="scope">
            <span v-if="scope.row.superposition===1">是</span>
            <span v-if="scope.row.superposition===2">否</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="startTime" width="180" label="有效期开始时间"></el-table-column>
        <el-table-column align="center" width="180" prop="stopTime" label="有效期结束时间"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              align="center"
              @click="checkPersonDetail(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-drawer size="55%" title="添加优惠券" :visible.sync="drawer" :direction="direction">
      <el-form
        style="margin-left:20px;"
        :model="formquan"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="discountCouponName">
          <el-input v-model="formquan.discountCouponName" style="width:230px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠类型" prop="discountCouponType">
          <el-radio v-model="radio" label="0" @change="zhe">折扣</el-radio>
          <el-radio v-model="radio" label="1" @change="zhe">满减</el-radio>
        </el-form-item>
        <el-form-item label="有效期开始时间" prop="startTime">
          <el-date-picker v-model="formquan.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效期结束时间" prop="stopTime">
          <el-date-picker v-model="formquan.stopTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="discountCouponDesc" style="margin-top:20px;">
          <el-input
            style="width:500px;"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="formquan.discountCouponDesc"
            maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="适用范围" prop="scope" style="margin-top:20px;">
          <el-select @change="getchangdata" v-model="val" placeholder="请选择">
            <el-option
              v-for="item in scopedata"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否可以叠加使用" prop="discountCouponType" style="margin-top:20px;">
          <el-radio v-model="radio1" label="1" @change="die">是</el-radio>
          <el-radio v-model="radio1" label="2" @change="die">否</el-radio>
        </el-form-item>
        <el-row v-if="formquan.discountCouponType ===1">
          <el-col :span="1">
            <el-form-item label="优惠额度" style="margin-top:20px;"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="满" prop="useLimit.full" style="margin-top:20px;">
              <el-input v-model="formquan.useLimit.full" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="减" prop="useLimit.minus" style="margin-top:20px;">
              <el-input v-model="formquan.useLimit.minus" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formquan.discountCouponType ===0">
          <el-col :span="1">
            <el-form-item label="优惠额度" style="margin-top:20px;"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="满" prop="useLimit.full" style="margin-top:20px;">
              <el-input v-model="formquan.useLimit.full" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="折扣" prop="useLimit.minus" style="margin-top:20px;">
              <el-input v-model="formquan.useLimit.minus" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">%</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-container class="t-10 radius-4">
          <el-header class="font-neue t-10">图片管理</el-header>
          <el-main>
            <list-picture :productId="productInfo.id"></list-picture>
          </el-main>
        </el-container>-->
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
<!-- ============================================================================================= -->
      <el-drawer size="55%" title="修改优惠券" :visible.sync="drawer1" :direction="direction">
      <el-form
        style="margin-left:20px;"
        :model="formquan1"
        status-icon
        :rules="rules"
        ref="ruleForm1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="discountCouponName">
          <el-input v-model="formquan1.discountCouponName" style="width:230px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠类型" prop="discountCouponType">
          <el-radio v-model="radioval" label="0" @change="zhe">折扣</el-radio>
          <el-radio v-model="radioval" label="1" @change="zhe">满减</el-radio>
        </el-form-item>
        <el-form-item label="有效期开始时间" prop="startTime">
          <el-date-picker v-model="formquan1.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效期结束时间" prop="stopTime">
          <el-date-picker v-model="formquan1.stopTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="discountCouponDesc" style="margin-top:20px;">
          <el-input
            style="width:500px;"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="formquan1.discountCouponDesc"
            maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="适用范围" prop="scope" style="margin-top:20px;">
          <el-select @change="getchangdata" v-model="valselect" placeholder="请选择">
            <el-option
              v-for="item in scopedata"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否可以叠加使用"  style="margin-top:20px;">
          <el-radio v-model="radiodie" label="1" @change="die">是</el-radio>
          <el-radio v-model="radiodie" label="2" @change="die">否</el-radio>
        </el-form-item>
        <el-row v-if="formquan1.discountCouponType ===1">
          <el-col :span="1">
            <el-form-item label="优惠额度" style="margin-top:20px;"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="满" prop="useLimit.full" style="margin-top:20px;">
              <el-input v-model="formquan1.useLimit.full" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="减" prop="useLimit.minus" style="margin-top:20px;">
              <el-input v-model="formquan1.useLimit.minus" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formquan1.discountCouponType ===0">
          <el-col :span="1">
            <el-form-item label="优惠额度" style="margin-top:20px;"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="满" prop="useLimit.full" style="margin-top:20px;">
              <el-input v-model="formquan1.useLimit.full" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="折扣" prop="useLimit.minus" style="margin-top:20px;">
              <el-input v-model="formquan1.useLimit.minus" style="width:100px;" autocomplete="off">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">%</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-container class="t-10 radius-4">
          <el-header class="font-neue t-10">图片管理</el-header>
          <el-main>
            <list-picture :productId="productInfo.id"></list-picture>
          </el-main>
        </el-container>-->
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm1('ruleForm1')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import quan from '@/service/quan.js';
import constants from '@/store/constants.js';
// eslint-disable-next-line no-unused-vars
// import ListPicture from './list-picture';
export default {
  data() {
    return {
      radiodie: '',
      valselect: '',
      radioval: '0',
      drawer1: false,
      val: '',
      scopedata: [],
      radio1: '1',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      direction: 'rtl',
      rules: {
        discountCouponName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          },
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur',
          },
        ],
        stopTime: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'blur',
          },
        ],
        discountCouponDesc: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur',
          },
        ],
        scope: [
          {
            required: true,
            message: '请选择适用范围',
            trigger: 'blur',
          },
        ],
        useLimit: {
          full: [
            {
              required: true,
              message: '请填写优惠额度',
              trigger: 'blur',
            },
          ],
          minus: [
            {
              required: true,
              message: '请填写优惠额度',
              trigger: 'blur',
            },
          ],
        },
      },
      list: [],
      radio: '0',
      textarea: '',
      drawer: false,
      formquan: {
        bossId: 1,
        useLimit: {
          full: '',
          minus: '',
        },
        superposition: 1,
        discountCouponName: '',
        discountCouponType: 0,
        startTime: '',
        stopTime: '',
      },
      formquan1: {
        bossId: 1,
        useLimit: {
          full: '',
          minus: '',
        },
        superposition: 1,
        discountCouponName: '',
        discountCouponType: 0,
        startTime: '',
        stopTime: '',
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    };
  },
  methods: {
    formatTen: function(num) {
      // eslint-disable-next-line no-magic-numbers
      return num > 9 ? num + '' : '0' + num;
    },

    formatDate: function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      // eslint-disable-next-line no-unused-vars
      var hour = date.getHours();
      // eslint-disable-next-line no-unused-vars
      var minute = date.getMinutes();
      // eslint-disable-next-line no-unused-vars
      var second = date.getSeconds();
      // eslint-disable-next-line no-undef
      return (
        year +
        '-' +
        this.formatTen(month) +
        '-' +
        this.formatTen(day) +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      );
    },
    getchangdata: function(aaa) {
      // console.log(aaa);
      this.formquan.scope = aaa;
      for (var i = 0; i < this.scopedata.length; i++) {
        if (this.scopedata[i].name === aaa) {
          this.formquan.scope = this.scopedata[i].code;
        }
      }
      // console.log(this.formquan.scope);
    },
    zhe: function(e) {
      console.log(e);
      if (e === '0') {
        this.formquan.discountCouponType = 0;
      } else {
        this.formquan.discountCouponType = 1;
      }
      // console.log(this.formquan.discountCouponType);
    },
    checkPersonDetail: function(row) {
      this.drawer1 = true;
      console.log(row);
      this.formquan1.discountCouponName = row.discountCouponName;
      this.formquan1.discountCouponType = row.discountCouponType;
      this.radioval = this.formquan1.discountCouponType;
      this.formquan1.startTime = row.startTime;
      this.formquan1.stopTime = row.stopTime;
      this.formquan1.discountCouponDesc = row.discountCouponDesc;
      this.formquan1.scope = row.scope;
      console.log(this.formquan.discountCouponType);
      if (row.superposition === 1) {
        this.radiodie = '1';
      // eslint-disable-next-line no-magic-numbers
      } else if (row.superposition === 2) {
        this.radiodie = '2';
      }

    },
    submitForm(ruleForm) {
      //   this.formquan.startTime = this.formquan.startTime.toLocaleString();
      //   this.formquan.stopTime = this.formquan.startTime.toLocaleString();
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.formquan.startTime = this.formatDate(this.formquan.startTime);
          this.formquan.stopTime = this.formatDate(this.formquan.stopTime);
          this.formquan.useLimit = JSON.stringify(this.formquan.useLimit);
          quan.addCoupon(this.formquan, (res) => {
            // console.log(res);
            if (res.data.status === constants.SUCCESS_CODE) {
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.drawer = false;
              this.getlist();
            } else {
              this.$message({
                message: '添加失败',
                type: 'error',
              });
            }
          });
        }
      });
    },
    submitForm1(ruleForm) {
      //   this.formquan.startTime = this.formquan.startTime.toLocaleString();
      //   this.formquan.stopTime = this.formquan.startTime.toLocaleString();
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // this.formquan1.startTime = this.formatDate(this.formquan1.startTime);
          // this.formquan1.stopTime = this.formatDate(this.formquan1.stopTime);
          quan.bianCoupon(this.formquan1, (res) => {
            // console.log(res);
            if (res.data.status === constants.SUCCESS_CODE) {
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.drawer = false;
              this.getlist();
            } else {
              this.$message({
                message: '添加失败',
                type: 'error',
              });
            }
          });
        }
      });
    },
    die: function(e) {
      // console.log(e);
      if (e === '1') {
        this.formquan.superposition = 1;
      } else if (e === '2') {
        this.formquan.superposition = 2;
      }
      // console.log(this.formquan.superposition);
    },
    getScope: function() {
      quan.getScope(this.editid, (res) => {
        // console.log(res);
        this.scopedata = res.data.data;
      });
    },
    getlist: function() {
      quan.getlist(this.editid, (res) => {
        // console.log(res);
        this.list = res.data.data;
      });
    },
  },
  // eslint-disable-next-line no-empty-function
  mounted() {
    this.getScope();
    this.getlist();
  },
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-textarea .el-textarea__inner {
  resize: none;
}
</style>
