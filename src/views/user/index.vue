
<template>
  <div style="width: 95%;height: 90%;background:#ffffff;margin: 0 auto;margin-top:60px;">
    <div style="width: 100%;height:500px; ">
      <div style="width: 100%;height: 50px;border-bottom: 1px solid #cccccc;">
        <span style="margin-left: 30px;line-height:50px;">用户管理</span>
        <div style="float: right;line-height: 50px;margin-right: 60px;color: #A3A0FB;">今日取消：300</div>
        <div style="float: right;line-height: 50px;margin-right: 60px;color: #A3A0FB;">兴趣人群：300</div>
        <div style="float: right;line-height: 50px;margin-right: 60px; color: #A3A0FB;">今日新增：300</div>
        <div style="float: right;line-height: 50px;margin-right: 60px;color: #A3A0FB;">用户总量：300</div>
      </div>
      <div class="block">
        <span class="demonstration">注册时间</span>
        <el-date-picker
          style="width:20%;margin-left: 54px;"
          v-model="form.time"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="注册时间"
        ></el-date-picker>
      </div>

      <div class="block2">
        <span class="leijixiaof" style>用户邮箱</span>
        <span style="margin-left: 10px;"></span>
        <el-input v-model="form.email" placeholder="请输入内容" style="width: 15%;margin-left:40px;"></el-input>
        <span style="margin-left: 10px;">余额</span>
        <el-input v-model="form.hfBalance" placeholder="请输入内容" style="width: 15%;margin-left:20px;"></el-input>
      </div>
      <div class="block3">
        <div>
          关键词
          <el-input
            v-model="form.nickName"
            placeholder="请输入退款编号"
            style="width:20%;margin-left: 60px;"
          ></el-input>
          <span style="margin-left: 10px;">客户身份</span>
          <el-select v-model="form.userStatus" placeholder="请选择" style="margin-left: 20px;">
            <el-option
              v-for="item in identity"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span style="margin-left: 10px;">性别</span>
          <el-select v-model="form.sex" placeholder="请选择" style="margin-left: 20px;">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div style="margin-top: 20px;">
          手机号
          <el-input
            style="margin-left: 45px;"
            class="input1"
            v-model="form.phone"
            placeholder="请输入内容"
          ></el-input>
          <span style="margin-left: 10px;">地区</span>
          <el-input class="input2" v-model="form.region" placeholder="请输入内容"></el-input>
          <!-- <span style="margin-left: 10px;">单价</span>
          <el-input class="input2" v-model="form.input2" placeholder="请输入内容"></el-input>-->
          <!-- <span style="margin-left: 10px;">至</span>
          <el-input class="input2" v-model="form.input3" placeholder="请输入内容"></el-input>-->
        </div>
      </div>

      <div style="width:22%;height: 60px;margin: 0 auto;margin-top: 30px;">
        <div
          style="float: left;width:50%;height:60px;text-align: center;line-height: 60px;background: #A3A0FB;border-radius: 5px;color: #ffffff;haixuan"
          @click="filtrate()"
        >筛选</div>
        <div
         @click="reset()"
          style="float: left;width: 50%;height:60px;text-align: center;line-height: 60px;color: #A3A0FB;"
        >重置筛选条件</div>
      </div>

      <!-- <div style="width: 100%;height:100%;background:#ffffff;">
        <div
          style="width:8%;height:40px;text-align: center;line-height: 40px;background: #ffffff;color: #cccccc;border-radius: 5px;float:right;margin-right: 40px;margin-top: 50px;border: 1px solid #cccccc;"
      >批量管理</div>-->
      <div
        style="width:8%;height:40px;text-align: center;line-height: 40px;background: #A6A3FB;color: #ffffff;border-radius: 5px;float: right;margin-right: 20px;margin-top: 50px;"
        @click="dialogVisible=true"
      >
        <el-button type="primary" @click="dialogVisible = true" class="bg">+添加会员</el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;text-align: center;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="120" style="text-align: center;"></el-table-column>
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{ scope.row.sex===1?'男':'女' }}</template>
        </el-table-column>

        <el-table-column align="address" label="所在地">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column
          prop="userLevel"
          width="160"
          label="等级"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{ scope.row.userLevel }}</template>
        </el-table-column>
        <el-table-column prop="createDate" label="关注时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column prop="hfBalance" label="余额" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.hfBalance }}</template>
        </el-table-column>
        <!-- <el-table-column
            prop="address"
            label="成交"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{ scope.row.chengjiao }}</template>
        </el-table-column>-->
        <el-table-column prop="userStatus" label="用户身份" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.userStatus==1?'会员':'非会员' }}</template>
        </el-table-column>
        <el-table-column prop="address" label="是否是核销员" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.cancelId==1?'是':'否' }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button @click="amend(scope)" type="text" size="small" style="color: #A6A3FB;">编辑</el-button>
            <el-button
              @click.native.prevent="SetupVerifier(scope)"
              type="text"
              size="small "
              style="color: #FFCE26;"
            >设置核销员</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              style="color: #FF318A;"
            >联系客户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px"></div>
      <!-- 添加用户---------------------------------------------------------------------->
      <el-dialog
        title="会员管理"
        :visible.sync="dialogVisible"
        width="845px"
        height="480px"
        :before-close="handleClose"
      >
        <!-- 整体 -->
        <div class="zt">
          <!-- 左侧 -->
          <div class="left">
            <!-- <div class="lei">
              <div class="zr">
                <span></span> 客户身份
              </div>
              <div class="zr_1">
                <el-radio v-model="radio" label="1">会员</el-radio>
                <el-radio v-model="radio" label="2">非会员</el-radio>
              </div>
            </div>-->
            <div class="lei">
              <div class="zr">
                <span></span> 手机号
              </div>
              <div class="zr_2">
                <el-input v-model="input" placeholder="请输入手机号" class="sr"></el-input>
              </div>
            </div>
            <div class="lei">
              <div class="zr">姓名</div>
              <div class="zr_2">
                <el-input v-model="input1" placeholder="请输入姓名" class="sr"></el-input>
              </div>
            </div>
            <div class="lei">
              <div class="zr">性别</div>
              <div class="zr_1">
                <el-radio v-model="radio_1" label="1">男</el-radio>
                <el-radio v-model="radio_1" label="2">女</el-radio>
              </div>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="right">
            <div class="lei">
              <div class="zr">标签</div>
              <div class="sr">
                <el-select v-model="value" placeholder="全部">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lei">
              <div class="zr">生日</div>
              <div class="block4">
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
            <div class="lei">
              <div class="zr">地域</div>
              <div class="sr">
                <el-select v-model="value" placeholder="全部">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lei">
              <div class="zr">备注</div>
              <div class="sr">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" class="input">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" class="input_1">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑------------------------------------------------------------------------->
      <el-dialog
        title="编辑"
        :visible.sync="dialogRedact"
        width="845px"
        height="480px"
        :before-close="handleClose"
      >
        <!-- 整体 -->
        <div class="zt">
          <!-- 左侧 -->
          <div class="left">
            <div class="lei">
              <div class="zr">
                <span></span> 客户身份
              </div>
              <div class="zr_1">
                <el-radio v-model="formRedact.userStatus" label="1">会员</el-radio>
                <el-radio v-model="formRedact.userStatus" label="0">非会员</el-radio>
              </div>
            </div>
            <div class="lei">
              <div class="zr">
                <span></span> 手机号
              </div>
              <div class="zr_2">
                <el-input v-model="formRedact.phone" placeholder="请输入手机号" class="sr"></el-input>
              </div>
            </div>
            <div class="lei">
              <div class="zr">姓名</div>
              <div class="zr_2">
                <el-input v-model="formRedact.ealName" placeholder="请输入姓名" class="sr"></el-input>
              </div>
            </div>
            <div class="lei">
              <div class="zr">性别</div>
              <div class="zr_1">
                <el-radio v-model="formRedact.sex" label="1">男</el-radio>
                <el-radio v-model="formRedact.sex" label="2">女</el-radio>
              </div>
            </div>
            <div class="lei">
              <div class="zr">是否核销员</div>
              <div class="zr_1">
                <el-radio v-model="formRedact.cancel2" label="0">否</el-radio>
                <el-radio v-model="formRedact.cancel2" label="1">是</el-radio>
              </div>
            </div>
            <div class="right">
              <div class="lei">
                <div class="zr">核销地点</div>
                <div class="sr">
                  <el-input v-model="formRedact.site" placeholder="请输入内容" class="sr"></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="right">
            <div class="lei">
              <div class="zr">标签</div>
              <div class="sr">
                <el-select v-model="value" placeholder="全部">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lei">
              <div class="zr">生日</div>
              <div class="block4">
                <el-date-picker v-model="formRedact.birthDay" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </div>
            <div class="lei">
              <div class="zr">地域</div>
              <div class="sr">
                <el-select v-model="value" placeholder="全部">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lei">
              <div class="zr">备注</div>
              <div class="sr">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogRedact = false" class="input">取 消</el-button>
          <el-button type="primary" @click="submitCompile" class="input_1">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="设置核销员"
        :visible.sync="dialogSetup"
        width="845px"
        height="480px"
        :before-close="handleClose"
      >
        <!-- 整体 -->
        <div class="zt">
          <!-- 左侧 -->
          <div class="left">
            <div class="lei">
              <div class="zr">姓名</div>
              <div class="zr_2">
                <el-input v-model="formVerifier.RealName" placeholder="请输入姓名" class="sr"></el-input>
              </div>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="right">
            <div class="lei">
              <div class="zr">核销地点</div>
              <div class="sr">
                <el-input v-model="formVerifier.site" placeholder="请输入内容" class="sr"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSetup = false" class="input">取 消</el-button>
          <el-button type="primary" @click="verifierSubmit" class="input_1">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <!-- </div>                                                                                                                  -->
