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
                default-expand-all
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
                <!-- <el-row :gutter="20">
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
                        <p
                          @click.prevent="lookChoice(item,i)"
                          :class="activeI==i?'active':''"
                          style="line-height:10px;"
                        >{{item.hfModel}}</p>
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
                模块下的权限
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
                </el-row>-->
                <el-tree
                  ref="rightsTree"
                  check-strictly
                  @check="changePort"
                  empty-text="暂无数据"
                  :expand-on-click-node="false"
                  :props="defaultProps2"
                  :load="loadNode"
                  node-key="hfModel"
                  :default-checked-keys="checkedCities"
                  lazy
                  show-checkbox
                ></el-tree>
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
          <el-button type="primary" @click="accountVisible = true" style="float:right">添加账号</el-button>
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
          :button-texts="['移除', '添加']"
          @change="handleSelectionChange"
          @right-check-change="righSelectionChange"
          :props="{
          label: 'roleName',
          key: 'id',
        }"
        ></el-transfer>
      </el-dialog>

      <el-dialog title="新增子账户信息" :visible.sync="accountVisible" width="30%" center>
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
          <el-form-item label="账户属性" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio
                @change="radiochange"
                v-model="ruleForm.type"
                v-for="(item,i) in RoleCodeList"
                :key="i"
                :label="item.email"
              >{{item.email}}</el-radio>
              <!-- <el-radio v-model="ruleForm.type" label="stone">店铺管理员</el-radio>
              <el-radio v-model="ruleForm.type" label="warehouse">仓库管理</el-radio>-->
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <el-dialog width="30%" title="选择店铺" :visible.sync="innerVisible" append-to-body>
          <el-form :model="ruleForm">
            <!-- 店铺 -->
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
            <el-button type="primary" @click="innerVisible = false">确 定</el-button>
          </span>
        </el-dialog>
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
      defaultProps2: {
        id: 'id',
        label: 'hfModel',
        children: 'children',
        isLeaf: 'leaf',
      },
      // --------添加账号内置弹窗---------
      formselectList: [],
      // -------------------------------
      innerVisible: false,
      accountVisible: false,
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
      // eslint-disable-next-line quotes
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
        id: '',

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
      // ------------------------------添加账号-----------------------------------------------

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        authKey: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: checkMobile, trigger: 'change' },
        ],
      },
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
    check (nodes) {
      console.log('nodes', nodes);
    },
    loadNode(node, resolve) {
      console.log('node, resolve', node, resolve);

      // 如果是顶级的父节点
      if (node.level === 0) {
        // 查找顶级对象
        let id = store.getUser().accountId;
        juris.findAdminHasModel({ id: id }, (res) => {
          if (res.data.data) {
            return resolve(res.data.data);
          } else {
            this.$message.error(res.Msg);
          }
        });
      } else {
        this.lookChoice(node.data);
        // 根据父节点id找寻下一级的所有节点
        let params = {
          modelId: node.data.id,
          id: store.getUser().accountId,
        };
        juris.findAdminHasJusInModel(params, (res) => {
          if (res.data.data) {
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              console.log(data[i]);
              data[i].hfModel = data[i].jurisdictionName;
              data[i].leaf = true;
            }
            // eslint-disable-next-line no-magic-numbers
            return resolve(data);
          } else {
            this.$message.error(res.Msg);
          }
        });
      }
    },
    remove(node, data) {
      console.log('node', node, data);
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },

    // --------------------------------------------成员管理----------------------------------------------
    // --------------------添加账号---------------------------

    submitForm(formName) {
      console.log(this.ruleForm);
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
    // 内置下拉框
    // optionchange (e) {
    //   console.log(e);
    // },
    // -----------------------------------------------

    handleSelectionChange(val, direction, movedKeys) {
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
    righSelectionChange(val) {
      console.log(val);
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
          if (data === null) {
            // console.log(12);
            this.$nextTick(() => {
              this.$refs.rightsTree.setCheckedKeys(this.checkedCities);
            });
            return;
          }
          for (var i = 0; i < data.length; i++) {
            this.checkedCities.push(data[i].hfModel);
            // console.log(data[i].id);
          }
          this.$nextTick(() => {
            this.$refs.rightsTree.setCheckedKeys(this.checkedCities);
          });
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
        this.determine();
        this.centerDialogVisible = false;
      });
      this.determine();
    },
    // determine2() {

    // },
    determine() {
      let id = store.getUser().accountId;
      juris.selectAccountRole({ id: id }, (res) => {
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
    changePort(data, e) {
      console.log('changePort', data, e);
      if (e.checkedKeys.includes(data.hfModel)) {
        let selected = {
          modelId: data.id,
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
          modelId: data.id,
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
    lookChoice(item) {
      console.log(item);
      console.log('cities', this.cities);
      // this.activeI = i;
      // let params = {
      //   modelId: item.id,
      //   id: store.getUser().accountId,
      // };
      // juris.findAdminHasJusInModel(params, (res) => {
      //   console.log('模块下权限', res);
      //   console.log('cities[1]', this.cities[i]);
      //   this.cities2 = res.data.data;
      // });
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
            this.checkedCities.push(data[i].jurisdictionName);
            // console.log(data[i].id);
          }
          console.log('模块下选中的权限data', this.checkedCities);
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
.el-tree-node__content {
  line-height: 50px;
  .custom-tree-node {
    width: 100%;
    display: block;
    .fl {
      float: left;
      line-height: 31px;
    }
    .fr {
      float: right;
      margin-right: 50px;
    }
  }
}
</style>
