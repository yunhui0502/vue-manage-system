<template>
  <div>
    <div style="display:flex;">
      <div>
        <div style="margin-bottom:20px;">店铺列表</div>
        <el-button type="primary" style="margin-bottom:10px;" @click="drawer = true">添加店铺</el-button>
        <el-table :data="storeData" stripe style="width: 100%" @row-click="getStoreId">
          <el-table-column align="center" prop="hfName" label="店铺名称" width="180"></el-table-column>
          <el-table-column align="center" prop="hfDesc" label="店铺描述" width="180"></el-table-column>
          <el-table-column align="center" prop="hfStatus" label="店铺状态" width="180"></el-table-column>
        </el-table>
    </div>
   <div style="margin-left:20px;">
    <div style="margin-bottom:20px;">店铺管理员</div>
     <el-button type="primary" style="margin-bottom:10px;"  @click="dialogVisible = true">添加店铺管理员</el-button>
    <el-table :data="Person" stripe style="width: 100%">
      <el-table-column align="center" prop="realName" label="姓名" width="180"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width="180"></el-table-column>
    </el-table>
   </div>
    </div>
    <el-drawer
      size="70%"
      title="添加店铺"
      :visible.sync="drawer"
      :direction="direction"
    >
      <el-form
        style="width:25%;"
        :model="store"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺名称" prop="hfName">
          <el-input v-model="store.hfName"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述" prop="hfDesc">
          <el-input v-model="store.hfDesc"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺状态" prop="hfStatus">
          <el-input v-model="store.hfStatus"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-dialog
      :visible.sync="dialogVisible">
        <el-table :data="userData" stripe style="width: 100%" @selection-change="chooseInstance" ref="table" @row-click="currentChange">
          <el-table-column type=selection align="center"  label="选择" width="50"></el-table-column>
          <el-table-column align="center" prop="nickName" label="用户名"> </el-table-column>
          <el-table-column align="center" prop="phone" label="手机号" ></el-table-column>
        </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import storeService from '@/service/store.js';
import userCenterService from '@/service/userCenter.js';
// eslint-disable-next-line no-unused-vars
import constants from '@/store/constants.js';
export default {
  data() {
    return {
      storeId: '',
      persondata: {
        stoneId: '',
        personid: '',
      },
      Person: [],
      userData: [],
      dialogVisible: false,
      bossid: 1,
      rules: {
        hfName: [
          {
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur',
          },
        ],
        hfDesc: [
          {
            required: true,
            message: '请输入店铺描述',
            trigger: 'blur',
          },
        ],
        hfStatus: [
          {
            required: true,
            message: '请输入店铺状态',
            trigger: 'blur',
          },
        ],
      },
      content: '',
      store: {
        hfName: '',
        hfDesc: '',
        hfStatus: '',
        userId: '',
      },
      drawer: false,
      direction: 'btt',
      storeData: [
      ],
    };
  },
  methods: {
    // eslint-disable-next-line no-empty-function
    currentChange: function(row) {
      console.log(row);
      this.persondata.personid = row.id;
      this.$refs.table.toggleRowSelection(row);
    },
    getStoreId: function(row) {
      console.log(row);
      this.storeId = row.id;
      this.persondata.stoneId = row.id;
      this.checkPerson();
    },
    submit: function() {
      console.log(this.persondata);
      storeService.addPerson(this.persondata, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.dialogVisible = false;
        } else {
          this.$message({
            message: '添加失败',
            type: 'error',
          });
        }
      });
    },
    chooseInstance (val) {
      if (val.length > 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(val.pop());
      }
    },
    checkPerson: function() {
      storeService.checkPerson(this.storeId, (res) => {
        console.log(res);
        this.Person = res.data.data;
      });
    },
    checkUser: function() {
      userCenterService.checkUser((res) => {
        console.log(res.data.data);
        this.userData = res.data.data.list;
      });
    },
    getStore: function() {
      storeService.getStore(this.bossid, (res) => {
        console.log(res);
        this.storeData = res.data.data;
        this.storeId = this.storeData[0].id;
        this.persondata.stoneId = this.storeData[0].id;
        this.checkPerson();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          storeService.addStore(this.store, (res) => {
            console.log(res);
            this.$message({
              message: '添加成功',
              type: 'success',
            });
            this.getStore();
          });
          this.$refs[formName].resetFields();
          this.drawer = false;
        } else {
          this.$message({
            message: '添加失败',
            type: 'error',
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // eslint-disable-next-line no-empty-function
  mounted() {
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    this.store.userId = this.content.id;
    this.checkUser();
    this.getStore();
  },

};
</script>
<style >
thead .el-table-column--selection .cell{
    display: none;
}
</style>