</template>

<script>
import api from '@/api/user-api.js'
export default {
  data () {
    return {
      form: {
        address: '', // 用户地址
        balanceType: '', // 余额类型
        birthDay: '', // 出生日期
        cancelId: '', // 核销员Id
        time: '', // 创建时间 *
        email: '', // 用户邮箱
        fileId: '', // 用户头像
        hfBalance: '', // 余额
        id: '', //
        idDeleted: '', // 是否失效
        lastAuthTime: '', // 最后修改人
        modifyDate: '', // 修改时间
        nickName: '', // 用户昵称 *
        phone: '', // 手机号 *
        realName: '', // 真实姓名
        region: '', // 用户来源
        sex: '', // 性别 *
        sourceType: '', //
        userId: '', //  用户Id
        userLevel: '', // 用户等级
        userStatus: '', // 用户状态 *
        username: '' // 用户名
      },
      radio: '1', // 弹窗里的
      radio_1: '1', // 弹窗里的
      radio_2: '0', // 弹窗里的
      input: '', // 弹窗里的
      dialogVisible: false, // 弹窗里的
      dialogSetup: false, // 设置核销员
      dialogRedact: false, // 编辑
      input1: '',
      input2: '',
      value: '',
      xingbie: '',
      textarea: '', // 弹窗里的
      // 设置成核销员
      formVerifier: {
        RealName: '', // 核销员昵称
        UserId: '', // 用戶id
        cancel2: '', // 是否是核销员
        site: '' // 核销地点
      },
      // 编辑核销员
      formVerifier1: {
        realName: '', // 核销员昵称
        UserId: '', // 用戶id
        site: '' // 核销地点
      },
      // 修改用户
      formRedact: {
        userStatus: '', // 是否是会员
        realName: '',
        // birthDay: '', // 出生日期
        email: '', // 用户邮箱
        phone: '', // 手机号
        region: '', // 所在地区
        requestId: '1111', // 随机数
        sex: '0', // 性别
        timestamp: '1111', // 发起请求的当前时间
        token: '123', // 登录成功后返回的token
        userId: '', // 登录的用户id
        UserId: '', // 登录的用户id
        cancel2: '1', // 是是否是核销员
        site: '' // 核销地点
      },
      // 选择时间
      shortcuts: [
        {
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        },
        {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        },
        {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }
      ],
      sex: [
        {
          value: '0',
          label: '女'
        },
        {
          value: '1',
          label: '男'
        }
      ],
      identity: [
        {
          value: '1',
          label: '会员'
        },
        {
          value: '0',
          label: '非会员'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: '',
      value2: '',
      tableData: [],
      multipleSelection: []
    }
  },
  created () {
    this.getcategory()
  },
  methods: {
    // 修改核销员信息
    amendVerifier () {
      api
        .updateCancel(this.formRedact)
        .then(res => {
          // this.threecategs = res.data.data
          console.log('1234', res)
          this.getcategory()
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },

    // 提交设置核销员
    verifierSubmit () {
      this.dialogSetup = false
      api
        .insertCancel(this.formVerifier)
        .then(res => {
          this.threecategs = res.data.data
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    // 设置核销员
    SetupVerifier (scope) {
      this.dialogSetup = true
      console.log(scope)
      this.formVerifier.UserId = scope.row.id
    },
    // 编辑 getcategory ()
    submitCompile () {
      console.log(this.formRedact.userId)
      this.dialogRedact = false
      api
        .update(this.formRedact)
        .then(res => {
          this.threecategs = res.data.data
          this.getcategory()
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
      this.amendVerifier(this.formRedact)
    },
    //  编辑
    amend (scope) {
      this.dialogRedact = true
      console.log(scope)
      this.formRedact.userId = scope.row.id
      this.formRedact.UserId = scope.row.id
    },
    // 获取用户列表
    async getcategory () {
      api
        .categoryId()
        .then(res => {
          this.tableData = res.data.data
          console.log('用户列表', res)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    handleClose (e) {
      console.log(e)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 筛选
    filtrate () {
      api
        .filtrateUser(this.form)
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 重置
    reset () {

    }
  }
}
</script>

<style scoped >
body {
  width: 100%;
  height: 100%;
  background: #cccccc;
}
div {
  cursor: pointer;
}
.block {
  margin-left: 200px;
  margin-top: 60px;
}
.block2 {
  margin-top: 30px;
}
.block3 {
  margin-top: 30px;
  margin-left: 200px;
}
.input1 {
  width: 15%;
  margin-left: 105px;
}
.input2 {
  width: 15%;
  margin-left: 20px;
}
.leijixiaof {
  margin-left: 200px;
}
.el-table {
  margin-top: 40px;
}
.text {
  font-size: 18px;
}
.dialog-footer {
  text-align: center;
}
/* // 整体 */
.zt {
  display: flex;
}
/* // 左侧 */
.left {
  flex: 1;
}
.lei {
  display: flex;
  padding-top: 41px;
  width: 100%;
}
.sr {
  width: 186px;
  height: 36px;
}
.zr {
  width: 80px;
  height: 36px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  /* // padding-left: 73px; */
  line-height: 36px;
  text-align: center;
  overflow: hidden;
}
.zr_1 {
  margin-left: 39px;
  line-height: 36px;
}

/* // 右侧 */
.right {
  flex: 1;
}
.sr {
  /* margin-left: 37px; */
}
.block4 {
  margin-left: 37px;
}
.input {
  width: 118px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(235, 237, 240, 1);
  border-radius: 4px;
  margin-right: 40px;
}
.input_1 {
  width: 118px;
  height: 36px;
  background: rgba(163, 160, 251, 1);
  border-radius: 4px;
}
.bg {
  background-color: #a3a0fb;
}
.el-button--primary {
  border: none !important;
}

.el-input {
  margin-right: 0;
}
</style>
