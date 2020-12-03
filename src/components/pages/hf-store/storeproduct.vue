<template>
  <div>
    <el-card class="box-card" style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>店铺基本信息</span>
        <div style="margin-top: 10px">
          <img
            style="
              width: 54px;
              height: 54px;
              vertical-align: middle;
              margin-left: 20px;
            "
            :src="avatarUrl"
            alt
          />
          <span style="margin-left: 20px"
            >店铺名称:{{ storeinfor.stoneName }}</span
          >
          <span style="margin-left: 20px" v-if="storeinfor.hfStatus === 0"
            >店铺状态:营业</span
          >
          <span style="margin-left: 20px" v-if="storeinfor.hfStatus === 1">
            店铺状态:
            <text style="color: #a6a3fb">未营业</text>
          </span>
          <span style="margin-left: 20px"
            >店铺描述:{{ storeinfor.stoneDesc }}</span
          >
          <span style="margin-left: 20px"
            >店铺地址:{{ storeinfor.address }}</span
          >
          <!-- <span style="margin-left: 20px;">{{storeinfor.hfDesc}}</span>
      <span style="margin-left: 20px;">支付时间:{{storeinfor.hfStatus}}</span>
          <span style="margin-left: 20px;">订单状态:{{zhuang}}</span>-->
        </div>
      </div>
    </el-card>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="店铺数据统计" name="statsChina">
        <el-card class="box-card">
          <div class="box">
            <div class="leftxiao">
              <div
                style="
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  margin-top: 20px;
                  width: 130px;
                "
              >
                <div>今日收入金额（元）</div>
                <div style="margin-top: 2px">{{ liulan.amountDay }}</div>
              </div>
              <div style="font-size: 12px; display: flex">
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>支付订单数</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ liulan.orderCountsDay }}</i
                  >
                  <div style="font-size: 10px">
                    昨日:{{ liulan.orderCountsYestday }}
                  </div>
                </div>
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>支付人数</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >4</i
                  >
                  <div style="font-size: 10px">
                    昨日：{{ liulan.paymentConutsYestday }}
                  </div>
                </div>
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>浏览量</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >6</i
                  >
                  <div style="font-size: 10px">
                    昨日：{{ liulan.browseCountsYestday }}
                  </div>
                </div>
              </div>
            </div>

            <div class="leftxiao1">
              <div
                style="
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  margin-top: 20px;
                  width: 130px;
                "
              >
                <div>本月收入金额（元）</div>
                <div style="margin-top: 2px">{{ liulan.amountMouth }}</div>
              </div>
              <div style="font-size: 12px; display: flex">
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>支付订单数</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ liulan.orderCountsDay }}</i
                  >
                  <div style="font-size: 10px">
                    昨日{{ liulan.orderConutsMouth }}
                  </div>
                </div>
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>支付人数</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ liulan.paymentConutsMouth }}</i
                  >
                  <div style="font-size: 10px">
                    昨日：{{ liulan.paymentConutsYestday }}
                  </div>
                </div>
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>浏览量</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ liulan.browseCountsMouth }}</i
                  >
                  <div style="font-size: 10px">
                    昨日：{{ liulan.browseCountsYestday }}
                  </div>
                </div>
              </div>
            </div>

            <div class="leftxiao2">
              <div style="display: flex; justify-content: space-between">
                <div
                  style="
                    display: flex;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 20px;
                    width: 90px;
                  "
                >
                  <div>可提现金额</div>
                  <div style="margin-top: 2px">{{ check.use }}元</div>
                </div>
                <el-button
                  size="mini"
                  @click="dialogFormVisible = true"
                  style="color: #67c23a"
                  type="text"
                  round
                  >提现</el-button
                >
              </div>
              <div style="font-size: 12px; display: flex">
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>全部</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ check.all }}元</i
                  >
                </div>
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>待支付</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ check.payment }}元</i
                  >
                </div>
                <div
                  style="
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-top: 15px;
                  "
                >
                  <div>待处理</div>
                  <i
                    style="font-size: 13px; margin-top: 2px; margin-bottom: 2px"
                    >{{ check.process }}元</i
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="block">
            <el-date-picker
              v-model="value2"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              default-time="12:00:00"
            ></el-date-picker>
            <el-button @click="Screening" type="primary">筛选</el-button>
          </div>
          <el-table
            :header-cell-style="{ 'text-align': 'center' }"
            :data="Details"
            height="250"
            border
            style="width: 100%"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="createTime" label="日期"></el-table-column>
            <el-table-column prop="actualPrice" label="金额">
              <template slot-scope="scope"
                >{{ scope.row.chargeOffType == "order" ? " + " : " - " }}
                {{ scope.row.actualPrice }}</template
              >
            </el-table-column>
            <el-table-column prop="chargeOffType" label="类型">
              <template slot-scope="scope">{{
                scope.row.chargeOffType == "order" ? "订单" : ""
              }}</template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="商品管理" name="commodity">
        <div style="display: flex">
          <el-card class="box-card" style="width: 40%">
            <div slot="header" class="clearfix">
              <span>商品列表</span>
              <el-button
                style="float: right; margin-left: 10px"
                type="primary"
                @click="Added"
                >新增店铺商品</el-button
              >
              <el-button style="float: right" type="primary" @click="add = true"
                >添加店铺商品</el-button
              >
            </div>
            <el-table
              :data="list"
              stripe
              style="width: 100%"
              ref="table"
              @row-click="getproductgood"
            >
              <el-table-column
                type="index"
                align="center"
                label="选择"
                width="50"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="productName"
                label="商品名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="productDesc"
                label="商品描述"
              ></el-table-column>
            </el-table>
          </el-card>
          <el-card class="box-card" style="width: 50%; margin-left: 20px">
            <div slot="header" class="clearfix">
              <span>物品列表</span>
            </div>
            <el-table
              :data="listwu"
              stripe
              style="width: 100%"
              ref="table"
              @row-click="getproductgood"
            >
              <el-table-column
                prop="goodsId"
                label="序号"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="goodsName"
                label="物品名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="goodsDesc"
                label="物品描述"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="brandName"
                label="生产厂家"
                align="center"
              ></el-table-column>
              <el-table-column prop="sellPrice" label="售卖价格" align="center">
                <template slot-scope="scope">
                  <el-input
                    style="text-align: center"
                    v-model="scope.row.sellPrice"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                width="180"
                label="创建时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="modifyTime"
                width="180"
                label="更新时间"
                align="center"
              ></el-table-column>
              <el-table-column align="center" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="updatagood(scope.row)"
                    >保存</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-button @click="drawer = true" type="primary"
              >添加物品</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="店铺成员" name="member">
        <el-card class="box-card">
          <el-button
            type="primary"
            style="float: right; margin-bottom: 10px"
            @click="dialogVisible = true"
            >添加店铺成员</el-button
          >
          <el-table :data="Person" stripe style="width: 100%">
            <el-table-column
              align="center"
              prop="userId"
              label="用户id"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="userName"
              label="姓名"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="realName"
              label="昵称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="storeRoleName"
              label="角色"
            ></el-table-column>
            <el-table-column label="是否参与核销" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.isCancel === 1">是</div>
                <div v-if="scope.row.isCancel === 0">否</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="userPhone"
              label="手机号"
            ></el-table-column>
            <el-table-column align="center" prop="hfDesc" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  align="center"
                  @click="checkPersonDetail(scope.row)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加店铺成员弹窗 -->
          <el-dialog title="添加店铺成员" :visible.sync="dialogVisible" center>
            <el-table
              :data="userData"
              stripe
              height="250"
              style="width: 100%"
              @selection-change="handleSelectionChange2"
              ref="table"
              @row-click="currentChange"
            >
              <el-table-column
                type="selection"
                align="center"
                label="选择"
                width="50"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="nickName"
                label="用户名"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="phone"
                label="手机号"
              ></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="查看"
            width="40%"
            :visible.sync="draweruser"
            :with-header="false"
          >
            <div class="p20" style="margin: 0 auto">
              <div>
                <span style="font-size: 13px; margin-right: 12px"
                  >是否参与核销</span
                >
                <el-radio v-model="radio" label="0" @change="changestatus"
                  >否</el-radio
                >
                <el-radio v-model="radio" label="1" @change="changestatus"
                  >是</el-radio
                >
              </div>
              <div style="margin-top: 40px">
                <span style="font-size: 13px">设置成员角色：</span>
                <el-select
                  v-model="value3"
                  placeholder="请选择"
                  @change="roleval"
                >
                  <el-option
                    v-for="item in StoreRole"
                    :key="item.roleName"
                    :label="item.roleName"
                    :value="item.roleName"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-dialog>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="账号管理" name="account">
        <el-card class="box-card">
          <el-button
            type="primary"
            @click="Visible = true"
            style="float: right"
            >添加账号</el-button
          >
          <el-table :data="tableData2" border style="width: 100%">
            <el-table-column
              prop="accountCode"
              label="手机号"
            ></el-table-column>
            <el-table-column prop="accountRole" label="账号类型">
              <template slot-scope="scope">
                <div>
                  {{
                    scope.row.accountRole == "Super Admin"
                      ? "超管账号"
                      : "普通账号"
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="accountType" label="类型"></el-table-column>
            <el-table-column prop="isDeleted" label="状态">
              <template slot-scope="scope">
                <div>{{ scope.row.isDeleted == "2" ? "在线" : "离线" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :disabled="scope.row.isDeleted == '0'"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)"
                  >下线</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="binding(scope.$index, scope.row)"
                  >绑定</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="新增子账户信息"
      :visible.sync="Visible"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        label-position="left"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="用户昵称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>-->
        <!-- <el-form-item label="密码" prop="pass">
              <el-input v-model="ruleForm.pass"></el-input>
          </el-form-item>-->
        <el-form-item label="手机号" prop="authKey">
          <el-input v-model="ruleForm.authKey"></el-input>
        </el-form-item>
        <!-- <el-form-item label="账户属性" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio
              @change="radiochange"
              v-model="ruleForm.type"
              v-for="(item, i) in RoleCodeList"
              :key="i"
              :label="item.email"
              >{{ item.email }}</el-radio
            >
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- <el-dialog
        width="30%"
        title="选择店铺"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form :model="ruleForm">
          店铺
          <el-form-item label>
            <el-select v-model="ruleForm.id" placeholder="请选择店铺">
              <el-option
                v-for="item in formselectList"
                :key="item.id"
                :label="item.hfName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog> -->
    </el-dialog>
    <el-dialog title="绑定" :visible.sync="bindingVisible" width="40%" center>
      <el-transfer
        v-model="value"
        :data="tablelist"
        :titles="['可选', '已经添加']"
        :button-texts="['移除', '添加']"
        @change="handleSelectionChange3"
        @right-check-change="righSelectionChange"
        :props="{
          label: 'roleName',
          key: 'id',
        }"
      ></el-transfer>
    </el-dialog>

    <el-dialog center title="店铺商品" :visible.sync="add">
      <!-- <el-select v-model="warehouseId" @change="warehouse" placeholder="请选择">
        <el-option v-for="item in options" :key="item.hfName" :label="item.hfName" :value="item.id"></el-option>
      </el-select> -->

      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        stripe
        height="250"
        style="width: 100%"
        highlight-current-row
        ref="multipleTable"
      >
        <el-table-column
          align="center"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="productName"
          label="物品名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="productDesc"
          label="物品描述"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column align="center" prop="quantity" label="物品数量"></el-table-column> -->
        <el-table-column
          align="center"
          prop="categoryName"
          label="物品类目"
        ></el-table-column>
        <!-- <el-table-column align="center" prop="category" label="申请数量">
          <template slot-scope="scope">
            <el-input placeholder="请输入" :min="1" type="number" v-model.number="scope.row.count"></el-input>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="lastModifier" label="最近一次操作人" align="center"></el-table-column> -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              class="a6a"
              @click="apply(scope.row)"
              type="primary"
              size="small"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="add = false">关闭</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>-->
    </el-dialog>

    <el-dialog
      title="申请提现"
      width="40%"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="提现账号">
          <el-input class="account" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="提现金额">
          <el-input class="account" v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="区款方式">
          <el-select v-model="form.methodId" placeholder="请选择活动区域">
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.withdrawalWayName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" 名称 ">
          <el-input class="account" v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="withdrawalApply">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="添加物品"
      :visible.sync="drawer"
      width="60%"
      height="100%"
      center
      :before-close="handleClose"
    >
      <GoodsLncrease
        ref="mychild"
        :productName="productName"
        :commodityId="productid"
        :stoneId="stoneId"
      ></GoodsLncrease>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="appendGoods">保 存</el-button>
      </span>
    </el-dialog>
    <!-- <el-drawer :visible.sync="drawer" direction="btt" :before-close="handleClose" size="60%">
      <div>
        <GoodsLncrease :productName="productName" :commodityId="productid" :stoneId="stoneId"></GoodsLncrease>
      </div>
    </el-drawer>-->
  </div>
</template>
<script>
import juris from '@/service/jurisdiction.js';
import api from '@/service/hf-auth-api.js';
import cart from '@/service/cart.js';
import product from '@/service/product.js';
import store from '@/store';
import GoodsLncrease from '../hf-product/goods/lncrease';
import home from '@/service/home.js';
// eslint-disable-next-line no-unused-vars
import storeService from '@/service/store.js';
// eslint-disable-next-line no-unused-vars
import constants from '@/store/constants.js';
// import serviceProduct from '@/service/product.js';
import userCenterService from '@/service/userCenter.js';
import serviceGoods from '@/service/goods.js';
// import cang from '@/service/cang.js';
export default {
  name: 'store',
  components: { GoodsLncrease },
  data() {
    // ------------------添加账号------------------------
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'));
      }
      callback();
    };
    // ------------------------------------------
    return {
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        authKey: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: checkMobile, trigger: 'change' },
        ],
      },
      // --------添加账号内置弹窗---------
      formselectList: [],
      // -------------------------------
      tablelist: [],
      RoleCodeList: [],
      formroleId: {
        id: '',
        roleId: [],
      },
      value: [],
      innerVisible: false,
      Visible: false,
      bindingVisible: false,
      tableData2: [],
      ruleForm: {
        name: '',
        pass: '',
        authKey: '',
        delivery: false,
        id: '',

        LastUser: '', // 添加人id
        authType: '2', // 鉴权方式, 1:用户登录, 2:手机号登录
        type: 'stone',
        BSid: '',
      },

      dataList: '',
      form: {
        stoneId: '', // 商家id
        account: '', // 申请账号
        methodId: '', // 取款方式id
        money: '', // 申请金额
        userId: '', // 用户id
        name: '', // 名称
      },
      applys: {},
      warehouseId: '',
      options: [],

      avatarUrl: '',
      persondata: {
        stoneId: '',
        ids: [],
      },
      dialogFormVisible: false,
      dialogVisible: false,
      draweruser: false,
      Person: [],
      userData: [],
      StoreRole: [],
      value3: '',
      radio: '0',
      roledata: {
        StoreRoleId: '',
        userId: '',
        storeId: '',
      },
      cancle: {
        stoneId: '',
        isCancel: '',
        userId: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // eslint-disable-next-line no-magic-numbers
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // eslint-disable-next-line no-magic-numbers
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // eslint-disable-next-line no-magic-numbers
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      value2: '',
      params: {
        stoneId: '',
        stateTime: '', // 开始时间--
        endTime: '', // 结束时间
      },
      activeName: 'statsChina',
      liulan: {},
      drawer: false,
      updata: {
        productId: '',
        stoneId: '',
        userId: '',
        id: '',
        sellPrice: '',
      },
      storeinfor: {},
      content: {},
      product: {
        ids: [],
        stoneId: '',
        userId: '',
      },
      add: false,
      tableData: [],
      id: '',
      list: [],
      collapse: false,
      selectDdata: [],
      listwu: [],
      productid: '',
      stoneId: '',
      productName: '',
      check: [],
      Details: [],
    };
  },
  methods: {
    // --------------------添加账号---------------------------

    submitForm(formName) {
      console.log(this.ruleForm);
      this.ruleForm.id = this.stoneId;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addSup(this.ruleForm, (res) => {
            console.log(res.data.data);
            this.accountVisible = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // -----------------------------------------------
    // 单选 事件
    radiochange(e) {
      console.log(e);
      let identity = store.getUser().identity;
      if (identity === 'boss') {
        if (e === 'stone') {
          juris.getListWaOrStore(e, (res) => {
            console.log(res);
            this.formselectList = res.data.data;
            this.innerVisible = true;
          });
        }
      }
    },
    selectRoleCode() {
      juris.selectRoleCode((res) => {
        let data = res.data.data;
        this.RoleCodeList = data.map((item) => ({ email: item }));
        console.log('this.RoleCodeList', this.RoleCodeList);
      });
    },
    righSelectionChange(val) {
      console.log(val);
    },
    handleSelectionChange3(val, direction, movedKeys) {
      console.log(val, direction, movedKeys);
      this.formroleId.roleId = [];
      for (var i = 0; i < movedKeys.length; i++) {
        this.formroleId.roleId.push(movedKeys[i]);
      }
      if (direction === 'right') {
        console.log('添加');
        console.log(this.formroleId.roleId);
        juris.addUserRole(this.formroleId, (res) => {
          this.bindingVisible = false;
          this.$message({
            message: '绑定成功',
            type: 'success',
          });
        });
      } else {
        console.log('移除');
        juris.deleteUserRole(this.formroleId, (res) => {
          this.bindingVisible = false;
          this.$message({
            message: '移除绑定',
            type: 'success',
          });
        });
      }
    },
    binding(index, row) {
      console.log('row', row);
      this.bindingVisible = true;
      this.formroleId.id = row.id;
      let params = {
        id: row.id,
        type: 'boss',
      };
      juris.selectAccountRole(params, (res) => {
        console.log('获取弹窗已选角色', res);
        let data = res.data.data;
        this.value = [];
        for (var i = 0; i < data.length; i++) {
          this.value.push(data[i].id);
        }
      });
      params = {
        id: store.getUser().accountId,
        type: row.accountType,
      };
      juris.selectAccountRole(params, (res) => {
        let data = res.data.data;
        this.tablelist = data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      api.deleteAccount(row, (res) => {
        this.$message({
          message: '下线成功',
          type: 'success',
        });
        this.selectAccount();
      });
    },

    withdrawalApply() {
      this.form.stoneId = this.stoneId;
      this.form.userId = store.getUser().id;
      cart.withdrawalApply(this.form, (res) => {
        this.dialogFormVisible = false;
        console.log(res);
        this.SelectMethod();
      });
    },
    SelectMethod() {
      let bossId = store.getUser().BSid;
      cart.SelectMethod(bossId, (res) => {
        console.log('提款列表', res.data.data);
        this.dataList = res.data.data;
      });
    },
    selectAccount() {
      api.selectAccount({storeId: this.stoneId}, (res) => {
        console.log(res);
        this.tableData2 = res.data.data;
      });
    },
    // --------------------------------------------------------
    // ------------------------------带仓库获取仓库 和获取仓库下的商品--------------------------------------
    // checkcang: function () {
    //   // console.log(this.boss);
    //   let boss = 1;
    //   cang.checkcang({ bossId: boss }, (res) => {
    //     console.log('仓库', res.data.data);
    //     this.options = res.data.data;
    //     this.warehouseId = res.data.data[0].id;
    //     console.log(this.options[0].id);
    //     this.warehouse();
    //   });
    // },
    // warehouse() {
    //   cang.findGoodsByWarsehouse(this.warehouseId, (res) => {
    //     console.log('仓库物品', res.data.data);
    //     this.tableData = res.data.data;
    //     // console.log(this.options);
    //   });
    // },
    // --------------------------------------------------------------------
    getProductListBos() {
      let bossId = store.getUser().BSid;
      product.getProductListBos(bossId, (res) => {
        console.log('物品列表', res.data.data);
        this.tableData = res.data.data.list;
        // console.log(this.options);
      });
    },
    // 触发子组件方法
    appendGoods() {
      this.$refs.mychild.SubmitGoods('formName');
    },
    // -----------------------------------------------------------------------------------------------------
    checkPerson: function () {
      console.log(this.$route.query.id);
      storeService.checkPerson(this.$route.query.id, (res) => {
        console.log(res);
        this.Person = res.data.data;
      });
    },
    checkPersonDetail: function (row) {
      console.log(row);
      this.radio = row.isCancel;
      this.roledata.userId = row.userId;
      if (row.isCancel === 0) {
        this.radio = '0';
      } else {
        this.radio = '1';
      }
      this.roledata.storeId = this.stoneId;
      this.cancle.userId = row.userId;
      this.draweruser = true;
      this.getStoreRole();
    },
    checkUser: function () {
      userCenterService.checkUser((res) => {
        // console.log(res.data.data);
        this.userData = res.data.data.list;
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectDdata = val;
    },
    handleSelectionChange2(val) {
      console.log(val);
      this.selectDdata = val;
    },
    // eslint-disable-next-line no-empty-function
    currentChange: function (row) {
      console.log(row);
      // this.persondata.personid = row.id;
      this.$refs.table.toggleRowSelection(row);
    },
    // ----------------------------以前仓库添加物品逻辑------------------------------------

    // apply: function (row) {
    // console.log(row);
    // this.applys = row;
    // if (!row.count) {
    //   this.$message({
    //     message: '请填写申请数量',
    //     type: 'error',
    //   });
    //   return false;
    // }
    // this.applys.userId = this.content.id;
    // this.applys.warehouseId = this.warehouseId;
    // this.applys.stoneId = this.stoneId;
    // cang.stoneApplyGood(this.applys, (res) => {
    //   console.log(res);
    //   if (res.data.status === constants.SUCCESS_CODE) {
    //     if (res.data.data === 0) {
    //       this.$message({
    //         message: '数量不足',
    //         type: 'error',
    //       });
    //     } else {
    //       this.$message({
    //         message: '申请成功',
    //         type: 'success',
    //       });
    //     }
    //   } else {
    //     this.$message({
    //       message: '申请失败',
    //       type: 'error',
    //     });
    //   }
    // });
    // },
    // ----------------------------------------------------------------
    apply(item) {
      console.log(item);
      let params = {
        productIds: item.id,
        stoneId: this.stoneId,
        userId: store.getUser().id,
      };
      product.addStoneProduct(params, (res) => {
        console.log();
        // eslint-disable-next-line no-magic-numbers
        if (res.status === 200) {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.getstoneproduct();
        } else {
          this.$message({
            message: '错误',
            type: 'error',
          });
        }
      });
    },
    roleval: function (qqq) {
      console.log(qqq);
      for (var i = 0; i < this.StoreRole.length; i++) {
        if (this.StoreRole[i].roleName === qqq) {
          this.roledata.StoreRoleId = this.StoreRole[i].id;
        }
      }
      console.log(this.roledata);
      storeService.updateRole(this.roledata, (res) => {
        console.log(res);
        if (res.data.data === 0) {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.draweruser = false;
          this.checkPerson();
        } else {
          this.$message({
            message: '修改失败',
            type: 'error',
          });
        }
      });
    },
    changestatus: function (e) {
      console.log(e);
      this.cancle.isCancel = e;
      this.cancle.stoneId = this.$route.query.id;
      console.log(this.cancle);
      storeService.isCancel(this.cancle, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.draweruser = false;
          this.checkPerson();
        } else {
          this.$message({
            message: '修改失败',
            type: 'error',
          });
        }
      });
    },
    getStoreRole: function () {
      storeService.getStoreRole(this.stoneId, (res) => {
        console.log(res);
        this.StoreRole = res.data.data;
      });
    },
    // -----------------------------------------------------------------------------------------------------
    Screening() {
      console.log(this.value2);
      this.params.stateTime = this.value2[0];
      this.params.endTime = this.value2[1];
      this.params.stoneId = this.$route.query.id;
      console.log(this.params);
      this.Detailed();
    },
    // 获取店铺头像
    getStonePicture: function () {
      storeService.getStonePicture(this.$route.query.id, (res) => {
        console.log('店铺头像', res);
        // this.StoreRole = res.data.data;
        serviceGoods.getFileFileId(res.data.data[0].id, (res) => {
          console.log(res);
          this.avatarUrl = res.config.url;
        });
      });
    },
    Detailed() {
      this.params.stoneId = this.$route.query.id;
      storeService.selectBalanceDetail(this.params, (res) => {
        console.log('明细', res.data.data);
        this.Details = res.data.data;
      });
    },
    selectStone() {
      storeService.selectStoneBalance(this.$route.query.id, (res) => {
        console.log('数据统计', res.data.data);
        let data = res.data.data;
        // eslint-disable-next-line no-magic-numbers
        data.all = (data.all / 100).toFixed(2);
        // eslint-disable-next-line no-magic-numbers
        data.payment = (data.payment / 100).toFixed(2);
        // eslint-disable-next-line no-magic-numbers
        data.process = (data.process / 100).toFixed(2);
        // eslint-disable-next-line no-magic-numbers
        data.use = (data.use / 100).toFixed(2);

        this.check = data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    DataByStone() {
      home.findAmountDataByStone(this.$route.query.id, (res) => {
        console.log('统计', res.data.data);
        let data = res.data.data;
        // eslint-disable-next-line no-magic-numbers
        data.amountMouth = (data.amountMouth / 100).toFixed(2);
        // eslint-disable-next-line no-magic-numbers
        data.amountDay = (data.amountDay / 100).toFixed(2);
        this.liulan = data;
      });
    },
    updatagood: function (row) {
      console.log(row);
      this.updata.stoneId = this.$route.query.id;
      this.updata.userId = this.content.id;
      this.updata.id = row.goodsId;
      this.updata.sellPrice = row.sellPrice;
      console.log(this.updata);
      storeService.updatagood(this.updata, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '更新成功',
            type: 'success',
          });
          storeService.getproductgood(this.productid, (res) => {
            console.log(res);
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              // eslint-disable-next-line no-magic-numbers
              data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
              // eslint-disable-next-line no-magic-numbers
            }
            this.listwu = data;
          });
          // this.product.productIds = [];
          // this.selectDdata = [];
        } else {
          this.$message({
            message: '更新失败',
            type: 'error',
          });
        }
      });
    },
    getproductgood: function (aaa) {
      console.log(aaa);
      this.productid = aaa.id + '';
      this.productName = aaa.productName;
      storeService.selectProductGoods(aaa.id, aaa.stoneId, (res) => {
        console.log(res);
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-magic-numbers
          data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
          // eslint-disable-next-line no-magic-numbers
        }
        this.listwu = data;
      });
    },
    submit: function () {
      // this.product.productIds = [];
      if (this.selectDdata.length > 0) {
        for (var i = 0; i < this.selectDdata.length; i++) {
          this.product.ids.push(this.selectDdata[i].id);
        }
      } else {
        return false;
      }
      this.product.userId = this.content.id;
      this.product.stoneId = this.id;
      console.log(this.product);
      storeService.addPerson(this.product, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.add = false;
          // this.getstoneproduct();
          this.checkPerson();
          // this.product.productIds = [];
          this.selectDdata = [];
        } else {
          this.$message({
            message: '添加失败',
            type: 'error',
          });
          // this.product.productIds = [];
          this.selectDdata = [];
        }
      });
    },
    Added(e) {
      let stoneId = this.$route.query.id;
      this.$router.push({
        path: '/hf-product/detail',
        query: {
          stoneId: stoneId,
          stoneName: this.storeinfor.hfName,
          action: 'store',
        },
      });
    },
    // handleSelectionChange(val) {
    //   console.log(val);
    //   this.selectDdata = val;
    // },
    setProducts() {
      // serviceProduct.getProductsByBossId((res) => {
      //   console.log(res);
      //   this.tableData = res.data.data.list;
      // });
    },
    getstoneproduct: function () {
      console.log(this.id);
      storeService.getstoneproduct(this.id, (res) => {
        console.log('店铺商品', res);
        this.list = res.data.data.list;
        this.updata.productId = this.list[0].id;
        this.productid = this.list[0].id + '';
        this.productName = this.list[0].productName;
        storeService.selectProductGoods(
          this.list[0].id,
          this.list[0].stoneId,
          (res) => {
            console.log(res);
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              // eslint-disable-next-line no-magic-numbers
              data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
              // eslint-disable-next-line no-magic-numbers
            }
            this.listwu = data;
          }
        );
      });
    },
    getStoreid: function () {
      console.log(this.id);
      storeService.getStoreid(this.id, (res) => {
        console.log(res);
        this.storeinfor = res.data.data;
        this.stoneId = this.$route.query.id + '';
        // this.list = res.data.data.list;
      });
    },
    handleClose(done) {
      storeService.getproductgood(this.productid, (res) => {
        // console.log(res);
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-magic-numbers
          data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
          // eslint-disable-next-line no-magic-numbers
        }
        this.listwu = data;
      });
      done();
    },
  },
  mounted() {
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    this.id = this.$route.query.id;
    this.stoneId = this.$route.query.id;
    this.getStoreid();
    this.getstoneproduct();
    this.DataByStone();
    this.setProducts();
    this.selectStone();
    this.Detailed();
    this.checkUser();
    this.checkPerson();
    this.getStonePicture();
    // this.checkcang();
    this.SelectMethod();
    this.getProductListBos();
    this.selectAccount();
    this.selectRoleCode();
  },
};
</script>
<style scoped  lang="less">
.account {
  width: 320px;
}
.leftxiao {
  background: url(../img/21.png) no-repeat;
  font-size: 14px;
  width: 25%;
  height: 200px;
  background-size: 100%;
  color: #fff;
  overflow: hidden;
}
.box .leftxiao1 {
  background: url(../img/22.png) no-repeat;
  font-size: 14px;
  margin-left: 16px;
  width: 25%;
  height: 200px;
  background-size: 100%;
  color: #fff;
  overflow: hidden;
}
.box .leftxiao2 {
  background: url(../img/cc.png) no-repeat;
  font-size: 14px;
  margin-left: 16px;
  width: 25%;
  height: 200px;
  background-size: 100%;
  color: #fff;
  overflow: hidden;
}
.box {
  display: flex;
  justify-content: center;
}
.p20 {
  margin: 0 auto;
  width: 400px;
}
.block {
  float: right;
  margin: 20px;
  .el-button {
    margin-left: 20px;
  }
}
</style>
