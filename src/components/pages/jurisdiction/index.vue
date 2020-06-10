<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="部门管理" name="first">
        <el-card class="box-card">
          <div class="text item">用户管理</div>
        </el-card>
      </el-tab-pane>
      <!-- ---------------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="角色管理" name="second">
        <el-card class="box-card">
          <div style="display:flex;">
            <div style="width: 20%;border-right: 1px solid #ccc;margin-right: 10px;">
              <el-tree
                :data="roleList"
                highlight-current
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </div>

            <div style="width: 100%;">
              <div style="position:relative;float:right;Z-index：66;width: 10%;">
                <el-button size="small" @click="centerDialogVisible = true" type="primary">添加角色</el-button>
              </div>

              <div style="width: 90%;">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <h5 style="margin-block-end:0;margin-block-start:0; ">模块</h5>
                  </el-col>
                  <el-col :span="16">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                    >全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox
                        v-for="(item,i) in cities"
                        :label="item.id"
                        :key="item.id"
                        @change="((val,$event)=>changePort(val,$event,item.id))"
                        class="ckbox-border"
                      >
                        <!-- {{item.c_operation_port_name}} -->
                        <p
                          @click.prevent="lookChoice(item,i)"
                          :class="activeI==i?'active':''"
                          style="line-height:10px;"
                        >{{item.hfModel}}</p>
                      </el-checkbox>
                      <!-- <el-checkbox  @change="handleCheckedCitiesChange3(city.id)"
                border v-for="city in cities" :label="city.id"
                      :key="city.id">{{city.hfModel}}</el-checkbox>-->
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                <!-- 模块下的权限 -->
                <el-row :gutter="20">
                  <el-col :span="2">
                    <h5 style="margin-block-end:0;margin-block-start:0; ">权限</h5>
                  </el-col>
                  <el-col :span="16">
                    <el-checkbox
                      :indeterminate="isIndeterminate2"
                      v-model="checkAll2"
                      @change="handleCheckAllChange2"
                    >全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group
                      v-model="checkedCities2"
                      @change="handleCheckedCitiesChange2"
                    >
                      <el-checkbox
                        class="ckbox-border"
                        v-for="city in cities2"
                        :label="city.id"
                        :key="city.id"
                        @change="((val,$event)=>changePort2(val,$event,city.id))"
                      >
                        <p style="line-height:10px;">{{city.jurisdictionName}}</p>
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <!-- ------------弹窗--------------- -->
      <el-dialog title="添加角色" :visible.sync="centerDialogVisible" width="30%" center>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属位置">
            <el-select v-model="form.roleCode" placeholder="请选则">
              <el-option
                v-for="(item,i) in RoleCodeList"
                :key="i"
                :label="item.email"
                :value="item.email"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRoles">保 存</el-button>
        </span>
      </el-dialog>
      <!-- ------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="成员管理" name="member">
        <el-card class="box-card">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="accountCode" label="手机号"></el-table-column>
            <el-table-column prop="accountRole" label="账号类型">
              <template slot-scope="scope">
                <div>{{scope.row.accountRole=='Super Admin'?'超管账号':'普通账号'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="accountType" label="类型"></el-table-column>
            <el-table-column prop="isDeleted" label="状态">
              <template slot-scope="scope">
                <div>{{scope.row.isDeleted=='2'?'在线':'离线'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :disabled="scope.row.isDeleted=='0'"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)"
                >下线</el-button>
                <el-button size="mini" type="text" @click="binding(scope.$index, scope.row)">绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-dialog title="绑定" :visible.sync="bindingVisible" width="40%" center>
        <!-- <el-table
        ref="multipleTable"
        :data="tablelist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >-->
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <!-- <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>-->
        <!-- <el-table-column prop="roleName" label="名称" width="120"></el-table-column>
        <el-table-column prop="roleType" label="类型" show-overflow-tooltip></el-table-column>
        </el-table>-->
        <!-- <el-tree :data="tablelist" :props="defaultProps" @node-click="handleSelectionChange"></el-tree> -->

        <el-transfer
          v-model="value"
          :data="tablelist"
          :titles="['可选', '已经添加']"
          @change="handleSelectionChange"
          :props="{
          label: 'roleName',
          key: 'id',
        }"
        ></el-transfer>

        <span slot="footer" class="dialog-footer">
          <el-button @click="bindingVisible = false">取 消</el-button>
          <el-button type="primary" @click="preserve">确 定</el-button>
        </span>
      </el-dialog>
      <!-- -------------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="客服管理" name="third">
        <el-card class="box-card">
          <div class="text item">客服管理</div>
        </el-card>
      </el-tab-pane>
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="数据库管理" name="fourth">
        <el-card class="box-card">
          <div class="text item">数据库管理</div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from '@/service/hf-auth-api.js';
import store from '@/store';
import juris from '@/service/jurisdiction.js';
export default {
  name: '',
  data() {
    return {
      bindingVisible: false,
      tableData: [],
      defaultProps: {
        children: 'roles',
        label: 'roleName',
      },
      RoleCodeList: '',
      form: {
        roleName: '',
        roleCode: '',
        userId: '',
        accountId: '',
      },
      centerDialogVisible: false,
      activeI: '', // 控制多选文字点击颜色
      Selected: [],
      Selected2: [],
      roleList: [], // 角色列表
      activeName: 'second',
      checkAll: false,
      checkedCities: [],
      cityOptions: '',
      cities: '',
      isIndeterminate: true,
      checkAll2: false,
      checkedCities2: [],
      cityOptions2: '',
      cities2: '',
      isIndeterminate2: true,
      formInline: {
        region: '',
        region1: '',
        rId: '',
      },
      // -----------------------------------------------------------------------------
      ruleForm: {
        name: '',
        pass: '',
        authKey: '',
        delivery: false,

        LastUser: '', // 添加人id
        authType: '2', // 鉴权方式, 1:用户登录, 2:手机号登录
        type: 'warehouse',
        BSid: '',
      },
      formroleId: {
        id: '',
        roleId: [],
      },
      tablelist: [],
      value: [],
      // -----------------------------------------------------------------------------
    };
  },
  created() {
    this.determine();
    this.determine2();
    this.findAdminHasModel();
    this.selectRoleCode();

    this.takestore();
    this.selectAccount();
  },
  methods: {

    // --------------------------------------------成员管理----------------------------------------------
    handleSelectionChange(val) {
      console.log(val);
      this.formroleId.roleId = [];
      for (var i = 0; i < val.length; i++) {
        this.formroleId.roleId.push(val[i].id);
      }
      console.log(this.formroleId.roleId);
      juris.addUserRole(this.formroleId, (res) => {
        this.bindingVisible = false;
        this.$message({
          message: '绑定成功',
          type: 'success',
        });
      });
    },
    selectAccount() {
      api.selectAccount((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },

    takestore() {
      let data = store.getUser();
      this.ruleForm.BSid = data.BSid;
      this.ruleForm.LastUser = data.id;
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

    binding(index, row) {
      console.log(row);
      this.bindingVisible = true;
      this.formroleId.id = row.id;
      let params = {
        id: row.id,
        type: 1,
      };
      juris.selectAccountRole(params, (res) => {
        console.log('获取弹窗已选角色', res);
        let data = res.data.data;
        this.value = [];
        for (var i = 0; i < data.length; i++) {
          this.value.push(data[i].id);
        }

      });
    },
    preserve() {
      juris.addUserRole(this.formroleId, (res) => {
        this.bindingVisible = false;
        this.$message({
          message: '绑定成功',
          type: 'success',
        });
      });
    },
    // -------------------------------------------------------------------------------------------------
    handleNodeClick(data) {
      console.log(data);
      if (data.id !== undefined) {
        let params = {
          id: store.getUser().accountId,
          rId: data.id,
        };
        this.formInline.rId = data.id;
        juris.findAdminHasModel(params, (res) => {
          console.log('角色下已选择模块', res.data.data);
          let data = res.data.data;
          this.checkedCities = [];
          for (var i = 0; i < data.length; i++) {
            this.checkedCities.push(data[i].id);
            // console.log(data[i].id);
          }
        });
      }
    },
    selectRoleCode() {
      juris.selectRoleCode((res) => {
        let data = res.data.data;
        this.RoleCodeList = data.map((item) => ({ email: item }));
        console.log('this.RoleCodeList', this.RoleCodeList);
      });
    },
    // 添加角色 accountId
    addRoles() {
      this.form.userId = store.getUser().id;
      this.form.accountId = store.getUser().accountId;
      juris.addRole(this.form, (res) => {
        console.log(res);
        this.centerDialogVisible = false;
      });
      this.determine();
    },
    // determine2() {

    // },
    determine() {
      let id = store.getUser().accountId;
      juris.selectAccountRole({id: id}, (res) => {
        console.log('角色', res);
        this.roleList = res.data.data;
      });
    },
    determine2() {

      let params = {
        id: store.getUser().accountId,
        type: 1,
      };
      juris.selectAccountRole(params, (res) => {
        console.log('获取弹窗角色', res);
        this.tablelist = res.data.data;
      });
    },
    findAdminHasModel() {
      let id = store.getUser().accountId;
      juris.findAdminHasModel({ id: id }, (res) => {
        console.log('模块', res);
        this.cities = res.data.data;
        this.cityOptions = res.data.data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCheckAllChange(val) {
      console.log(val);

      if (val) {
        let data = this.cityOptions;
        for (var i = 0; i < data.length; i++) {
          this.Selected.push(data[i].id);
          // console.log(data[i].id);
        }
      }
      this.checkedCities = val ? this.Selected : [];
      this.isIndeterminate = false;
    },
    // 点击复选框执行
    changePort(val, $event, id) {
      console.log('changePort', val, $event, id);
      if (val) {
        let selected = {
          modelId: id,
          id: store.getUser().accountId,
          rId: this.formInline.rId,
          roleId: this.formInline.rId, // 绑定模块
        };
        juris.roleAddModel(selected, (res) => {
          console.log('绑定模块', res);
          this.$message({
            showClose: true,
            message: '绑定模块成功',
            type: 'success',
          });
          let data = res.data.data;
          this.checkedCities2 = [];
          for (var i = 0; i < data.length; i++) {
            this.checkedCities2.push(data[i].id);
            // console.log(data[i].id);
          }
        });
      } else {
        let params = {
          modelId: id,
          roleId: this.formInline.rId,
        };
        juris.roleDeleteModel(params, (res) => {
          console.log('取消模块', res);
          this.$message({
            showClose: true,
            message: '模块已取消',
            type: 'warning',
          });
        });
      }
    },
    // 多选点击文字执行
    lookChoice(item, i) {
      console.log(item, i);
      console.log('cities', this.cities);
      this.activeI = i;
      let params = {
        modelId: item.id,
        id: store.getUser().accountId,
      };
      juris.findAdminHasJusInModel(params, (res) => {
        console.log('模块下权限', res);
        console.log('cities[1]', this.cities[i]);
        this.cities2 = res.data.data;
        this.cityOptions2 = res.data.data;
      });
      if (this.formInline.rId !== '') {
        let selected = {
          modelId: item.id,
          id: store.getUser().accountId,
          rId: this.formInline.rId,
        };
        juris.findAdminHasJusInModel(selected, (res) => {
          console.log('模块下选中的权限', res);
          let data = res.data.data;
          for (var i = 0; i < data.length; i++) {
            this.checkedCities2.push(data[i].id);
            // console.log(data[i].id);
          }
        });
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 点击复选框执行
    changePort2(val, $event, id) {
      console.log('changePort2', val, $event, id);
      if (val) {
        let selected = {
          JurisdictionIds: id,
          roleId: this.formInline.rId, // 绑定模块
        };
        juris.roleAddJurisdiction(selected, (res) => {
          console.log('绑定模块下的小模块', res);
          this.$message({
            showClose: true,
            message: '添加权限成功',
            type: 'success',
          });
        });
      } else {
        let params = {
          JurisdictionIds: id,
          roleId: this.formInline.rId,
        };
        juris.roleDeleteJurisdiction(params, (res) => {
          console.log('取消模块', res);
          this.$message({
            showClose: true,
            message: '权限已取消',
            type: 'warning',
          });
        });
      }
    },
    handleCheckAllChange2(val) {
      if (val) {
        // this.Selected2 = [];
        let data = this.cityOptions2;
        for (var i = 0; i < data.length; i++) {
          this.Selected2.push(data[i].id);
          // console.log(data[i].id);
        }
      }
      this.checkedCities2 = val ? this.Selected2 : [];
      this.isIndeterminate2 = false;
    },

    handleCheckedCitiesChange2(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.cities2.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities2.length;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.is-bordered {
  margin-left: 0 !important;
  margin-bottom: 40px;
}
/deep/.el-tree-node__expand-icon {
  font-size: 23px;
}
/deep/.el-tree-node__label {
  font-size: 21px;
}
.active {
  color: rgb(0, 255, 0);
}
.el-checkbox.is-bordered {
  padding: 0px 10px 0px 10px;
  height: 50px;
}
#unSchTree .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner {
    display: none;
  }
  .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }
}
</style>
